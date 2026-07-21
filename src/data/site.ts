import { imagesConfig } from "./images_config";

export type Locale = "ja" | "zh" | "en";

/** Fictional company for portfolio demo — not a real client. */
export const company = {
  jaName: "領港工業グループ",
  zhName: "领港工业集团有限公司",
  enName: "Harborlink Industrial Group Co., Ltd.",
  brand: {
    ja: "領港",
    zh: "领港",
    en: "Harborlink"
  },
  established: {
    ja: "2015年",
    zh: "2015年",
    en: "Founded in 2015"
  },
  location: {
    ja: "東アジア・港湾都市（架空）",
    zh: "东亚港城（虚构）",
    en: "East Asia Port City (fictional)"
  },
  mainMarket: {
    ja: "日本・欧米・東南アジア",
    zh: "日本、欧美及东南亚",
    en: "Japan, Europe/US & Southeast Asia"
  },
  email: "contact@example.com",
  copyright: "© 2015-2026 Harborlink Industrial Group (Demo). All Rights Reserved."
};

const catalogAssetBase = "/api/catalog?file=";
const catalogDownloadBase = "/api/catalog?file=";
const catalogAssetPreviewBase = "/api/catalog?file=";

const productBase = [
  {
    key: "largeTile",
    image: imagesConfig.products.largeTile,
    code: "HL-A01",
    catalogVolume: { ja: "2026年カタログ", zh: "2026年图册", en: "2026 Catalog" },
    catalogPage: "P.12"
  },
  {
    key: "antiqueTile",
    image: imagesConfig.products.antiqueTile,
    code: "HL-B07",
    catalogVolume: { ja: "2026年カタログ", zh: "2026年图册", en: "2026 Catalog" },
    catalogPage: "P.48"
  },
  {
    key: "polishedTile",
    image: imagesConfig.products.polishedTile,
    code: "HL-C22",
    catalogVolume: { ja: "2026年カタログ", zh: "2026年图册", en: "2026 Catalog" },
    catalogPage: "P.96"
  },
  {
    key: "stone",
    image: imagesConfig.products.stone,
    code: "HL-D15",
    catalogVolume: { ja: "2026年カタログ", zh: "2026年图册", en: "2026 Catalog" },
    catalogPage: "P.140"
  },
  {
    key: "woodTile",
    image: imagesConfig.products.woodTile,
    code: "HL-E03",
    catalogVolume: { ja: "2026年カタログ", zh: "2026年图册", en: "2026 Catalog" },
    catalogPage: "P.168"
  }
] as const;

const catalogsBase = [
  {
    key: "upper",
    image: imagesConfig.catalogs.upper,
    href: `${catalogAssetPreviewBase}catalog-2026-vol1.pdf`,
    downloadHref: `${catalogDownloadBase}catalog-2026-vol1.pdf&download=1`,
    volume: { ja: "第1巻", zh: "上册", en: "Vol. 1" }
  },
  {
    key: "middle",
    image: imagesConfig.catalogs.middle,
    href: `${catalogAssetPreviewBase}catalog-2026-vol2.pdf`,
    downloadHref: `${catalogDownloadBase}catalog-2026-vol2.pdf&download=1`,
    volume: { ja: "第2巻", zh: "中册", en: "Vol. 2" }
  },
  {
    key: "lower",
    image: imagesConfig.catalogs.lower,
    href: `${catalogAssetPreviewBase}catalog-2026-vol3.pdf`,
    downloadHref: `${catalogDownloadBase}catalog-2026-vol3.pdf&download=1`,
    volume: { ja: "第3巻", zh: "下册", en: "Vol. 3" }
  }
] as const;

const totalCatalogHref = `${catalogAssetPreviewBase}catalog-2026-complete.pdf`;
const totalCatalogDownloadHref = `${catalogDownloadBase}catalog-2026-complete-download.pdf&download=1`;

const demoLocations = {
  ja: [
    {
      key: "head-office",
      label: "本社（デモ）",
      name: company.jaName,
      postal: "〒000-0000",
      address: "架空市 港区 デモ通り 1-1",
      tel: "TEL: +00 000-000-0000",
      fax: "",
      image: imagesConfig.maps.headOffice,
      mapUrl: "https://example.com/maps/hq",
      mapAlt: "本社周辺地図（プレースホルダ）"
    },
    {
      key: "japan-branch",
      label: "日本窓口（デモ）",
      name: `${company.jaName} 日本窓口`,
      postal: "〒000-0000",
      address: "架空県 架空市 デモ町 2-2",
      tel: "TEL: +00 00-0000-0000",
      fax: "",
      image: imagesConfig.maps.japanBranch,
      mapUrl: "https://example.com/maps/branch",
      mapAlt: "日本窓口周辺地図（プレースホルダ）"
    },
    {
      key: "factory",
      label: "工場（デモ）",
      name: "Harborlink Demo Plant",
      postal: "〒000-0000",
      address: "架空工業区 第3区画",
      tel: "",
      fax: "",
      image: imagesConfig.maps.factory,
      mapUrl: "https://example.com/maps/plant",
      mapAlt: "工場周辺地図（プレースホルダ）"
    }
  ],
  zh: [
    {
      key: "head-office",
      label: "总部（演示）",
      name: company.zhName,
      postal: "邮编 000000",
      address: "虚构港城 示例路 1 号",
      tel: "TEL: +00 000-000-0000",
      fax: "",
      image: imagesConfig.maps.headOffice,
      mapUrl: "https://example.com/maps/hq",
      mapAlt: "总部地图占位"
    },
    {
      key: "japan-branch",
      label: "日本窗口（演示）",
      name: `${company.zhName} 日本窗口`,
      postal: "邮编 000-0000",
      address: "虚构城市 示例町 2-2",
      tel: "TEL: +00 00-0000-0000",
      fax: "",
      image: imagesConfig.maps.japanBranch,
      mapUrl: "https://example.com/maps/branch",
      mapAlt: "日本窗口地图占位"
    },
    {
      key: "factory",
      label: "工厂（演示）",
      name: "Harborlink 演示工厂",
      postal: "邮编 000000",
      address: "虚构工业区 第三区块",
      tel: "",
      fax: "",
      image: imagesConfig.maps.factory,
      mapUrl: "https://example.com/maps/plant",
      mapAlt: "工厂地图占位"
    }
  ],
  en: [
    {
      key: "head-office",
      label: "HQ (Demo)",
      name: company.enName,
      postal: "ZIP 00000",
      address: "1 Demo Street, Fictional Port City",
      tel: "TEL: +00 000-000-0000",
      fax: "",
      image: imagesConfig.maps.headOffice,
      mapUrl: "https://example.com/maps/hq",
      mapAlt: "HQ map placeholder"
    },
    {
      key: "japan-branch",
      label: "Japan Desk (Demo)",
      name: `${company.enName} — Japan Desk`,
      postal: "ZIP 000-0000",
      address: "2 Demo-cho, Fictional City",
      tel: "TEL: +00 00-0000-0000",
      fax: "",
      image: imagesConfig.maps.japanBranch,
      mapUrl: "https://example.com/maps/branch",
      mapAlt: "Japan desk map placeholder"
    },
    {
      key: "factory",
      label: "Plant (Demo)",
      name: "Harborlink Demo Plant",
      postal: "ZIP 00000",
      address: "Industrial Zone Block 3 (Fictional)",
      tel: "",
      fax: "",
      image: imagesConfig.maps.factory,
      mapUrl: "https://example.com/maps/plant",
      mapAlt: "Plant map placeholder"
    }
  ]
} as const;

const content = {
  ja: {
    langLabel: "日本語",
    route: "/ja/",
    title: `${company.brand.ja} | B2B 企業サイト デモ`,
    description: "ポートフォリオ用の架空 B2B 企業サイト。実在の取引先・製品ではありません。",
    navHome: "ホーム",
    navItems: [
      { href: "#catalog", label: "カタログ" },
      { href: "#products", label: "製品" },
      { href: "#cases", label: "事例" },
      { href: "#processing", label: "加工・工程" },
      { href: "#quality", label: "品質・出荷" },
      { href: "#contact-form", label: "お問い合わせ" }
    ],
    heroTitle: ["産業パートナーの", "信頼できる窓口"],
    heroCopy: ["2015年設立の架空企業デモ。", "三言語・テーマ切替・図録・問い合わせUIを展示"],
    heroPrimary: "製品を見る",
    heroSecondary: "カタログを見る",
    heroContact: "お問い合わせ",
    trustFacts: [
      { label: "2015年設立", icon: "calendar" },
      { label: "港湾都市（架空）", icon: "mapPin" },
      { label: "B2B デモ", icon: "layers" }
    ],
    taskEntries: [
      ["仕様確認", "要件と仕様を整理し、案件単位で確認します", "#quality"],
      ["加工カスタム", "切断・仕上げなど工程デモを掲載", "#processing"],
      ["安定供給の説明", "架空の供給フローをカードで可視化", "#company"],
      ["出荷サポート", "梱包と納期管理のUIパターンを展示", "#quality"]
    ],
    productsTitle: "製品ラインナップ",
    productsLead: "デモ用のシリーズ A–E。<br />実在の品番ではありません",
    catalogTitle: "2026 製品カタログ",
    catalogActionAria: "カタログ操作",
    catalogActions: [
      ["preview", "全冊プレビュー", "", "全冊プレビュー"],
      ["download", "全冊ダウンロード", "", "全冊ダウンロード"],
      ["request", "紙カタログ請求", "", "紙カタログ請求"]
    ],
    catalogSearchGuide: "製品名・型番・ページ番号で検索できます（デモ）",
    catalogRequestSubject: "紙カタログ請求の相談（デモ）",
    catalogTitleName: "2026 製品カタログ",
    catalogPreviewButton: "オンラインで見る",
    catalogRequestButton: "紙カタログ請求",
    catalogAria: "PDF catalog",
    catalogSearchPlaceholder: "型番を入力（例: HL-A01）またはページ番号...",
    catalogSearchButton: "検索",
    catalogFeaturedLabel: "おすすめ:",
    catalogRecentLabel: "最近の検索:",
    catalogCloseText: "閉じる",
    catalogDirectLabel: "ページ (直達)",
    catalogHeaderSearchPlaceholder: "型番/ページ...",
    productNames: {
      largeTile: ["シリーズ A 大判", "商業空間向けのデモ大判シリーズ。HL-A01。"],
      antiqueTile: ["シリーズ B テクスチャ", "柔らかな表面テクスチャのデモ品。"],
      polishedTile: ["シリーズ C ポリッシュ", "高光沢仕上げのデモ品。"],
      stone: ["シリーズ D マテリアル", "天然石風のデモシリーズ。"],
      woodTile: ["シリーズ E ウッド調", "木目調のデモシリーズ。"]
    },
    productSpecs: {
      largeTile: [["サイズ", "1600×3200mm"], ["厚み", "6mm"], ["仕上げ", "マット"], ["用途", "壁"]],
      antiqueTile: [["サイズ", "各種"], ["厚み", "8-10mm"], ["仕上げ", "テクスチャ"], ["用途", "壁・床"]],
      polishedTile: [["サイズ", "各種"], ["厚み", "9-10mm"], ["仕上げ", "ポリッシュ"], ["用途", "内装"]],
      stone: [["サイズ", "各種"], ["加工", "切断・研磨"], ["種類", "デモ石材"], ["用途", "壁面・床面"]],
      woodTile: [["サイズ", "長尺"], ["厚み", "8-10mm"], ["仕上げ", "ウッド調"], ["用途", "住宅・店舗"]]
    },
    processingTitle: "精密加工 · 工程一覧",
    processingLead: "デモ用の工程カード。<br />実工程の証拠写真ではありません",
    processingCards: [
      { title: "パターン敷設", desc: "複数の敷設パターンを説明するデモカード" },
      { title: "加工概要", desc: "主要工程の概要を並べたデモ" },
      { title: "精密カット", desc: "寸法精度を強調するデモ説明" },
      { title: "特殊切欠", desc: "L字など特殊形状のデモ" },
      { title: "接合仕上げ", desc: "接合・面取りのデモ" },
      { title: "定厚・斜め加工", desc: "厚み調整と斜めカットのデモ" },
      { title: "表面仕上げ", desc: "最終表面処理のデモ" }
    ],
    casesTitle: "事例 · デモ概覧",
    casesLead: "架空のプロジェクト名のみ。<br />実在物件・取引先ではありません",
    cases: [
      {
        title: "デモ商業施設フロア",
        location: "架空都市A",
        product: "HL-C22",
        year: "2025年",
        image: imagesConfig.cases.hotel,
        page: 40
      },
      {
        title: "デモオフィス外構",
        location: "架空都市B",
        product: "HL-B07",
        year: "2024年",
        image: imagesConfig.cases.office,
        page: 54
      },
      {
        title: "デモホテル客室",
        location: "架空都市C",
        product: "HL-A01",
        year: "2025年",
        image: imagesConfig.cases.villa,
        page: 80
      },
      {
        title: "デモ集合住宅",
        location: "架空都市D",
        product: "HL-E03",
        year: "2025年",
        image: imagesConfig.cases.sagamiono,
        page: 100
      }
    ],
    casesArchiveBtnExpand: "履歴一覧（デモ）",
    casesArchiveBtnCollapse: "一覧を閉じる",
    casesArchiveHeaders: ["完工年", "プロジェクト名", "所在地"],
    casesArchiveList: [
      { year: "2026年", title: "デモ再開発ブロック1", location: "架空県" },
      { year: "2025年", title: "デモ複合施設", location: "架空市" },
      { year: "2025年", title: "デモ駅前計画", location: "架空市" },
      { year: "2024年", title: "デモ物流ハブ", location: "架空市" },
      { year: "2023年", title: "デモ研究棟", location: "架空市" }
    ],
    qualityTitle: "品質・出荷サポート",
    qualityLead: "仕様確認から検品、梱包、納期管理まで、<br />B2B UI パターンとして整理したデモ",
    qualitySteps: [
      ["仕様確認", "図面・仕様を確認し、加工内容を整理します。"],
      ["出荷前検品", "寸法・外観・数量を確認してから出荷します。"],
      ["梱包対応", "製品に合わせた梱包で破損リスクを抑えます。"],
      ["納期管理", "出荷の流れに沿って進行を確認します。"]
    ],
    japanSupportTitle: "海外向け対応",
    japanSupportLead: "多言語コミュニケーションと<br />案件単位の確認フローをデモ",
    japanSupportItems: [
      ["多言語対応", "日本語・中国語・英語で仕様を確認。"],
      ["サンプル発送", "サンプル手配フローの説明（デモ）。"],
      ["検品写真共有", "出荷前確認の共有UI。"],
      ["梱包仕様確認", "輸送条件に合わせた確認項目。"],
      ["納期確認", "生産・加工・出荷予定の整理。"],
      ["貿易条件相談", "FOB / CIF などの条件確認（デモ）。"]
    ],
    companyTitle: "会社概要",
    companyLead: "架空の港湾都市を拠点にした B2B デモ企業です。",
    companyProfileSubtitle: "会社概要 / COMPANY PROFILE",
    companyProfileTitle: "信頼を築き<br />価値を届ける",
    companyProfileLead: "ポートフォリオ用の架空企業ストーリー",
    companyHistoryTitle: "沿革 HISTORY",
    companyImageAlt: "港湾をイメージしたプレースホルダ",
    companyFacts: [
      ["会社名", company.jaName],
      ["代表（デモ）", "Demo Person"],
      ["設立", "2015年"],
      ["資本金（デモ）", "—"],
      ["従業員数（デモ）", "—"],
      ["業務内容", "産業製品の輸出入（デモ）"],
      ["主要市場", "日本・欧米・東南アジア"]
    ],
    companyHistory: [
      { year: "2015", text: "架空企業として設立。B2B デモストーリー開始。" },
      { year: "2018", text: "海外窓口の説明セクションを拡充（デモ）。" },
      { year: "2022", text: "多言語サイトと図録体験を整備（デモ）。" },
      { year: "2026", text: "本ポートフォリオ用に完全架空データで再構成。" }
    ],
    contactTitle: "お問い合わせ",
    contactLead: "デモ用フォームです。実送信は行いません。",
    contactButton: "お問い合わせ",
    contactFacts: [
      ["メール", company.email],
      ["対応内容", "品番確認・カタログ請求・加工相談（デモ）"],
      ["対応言語", "日本語・中国語・英語"]
    ],
    footerCopyright: company.copyright,
    footerMapButton: "地図を見る",
    footerLocations: demoLocations.ja,
    footerSubtitle: "B2B 企業サイト デモ",
    footerMessage: [
      "これはポートフォリオ用の架空サイトです。",
      "実在の会社・住所・取引先・製品番号ではありません。",
      "三言語、テーマ切替、図録、問い合わせUIの実装展示です。",
      "本番顧客案件のコードと資産は含みません。"
    ],
    chinaAddress: "架空港城 デモ通り 1-1",
    chinaPhoneLabel: "電話",
    chinaPhone: "+00 000-000-0000",
    japanAddress: "架空市 デモ町 2-2",
    japanPhoneLabel: "電話",
    japanPhone: "+00 00-0000-0000",
    footerNavTitle: "ナビゲーション",
    footerCtaTitle: "カタログ / お問い合わせ",
    footerCtaText: "製品カタログのダウンロードや各種お問い合わせはこちらから。",
    footerCatalogButton: "カタログダウンロード",
    footerFactsTitle: "基本情報",
    footerFacts: [
      ["所在地", company.location.ja],
      ["メール", company.email],
      ["主な製品", "デモシリーズ A–E"],
      ["対応市場", company.mainMarket.ja]
    ]
  },
  zh: {
    langLabel: "中文",
    route: "/zh/",
    title: `${company.brand.zh} | B2B 企业站演示`,
    description: "作品集用的虚构 B2B 企业官网，不含真实客户与产品信息。",
    navHome: "首页",
    navItems: [
      { href: "#catalog", label: "图册" },
      { href: "#products", label: "产品" },
      { href: "#cases", label: "案例" },
      { href: "#processing", label: "加工服务" },
      { href: "#quality", label: "品质与出货" },
      { href: "#contact-form", label: "联系我们" }
    ],
    heroTitle: ["产业伙伴的", "可信赖窗口"],
    heroCopy: ["2015 年成立的虚构企业演示。", "展示三语、主题切换、图册与询盘 UI"],
    heroPrimary: "查看产品",
    heroSecondary: "查看图册",
    heroContact: "联系我们",
    trustFacts: [
      { label: "2015年成立", icon: "calendar" },
      { label: "港城（虚构）", icon: "mapPin" },
      { label: "B2B 演示", icon: "layers" }
    ],
    taskEntries: [
      ["规格确认", "按项目整理规格与要求", "#quality"],
      ["加工定制", "展示切割与精加工流程卡", "#processing"],
      ["稳定供应说明", "用卡片表达供应流程", "#company"],
      ["出货支持", "包装与交期管理的 UI 模式", "#quality"]
    ],
    productsTitle: "产品展示",
    productsLead: "演示系列 A–E，<br />并非真实货号",
    productNames: {
      largeTile: ["系列 A 大规格", "商业空间用演示大规格。HL-A01。"],
      antiqueTile: ["系列 B 纹理", "柔和表面纹理的演示品。"],
      polishedTile: ["系列 C 抛光", "高光泽演示品。"],
      stone: ["系列 D 材质", "石材质感演示系列。"],
      woodTile: ["系列 E 木纹", "木纹质感演示系列。"]
    },
    productSpecs: {
      largeTile: [["尺寸", "1600×3200mm"], ["厚度", "6mm"], ["表面", "哑光"], ["用途", "墙面"]],
      antiqueTile: [["尺寸", "多规格"], ["厚度", "8-10mm"], ["表面", "纹理"], ["用途", "墙地面"]],
      polishedTile: [["尺寸", "多规格"], ["厚度", "9-10mm"], ["表面", "抛光"], ["用途", "内装"]],
      stone: [["尺寸", "多种"], ["加工", "切割・磨边"], ["品种", "演示材质"], ["用途", "墙面・地面"]],
      woodTile: [["尺寸", "长条"], ["厚度", "8-10mm"], ["表面", "木纹"], ["用途", "住宅・商业"]]
    },
    catalogTitle: "2026 产品图册",
    catalogActionAria: "图册操作",
    catalogActions: [
      ["preview", "预览全部", "", "预览全部"],
      ["download", "下载全部", "", "下载全部"],
      ["request", "索取纸质", "", "索取纸质"]
    ],
    catalogSearchGuide: "可搜索产品名称、编号、页码（演示）",
    catalogRequestSubject: "请求纸质产品图册（演示）",
    catalogTitleName: "2026 产品图册",
    catalogPreviewButton: "在线观看",
    catalogRequestButton: "请求实体图册",
    catalogAria: "PDF 图册",
    catalogSearchPlaceholder: "输入型号（例: HL-A01）或页码...",
    catalogSearchButton: "搜索",
    catalogFeaturedLabel: "推荐:",
    catalogRecentLabel: "最近搜索:",
    catalogCloseText: "关闭",
    catalogDirectLabel: "页 (直达)",
    catalogHeaderSearchPlaceholder: "型号/页码...",
    processingTitle: "精密加工 · 工艺一览",
    processingLead: "演示用工艺卡，<br />不是真实工序实拍",
    processingCards: [
      { title: "图案铺装", desc: "多种铺装模式说明（演示）" },
      { title: "加工概览", desc: "主要工序概览（演示）" },
      { title: "精密切割", desc: "尺寸精度说明（演示）" },
      { title: "特殊切缺", desc: "异形加工说明（演示）" },
      { title: "接合收边", desc: "接合与倒角（演示）" },
      { title: "定厚与切斜", desc: "厚度与斜切（演示）" },
      { title: "表面处理", desc: "最终表面处理（演示）" }
    ],
    casesTitle: "工程案例 · 演示概览",
    casesLead: "仅使用虚构项目名，<br />不含真实项目与客户",
    cases: [
      {
        title: "演示商业综合体",
        location: "虚构城市 A",
        product: "HL-C22",
        year: "2025年",
        image: imagesConfig.cases.hotel,
        page: 40
      },
      {
        title: "演示办公外立面",
        location: "虚构城市 B",
        product: "HL-B07",
        year: "2024年",
        image: imagesConfig.cases.office,
        page: 54
      },
      {
        title: "演示酒店客房",
        location: "虚构城市 C",
        product: "HL-A01",
        year: "2025年",
        image: imagesConfig.cases.villa,
        page: 80
      },
      {
        title: "演示集合住宅",
        location: "虚构城市 D",
        product: "HL-E03",
        year: "2025年",
        image: imagesConfig.cases.sagamiono,
        page: 100
      }
    ],
    casesArchiveBtnExpand: "查看历史业绩（演示）",
    casesArchiveBtnCollapse: "收起业绩列表",
    casesArchiveHeaders: ["年份", "项目名称", "所在地"],
    casesArchiveList: [
      { year: "2026年", title: "演示再开发地块 1", location: "虚构省" },
      { year: "2025年", title: "演示综合体", location: "虚构市" },
      { year: "2025年", title: "演示站前计划", location: "虚构市" },
      { year: "2024年", title: "演示物流枢纽", location: "虚构市" },
      { year: "2023年", title: "演示研发楼", location: "虚构市" }
    ],
    qualityTitle: "品质与出货支持",
    qualityLead: "从规格确认、出货前检查、包装到交期管理，<br />作为 B2B UI 模式展示",
    qualitySteps: [
      ["规格确认", "确认图纸、规格和加工要求。"],
      ["出货前检查", "确认尺寸、外观与数量后再出货。"],
      ["包装方案", "按产品形态设计包装。"],
      ["交期管理", "按出货节奏跟踪进度。"]
    ],
    japanSupportTitle: "海外市场支持",
    japanSupportLead: "多语言沟通与<br />按项目确认的流程演示",
    japanSupportItems: [
      ["多语言支持", "中日英规格确认。"],
      ["样品寄送", "样品流程说明（演示）。"],
      ["验货照片共享", "出货前确认共享 UI。"],
      ["包装规格确认", "结合运输条件的检查项。"],
      ["交期确认", "生产、加工、出货计划整理。"],
      ["贸易条件沟通", "FOB / CIF 等条件（演示）。"]
    ],
    companyTitle: "公司概况",
    companyLead: "以虚构港城为基地的 B2B 演示企业。",
    companyProfileSubtitle: "公司概况 / COMPANY PROFILE",
    companyProfileTitle: "建立信任<br />交付价值",
    companyProfileLead: "作品集用的虚构企业叙事",
    companyHistoryTitle: "沿革 HISTORY",
    companyImageAlt: "港口意象占位图",
    companyFacts: [
      ["公司名", company.zhName],
      ["代表（演示）", "Demo Person"],
      ["成立", "2015年"],
      ["注册资本（演示）", "—"],
      ["员工数（演示）", "—"],
      ["业务", "产业产品进出口（演示）"],
      ["主要市场", "日本、欧美及东南亚"]
    ],
    companyHistory: [
      { year: "2015", text: "虚构企业成立，开始 B2B 演示叙事。" },
      { year: "2018", text: "扩展海外窗口说明（演示）。" },
      { year: "2022", text: "完善多语言站点与图册体验（演示）。" },
      { year: "2026", text: "为作品集完全替换为虚构数据。" }
    ],
    contactTitle: "联系我们",
    contactLead: "演示表单，不会真实发送。",
    contactButton: "联系我们",
    contactFacts: [
      ["邮箱", company.email],
      ["服务内容", "货号确认、图册索取、加工咨询（演示）"],
      ["语言", "中文・日文・英文"]
    ],
    footerCopyright: company.copyright,
    footerMapButton: "查看地图",
    footerLocations: demoLocations.zh,
    footerSubtitle: "B2B 企业站演示",
    footerMessage: [
      "这是作品集用的虚构站点。",
      "不含真实公司、地址、客户或产品编号。",
      "展示三语、主题切换、图册与询盘 UI 实现。",
      "不包含正式客户项目代码与资产。"
    ],
    chinaAddress: "虚构港城 示例路 1 号",
    chinaPhoneLabel: "电话",
    chinaPhone: "+00 000-000-0000",
    japanAddress: "虚构城市 示例町 2-2",
    japanPhoneLabel: "电话",
    japanPhone: "+00 00-0000-0000",
    footerNavTitle: "导航",
    footerCtaTitle: "图册 / 联系",
    footerCtaText: "下载图册或发起演示询盘。",
    footerCatalogButton: "下载图册",
    footerFactsTitle: "基本信息",
    footerFacts: [
      ["所在地", company.location.zh],
      ["邮箱", company.email],
      ["主要产品", "演示系列 A–E"],
      ["市场", company.mainMarket.zh]
    ]
  },
  en: {
    langLabel: "English",
    route: "/en/",
    title: `${company.brand.en} | B2B corporate demo`,
    description: "Fictional B2B corporate site for portfolio use. Not a real client or product line.",
    navHome: "Home",
    navItems: [
      { href: "#catalog", label: "Catalogs" },
      { href: "#products", label: "Products" },
      { href: "#cases", label: "Projects" },
      { href: "#processing", label: "Processing" },
      { href: "#quality", label: "Quality" },
      { href: "#contact-form", label: "Contact" }
    ],
    heroTitle: ["A reliable desk", "for industrial partners"],
    heroCopy: ["Fictional company founded in 2015.", "Showcases i18n, themes, catalogs, and contact UI"],
    heroPrimary: "View products",
    heroSecondary: "View catalogs",
    heroContact: "Contact",
    trustFacts: [
      { label: "Est. 2015", icon: "calendar" },
      { label: "Port city (fictional)", icon: "mapPin" },
      { label: "B2B demo", icon: "layers" }
    ],
    taskEntries: [
      ["Spec review", "Organize requirements per project", "#quality"],
      ["Custom processing", "Demo process cards for finishing", "#processing"],
      ["Supply narrative", "Visualize a fictional supply flow", "#company"],
      ["Shipment support", "Packaging and schedule UI patterns", "#quality"]
    ],
    productsTitle: "Product lineup",
    productsLead: "Demo series A–E.<br />Not real SKUs",
    productNames: {
      largeTile: ["Series A large format", "Commercial-scale demo series. HL-A01."],
      antiqueTile: ["Series B texture", "Soft-texture demo surface."],
      polishedTile: ["Series C polish", "High-gloss demo finish."],
      stone: ["Series D material", "Stone-look demo series."],
      woodTile: ["Series E wood look", "Wood-grain demo series."]
    },
    productSpecs: {
      largeTile: [["Size", "1600×3200mm"], ["Thickness", "6mm"], ["Finish", "Matte"], ["Use", "Wall"]],
      antiqueTile: [["Size", "Various"], ["Thickness", "8-10mm"], ["Finish", "Texture"], ["Use", "Wall/Floor"]],
      polishedTile: [["Size", "Various"], ["Thickness", "9-10mm"], ["Finish", "Polish"], ["Use", "Interior"]],
      stone: [["Size", "Various"], ["Process", "Cut / edge"], ["Type", "Demo material"], ["Use", "Wall/Floor"]],
      woodTile: [["Size", "Long plank"], ["Thickness", "8-10mm"], ["Finish", "Wood look"], ["Use", "Residential/Retail"]]
    },
    catalogTitle: "2026 Product catalogs",
    catalogActionAria: "Catalog actions",
    catalogActions: [
      ["preview", "Preview all", "", "Preview all"],
      ["download", "Download all", "", "Download all"],
      ["request", "Request print", "", "Request print"]
    ],
    catalogSearchGuide: "Search by name, code, or page (demo)",
    catalogRequestSubject: "Print catalog request (demo)",
    catalogTitleName: "2026 Product catalog",
    catalogPreviewButton: "View online",
    catalogRequestButton: "Request print copy",
    catalogAria: "PDF catalog",
    catalogSearchPlaceholder: "Code (e.g. HL-A01) or page...",
    catalogSearchButton: "Search",
    catalogFeaturedLabel: "Featured:",
    catalogRecentLabel: "Recent:",
    catalogCloseText: "Close",
    catalogDirectLabel: "Page (direct)",
    catalogHeaderSearchPlaceholder: "Code/page...",
    processingTitle: "Processing · overview",
    processingLead: "Demo process cards.<br />Not real production photos",
    processingCards: [
      { title: "Pattern laying", desc: "Layout pattern explanation (demo)" },
      { title: "Process overview", desc: "Core steps at a glance (demo)" },
      { title: "Precision cut", desc: "Dimensional accuracy narrative (demo)" },
      { title: "Special notch", desc: "Custom shapes (demo)" },
      { title: "Join finishing", desc: "Join and edge work (demo)" },
      { title: "Thickness / miter", desc: "Thickness control and miter (demo)" },
      { title: "Surface finish", desc: "Final surface treatment (demo)" }
    ],
    casesTitle: "Projects · demo set",
    casesLead: "Fictional project names only.<br />No real sites or clients",
    cases: [
      {
        title: "Demo commercial floor",
        location: "City A (fictional)",
        product: "HL-C22",
        year: "2025",
        image: imagesConfig.cases.hotel,
        page: 40
      },
      {
        title: "Demo office facade",
        location: "City B (fictional)",
        product: "HL-B07",
        year: "2024",
        image: imagesConfig.cases.office,
        page: 54
      },
      {
        title: "Demo hotel rooms",
        location: "City C (fictional)",
        product: "HL-A01",
        year: "2025",
        image: imagesConfig.cases.villa,
        page: 80
      },
      {
        title: "Demo residential block",
        location: "City D (fictional)",
        product: "HL-E03",
        year: "2025",
        image: imagesConfig.cases.sagamiono,
        page: 100
      }
    ],
    casesArchiveBtnExpand: "Historical list (demo)",
    casesArchiveBtnCollapse: "Collapse list",
    casesArchiveHeaders: ["Year", "Project", "Location"],
    casesArchiveList: [
      { year: "2026", title: "Demo redevelopment block 1", location: "Fictional region" },
      { year: "2025", title: "Demo mixed-use", location: "Fictional city" },
      { year: "2025", title: "Demo station-front plan", location: "Fictional city" },
      { year: "2024", title: "Demo logistics hub", location: "Fictional city" },
      { year: "2023", title: "Demo R&D wing", location: "Fictional city" }
    ],
    qualityTitle: "Quality & shipping",
    qualityLead: "From spec checks to packing and schedules —<br />shown as B2B UI patterns",
    qualitySteps: [
      ["Spec review", "Confirm drawings, specs, and processing."],
      ["Pre-ship inspection", "Check size, finish, and quantity."],
      ["Packaging", "Match packing to product form."],
      ["Schedule control", "Track production-to-ship flow."]
    ],
    japanSupportTitle: "Export market support",
    japanSupportLead: "Multilingual coordination and<br />per-project confirmation flow",
    japanSupportItems: [
      ["Multilingual desk", "JA / ZH / EN spec alignment."],
      ["Sample shipping", "Sample workflow (demo)."],
      ["Inspection photos", "Pre-ship sharing UI."],
      ["Packing review", "Checks tied to transport conditions."],
      ["Schedule review", "Production, process, ship plan."],
      ["Trade terms", "FOB / CIF style discussion (demo)."]
    ],
    companyTitle: "Company",
    companyLead: "A fictional B2B firm based in a port city.",
    companyProfileSubtitle: "Company profile",
    companyProfileTitle: "Build trust<br />Deliver value",
    companyProfileLead: "A fictional narrative for portfolio demos",
    companyHistoryTitle: "History",
    companyImageAlt: "Port-inspired placeholder",
    companyFacts: [
      ["Name", company.enName],
      ["Representative (demo)", "Demo Person"],
      ["Founded", "2015"],
      ["Capital (demo)", "—"],
      ["Headcount (demo)", "—"],
      ["Business", "Industrial import/export (demo)"],
      ["Markets", "Japan, Europe/US, Southeast Asia"]
    ],
    companyHistory: [
      { year: "2015", text: "Fictional company founded for B2B storytelling." },
      { year: "2018", text: "Expanded overseas desk narrative (demo)." },
      { year: "2022", text: "Multilingual site and catalog UX (demo)." },
      { year: "2026", text: "Fully rebuilt with fictional data for this portfolio." }
    ],
    contactTitle: "Contact",
    contactLead: "Demo form only — messages are not delivered.",
    contactButton: "Contact",
    contactFacts: [
      ["Email", company.email],
      ["Topics", "SKU, catalogs, processing (demo)"],
      ["Languages", "Japanese / Chinese / English"]
    ],
    footerCopyright: company.copyright,
    footerMapButton: "Open map",
    footerLocations: demoLocations.en,
    footerSubtitle: "B2B corporate demo",
    footerMessage: [
      "This is a fictional portfolio website.",
      "It does not represent a real company, address, client, or SKU.",
      "It demonstrates i18n, theming, catalogs, and contact UI.",
      "No production client code or assets are included."
    ],
    chinaAddress: "1 Demo Street, Fictional Port City",
    chinaPhoneLabel: "Phone",
    chinaPhone: "+00 000-000-0000",
    japanAddress: "2 Demo-cho, Fictional City",
    japanPhoneLabel: "Phone",
    japanPhone: "+00 00-0000-0000",
    footerNavTitle: "Navigation",
    footerCtaTitle: "Catalogs / Contact",
    footerCtaText: "Download demo catalogs or open the contact form.",
    footerCatalogButton: "Download catalog",
    footerFactsTitle: "Basics",
    footerFacts: [
      ["Location", company.location.en],
      ["Email", company.email],
      ["Products", "Demo series A–E"],
      ["Markets", company.mainMarket.en]
    ]
  }
} as const;

const qualityImages = [
  imagesConfig.quality.spec,
  imagesConfig.quality.inspection,
  imagesConfig.quality.shipping,
  imagesConfig.quality.schedule
];

export const languages = [
  { locale: "ja" as const, label: content.ja.langLabel, href: "/ja/" },
  { locale: "zh" as const, label: content.zh.langLabel, href: "/zh/" },
  { locale: "en" as const, label: content.en.langLabel, href: "/en/" }
];

export function getSiteContent(locale: Locale) {
  const t = content[locale];
  const products = productBase.map((product) => {
    const [name, description] = t.productNames[product.key as keyof typeof t.productNames];
    return {
      ...product,
      name,
      description,
      specs: t.productSpecs[product.key as keyof typeof t.productSpecs],
      catalogVolume: product.catalogVolume[locale],
      catalogPage: product.catalogPage
    };
  });
  const catalogs = catalogsBase.map((catalog) => ({
    ...catalog,
    title: t.catalogTitleName,
    volume: catalog.volume[locale]
  }));
  const qualitySteps = t.qualitySteps.map(([title, text], index) => ({
    number: String(index + 1).padStart(2, "0"),
    title,
    text,
    image: qualityImages[index]
  }));
  const physicalCatalogHref = `mailto:${company.email}?subject=${encodeURIComponent(t.catalogRequestSubject)}`;

  return {
    locale,
    company,
    languages,
    ...t,
    products,
    catalogs,
    qualitySteps,
    contactHref: `mailto:${company.email}`,
    physicalCatalogHref,
    totalCatalogHref,
    totalCatalogDownloadHref,
    preloadImages: [imagesConfig.defaultHero],
    images: imagesConfig
  };
}

/** @deprecated alias — use getSiteContent */
export const getSite = getSiteContent;

export type SiteContent = ReturnType<typeof getSiteContent>;
