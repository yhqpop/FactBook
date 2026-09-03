#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""FactBook · CLI 查询（零依赖，仅 Python 标准库）

用法:
  python query.py                        # 列出全部条目（默认 data/example.json）
  python query.py 软考                    # 关键词搜索（全字段）
  python query.py P0                     # 按优先级值精确过滤（值来自数据，如 P0/P1/AVOID）
  python query.py P1 智能体               # 组合：优先级 + 关键词
  python query.py --field ai_specific=1  # 按任意字段过滤
  python query.py --deadline             # 只看有截止日期的（带倒计时）
  python query.py --decision             # 看决策卡
  python query.py --process 软考          # 查流程
  python query.py --validate             # 数据质量校验
  python query.py --data 我的.json       # 指定数据集
  python query.py 华为 --json            # 输出机器可读 JSON（管道安全）
"""
import datetime
import json
import os
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

ROOT = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DATA = os.path.join(ROOT, "data", "example.json")


def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def items_of(data):
    return data.get("items") or data.get("certs") or []


def deadline_days(deadline):
    if not deadline:
        return None
    try:
        return (datetime.date.fromisoformat(deadline) - datetime.date.today()).days
    except (ValueError, TypeError):
        return None


def validate(data):
    """数据质量校验：返回问题列表（空=通过）。"""
    issues = []
    m = data.get("meta")
    if not m:
        issues.append("缺少 meta")
    else:
        u = m.get("updated")
        if not u:
            issues.append("meta.updated 缺失")
        else:
            try:
                datetime.date.fromisoformat(u)
            except (ValueError, TypeError):
                issues.append("meta.updated 不是 YYYY-MM-DD: %r" % (u,))
    items = items_of(data)
    if not items:
        issues.append("items/certs 为空")
    for i, c in enumerate(items):
        tag = "items[%d] %s" % (i, c.get("name", "?"))
        if not c.get("name"):
            issues.append("%s: 缺 name" % tag)
        if c.get("status"):
            if not c.get("verified_date"):
                issues.append("%s: status=%s 但缺 verified_date" % (tag, c["status"]))
            if not c.get("source"):
                issues.append("%s: status=%s 但缺 source（来源必须可追溯）" % (tag, c["status"]))
        dd = c.get("deadline")
        if dd is not None and dd != "" and deadline_days(dd) is None:
            issues.append("%s: deadline 不是 YYYY-MM-DD: %r" % (tag, dd))
        if c.get("official"):
            for o in c["official"]:
                if not (isinstance(o, dict) and o.get("url") and o.get("label")):
                    issues.append("%s: official 条目需 {label,url}" % tag)
                    break
    return issues


def hay_of(c):
    parts = []
    for v in c.values():
        if isinstance(v, (str, int, float)):
            parts.append(str(v))
        elif isinstance(v, list):
            for x in v:
                if isinstance(x, dict):
                    parts.append("%s %s" % (x.get("label", ""), x.get("url", "")))
                else:
                    parts.append(str(x))
    return " ".join(parts).lower()


def fmt(c):
    L = []
    head = []
    if c.get("priority"):
        head.append(str(c["priority"]))
    if c.get("status"):
        head.append(c["status"])
    L.append("=" * 62)
    L.append(" ".join(head + [c.get("name", "?")]) if head else c.get("name", "?"))
    if c.get("issuer"):
        L.append("  来源方: %s%s" % (c["issuer"], " ｜ " + c["level"] if c.get("level") else ""))
    dd = deadline_days(c.get("deadline"))
    if dd is not None:
        L.append("  ⏰ 截止: %s (%s)" % (c["deadline"], "已过 %d 天" % -dd if dd < 0 else "剩 %d 天" % dd))
    if c.get("deadline_note"):
        L.append("  窗口: %s" % c["deadline_note"])
    for k in ("conditions", "cost", "exam", "note"):
        if c.get(k):
            L.append("  %s: %s" % ({'conditions': '条件', 'cost': '费用', 'exam': '方式', 'note': '说明'}[k], c[k]))
    # 任意自定义标量字段
    known = {"name", "priority", "status", "issuer", "level", "conditions", "cost",
             "exam", "note", "value", "official", "local_files", "avoid_reason",
             "todo", "deadline", "deadline_note", "verified_date", "source", "id", "ai_specific"}
    for k, v in c.items():
        if k in known or v is None or v == "" or isinstance(v, (dict, list)):
            continue
        L.append("  %s: %s" % (k, v))
    if c.get("value"):
        L.append("  价值: " + "；".join(c["value"]))
    if c.get("avoid_reason"):
        L.append("  🚫 回避: %s" % c["avoid_reason"])
    if c.get("todo"):
        L.append("  ⚠️ 用前核实: %s" % c["todo"])
    for o in c.get("official", []):
        L.append("  🔗 %s: %s" % (o.get("label", ""), o.get("url", "")))
    L.append("  核实: %s ｜ %s" % (c.get("verified_date", ""), c.get("source", "")))
    return "\n".join(L)


def parse_args(argv):
    """支持 --flag / --flag=value / --flag value 三种形式。"""
    positional, field_filters, flags = [], {}, set()
    data_path = DEFAULT_DATA
    i = 0
    while i < len(argv):
        a = argv[i]
        if a == "--field" and i + 1 < len(argv) and "=" in argv[i + 1]:
            k, _, v = argv[i + 1].partition("=")
            if v:
                field_filters[k] = v
            i += 2
            continue
        if a == "--data" and i + 1 < len(argv):
            data_path = argv[i + 1]
            i += 2
            continue
        if a.startswith("--field="):
            k, _, v = a[len("--field="):].partition("=")
            if v:
                field_filters[k] = v
        elif a.startswith("--data="):
            data_path = a[len("--data="):]
        elif a.startswith("--"):
            flags.add(a[2:])
        else:
            positional.append(a)
        i += 1
    return positional, field_filters, flags, data_path


def main(argv):
    positional, field_filters, flags, data_path = parse_args(argv)

    data = load(data_path)
    items = items_of(data)

    if "validate" in flags:
        issues = validate(data)
        if issues:
            print("❌ 数据校验未通过（%d 个问题）:" % len(issues))
            for x in issues:
                print("  - " + x)
            return 1
        print("✅ 数据校验通过：%d 条条目，meta/日期/来源齐全" % len(items))
        return 0

    if "decision" in flags:
        d = data.get("decision")
        if not d:
            print("此数据集没有 decision。")
            return 1
        print("【决策卡】" + d.get("summary", ""))
        for k in ("p0", "p1", "p2"):
            if d.get(k):
                print("  %s: %s" % (k.upper(), d[k]))
        if d.get("not_do"):
            print("  不做: " + "；".join(d["not_do"]))
        return 0

    if "process" in flags:
        k = " ".join(positional)
        procs = data.get("processes") or []
        hit = [p for p in procs if (not k) or k in (p.get("cert") or p.get("name") or "") or k in " ".join(p.get("steps", []))]
        if not hit:
            print("未找到匹配流程。全部: " + " / ".join(p.get("cert") or p.get("name") or "?" for p in procs))
            return 1
        for p in hit:
            print("=" * 62)
            print("【流程】%s" % (p.get("cert") or p.get("name") or ""))
            for i, s in enumerate(p.get("steps", []), 1):
                print("  %d. %s" % (i, s))
            if p.get("cautions"):
                print("  ⚠️ 注意:")
                for c in p["cautions"]:
                    print("     - " + c)
        return 0

    if "json" in flags and not positional and not field_filters:
        print(json.dumps(data, ensure_ascii=True, indent=2))
        return 0

    # 过滤：优先级值精确匹配（自动识别数据里出现过的 priority 值）
    prio_values = {str(c.get("priority", "")).upper() for c in items}
    prio_filter = None
    kw_args = []
    for a in positional:
        if a.upper() in prio_values:
            prio_filter = a.upper()
        else:
            kw_args.append(a)
    if prio_filter:
        items = [c for c in items if str(c.get("priority", "")).upper() == prio_filter]
    for k, v in field_filters.items():
        items = [c for c in items if str(c.get(k, "")).lower() == v.lower()
                 or (v == "1" and c.get(k) is True) or (v == "false" and c.get(k) in (False, ""))]
    kw = " ".join(kw_args).lower()
    if kw:
        items = [c for c in items if kw in hay_of(c)]
    if "deadline" in flags:
        items = [c for c in items if c.get("deadline")]

    if "json" in flags:
        print(json.dumps(items, ensure_ascii=True, indent=2))
        return 0

    if not items:
        print("未找到。试试: python query.py --decision / --process / --validate / 换关键词")
        return 1

    items.sort(key=lambda c: (str(c.get("priority") or "~"), str(c.get("name") or "")))
    print("\n\n".join(fmt(c) for c in items))
    print("\n共 %d 条 ｜ 数据更新: %s ｜ 文件: %s" % (
        len(items), (data.get("meta") or {}).get("updated", "?"),
        os.path.relpath(data_path, os.getcwd())))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
