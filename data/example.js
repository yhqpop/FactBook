// 本文件由 tools/sync_data.py 自动生成，请勿手改。
// 改数据请编辑 data/example.json，然后重跑: python tools/sync_data.py
window.FACTBOOK_DATA = {
 "meta": {
  "name": "示例数据集 · AI 认证证书（中国）",
  "updated": "2026-09-03",
  "owner_note": "这是 FactBook 的示例数据集，展示'查证型资料'怎么组织：每条 = 事实 + 验证状态 + 来源 + 可选截止日。数据为 2026-09-03 联网核实快照，政策/价格会变，报名前以官方为准。",
  "legend": {
   "level": [
    "国家级（人社部）",
    "部委项目（工信部系）",
    "厂商认证",
    "行业/民间"
   ],
   "status": {
    "verified": "已验证（官网/官方文件直抓）",
    "partial": "部分验证（二手来源，用前需再核实）",
    "unverified": "未验证（仅确认存在）"
   }
  },
  "filters": [
   {
    "key": "priority",
    "label": "优先级",
    "values": [
     [
      "P0",
      "现在办"
     ],
     [
      "P1",
      "先验证"
     ],
     [
      "P2",
      "看生态"
     ],
     [
      "AVOID",
      "回避"
     ]
    ]
   },
   {
    "key": "ai_specific",
    "label": "范围",
    "values": [
     [
      "1",
      "仅 AI 专属"
     ]
    ]
   }
  ]
 },
 "items": [
  {
   "name": "软考 · 高级（系统规划与管理师 / 信息系统项目管理师）",
   "issuer": "人力资源和社会保障部 + 工业和信息化部",
   "level": "国家级（职业资格+职称，以考代评）",
   "ai_specific": false,
   "note": "27 个科目中目前无 AI 专属科目（2026-09-03 官网核实）。高级=高级工程师，用人单位可聘任副高。",
   "value": [
    "职称：以考代评，高级≈副高",
    "投标/资质：政企项目人员资质常用",
    "全国有效，无地域限制"
   ],
   "conditions": "报考任何级别无学历、无资历要求",
   "cost": "报名费以各省通知为准（本快照未核实金额）",
   "exam": "每年两次（5 月 / 11 月）；高级科目：信息系统项目管理师、系统分析师、系统架构设计师、网络规划设计师（2026 新增加考）、系统规划与管理师",
   "deadline": "2026-09-17",
   "deadline_note": "2026 下半年报名窗口各省 2026-08-17~09-17 陆续开放（北京 09-11~09-17，天津 08-27~09-16，河北 09-10~09-16，山西 08-17~09-14，内蒙古 08-24~09-08，辽宁 08-19~08-25；其余省以官网分省列表为准）",
   "official": [
    {
     "label": "官网",
     "url": "https://www.ruankao.org.cn"
    },
    {
     "label": "报名平台（分省窗口）",
     "url": "https://bm.ruankao.org.cn/sign/welcome"
    }
   ],
   "priority": "P0",
   "status": "verified",
   "verified_date": "2026-09-03",
   "source": "ruankao.org.cn 考试介绍+科目表（直抓）；bm.ruankao.org.cn 报名平台分省窗口（直抓）"
  },
  {
   "name": "人工智能训练师（国家新职业，编码 4-04-05-05）",
   "issuer": "人力资源和社会保障部发布，评价机构（高校/授权机构）实施认定",
   "level": "国家级（职业技能等级）",
   "ai_specific": true,
   "note": "职业定义=数据采集/标注/算法参数设置/性能测试跟踪——岗位定位偏操作层。5 级：五级/初级工→一级/高级技师。最低学历门槛：初中。",
   "value": [
    "国家职业证书",
    "部分地区有技能补贴（金额因地而异，未核实）"
   ],
   "conditions": "五级：相关职业工作满 1 年或学徒期满；四级：五级+3 年 或 满 4 年 或 中职对口毕业证；三级：四级+3 年 或 大专对口+3 年；二级：三级+4 年；一级：二级+4 年。相关职业含：AI 工程技术人员、呼叫中心服务员、电子商务师等。",
   "cost": "以评价机构公告为准（未核实）",
   "exam": "理论 90min + 技能考核 120min，60 分合格；二/一级加综合评审（审阅材料+答辩）",
   "deadline": null,
   "deadline_note": "按评价机构批次报名。2026 年在办实例：西北工业大学深圳校区（6 月批 3/4/5 级）、上海财经大学浙江学院（2026 中级）、河南科技学院（2026 第 35 批）",
   "official": [
    {
     "label": "国家职业技能标准 2021 版（官方 PDF）",
     "url": "https://www.mohrss.gov.cn/wap/zc/zqyj/202106/W020210617509883457681.pdf"
    },
    {
     "label": "证书全国联网查询",
     "url": "https://zscx.osta.org.cn"
    }
   ],
   "priority": "AVOID",
   "avoid_reason": "岗位内容偏操作层（数据标注/训练操作）；除非为技能补贴，不建议作为主证",
   "status": "verified",
   "verified_date": "2026-09-03",
   "source": "mohrss.gov.cn 官方 PDF 全文直读；2026 年评价机构报名公告（搜索命中）"
  },
  {
   "name": "工信部教考中心 · 人工智能系列职业技术证书（高级）",
   "issuer": "工业和信息化部教育与考试中心（工信部直属事业单位）",
   "level": "部委项目证书（不在人社部国家职业资格目录）",
   "ai_specific": true,
   "note": "类别含：AI 智能体应用工程师、大模型应用/开发工程师、Python 技术应用工程师、计算机视觉工程师、机器学习工程师、提示工程师、AIGC 应用工程师、AI 训练/算法/标注/应用工程师等。⚠️ 本条信息来源为网易号自媒体（2026-03），官方报名入口未核实到。",
   "value": [
    "对位 agent+RAG 类交付物",
    "见客户时'工信部'信任锚",
    "企业招投标辅助材料（实际认不认看招标方）"
   ],
   "conditions": "年满 18 周岁；材料：2 寸白底免冠证件照",
   "cost": "以官方/代理报价为准（未核实；代理渠道普遍捆绑课程）",
   "exam": "线上考试（2026-03-20 批次，自媒体信息）",
   "deadline": null,
   "deadline_note": "按批次滚动报名",
   "official": [],
   "priority": "P1",
   "status": "partial",
   "verified_date": "2026-09-03",
   "todo": "报名前必须核实：① 教考中心官网 URL ② 该项目是否在其官网公示 ③ 证书落款单位 ④ 官方报名入口（别直接走代理）",
   "source": "网易号自媒体两篇（163.com/dy/article/KD97NMNS05567NNH.html、KN1FORUL0556BF68.html），非官方原文"
  },
  {
   "name": "阿里云 · 大模型工程师 ACA / 高级工程师 ACP / ACE",
   "issuer": "阿里云（阿里集团）",
   "level": "厂商认证",
   "ai_specific": true,
   "note": "ACA 面向初学者/非技术背景；ACP 面向复杂业务场景设计实施；ACE 敬请期待。另有：云计算/大数据 ACA 600 / ACP 1200 / 云计算 ACE 9600（线下笔试+实验+线上面试）。",
   "value": [
    "阿里云生态客户/伙伴体系认可"
   ],
   "conditions": "无学历硬性限制（以官网报名页为准）",
   "cost": "大模型 ACA 600 元 / ACP 1200 元 / ACE 待定（2026-09-03 官网实抓）",
   "exam": "大模型 ACA 线上；ACP 线下",
   "deadline": null,
   "deadline_note": null,
   "official": [
    {
     "label": "阿里云认证中心",
     "url": "https://edu.aliyun.com/certification/"
    }
   ],
   "priority": "P2",
   "status": "verified",
   "verified_date": "2026-09-03",
   "source": "edu.aliyun.com/certification 官网直抓"
  },
  {
   "name": "华为 · HCIA-AI / HCIP-AI / HCIE-AI",
   "issuer": "华为",
   "level": "厂商认证",
   "ai_specific": true,
   "note": "HCIA-AI（基础，V2.0 中文版有预发布通知，已搜到）→ HCIP-AI（进阶）→ HCIE-AI（专家）。",
   "value": [
    "华为生态客户/伙伴认可"
   ],
   "conditions": "无硬性学历/资历要求（通行规则，本快照未逐条核实）",
   "cost": "未核实（以 e.huawei.com 官网为准）",
   "exam": "华为授权交付伙伴考点 / 线上监考（通行规则，未核实细节）",
   "deadline": null,
   "deadline_note": null,
   "official": [
    {
     "label": "华为人才认证（JS 单页，需浏览器打开）",
     "url": "https://e.huawei.com/cn/talent/certification"
    }
   ],
   "priority": "P2",
   "status": "partial",
   "verified_date": "2026-09-03",
   "source": "360 搜索命中：HCIA-AI V2.0 预发布通知、华为云微认证页；官网为 JS 单页应用未能直抓正文"
  },
  {
   "name": "百度飞桨 · 深度学习工程师认证（含 工信部×百度 生成式 AI 应用工程师·高级）",
   "issuer": "百度（飞桨）",
   "level": "厂商认证",
   "ai_specific": true,
   "note": "存在初/中/高级认证及与工信部联合的双证项目（搜索确认存在，官网细节未核实）。",
   "value": [
    "百度/文心生态认可"
   ],
   "conditions": "未核实",
   "cost": "未核实",
   "exam": "未核实",
   "deadline": null,
   "deadline_note": null,
   "official": [
    {
     "label": "飞桨官网（认证入口未逐一核实）",
     "url": "https://www.paddlepaddle.org.cn/"
    }
   ],
   "priority": "P2",
   "status": "unverified",
   "verified_date": "2026-09-03",
   "source": "360 搜索命中 CSDN/夸智网等多篇，未直抓官网认证页"
  },
  {
   "name": "腾讯云 · TCA/TCT/TCE + 大模型方向",
   "issuer": "腾讯云",
   "level": "厂商认证",
   "ai_specific": true,
   "note": "2026 大模型方向具体课程/费用未核实。",
   "value": [
    "腾讯云生态认可"
   ],
   "conditions": "未核实",
   "cost": "未核实",
   "exam": "未核实",
   "deadline": null,
   "deadline_note": null,
   "official": [
    {
     "label": "腾讯云（认证入口未逐一核实）",
     "url": "https://cloud.tencent.com/"
    }
   ],
   "priority": "P2",
   "status": "unverified",
   "verified_date": "2026-09-03",
   "source": "360 搜索命中腾讯云认证 FAQ 等，未直抓正文"
  },
  {
   "name": "NCRE 一级 · 人工智能与大模型基础（新科目）",
   "issuer": "教育部教育考试院",
   "level": "国家级（等级考试）",
   "ai_specific": true,
   "note": "2025 年 9 月第 76 次首次开考；样题已上中国教育考试网。入门级，无职业增值。",
   "value": [],
   "conditions": "无学历限制（面向社会，经考点报名）",
   "cost": "以省考试院公告为准（未核实）",
   "exam": "3 月 / 9 月两次（通行安排，未逐条核实）",
   "deadline": null,
   "deadline_note": null,
   "official": [
    {
     "label": "样题页（中国教育考试网）",
     "url": "https://www.neea.edu.cn/xhtml1/report/2506/20-1.htm"
    },
    {
     "label": "NCRE 官网",
     "url": "https://www.ncre.cn/"
    }
   ],
   "priority": "AVOID",
   "avoid_reason": "一级=入门级，对资深从业者无职业价值",
   "status": "verified",
   "verified_date": "2026-09-03",
   "source": "neea.edu.cn 样题页直抓（2025-01-02 发布）；360 搜索'2025 年 9 月首次开考'新闻"
  },
  {
   "name": "CAIE 注册人工智能工程师（'赛一'）",
   "issuer": "CAIE（caieglobal.com，商业机构，主办方资质未核实）",
   "level": "行业/民间（不在国家目录）",
   "ai_specific": true,
   "note": "Level I/II + AI 产品经理（AIPM）/AI 金融分析师（AIFA）细分认证；官网自称'全国统一考试报名官网'（营销话术）。课程+题库+会员销售属性明显。",
   "value": [
    "仅商业圈层认可"
   ],
   "conditions": "以官网为准（未核实）",
   "cost": "未核实（含课程销售）",
   "exam": "线上（未核实细节）",
   "deadline": null,
   "deadline_note": null,
   "official": [
    {
     "label": "CAIE 官网",
     "url": "https://www.caieglobal.com/"
    }
   ],
   "priority": "AVOID",
   "avoid_reason": "非国家目录；商业包装重；'CAAI 认证'名义的报名页多为机构借名——CAAI 官网实查无对外工程师认证业务",
   "status": "verified",
   "verified_date": "2026-09-03",
   "source": "caieglobal.com 官网直抓；caai.cn 官网直抓（无认证业务）"
  }
 ],
 "processes": [
  {
   "cert": "软考高级（示例 P0）",
   "steps": [
    "确认注册省 + 该省报名窗口（bm.ruankao.org.cn 分省列表；窗口普遍只有约 1 周）",
    "选高级科目：系统规划与管理师 或 信息系统项目管理师",
    "报名平台注册账号 → 选科目 → 传证件照 → 缴费",
    "打印准考证 → 11 月考试（高级=综合知识+案例分析+论文）",
    "查分 → 申领电子证书（人社部+工信部用印，全国有效）"
   ],
   "cautions": [
    "报名窗口短，错过等半年",
    "论文科目建议提前准备 2-3 篇模板（用自己的真实项目经验）",
    "各省窗口时间不同，以官网分省列表为准"
   ]
  },
  {
   "cert": "工信部教考 AI 系列（示例 P1）",
   "steps": [
    "⚠️ 先核实官方入口：教考中心官网 → 该项目是否公示 → 证书落款单位（本快照未核实到，别直接走代理）",
    "选类别：AI 智能体应用工程师 / 大模型应用工程师",
    "准备 2 寸白底免冠证件照",
    "按批次报名 → 线上考试",
    "拿证 + 验证证书查询渠道"
   ],
   "cautions": [
    "代理渠道普遍捆绑课程，警惕加价销售",
    "自媒体'国家认证'话术有夸大，实际认不认看招标方"
   ]
  },
  {
   "cert": "厂商认证（阿里云/华为/百度/腾讯云，示例 P2）",
   "steps": [
    "按目标客户/雇主生态选厂商（对方用哪家，就考哪家）",
    "官网注册 → 选等级（入门 ACA/HCIA → 高级 ACP/HCIP → 专家 ACE/HCIE）",
    "购买考试券（可先自学，不强制买课）",
    "约考：线上监考 或 授权考点",
    "拿证（官网可查）"
   ],
   "cautions": [
    "费用差 10~100 倍（阿里云大模型 ACA 600 元 → 云计算 ACE 9600 元），先定等级再花钱",
    "厂商认证只在该生态圈有价值"
   ]
  },
  {
   "cert": "人工智能训练师（示例 AVOID，除非领补贴）",
   "steps": [
    "选评价机构（高校/授权机构，按批次开放）",
    "看机构报名公告，核对申报条件（五级=相关职业满 1 年即可）",
    "提交报名（学历证明 + 工作年限证明）",
    "理论 90min + 技能考核 120min，60 分合格",
    "证书在 zscx.osta.org.cn 联网可查"
   ],
   "cautions": [
    "岗位内容偏操作层",
    "各地补贴金额不同，办前先问当地人社"
   ]
  },
  {
   "cert": "NCRE 一级 AI 与大模型基础（示例 AVOID）",
   "steps": [
    "省教育考试院/考点报名（3 月、9 月两次）",
    "报考一级'人工智能与大模型基础'（2025-09 起开考）"
   ],
   "cautions": [
    "入门级，此流程列出仅为完整"
   ]
  }
 ],
 "decision": {
  "summary": "示例决策卡：把'该做什么'写进数据，查询时一眼看到。以下为面向'想考 AI 证书的人'的通用建议。",
  "p0": "软考高级（系统规划与管理师 / 信息系统项目管理师）——国家级、以考代评、无门槛；注意报名窗口（每年 5/11 月考试，窗口约 1 周）",
  "p1": "工信部教考 AI 智能体/大模型应用工程师——先核实官方入口与证书落款再办",
  "p2": "厂商认证（阿里云/华为/百度/腾讯云）——按目标客户或雇主用的云栈选",
  "not_do": [
   "NCRE 一级 AI（入门级）",
   "无官方背书的商业认证（如 CAIE、借 CAAI 名义的机构）"
  ]
 }
};
