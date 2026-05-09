export type Locale = "ko" | "en" | "zh" | "ja";

export const LANG_LABELS = [
  { code: "ko", label: "한국어", short: "KR" },
  { code: "en", label: "English", short: "EN" },
  { code: "zh", label: "中文", short: "ZH" },
  { code: "ja", label: "日本語", short: "JA" },
] as const;

export const NAV_KEYS = ["home", "review", "cases", "process", "team", "consult"] as const;

export const NAV: Record<Locale, string[]> = {
  ko: ["홈", "사범심사", "주요 사례", "진행 절차", "전문가 소개", "상담 안내"],
  en: ["Home", "Review", "Cases", "Process", "Team", "Consult"],
  zh: ["首页", "事犯审查", "主要案例", "办理流程", "专家团队", "咨询"],
  ja: ["ホーム", "事犯審査", "主要事例", "手続き", "専門家", "相談"],
};

export const CTA_NAV: Record<Locale, string> = {
  ko: "긴급 상담",
  en: "Urgent Consult",
  zh: "紧急咨询",
  ja: "緊急相談",
};

export const HERO: Record<
  Locale,
  {
    eyebrow: string;
    h1_a: string;
    h1_b: string;
    h1_c: string;
    sub: string;
    cta_primary: string;
    cta_secondary: string;
    trust: string[];
    aside_label: string;
    aside_steps: string[];
    aside_note: string;
  }
> = {
  ko: {
    eyebrow: "출입국사범심사 · 행정 대응",
    h1_a: "사범심사 통보,",
    h1_b: "당황하지 마십시오.",
    h1_c: "체류 자격을 지키는 첫 번째 단계입니다.",
    sub: "음주운전 · 형사사건 · 출입국관리법 위반 — 초기 대응 자료부터 출입국 제출 서류까지 전문 행정사가 차분하게 함께합니다.",
    cta_primary: "상담 요청하기",
    cta_secondary: "체크리스트 보기",
    trust: ["Since 2018", "4개 국어 지원", "서울 본사무소"],
    aside_label: "현재 진행 단계",
    aside_steps: ["통보 수령", "심층 진단", "서류 준비", "출석 대비"],
    aside_note: "최초 출석 전 준비가 결과의 80%를 결정합니다.",
  },
  en: {
    eyebrow: "Immigration Offense Review · Administrative Response",
    h1_a: "Received an offense review notice?",
    h1_b: "Stay calm.",
    h1_c: "This is the first step in protecting your status.",
    sub: "DUI, criminal cases, immigration law violations — from initial evidence to submission packets, a certified administrative scrivener works with you, calmly and methodically.",
    cta_primary: "Request a Consultation",
    cta_secondary: "View Checklist",
    trust: ["Since 2018", "Four-language support", "Seoul main office"],
    aside_label: "Where you are now",
    aside_steps: ["Notice received", "Diagnosis", "Document prep", "Attendance"],
    aside_note: "Preparation before your first appearance decides 80% of the outcome.",
  },
  zh: {
    eyebrow: "出入境事犯审查 · 行政应对",
    h1_a: "收到事犯审查通知？",
    h1_b: "请保持冷静。",
    h1_c: "这是守住居留资格的第一步。",
    sub: "酒驾、刑事案件、违反出入境管理法 —— 从初期应对资料到出入境提交文件，由专业行政士有条不紊地与您并肩。",
    cta_primary: "申请咨询",
    cta_secondary: "查看清单",
    trust: ["Since 2018", "支持四种语言", "首尔总办公室"],
    aside_label: "您所处的阶段",
    aside_steps: ["收到通知", "深入诊断", "材料准备", "出席应对"],
    aside_note: "首次出席前的准备，决定结果的 80%。",
  },
  ja: {
    eyebrow: "出入国事犯審査 · 行政対応",
    h1_a: "事犯審査の通知が届いたら、",
    h1_b: "落ち着いてください。",
    h1_c: "在留資格を守る最初のステップです。",
    sub: "飲酒運転・刑事事件・出入国管理法違反 — 初期対応資料から出入国提出書類まで、行政書士が冷静に伴走します。",
    cta_primary: "相談を申し込む",
    cta_secondary: "チェックリストを見る",
    trust: ["Since 2018", "4 か国語対応", "ソウル本事務所"],
    aside_label: "現在の段階",
    aside_steps: ["通知受領", "詳細診断", "書類準備", "出席対応"],
    aside_note: "初出席前の準備が結果の 80% を決めます。",
  },
};

export const SITUATIONS = [
  {
    titles: { ko: "음주운전 적발", en: "DUI", zh: "酒驾被查", ja: "飲酒運転検挙" },
    sublabel: "DUI",
    desc: {
      ko: "벌금 액수와 무관하게 비자 연장 시 사범심사 대상이 됩니다.",
      en: "Regardless of fine amount, becomes a review subject at visa extension.",
      zh: "无论罚款金额，签证延期时均会成为审查对象。",
      ja: "罰金額に関わらず、ビザ延長時に審査対象となります。",
    },
  },
  {
    titles: { ko: "형사사건 연루", en: "Criminal Case", zh: "刑事案件涉案", ja: "刑事事件関与" },
    sublabel: "Criminal Case",
    desc: {
      ko: "폭행·절도 등의 형사 처벌 기록은 강제 퇴거 사유가 됩니다.",
      en: "Criminal records like assault or theft can lead to forced deportation.",
      zh: "暴力、盗窃等刑事记录可能导致强制驱逐出境。",
      ja: "暴行・窃盗などの刑事処罰記録は強制退去事由となります。",
    },
  },
  {
    titles: { ko: "마약류 조사", en: "Drug Investigation", zh: "毒品调查", ja: "麻薬類調査" },
    sublabel: "Drug Investigation",
    desc: {
      ko: "강력 범죄로 분류되어 즉각적인 자격 취소 위기가 됩니다.",
      en: "Classified as serious crime; immediate status revocation risk.",
      zh: "归类为严重犯罪，面临立即撤销居留资格的风险。",
      ja: "重大犯罪に分類され、即時の資格取消リスクとなります。",
    },
  },
  {
    titles: { ko: "불법 취업·고용", en: "Illegal Employment", zh: "非法就业·雇用", ja: "不法就労·雇用" },
    sublabel: "Illegal Employment",
    desc: {
      ko: "자격 외 활동은 대규모 과태료와 입국 규제를 동반합니다.",
      en: "Out-of-status activity brings heavy fines and entry restrictions.",
      zh: "资格外活动伴随高额罚款和入境限制。",
      ja: "資格外活動は高額の過料と入国規制を伴います。",
    },
  },
  {
    titles: { ko: "허위사실 기재", en: "False Statements", zh: "虚假陈述", ja: "虚偽記載" },
    sublabel: "False Statements",
    desc: {
      ko: "서류 조작·허위 신고가 적발되면 영구 입국 금지가 가능합니다.",
      en: "Document fraud or false reporting can lead to permanent entry ban.",
      zh: "文件伪造或虚假申报可导致永久入境禁止。",
      ja: "書類改ざんや虚偽申告が発覚すると永久入国禁止となる場合があります。",
    },
  },
  {
    titles: { ko: "비자 연장 거절", en: "Visa Denial", zh: "签证延期被拒", ja: "ビザ延長拒否" },
    sublabel: "Visa Denial",
    desc: {
      ko: "심사 과정에서 과거 기록이 문제되어 보완 명령을 받은 경우.",
      en: "Past records cause issues during review, leading to supplementary orders.",
      zh: "审查中过往记录引发问题，被要求补充材料。",
      ja: "審査過程で過去の記録が問題となり補完命令を受けた場合。",
    },
  },
  {
    titles: { ko: "보이스피싱 가담", en: "Voice Phishing", zh: "电信诈骗参与", ja: "ボイスフィッシング関与" },
    sublabel: "Voice Phishing",
    desc: {
      ko: "단순 전달책이라도 중범죄로 다뤄져 엄격한 심사를 받습니다.",
      en: "Even mere couriers face severe review as a serious crime.",
      zh: "即便仅为传送角色也按重罪严查。",
      ja: "単なる受け渡し役でも重罪として厳格審査されます。",
    },
  },
  {
    titles: { ko: "입국 규제 해제", en: "Entry Ban Removal", zh: "入境禁令解除", ja: "入国規制解除" },
    sublabel: "Entry Ban Removal",
    desc: {
      ko: "과거 사범 기록으로 인한 입국 금지를 해제하고 재입국을 준비.",
      en: "Lift entry bans from past offense records and prepare for re-entry.",
      zh: "解除因过往违法记录的入境禁令，准备再次入境。",
      ja: "過去の事犯記録による入国禁止を解除し再入国を準備。",
    },
  },
] as const;

export const STEPS = [
  {
    n: "01",
    titles: { ko: "접수 및 예약", en: "Intake & Booking", zh: "受理与预约", ja: "受付·予約" },
    desc: {
      ko: "전화 또는 온라인 상담을 통한 상황 파악",
      en: "Initial situation review via phone or online consultation",
      zh: "通过电话或在线咨询了解情况",
      ja: "電話またはオンライン相談による状況把握",
    },
  },
  {
    n: "02",
    titles: { ko: "심층 진단", en: "In-depth Diagnosis", zh: "深入诊断", ja: "詳細診断" },
    desc: {
      ko: "사건 내용 및 출입국 기록 상세 분석",
      en: "Detailed analysis of case and immigration records",
      zh: "详细分析案件内容及出入境记录",
      ja: "事件内容と出入国記録の詳細分析",
    },
  },
  {
    n: "03",
    titles: { ko: "체크리스트 발송", en: "Checklist Delivered", zh: "清单发送", ja: "チェックリスト送付" },
    desc: {
      ko: "준비가 필요한 개인별 맞춤 서류 목록",
      en: "Personalized list of documents to prepare",
      zh: "为您量身定制的所需材料清单",
      ja: "個別に必要な書類リストを送付",
    },
  },
  {
    n: "04",
    titles: { ko: "서류 완성", en: "Documents Finalized", zh: "材料完成", ja: "書類完成" },
    desc: {
      ko: "전문 행정사의 검토 및 최종 서류팩 제작",
      en: "Review by certified scrivener and final document pack",
      zh: "专业行政士审核并制作最终材料包",
      ja: "専門行政書士の検討と最終書類パック作成",
    },
  },
  {
    n: "05",
    titles: { ko: "체류 전략 제안", en: "Strategy Proposal", zh: "居留策略建议", ja: "在留戦略提案" },
    desc: {
      ko: "사범심사 이후 비자 유지 전략 수립",
      en: "Visa retention strategy after the review",
      zh: "事犯审查后的签证维持策略",
      ja: "事犯審査後のビザ維持戦略策定",
    },
  },
] as const;

export const SERVICES = [
  {
    titles: { ko: "입증 자료 준비", en: "Evidence Curation", zh: "证据材料准备", ja: "立証資料準備" },
    desc: {
      ko: "유리한 정상 참작 자료를 선별하고 공신력 있게 정리합니다.",
      en: "Select and organize favorable mitigating evidence with credibility.",
      zh: "甄选并以公信力整理有利的酌情材料。",
      ja: "有利な情状酌量資料を選別し信頼性高く整理します。",
    },
  },
  {
    titles: { ko: "사유서·탄원서 작성", en: "Explanation & Petitions", zh: "理由书·请愿书撰写", ja: "理由書·嘆願書作成" },
    desc: {
      ko: "출입국 관리 관점에서 논리적이고 호소력 있는 문서를 작성합니다.",
      en: "Logical, persuasive writing from the immigration officer's perspective.",
      zh: "从出入境管理视角撰写逻辑严谨且具说服力的文书。",
      ja: "出入国管理の視点で論理的かつ訴求力のある文書を作成。",
    },
  },
  {
    titles: { ko: "체류자격 위험 검토", en: "Status Risk Review", zh: "居留资格风险审查", ja: "在留資格リスク検討" },
    desc: {
      ko: "현재 위반 사항이 향후 비자 연장에 미칠 영향을 분석합니다.",
      en: "Analyze how current issues may affect future visa extensions.",
      zh: "分析当前违规事项对未来签证延期的影响。",
      ja: "現在の違反事項が今後のビザ延長に与える影響を分析。",
    },
  },
  {
    titles: { ko: "제출 서류 체계화", en: "Submission Package", zh: "提交材料体系化", ja: "提出書類体系化" },
    desc: {
      ko: "누락 없는 구비로 불필요한 보완 명령과 지연을 방지합니다.",
      en: "Complete packets prevent unnecessary supplements and delays.",
      zh: "齐备无遗以防不必要的补正命令和延误。",
      ja: "漏れのない構備で不要な補完命令と遅延を防止。",
    },
  },
  {
    titles: { ko: "외국인·기업 컨설팅", en: "Individual & Corporate", zh: "外国人·企业咨询", ja: "外国人·企業コンサル" },
    desc: {
      ko: "당사자는 물론 고용 기업의 피해를 최소화하는 대안을 제시합니다.",
      en: "Solutions that minimize damage for both individuals and employers.",
      zh: "为当事人及雇主企业提供降低损失的方案。",
      ja: "当事者だけでなく雇用企業の被害を最小化する代案を提示。",
    },
  },
  {
    titles: { ko: "다국어 소통 지원", en: "Multilingual Support", zh: "多语言沟通支持", ja: "多言語対応サポート" },
    desc: {
      ko: "언어 장벽 없이 정확한 상황 파악과 법률 의미를 전달합니다.",
      en: "Accurate situation grasp and legal meaning, without language barriers.",
      zh: "无语言障碍地准确把握情况并传达法律含义。",
      ja: "言語の壁なく正確な状況把握と法的意味を伝達。",
    },
  },
] as const;

export const SECTION_LABELS: Record<
  Locale,
  {
    casesEyebrow: string;
    casesTitle: string;
    casesCount: string;
    processEyebrow: string;
    processTitle1: string;
    processTitle2: string;
    processIntro: string;
    processDisclaimer: string;
    servicesEyebrow: string;
    servicesTitle: string;
    quietEyebrow: string;
    quietTitle: string;
    quietDesc: string;
    quietCtaPrimary: string;
    quietCtaPhone: string;
    quietCtaPhoneNote: string;
    teamEyebrow: string;
    teamTitle: string;
    contactEyebrow: string;
    contactTitle1: string;
    contactTitle2: string;
    contactDesc1: string;
    contactDesc2: string;
    bookCta: string;
    statsLabel: string[];
  }
> = {
  ko: {
    casesEyebrow: "대응 영역 · Cases We Handle",
    casesTitle: "이런 상황이라면 사범심사 대응이 필요합니다",
    casesCount: "08 CATEGORIES",
    processEyebrow: "진행 절차 · Process",
    processTitle1: "차분하고 명확한",
    processTitle2: "다섯 단계의 흐름",
    processIntro:
      "첫 통화부터 출석 대비까지, 어떤 단계도 건너뛰지 않습니다. 모든 의뢰인은 본인의 진행 상황을 실시간으로 확인할 수 있는 전용 대시보드를 받습니다.",
    processDisclaimer:
      "본 사무소는 행정사법에 의거한 서류 작성 및 제출 대행을 수행합니다. 법정 대리 및 형사 변호가 필요한 경우 제휴 전문 변호사를 연결해 드립니다.",
    servicesEyebrow: "전문 행정 서비스 · Services",
    servicesTitle: "단순 대행이 아닌, 전략적 행정 대응",
    quietEyebrow: "A QUIET WORD ON THIS",
    quietTitle: "벌금을 냈다고 끝이 아닐 수 있습니다.",
    quietDesc:
      "출입국 사무소의 사범심사는 비자 연장 거부, 영주권 탈락, 나아가 강제 퇴거 명령으로 이어질 수 있는 별개의 행정 절차입니다. 먼저 상황을 정확히 진단하는 것에서 시작합니다.",
    quietCtaPrimary: "내 상황 진단받기",
    quietCtaPhone: "전화 상담 · 02-363-2251",
    quietCtaPhoneNote: "평일 09–18시",
    teamEyebrow: "전문가 소개 · Team",
    teamTitle: "당신의 사건을 직접 다룰 사람",
    contactEyebrow: "상담 신청 · Consultation",
    contactTitle1: "지금 바로",
    contactTitle2: "상담을 시작하세요",
    contactDesc1: "상세한 정보를 입력해 주시면 더 정확한 진단이 가능합니다.",
    contactDesc2: "평일 1시간 이내 담당 전문가가 회신 드립니다.",
    bookCta: "상담 예약 →",
    statsLabel: [
      "사범심사 대응 실적",
      "출입국 실무 경력",
      "KR · EN · 中文 · 日本語",
      "초기 회신 약속",
    ],
  },
  en: {
    casesEyebrow: "Response Areas · Cases We Handle",
    casesTitle: "If you are in any of these situations, you need a review response",
    casesCount: "08 CATEGORIES",
    processEyebrow: "Process",
    processTitle1: "A calm, clear",
    processTitle2: "five-step flow",
    processIntro:
      "From the first call to attendance prep, no step is skipped. Every client receives a private dashboard to track real-time progress.",
    processDisclaimer:
      "This office performs document preparation and submission under the Administrative Scrivener Act. For court representation or criminal defense, we connect you with our partner attorneys.",
    servicesEyebrow: "Professional Services",
    servicesTitle: "Not mere agency — strategic administrative response",
    quietEyebrow: "A QUIET WORD ON THIS",
    quietTitle: "Paying the fine may not be the end.",
    quietDesc:
      "An immigration offense review is a separate administrative procedure that can lead to visa denial, permanent residency rejection, or even deportation. The first step is an accurate diagnosis of your situation.",
    quietCtaPrimary: "Diagnose my situation",
    quietCtaPhone: "Call · +82-2-363-2251",
    quietCtaPhoneNote: "Weekdays 09–18 KST",
    teamEyebrow: "Team",
    teamTitle: "The people who will handle your case",
    contactEyebrow: "Consultation",
    contactTitle1: "Start your",
    contactTitle2: "consultation now",
    contactDesc1: "More detailed input enables a more accurate diagnosis.",
    contactDesc2: "Our specialist replies within one hour on weekdays.",
    bookCta: "Book consultation →",
    statsLabel: [
      "Reviews handled",
      "Years of practice",
      "KR · EN · 中文 · 日本語",
      "Initial response",
    ],
  },
  zh: {
    casesEyebrow: "应对领域 · Cases We Handle",
    casesTitle: "如属以下情形，您需要事犯审查应对",
    casesCount: "08 CATEGORIES",
    processEyebrow: "办理流程 · Process",
    processTitle1: "冷静而清晰的",
    processTitle2: "五步流程",
    processIntro:
      "从首次通话到出席准备，任何环节都不会跳过。所有委托人都将获得可实时追踪进度的专属仪表板。",
    processDisclaimer:
      "本事务所依据《行政士法》进行文件制作及代理提交。若需法庭代理或刑事辩护，将为您介绍合作律师。",
    servicesEyebrow: "专业行政服务 · Services",
    servicesTitle: "不止于代理，更是战略性行政应对",
    quietEyebrow: "A QUIET WORD ON THIS",
    quietTitle: "缴纳罚金可能并非终点。",
    quietDesc:
      "出入境事务所的事犯审查是独立的行政程序，可能导致签证延期被拒、永居申请落选，乃至强制驱逐令。第一步是准确诊断您的处境。",
    quietCtaPrimary: "评估我的情况",
    quietCtaPhone: "电话咨询 · +82-2-363-2251",
    quietCtaPhoneNote: "工作日 09–18 KST",
    teamEyebrow: "专家团队 · Team",
    teamTitle: "亲自处理您案件的人",
    contactEyebrow: "申请咨询 · Consultation",
    contactTitle1: "现在就",
    contactTitle2: "开始咨询",
    contactDesc1: "信息越详细，诊断越准确。",
    contactDesc2: "工作日内 1 小时内由专人回复。",
    bookCta: "预约咨询 →",
    statsLabel: [
      "事犯审查应对业绩",
      "出入境实务经验",
      "KR · EN · 中文 · 日本語",
      "初次回复承诺",
    ],
  },
  ja: {
    casesEyebrow: "対応領域 · Cases We Handle",
    casesTitle: "次のような状況なら事犯審査対応が必要です",
    casesCount: "08 CATEGORIES",
    processEyebrow: "手続き · Process",
    processTitle1: "落ち着きと明快さの",
    processTitle2: "5 ステップ",
    processIntro:
      "最初の通話から出席対応まで、どの段階も飛ばしません。全ての依頼人に進行状況をリアルタイムで確認できる専用ダッシュボードを提供します。",
    processDisclaimer:
      "本事務所は行政書士法に基づき書類作成および提出代行を行います。法廷代理や刑事弁護が必要な場合は提携弁護士をご紹介します。",
    servicesEyebrow: "専門行政サービス · Services",
    servicesTitle: "単なる代行ではなく、戦略的行政対応",
    quietEyebrow: "A QUIET WORD ON THIS",
    quietTitle: "罰金を払って終わりではないかもしれません。",
    quietDesc:
      "出入国事務所の事犯審査は、ビザ延長拒否、永住資格不許可、さらには強制退去命令にもつながり得る別個の行政手続です。まずは状況を正確に診断することから始まります。",
    quietCtaPrimary: "状況を診断する",
    quietCtaPhone: "電話相談 · +82-2-363-2251",
    quietCtaPhoneNote: "平日 09–18 KST",
    teamEyebrow: "専門家紹介 · Team",
    teamTitle: "あなたの案件を直接担当する人",
    contactEyebrow: "相談申込 · Consultation",
    contactTitle1: "今すぐ",
    contactTitle2: "相談を始めましょう",
    contactDesc1: "詳しい情報で、より正確な診断が可能です。",
    contactDesc2: "平日 1 時間以内に担当者が返信します。",
    bookCta: "相談予約 →",
    statsLabel: [
      "事犯審査対応実績",
      "出入国実務経験",
      "KR · EN · 中文 · 日本語",
      "初動返信",
    ],
  },
};

export const TEAM = [
  {
    name: "이 원 중",
    nameEn: "Lee Won-joong",
    role: { ko: "대표 행정사", en: "Principal Scrivener", zh: "代表行政士", ja: "代表行政書士" },
    note: {
      ko: "Since 2018 · 대한민국 행정사 자격",
      en: "Since 2018 · Licensed administrative scrivener",
      zh: "Since 2018 · 韩国行政士资格",
      ja: "Since 2018 · 韓国行政書士資格",
    },
  },
  {
    name: "전문 팀",
    nameEn: "Specialist Team",
    role: { ko: "전임 행정사", en: "Senior Scrivener", zh: "专责行政士", ja: "専任行政書士" },
    note: {
      ko: "외국인 정책 전문 · 4개 국어 가능",
      en: "Foreign policy specialists · Four languages",
      zh: "外国人政策专长 · 四种语言",
      ja: "外国人政策専門 · 4 か国語対応",
    },
  },
];

export const FOOTER: Record<
  Locale,
  {
    disclaimer: string;
    columns: { h: string; items: string[] }[];
    copyright: string;
  }
> = {
  ko: {
    disclaimer:
      "본 사무소는 전문 행정사 사무소입니다. 법원의 소송 대리 및 형사 변호는 법령에 의거하여 변호사의 고유 업무이며, 본 사무소는 출입국 행정 절차 및 서류 대행을 전문으로 합니다.",
    columns: [
      { h: "주요 서비스", items: ["음주운전 사범심사", "형사사건 비자방어", "입국금지 해제신청", "체류자격 변경·연장"] },
      { h: "기업 고객", items: ["E-7 / E-9 컨설팅", "외국인 채용 사범 대응", "기업 자문 계약", "Compliance 점검"] },
      { h: "고객 지원", items: ["개인정보처리방침", "이용약관", "오시는 길", "사업자 정보"] },
    ],
    copyright: "© 2026 비전행정사사무소 (Law in Korea). All rights reserved.",
  },
  en: {
    disclaimer:
      "This is a certified administrative scrivener office. Court representation and criminal defense are reserved for licensed attorneys; we focus on immigration administrative procedures and document preparation.",
    columns: [
      { h: "Services", items: ["DUI Review", "Criminal Visa Defense", "Entry Ban Removal", "Status Change/Extend"] },
      { h: "Corporate", items: ["E-7 / E-9 Consulting", "Foreign Hire Defense", "Retainer Advisory", "Compliance Audit"] },
      { h: "Support", items: ["Privacy Policy", "Terms of Service", "Office Map", "Company Info"] },
    ],
    copyright: "© 2026 VISION Administrative Attorney Agent (Law in Korea). All rights reserved.",
  },
  zh: {
    disclaimer:
      "本事务所为专业行政士事务所。法院诉讼代理及刑事辩护依法属律师专责，本所专注于出入境行政手续与文件代办。",
    columns: [
      { h: "主要服务", items: ["酒驾事犯审查", "刑事案件签证防御", "入境禁令解除申请", "居留资格变更·延期"] },
      { h: "企业客户", items: ["E-7 / E-9 咨询", "外籍员工事犯应对", "企业顾问合约", "合规审查"] },
      { h: "客户支持", items: ["隐私政策", "服务条款", "办公位置", "企业信息"] },
    ],
    copyright: "© 2026 VISION Administrative Attorney Agent (Law in Korea). 版权所有。",
  },
  ja: {
    disclaimer:
      "本事務所は専門行政書士事務所です。法廷代理および刑事弁護は法令により弁護士の専属業務であり、本所は出入国行政手続および書類代行を専門としています。",
    columns: [
      { h: "主要サービス", items: ["飲酒運転事犯審査", "刑事事件ビザ防御", "入国禁止解除申請", "在留資格変更·延長"] },
      { h: "企業顧客", items: ["E-7 / E-9 コンサル", "外国人採用事犯対応", "企業顧問契約", "コンプライアンス点検"] },
      { h: "顧客サポート", items: ["プライバシーポリシー", "利用規約", "アクセス", "事業者情報"] },
    ],
    copyright: "© 2026 VISION Administrative Attorney Agent (Law in Korea). All rights reserved.",
  },
};
