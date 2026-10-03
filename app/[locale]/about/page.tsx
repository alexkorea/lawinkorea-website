import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { breadcrumbSchema, faqSchema } from "../../lib/schema";
import { COMPANY } from "../../lib/constants";
import ScopeBlock from "../../components/ScopeBlock";
import HubBlogLinks from "../../components/HubBlogLinks";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

const CONTENT: Record<L, { title: string; intro: string; points: { label: string; desc: string }[]; closing: string }> = {
  ko: {
    title: "사무소 소개",
    intro: "선샤인행정사사무소는 외국인 출입국 사범심사 대응을 전문으로 하는 행정사 사무소입니다. 음주운전, 형사사건, 불법취업, 출국명령 등 체류 위기 상황에서 외국인의 권익 보호를 위해 활동합니다.",
    points: [
      { label: "전문 분야", desc: "외국인 출입국사범심사 소명 대응, 체류자격 유지 지원, 출국명령·강제퇴거 이의신청 보조" },
      { label: "서비스 언어", desc: "한국어, 영어, 중국어, 일본어 상담 가능" },
      { label: "위치", desc: "서울 소재 (방문 상담 및 비대면 상담 모두 가능)" },
      { label: "운영 원칙", desc: "사실 기반의 정확한 소명, 기한 엄수, 의뢰인 상황에 맞는 맞춤 대응" },
    ],
    closing: "출입국 관련 위기 상황에서 빠르고 정확한 대응이 중요합니다. 상담을 통해 현재 상황을 함께 검토하겠습니다.",
  },
  en: {
    title: "About Us",
    intro: "Vision Administrative Scrivener Office specializes in immigration offense review support for foreign nationals in Korea. We assist with DUI, criminal charges, unauthorized employment, departure orders, and other visa crisis situations.",
    points: [
      { label: "Specialization", desc: "Immigration offense review response, visa status preservation, departure order and deportation appeal support" },
      { label: "Languages", desc: "Korean, English, Chinese, Japanese" },
      { label: "Location", desc: "Seoul, Korea (in-person and remote consultations available)" },
      { label: "Core Principles", desc: "Fact-based written explanations, strict deadline adherence, case-specific strategies" },
    ],
    closing: "In immigration crises, speed and accuracy matter. Contact us to review your situation together.",
  },
  zh: {
    title: "事务所介绍",
    intro: "VISION行政士事务所专注于外国人出入境事犯审查应对。我们在酒驾、刑事案件、非法就业、出境命令等居留危机情况下，致力于维护外国人的合法权益。",
    points: [
      { label: "专业领域", desc: "外国人出入境事犯审查说明应对、居留资格维持支持、出境命令·强制驱逐异议申请协助" },
      { label: "服务语言", desc: "韩语、英语、中文、日语" },
      { label: "位置", desc: "首尔（可到访咨询及远程咨询）" },
      { label: "运营原则", desc: "基于事实的准确说明、严格遵守期限、量身定制应对方案" },
    ],
    closing: "在出入境危机情况下，快速准确的应对至关重要。请预约咨询，共同审查您的当前情况。",
  },
  ja: {
    title: "事務所紹介",
    intro: "VISION行政書士事務所は、外国人の出入国事犯審査対応を専門とする行政書士事務所です。飲酒運転、刑事事件、不法就労、出国命令など在留危機の状況で、外国人の権益保護のために活動しています。",
    points: [
      { label: "専門分野", desc: "外国人出入国事犯審査疎明対応、在留資格維持支援、出国命令・強制退去異議申し立て補助" },
      { label: "対応言語", desc: "韓国語、英語、中国語、日本語" },
      { label: "所在地", desc: "ソウル（対面相談・非対面相談いずれも対応可能）" },
      { label: "運営方針", desc: "事実に基づく正確な疎明、期限厳守、依頼者の状況に合わせたカスタム対応" },
    ],
    closing: "出入国関連の危機状況では、迅速・正確な対応が重要です。ご相談を通じて現在の状況をともに確認いたします。",
  },
  vi: {
    title: "Giới thiệu văn phòng",
    intro: "Văn phòng Hành chính VISION chuyên hỗ trợ xem xét vi phạm xuất nhập cảnh cho người nước ngoài tại Hàn Quốc. Chúng tôi hỗ trợ trong các trường hợp DUI, tội danh hình sự, lao động trái phép, lệnh xuất cảnh và các tình huống khủng hoảng visa khác.",
    points: [
      { label: "Chuyên môn", desc: "Hỗ trợ xem xét vi phạm xuất nhập cảnh, bảo vệ tư cách lưu trú, hỗ trợ kháng cáo lệnh xuất cảnh và trục xuất" },
      { label: "Ngôn ngữ phục vụ", desc: "Tiếng Hàn, tiếng Anh, tiếng Trung, tiếng Nhật" },
      { label: "Địa điểm", desc: "Seoul, Hàn Quốc (tư vấn trực tiếp và trực tuyến)" },
      { label: "Nguyên tắc cốt lõi", desc: "Giải trình dựa trên thực tế, tuân thủ đúng hạn, chiến lược theo từng trường hợp" },
    ],
    closing: "Trong khủng hoảng xuất nhập cảnh, tốc độ và độ chính xác rất quan trọng. Liên hệ để chúng tôi cùng xem xét tình huống của bạn.",
  },
};


/**
 * 7장 회사허브 보강(맥7 K-exec 2026-10-03): 등록 정보(대표 행정사 한경택 — 등록부 브랜드 E),
 * 업무범위(ScopeBlock), 핵심 서비스 링크, FAQ(화면=FAQPage 1:1), 관련 블로그.
 * 외국어 사무소명은 Boss 미확정 → 새 블록에서는 사무소명을 번역하지 않는다.
 * 우편번호(04614/04620)는 Boss 확인 대기라 주소 표기에서 뺐다(기존 값은 건드리지 않음).
 */
const ADDRESS: Record<L, string> = {
  ko: "서울특별시 중구 퇴계로 324, 3층 (성우빌딩)",
  en: "3F Sungwoo Bldg, 324 Toegye-ro, Jung-gu, Seoul",
  zh: "首尔特别市 中区 退溪路 324, 3层 (Sungwoo大厦)",
  ja: "ソウル特別市 中区 退渓路 324, 3階 (Sungwoo ビル)",
  vi: "Tầng 3, tòa Sungwoo, 324 Toegye-ro, Jung-gu, Seoul",
};

const INFO: Record<L, { title: string; name: string; rep: string; repValue: string; addr: string; tel: string; biz: string; hours: string; hoursValue: string; langs: string; langsValue: string }> = {
  ko: { title: "사무소 등록 정보", name: "상호", rep: "대표 행정사", repValue: "한경택", addr: "주소", tel: "전화", biz: "사업자등록번호", hours: "상담 시간", hoursValue: "월~금 09:30–17:30 (토·일·공휴일 휴무)", langs: "상담 언어", langsValue: "한국어 · 영어 · 중국어 · 일본어" },
  en: { title: "Registered office details", name: "Registered name", rep: "Representative administrative scrivener", repValue: "한경택", addr: "Address", tel: "Phone", biz: "Business registration no.", hours: "Hours", hoursValue: "Mon–Fri 09:30–17:30 KST (closed weekends and public holidays)", langs: "Consultation languages", langsValue: "Korean · English · Chinese · Japanese" },
  zh: { title: "事务所登记信息", name: "商号", rep: "代表行政士", repValue: "한경택", addr: "地址", tel: "电话", biz: "营业执照号码", hours: "咨询时间", hoursValue: "周一至周五 09:30–17:30（周末及法定节假日休息）", langs: "咨询语言", langsValue: "韩语 · 英语 · 中文 · 日语" },
  ja: { title: "事務所の登録情報", name: "商号", rep: "代表行政書士", repValue: "한경택", addr: "所在地", tel: "電話", biz: "事業者登録番号", hours: "相談時間", hoursValue: "月〜金 09:30–17:30（土日祝休み）", langs: "相談言語", langsValue: "韓国語 · 英語 · 中国語 · 日本語" },
  vi: { title: "Thông tin đăng ký văn phòng", name: "Tên đăng ký", rep: "Hành chính sĩ đại diện", repValue: "한경택", addr: "Địa chỉ", tel: "Điện thoại", biz: "Số đăng ký kinh doanh", hours: "Giờ tư vấn", hoursValue: "Thứ Hai–Thứ Sáu 09:30–17:30 (nghỉ cuối tuần và ngày lễ)", langs: "Ngôn ngữ tư vấn", langsValue: "Tiếng Hàn · tiếng Anh · tiếng Trung · tiếng Nhật" },
};

const SERVICES: Record<L, { title: string; items: { t: string; href: string }[] }> = {
  ko: { title: "핵심 서비스", items: [
    { t: "출입국 사범심사 대응", href: "/immigration-offense-review" },
    { t: "음주운전과 비자·체류 자격", href: "/offenses/dui" },
    { t: "강제퇴거명령 절차와 대응", href: "/dispositions/deportation-order" },
    { t: "입국금지 기간과 해제 신청", href: "/dispositions/entry-ban" },
    { t: "출입국 범칙금 기준표", href: "/offenses/immigration-fines" },
    { t: "사범심사 준비서류", href: "/documents" },
  ] },
  en: { title: "Core services", items: [
    { t: "Immigration offense review", href: "/immigration-offense-review" },
    { t: "DUI and your visa status", href: "/offenses/dui" },
    { t: "Deportation orders", href: "/dispositions/deportation-order" },
    { t: "Entry bans and how to lift them", href: "/dispositions/entry-ban" },
    { t: "Immigration fine schedule", href: "/offenses/immigration-fines" },
    { t: "Documents to prepare", href: "/documents" },
  ] },
  zh: { title: "核心服务", items: [
    { t: "出入境违规审查应对", href: "/immigration-offense-review" },
    { t: "酒驾与签证·居留资格", href: "/offenses/dui" },
    { t: "强制出境命令的程序与应对", href: "/dispositions/deportation-order" },
    { t: "入境禁止期限与解除申请", href: "/dispositions/entry-ban" },
    { t: "出入境罚款基准表", href: "/offenses/immigration-fines" },
    { t: "审查所需文件", href: "/documents" },
  ] },
  ja: { title: "主なサービス", items: [
    { t: "出入国事犯審査への対応", href: "/immigration-offense-review" },
    { t: "飲酒運転とビザ・在留資格", href: "/offenses/dui" },
    { t: "強制退去命令の手続きと対応", href: "/dispositions/deportation-order" },
    { t: "入国禁止の期間と解除申請", href: "/dispositions/entry-ban" },
    { t: "出入国犯則金の基準表", href: "/offenses/immigration-fines" },
    { t: "審査の必要書類", href: "/documents" },
  ] },
  vi: { title: "Dịch vụ chính", items: [
    { t: "Thẩm tra vi phạm xuất nhập cảnh", href: "/immigration-offense-review" },
    { t: "Lái xe say rượu và tư cách lưu trú", href: "/offenses/dui" },
    { t: "Lệnh trục xuất cưỡng bức", href: "/dispositions/deportation-order" },
    { t: "Lệnh cấm nhập cảnh và cách xin dỡ bỏ", href: "/dispositions/entry-ban" },
    { t: "Bảng mức phạt xuất nhập cảnh", href: "/offenses/immigration-fines" },
    { t: "Hồ sơ cần chuẩn bị", href: "/documents" },
  ] },
};

const FAQ_TITLE: Record<L, string> = { ko: "자주 묻는 질문", en: "Frequently asked questions", zh: "常见问题", ja: "よくある質問", vi: "Câu hỏi thường gặp" };

const FAQ: Record<L, { q: string; a: string }[]> = {
  ko: [
    { q: "선샤인행정사사무소는 어떤 곳인가요?", a: "서울 중구 퇴계로 324, 3층(성우빌딩)에 있는 행정사 사무소이며 대표 행정사는 한경택입니다. 외국인의 출입국 사범심사와 체류 관련 처분에 필요한 서류의 작성·제출을 지원합니다." },
    { q: "행정사는 사범심사에서 무엇을 도와줄 수 있나요?", a: "행정사법 제2조 제1항에 따라 출입국관서에 제출하는 서류의 작성과 제출 대행, 사실관계를 증명하는 서류의 작성, 행정기관 업무와 관련된 서류의 번역을 할 수 있습니다. 의견서·반성문·탄원서 작성도 이 범위에서 지원합니다." },
    { q: "형사재판 변호도 맡아 주나요?", a: "아닙니다. 형사재판 변호와 소송 대리는 행정사 업무 범위 밖이라 맡지 않습니다." },
    { q: "출국명령이나 강제퇴거명령에 대한 행정심판도 대리하나요?", a: "행정심판은 대리하지 않고, 행정심판 청구서의 작성과 제출을 지원합니다. 행정심판은 처분이 있음을 알게 된 날부터 90일 이내에 서면으로 청구해야 합니다(행정심판법 제27조 제1항, 제28조 제1항)." },
    { q: "노동 문제나 세금 문제도 상담할 수 있나요?", a: "노동 관계 법령에 따른 신고·진정 등의 대리는 공인노무사, 조세 신고·불복의 대리는 세무사 업무입니다. 해당 절차가 필요하면 그 전문가를 찾으시도록 안내합니다." },
    { q: "어떤 언어로 상담할 수 있나요?", a: "한국어·영어·중국어·일본어로 상담합니다. 베트남어 상담은 제공하지 않습니다." },
    { q: "상담 시간은 언제인가요?", a: "월요일부터 금요일 09:30–17:30이며 토·일요일과 공휴일은 휴무입니다." },
    { q: "비용은 어떻게 정해지나요?", a: "비용은 사례별로 상이하므로 상담 시 사건 내용을 확인한 뒤 정확히 안내드립니다. 홈페이지에는 고정 금액을 게시하지 않습니다." },
    { q: "사업자 정보는 어디서 확인할 수 있나요?", a: "상호 선샤인행정사사무소, 대표 한경택, 사업자등록번호 752-17-01689입니다. 같은 정보가 모든 페이지 하단에도 적혀 있습니다." },
  ],
  en: [
    { q: "Who runs this website?", a: "An administrative scrivener office located on the 3rd floor of the Sungwoo Building, 324 Toegye-ro, Jung-gu, Seoul. The office prepares and submits documents for foreign nationals facing an immigration offense review or a residence-related disposition." },
    { q: "What can an administrative scrivener do in an immigration offense review?", a: "Under Article 2(1) of Korea's Haengjeongsa Act, an administrative scrivener may draft documents submitted to administrative agencies, draft documents that certify facts, translate documents related to administrative work, and submit the documents so prepared. Help with statements of opinion, letters of apology and petitions falls within this scope." },
    { q: "Can you defend me in a criminal trial?", a: "No. Criminal defense and representation in lawsuits are outside the scope of an administrative scrivener, so we do not handle them." },
    { q: "Can you represent me in an administrative appeal against a departure or deportation order?", a: "We do not act as your representative in an administrative appeal, but we help you prepare and file the written petition. Under Korea's Administrative Appeals Act, the petition must be filed in writing within 90 days of the date you learned of the disposition (Article 27(1), Article 28(1))." },
    { q: "Can you help with labor or tax matters?", a: "Acting for you in filings and complaints under labor laws is the work of a certified labor consultant, and acting for you in tax returns and tax appeals is the work of a certified tax accountant. If you need those procedures, we will point you to the right professional." },
    { q: "Which languages can I consult in?", a: "Korean, English, Chinese and Japanese. Consultation in Vietnamese is not available." },
    { q: "What are your office hours?", a: "Monday to Friday, 09:30–17:30 Korea time. Closed on weekends and Korean public holidays." },
    { q: "How are fees decided?", a: "Fees vary from case to case, so we explain them after reviewing your situation in a consultation. We do not publish fixed prices on this website." },
  ],
  zh: [
    { q: "这个网站由谁运营？", a: "由位于首尔中区退溪路324号Sungwoo大厦3层的行政士事务所运营。事务所为面临出入境违规审查或居留相关处分的外国人撰写并提交所需文件。" },
    { q: "在出入境违规审查中，行政士能提供哪些帮助？", a: "根据韩国《行政士法》第2条第1款，行政士可以撰写向行政机关提交的文件、撰写证明事实的文件、翻译与行政机关业务相关的文件，并代为提交所撰写的文件。协助撰写意见书、悔过书和求情信也在这一范围之内。" },
    { q: "可以在刑事审判中为我辩护吗？", a: "不可以。刑事辩护和诉讼代理不属于行政士业务范围，本所不予承办。" },
    { q: "针对出境命令或强制出境命令的行政审判，可以代理吗？", a: "我们不代理行政审判，但会协助您撰写并提交行政审判请求书。根据韩国《行政审判法》，须在知道处分之日起90日内以书面形式提出请求（第27条第1款、第28条第1款）。" },
    { q: "劳动或税务问题也可以咨询吗？", a: "依劳动关系法令进行的申报、申诉等代理属于公认劳务士业务，税务申报及税务争议的代理属于税务士业务。如需办理这些程序，我们会建议您寻找相应的专业人士。" },
    { q: "可以用哪些语言咨询？", a: "可以使用韩语、英语、中文和日语咨询。不提供越南语咨询。" },
    { q: "咨询时间是什么时候？", a: "周一至周五 09:30–17:30（韩国时间），周末及韩国法定节假日休息。" },
    { q: "费用如何确定？", a: "费用因案件而异，我们会在咨询中了解您的情况后再具体说明。本网站不公布固定价格。" },
  ],
  ja: [
    { q: "このサイトはどこが運営していますか？", a: "ソウル中区退渓路324、Sungwooビル3階にある行政書士事務所が運営しています。出入国事犯審査や在留に関する処分を受けた外国人のために、必要な書類の作成・提出を支援しています。" },
    { q: "出入国事犯審査で、行政書士は何を手伝えますか？", a: "韓国行政士法第2条第1項により、行政機関に提出する書類の作成、事実証明に関する書類の作成、行政機関の業務に関する書類の翻訳、作成した書類の提出代行ができます。意見書・反省文・嘆願書の作成支援もこの範囲で行います。" },
    { q: "刑事裁判の弁護もお願いできますか？", a: "できません。刑事弁護と訴訟代理は行政書士の業務範囲外ですので、お引き受けしていません。" },
    { q: "出国命令や強制退去命令に対する行政審判の代理はできますか？", a: "行政審判の代理は行わず、行政審判請求書の作成・提出を支援します。韓国の行政審判法では、処分があったことを知った日から90日以内に書面で請求しなければなりません（第27条第1項、第28条第1項）。" },
    { q: "労働問題や税金の問題も相談できますか？", a: "労働関係法令に基づく申告・陳情などの代理は公認労務士、租税の申告・不服申立ての代理は税務士の業務です。こうした手続きが必要な場合は、該当する専門家をご案内します。" },
    { q: "どの言語で相談できますか？", a: "韓国語・英語・中国語・日本語で相談できます。ベトナム語での相談には対応していません。" },
    { q: "相談時間はいつですか？", a: "月曜日から金曜日の09:30〜17:30（韓国時間）です。土日と韓国の祝日は休みです。" },
    { q: "費用はどのように決まりますか？", a: "費用は事案ごとに異なるため、ご相談で状況を確認したうえでご案内します。当サイトには固定料金を掲載していません。" },
  ],
  vi: [
    { q: "Ai vận hành trang web này?", a: "Một văn phòng hành chính sĩ tại tầng 3 tòa Sungwoo, 324 Toegye-ro, Jung-gu, Seoul. Văn phòng soạn và nộp hồ sơ cho người nước ngoài đang phải thẩm tra vi phạm xuất nhập cảnh hoặc nhận quyết định liên quan đến lưu trú." },
    { q: "Trong thẩm tra vi phạm xuất nhập cảnh, hành chính sĩ có thể giúp gì?", a: "Theo Điều 2 khoản 1 Luật Hành chính sĩ Hàn Quốc, hành chính sĩ được soạn văn bản nộp cho cơ quan hành chính, soạn văn bản chứng minh sự việc, dịch văn bản liên quan đến công việc của cơ quan hành chính và nộp thay các văn bản đã soạn. Việc hỗ trợ soạn bản ý kiến, thư hối lỗi và đơn xin giảm nhẹ nằm trong phạm vi này." },
    { q: "Văn phòng có bào chữa cho tôi trong phiên tòa hình sự không?", a: "Không. Bào chữa hình sự và đại diện tố tụng nằm ngoài phạm vi nghiệp vụ của hành chính sĩ, nên chúng tôi không nhận." },
    { q: "Văn phòng có đại diện cho tôi khi yêu cầu xét lại lệnh xuất cảnh hoặc lệnh trục xuất không?", a: "Chúng tôi không làm người đại diện, nhưng hỗ trợ bạn soạn và nộp đơn yêu cầu xét lại quyết định hành chính. Theo Luật Xét xử hành chính Hàn Quốc, đơn phải được nộp bằng văn bản trong vòng 90 ngày kể từ ngày bạn biết có quyết định (Điều 27 khoản 1, Điều 28 khoản 1)." },
    { q: "Tôi có thể hỏi về vấn đề lao động hoặc thuế không?", a: "Đại diện khai báo, khiếu nại theo pháp luật lao động là công việc của chuyên viên lao động được cấp phép; đại diện kê khai và khiếu nại về thuế là công việc của chuyên viên thuế được cấp phép. Nếu cần các thủ tục đó, chúng tôi sẽ hướng dẫn bạn tìm đúng chuyên gia." },
    { q: "Tôi có thể được tư vấn bằng ngôn ngữ nào?", a: "Tiếng Hàn, tiếng Anh, tiếng Trung và tiếng Nhật. Văn phòng không tư vấn bằng tiếng Việt." },
    { q: "Giờ làm việc của văn phòng là khi nào?", a: "Thứ Hai đến Thứ Sáu, 09:30–17:30 giờ Hàn Quốc. Nghỉ cuối tuần và các ngày lễ của Hàn Quốc." },
    { q: "Chi phí được tính như thế nào?", a: "Chi phí khác nhau tùy từng vụ việc, nên chúng tôi chỉ báo sau khi xem xét tình huống của bạn trong buổi tư vấn. Trang web này không đăng giá cố định." },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "about", "/about");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) notFound();
  const l = locale as L;
  const c = CONTENT[l];
  const info = INFO[l];
  const svc = SERVICES[l];
  const faq = FAQ[l];
  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(l, [{ name: c.title, path: "/about" }])),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faq)) }} />
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>{c.title}</h1>
      <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.8, marginBottom: 48 }}>{c.intro}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 48 }}>
        {c.points.map((p, i) => (
          <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "20px 24px", background: "#fff" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1e4a8a", marginBottom: 6 }}>{p.label}</div>
            <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
          </div>
        ))}
      </div>
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", margin: "0 0 16px" }}>{info.title}</h2>
        <dl style={{ display: "grid", gridTemplateColumns: "minmax(96px, 36%) minmax(0, 1fr)", gap: "10px 20px", margin: 0, fontSize: 15, lineHeight: 1.6 }}>
          <dt style={{ color: "#64748b" }}>{info.name}</dt><dd style={{ margin: 0, color: "#0a1628" }}>{COMPANY.nameKo}</dd>
          <dt style={{ color: "#64748b" }}>{info.rep}</dt><dd style={{ margin: 0, color: "#0a1628" }}>{info.repValue}</dd>
          <dt style={{ color: "#64748b" }}>{info.addr}</dt><dd style={{ margin: 0, color: "#0a1628" }}>{ADDRESS[l]}</dd>
          <dt style={{ color: "#64748b" }}>{info.tel}</dt><dd style={{ margin: 0, color: "#0a1628" }}><a href={`tel:${COMPANY.phoneIntl}`} style={{ color: "#0056b3" }}>{l === "ko" ? COMPANY.phone : COMPANY.phoneIntl}</a></dd>
          <dt style={{ color: "#64748b" }}>{info.biz}</dt><dd style={{ margin: 0, color: "#0a1628" }}>{COMPANY.bizRegNo}</dd>
          <dt style={{ color: "#64748b" }}>{info.hours}</dt><dd style={{ margin: 0, color: "#0a1628" }}>{info.hoursValue}</dd>
          <dt style={{ color: "#64748b" }}>{info.langs}</dt><dd style={{ margin: 0, color: "#0a1628" }}>{info.langsValue}</dd>
        </dl>
      </section>

      <ScopeBlock locale={l} extended />

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", margin: "0 0 16px" }}>{svc.title}</h2>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: 10 }}>
          {svc.items.map((s) => (
            <li key={s.href}>
              <a href={`/${l}${s.href}`} style={{ display: "inline-block", background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 6, padding: "10px 16px", fontSize: 14, color: "#1e40af", textDecoration: "none" }}>{s.t}</a>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", margin: "0 0 20px" }}>{FAQ_TITLE[l]}</h2>
        {faq.map((f, i) => (
          <div key={i} style={{ borderTop: "1px solid #e2e8f0", padding: "18px 0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0a1628", margin: "0 0 8px" }}>Q. {f.q}</h3>
            <p style={{ color: "#374151", lineHeight: 1.8, margin: 0, fontSize: 15 }}>{f.a}</p>
          </div>
        ))}
      </section>

      <div style={{ marginBottom: 48 }}>
        <HubBlogLinks hub="about" locale={l} />
      </div>

      <div style={{ background: "#f0f7ff", border: "1px solid #bdd7f7", borderRadius: 10, padding: "20px 24px", color: "#1e4a8a", fontSize: 15, lineHeight: 1.7 }}>
        {c.closing} <a href={`/${l}/contact`} style={{ color: "#0056b3", fontWeight: 600 }}>{l === "ko" ? "상담 신청" : l === "zh" ? "申请咨询" : l === "ja" ? "相談を申し込む" : l === "vi" ? "Đăng ký tư vấn" : "Request a consultation"} →</a>
      </div>
    </main>
  );
}
