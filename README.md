# FactBook · 本地事实查询工具

> **FactBook** — a local-first, zero-dependency lookup tool for "verify once, use forever" reference facts.
> 纯本地 · 零依赖 · 数据不出机器 · MIT

把"查证一次、反复要查、还会过期"的资料（证书政策、供应商报价、客户底细、工作流参数、合规红线……）装进一个 JSON，
变成一个**双击即查**的本地小工具：搜索 / 筛选 / 截止日倒计时 / 验证状态 / 过期自动提醒。

## 3 分钟上手

```bash
# 0. 环境：零依赖。Web 端什么都不用装；CLI 端只需要 Python 3.8+（标准库）

# 1. 看看内置示例数据（AI 认证证书示例）
python tools/sync_data.py          # 生成 data/example.js（首次需要跑一次）
# 然后双击 app.html —— 搜索"软考"，看效果

# 2. 换成你的数据，二选一：
#    方式 A（不动文件）：浏览器里点「📥 导入 JSON」，拖进你的 .json
#    方式 B（建数据集）：复制 data/blank.json 改数据 → python tools/sync_data.py

# 3. 想发给别人？
python tools/sync_data.py --inline
# → 得到一个单文件 .html，微信发过去，对方双击就能查（无需安装、无需联网）
```

## 命令行

```bash
python query.py                      # 列出全部条目
python query.py 软考                  # 关键词搜索（全字段）
python query.py P0                   # 按优先级值过滤（值来自你自己的数据）
python query.py --deadline           # 只看有截止日期的（带剩几天倒计时）
python query.py --field ai_specific=1  # 按任意字段过滤
python query.py --decision           # 看决策卡
python query.py --process 软考        # 查流程
python query.py --validate           # 数据质量校验
python query.py --data 我的.json     # 指定任意数据集
python query.py 华为 --json          # 机器可读输出（管道安全）
```

## 数据模型（FactBook 的核心约定）

```jsonc
{
  "meta": {
    "name": "数据集名字",
    "updated": "YYYY-MM-DD",           // 超 90 天页面自动黄条提醒"重新核实"
    "owner_note": "给谁用、查什么",
    "filters": [ /* 筛选器定义，芯片按钮从这里来 */ ]
  },
  "items": [
    {
      "name": "条目名（必填）",
      "priority": "P0",                 // 任意值，筛选/排序用
      "status": "verified",             // verified / partial / unverified
      "verified_date": "YYYY-MM-DD",    // status 非空时必填
      "source": "来源 URL 或说明",       // status 非空时必填（可追溯）
      "deadline": "YYYY-MM-DD",         // 可选，启用红字倒计时
      "official": [{"label": "…", "url": "https://…"}],  // 可选
      "todo": "用前待核实",              // status=partial 时建议填
      "…任意自定义字段…": "引擎不挑数据，你查什么就装什么"
    }
  ],
  "processes": [ /* 可选：步骤+注意事项 */ ],
  "decision": { /* 可选：一句话结论卡 */ }
}
```

**验证三级制**（防"二手资料当官方"踩雷的关键）：

| status | 含义 | 要求 |
|---|---|---|
| `verified` | 官网/官方文件直抓过 | 必须有核实日期 + 来源 |
| `partial` | 二手来源（自媒体/论坛） | 建议带 `todo`（用前待核实清单） |
| `unverified` | 仅确认存在 | 明说哪些字段没核实 |

## 安全

- **零网络请求**：页面不加载任何外部资源，不发任何请求
- **零三方依赖**：Web 端无 JS 库；Python 端仅标准库（且 CLI 可选，不用也能查）
- **数据完全本地**：你的 JSON 在哪，数据就在哪；单文件模式的数据内联在 HTML 里，不经过任何服务器
- **开源协议**：MIT（可商用）

## 明确不做

在线服务/云同步/账号体系/多语言/数据库——FactBook 的定位就是"一张张查证过的事实卡片"，
长文档语义问答请用 RAG，实时数据请调 API，关系型数据请用数据库。

## 免责声明

内置示例数据为 2026-09 联网核实的**快照**（事实 + 来源链接），政策/价格/窗口会变化，
报名/交易前请以官方最新信息为准。示例数据不构成任何建议。

## License

[MIT](LICENSE) © FactBook contributors
