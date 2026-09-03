#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""FactBook · 数据同步（零依赖，仅 Python 标准库）

用法:
  python tools/sync_data.py                       # data/example.json → data/example.js
  python tools/sync_data.py --data data/foo.json  # 指定数据集（输出同名 .js）
  python tools/sync_data.py --inline              # 生成单文件版 factbook_单文件.html（可微信发送，对方双击即用）
  python tools/sync_data.py --inline --out dist/foo.html
"""
import argparse
import json
import os
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)
from query import load, validate  # noqa: E402


def sync(data_path, out_js):
    data = load(data_path)
    issues = validate(data)
    if issues:
        print("❌ 数据校验未通过，拒绝生成（先修数据）:")
        for x in issues:
            print("  - " + x)
        return 1
    js = (
        "// 本文件由 tools/sync_data.py 自动生成，请勿手改。\n"
        "// 改数据请编辑 data/" + os.path.basename(data_path) + "，然后重跑: python tools/sync_data.py\n"
        "window.FACTBOOK_DATA = "
        + json.dumps(data, ensure_ascii=False, indent=1)
        + ";\n"
    )
    with open(out_js, "w", encoding="utf-8") as f:
        f.write(js)
    items = data.get("items") or data.get("certs") or []
    print("OK  %s 已生成（%d 字节，%d 条条目）" % (
        os.path.relpath(out_js, ROOT), os.path.getsize(out_js), len(items)))
    return 0


def inline(data_path, out_html):
    data = load(data_path)
    issues = validate(data)
    if issues:
        print("❌ 数据校验未通过，拒绝生成（先修数据）:")
        for x in issues:
            print("  - " + x)
        return 1
    app = os.path.join(ROOT, "app.html")
    with open(app, encoding="utf-8") as f:
        html = f.read()
    payload = "<script>window.FACTBOOK_DATA = " + json.dumps(data, ensure_ascii=False) + ";</script>"
    replaced = False
    for tag in ('<script src="data/example.js"></script>', '<script src="data/certs.js"></script>'):
        if tag in html:
            html = html.replace(tag, payload)
            replaced = True
            break
    if not replaced:
        html = html.replace("</body>", payload + "\n</body>")
    with open(out_html, "w", encoding="utf-8") as f:
        f.write(html)
    print("OK  单文件版已生成: %s（%d 字节）" % (
        os.path.relpath(out_html, ROOT), os.path.getsize(out_html)))
    print("    发给别人：直接发这一个 .html 文件，对方双击即可查，无需安装、无需联网。")
    return 0


def main():
    p = argparse.ArgumentParser(description="FactBook 数据同步")
    p.add_argument("--data", default=os.path.join("data", "example.json"), help="数据集 JSON 路径")
    p.add_argument("--out", default=None, help="输出路径（.js 或 .html）")
    p.add_argument("--inline", action="store_true", help="生成单文件 HTML（数据内联，可单独发送）")
    args = p.parse_args()

    def abs_path(x):
        return x if os.path.isabs(x) else os.path.join(ROOT, x)

    data_path = abs_path(args.data)
    if not os.path.exists(data_path):
        print("找不到数据文件: %s" % data_path)
        return 1

    if args.inline:
        out_html = args.out or os.path.join(ROOT, "factbook_standalone.html")
        out_html = abs_path(out_html)
        return inline(data_path, out_html)

    out_js = args.out or os.path.splitext(data_path)[0] + ".js"
    out_js = abs_path(out_js)
    return sync(data_path, out_js)


if __name__ == "__main__":
    sys.exit(main())
