import { notFound } from "next/navigation";
import { fineLabels, finesFor, FINE_TIER_COUNT } from "../../../lib/fines";
import { alternatesFor } from "../../../lib/seo";
import type { Metadata } from "next";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

const COMING_SOON: Record<L, { title: string; msg: string; back: string }> = {
  ko: { title: "준비 중", msg: "해당 페이지의 콘텐츠를 준비 중입니다. 빠른 시일 내에 업데이트됩니다.", back: "사건 유형 목록으로 돌아가기" },
  en: { title: "Coming Soon", msg: "This page is currently being prepared. It will be updated soon.", back: "Back to Offense Types" },
  ja: { title: "準備中", msg: "このページのコンテンツを準備中です。近日中に更新されます。", back: "違反の種類に戻る" },
  zh: { title: "准备中", msg: "此页面内容正在准备中，即将更新。", back: "返回违规类型" },
  vi: { title: "Đang chuẩn bị", msg: "Nội dung trang này đang được chuẩn bị và sẽ được cập nhật sớm.", back: "Quay lại các loại vi phạm" },
};

type SlugContent = {
  meta: Record<L, { title: string; description: string }>;
  render: (l: L, locale: string) => React.ReactNode;
};

const SLUG_CONTENT: Record<string, SlugContent> = {
  drugs: {
    meta: {
      ko: { title: "마약·향정신성의약품 사건과 출입국 사범심사 · Law in Korea", description: "대마초, 필로폰 등 마약 관련 전과가 있는 외국인의 출입국 사범심사 대응 — 강제퇴거 위험, 비자 갱신 영향, 선샤인행정사사무소 대응 절차." },
      en: { title: "Drug Offense & Immigration Review · Law in Korea", description: "How drug-related convictions affect foreign nationals' visa status in Korea — deportation risk, renewal impact, and how our office can help." },
      ja: { title: "薬物事件と出入国犯則審査 · Law in Korea", description: "大麻・覚醒剤などの薬物前科が外国人の在留資格に与える影響と、在留審査の対応方法。" },
      zh: { title: "毒品案件与出入境犯罪审查 · Law in Korea", description: "大麻、冰毒等毒品前科对外国人签证及居留资格的影响，以及如何应对出入境审查。" },
      vi: { title: "Vụ án ma túy & xem xét vi phạm xuất nhập cảnh · Law in Korea", description: "Tiền án liên quan đến ma túy ảnh hưởng thế nào đến tư cách lưu trú của người nước ngoài tại Hàn Quốc — nguy cơ trục xuất và cách ứng phó." },
    },
    render: (l, locale) => {
      const t = {
        ko: {
          tag: "마약·향정신성의약품",
          h1: "마약 사건과 출입국 사범심사",
          lead: "대마초, 필로폰, 합성마약 등 마약 관련 사건은 출입국법상 가장 엄격하게 처리되는 위반 유형 중 하나입니다. 형사 처분이 마무리되더라도 체류 자격에 대한 별도 심사(사범심사)가 진행될 수 있습니다.",
          s1: "마약 사건이 체류 자격에 미치는 영향",
          p1: "출입국관리법 제11조 제1항은 '마약류 관리에 관한 법률'을 위반한 사람을 입국 금지 사유로 규정합니다. 이미 국내에 체류 중인 외국인이 마약 사건으로 처벌받은 경우, 법무부 출입국·외국인정책본부의 사범심사를 통해 강제퇴거 또는 출국권고 여부가 결정됩니다.",
          items1: [
            "초범·소지량 극소량·집행유예: 출국권고 후 재입국 제한 6개월~2년 가능성",
            "투약·제조·밀수: 강제퇴거 및 재입국 금지(5년~영구) 가능성 높음",
            "체류 기간 중 재범: 심사 결과 사실상 대부분 강제퇴거",
            "비자 갱신·변경 시 마약 전과 노출 → 불허 가능성",
          ],
          s2: "사범심사 절차",
          p2: "마약 사건으로 형사 처분(기소유예·벌금·집행유예·실형) 이후 출입국 사범심사가 개시될 수 있습니다.",
          steps: [
            "경찰·검찰 수사 종결 → 출입국 당국에 통보",
            "출입국·외국인청 출석 요구 또는 우편 통지",
            "심사관 면담 (사건 경위, 재범 가능성, 국내 생활 기반 등 조사)",
            "처분 결정: ① 체류 유지 ② 출국권고 ③ 강제퇴거",
          ],
          s3: "선샤인행정사사무소가 대응할 수 있는 부분",
          p3: "마약 사건은 즉각적인 법적 대응이 중요합니다. 선샤인행정사사무소는 다음 서비스를 제공합니다:",
          services: [
            "사범심사 대리 출석 및 의견서 제출",
            "처분 결과 최소화를 위한 정상 참작 자료 준비 (자발적 치료 이력, 가족 관계, 사회 기여 등)",
            "출국권고 대상의 경우 재입국 금지 기간 단축 협의",
            "비자 갱신·변경 시 전과 공개 전략 수립",
          ],
          cta: "지금 상담 예약",
          back: "사건 유형 목록으로",
          faqTitle: "자주 묻는 질문",
          faqs: [
            { q: "대마초 1회 투약으로도 강제퇴거가 될 수 있나요?", a: "가능합니다. 마약류 관련 위반은 출입국법상 입국 금지 사유에 해당하므로, 초범·소량이라도 사범심사를 통해 출국권고 또는 재입국 금지 처분이 내려질 수 있습니다. 처분 수위는 체류 기간, 기여도, 재범 위험 등을 종합 검토합니다." },
            { q: "형사재판에서 집행유예를 받으면 강제퇴거를 피할 수 있나요?", a: "집행유예 자체가 강제퇴거를 막지 않습니다. 출입국 사범심사는 형사 처분과 별개로 진행됩니다. 다만 집행유예 + 치료 이력 + 사회적 기반이 있는 경우 처분 수위를 낮추는 데 유리한 자료가 될 수 있습니다." },
            { q: "사범심사 출석 통지를 받았는데 혼자 가도 되나요?", a: "권고하지 않습니다. 사범심사는 진술 내용이 처분에 직접 영향을 줍니다. 행정사 동행 또는 의견서 제출을 통해 사전에 준비된 진술을 하는 것이 결과에 유리합니다." },
          ],
          notice: "※ 이 페이지는 일반적인 법령 정보 제공 목적이며 개별 사건에 대한 법률 조언이 아닙니다. 구체적인 상담은 선샤인행정사사무소에 문의하십시오.",
        },
        en: {
          tag: "Drugs",
          h1: "Drug Offense & Immigration Review",
          lead: "Drug-related cases — cannabis, methamphetamine, synthetic drugs — face the strictest scrutiny under Korea's immigration law. Even after criminal proceedings end, a separate immigration offense review (사범심사) may determine your residency status.",
          s1: "How Drug Offenses Affect Your Visa Status",
          p1: "Article 11(1) of the Immigration Act lists drug law violations as grounds for denial of entry. For foreign nationals already residing in Korea who receive a drug-related conviction, the Immigration and Foreign Policy Headquarters conducts an offense review to determine whether forced departure or a departure recommendation will be issued.",
          items1: [
            "First offense · trace amount · suspended sentence: Departure recommendation + re-entry ban 6 months–2 years possible",
            "Use · manufacture · trafficking: High likelihood of forced departure + re-entry ban (5 years–permanent)",
            "Repeat offense during stay: Forced departure in nearly all cases",
            "Drug conviction exposed during visa renewal/change: High likelihood of denial",
          ],
          s2: "The Offense Review Process",
          p2: "After a criminal disposition (deferred prosecution, fine, suspended sentence, or imprisonment), an immigration offense review may be initiated.",
          steps: [
            "Police/prosecutor investigation concluded → Notification to immigration authorities",
            "Notice or summons from Immigration Office",
            "Officer interview (circumstances, recidivism risk, local ties)",
            "Decision: ① Continue stay ② Departure recommendation ③ Forced departure",
          ],
          s3: "How Vision Can Help",
          p3: "Immediate legal response is critical. Our office provides:",
          services: [
            "Representation at the offense review interview and submission of written opinions",
            "Preparation of mitigating documents (voluntary treatment history, family ties, community contributions)",
            "Negotiation for shorter re-entry ban periods if departure is recommended",
            "Strategy for disclosing past convictions during visa renewal/change",
          ],
          cta: "Book a Consultation",
          back: "Back to Offense Types",
          faqTitle: "Frequently Asked Questions",
          faqs: [
            { q: "Can a single cannabis use lead to forced departure?", a: "Yes. Drug violations constitute grounds for entry denial under the Immigration Act. Even a first offense with a small amount may result in a departure recommendation or re-entry ban through the offense review. The severity depends on length of stay, contributions, and recidivism risk." },
            { q: "If I receive a suspended sentence, does that prevent deportation?", a: "No. The immigration offense review is conducted independently of criminal proceedings. However, a suspended sentence combined with a treatment history and strong local ties can serve as favorable mitigating factors." },
            { q: "I received a summons for an offense review. Can I go alone?", a: "We do not recommend it. Statements made during the review directly affect the outcome. Having an administrative agent present or submitting a prepared written opinion can significantly improve results." },
          ],
          notice: "This page provides general legal information only and does not constitute legal advice for individual cases. Contact our office for a specific consultation.",
        },
        ja: {
          tag: "薬物事件",
          h1: "薬物事件と出入国犯則審査",
          lead: "大麻・覚醒剤・合成薬物などの薬物関連事件は、韓国の出入国法上で最も厳格に扱われる違反類型の一つです。刑事処分が終わった後も、別途の在留審査（사범심사）が行われる場合があります。",
          s1: "薬物事件が在留資格に与える影響",
          p1: "出入国管理法第11条第1項は、麻薬類管理法に違反した者を入国禁止事由として規定しています。すでに国内に在留中の外国人が薬物事件で処罰を受けた場合、法務部の審査を通じて強制退去または出国勧告の処分が決定されます。",
          items1: [
            "初犯・微量・執行猶予：出国勧告＋再入国禁止6ヶ月〜2年の可能性",
            "使用・製造・密輸：強制退去＋再入国禁止（5年〜永久）の可能性が高い",
            "在留中の再犯：ほぼ全件で強制退去",
            "ビザ更新・変更時に薬物前科が判明：不許可の可能性",
          ],
          s2: "犯則審査の手続き",
          p2: "刑事処分（起訴猶予・罰金・執行猶予・実刑）の後、出入国犯則審査が開始される場合があります。",
          steps: [
            "警察・検察の捜査終結 → 出入国当局への通報",
            "出入国・外国人庁からの出頭要求または通知",
            "審査官面談（事件の経緯、再犯リスク、生活基盤等の調査）",
            "処分決定：① 在留継続 ② 出国勧告 ③ 強制退去",
          ],
          s3: "Visionにできること",
          p3: "薬物事件には迅速な法的対応が重要です。当事務所は以下のサービスを提供しています：",
          services: [
            "犯則審査への代理出席および意見書の提出",
            "情状酌量資料の準備（自発的治療歴、家族関係、社会貢献等）",
            "出国勧告の場合の再入国禁止期間短縮交渉",
            "ビザ更新・変更時の前科開示戦略の立案",
          ],
          cta: "今すぐ相談予約",
          back: "違反の種類一覧へ",
          faqTitle: "よくある質問",
          faqs: [
            { q: "大麻を1回使用しただけで強制退去になりますか？", a: "可能性があります。薬物関連違反は出入国法上の入国禁止事由に該当するため、初犯・微量でも審査を通じて出国勧告または再入国禁止処分が下される場合があります。処分の重さは在留期間、社会貢献、再犯リスク等を総合的に考慮します。" },
            { q: "刑事裁判で執行猶予を受ければ強制退去を避けられますか？", a: "執行猶予自体が強制退去を防ぐわけではありません。出入国犯則審査は刑事処分とは別に進行します。ただし執行猶予＋治療歴＋社会的基盤がある場合、処分軽減に有利な資料となりえます。" },
            { q: "犯則審査への出頭通知を受けましたが、一人で行っても大丈夫ですか？", a: "お勧めしません。審査での陳述内容は処分に直接影響します。行政士の同行や意見書の事前提出により、準備した陳述を行うことが結果に有利です。" },
          ],
          notice: "※ このページは一般的な法令情報の提供を目的としており、個別事案に対する法律上の助言ではありません。具体的な相談はVisionまでお問い合わせください。",
        },
        zh: {
          tag: "毒品案件",
          h1: "毒品案件与出入境犯罪审查",
          lead: "大麻、冰毒、合成毒品等与毒品相关的案件，是韩国出入境法中审查最为严格的违规类型之一。即使刑事程序结束，仍可能对居留资格进行单独的犯罪审查（사범심사）。",
          s1: "毒品案件对居留资格的影响",
          p1: "《出入境管理法》第11条第1款将违反毒品类管理法的人列为拒绝入境事由。对于已在韩国居留的外籍人士，若因毒品案件受到处罚，法务部将通过犯罪审查决定是否强制出境或建议出境。",
          items1: [
            "初犯·微量·缓刑：出境建议＋再入境禁止6个月至2年",
            "吸毒·制造·走私：强制出境＋再入境禁止（5年至永久）可能性高",
            "在留期间再犯：几乎全部被强制出境",
            "签证续签·变更时毒品前科曝光：不予批准可能性高",
          ],
          s2: "犯罪审查程序",
          p2: "刑事处分（不起诉·罚款·缓刑·实刑）后，可能启动出入境犯罪审查。",
          steps: [
            "警察·检察侦查结束 → 通知出入境当局",
            "出入境·外国人厅发出出席要求或书面通知",
            "审查官面谈（案件经过、再犯风险、本地生活基础等）",
            "处分决定：① 继续居留 ② 建议出境 ③ 强制出境",
          ],
          s3: "Vision能提供的帮助",
          p3: "毒品案件需要即时的法律应对。本事务所提供以下服务：",
          services: [
            "代理出席犯罪审查并提交书面意见",
            "准备从轻处罚材料（自愿戒毒记录、家庭关系、社区贡献等）",
            "建议出境时协商缩短再入境禁止期限",
            "签证续签·变更时前科披露策略制定",
          ],
          cta: "立即预约咨询",
          back: "返回违规类型列表",
          faqTitle: "常见问题",
          faqs: [
            { q: "仅吸食一次大麻也会被强制出境吗？", a: "有可能。毒品相关违规属于出入境法规定的拒绝入境事由，即使初犯、微量，也可能通过审查被建议出境或禁止再入境。处分轻重综合考虑居留时间、社会贡献和再犯风险等因素。" },
            { q: "刑事裁判获得缓刑能否避免强制出境？", a: "缓刑本身不能防止强制出境。出入境犯罪审查与刑事处分独立进行。但缓刑+戒毒经历+社会基础有助于在审查中争取从轻处分。" },
            { q: "收到犯罪审查出席通知，可以自己去吗？", a: "不建议。审查中的陈述内容直接影响处分结果。行政士陪同出席或提前提交书面意见，能显著改善结果。" },
          ],
          notice: "※ 本页面仅供一般法律信息参考，不构成针对个案的法律建议。具体咨询请联系Vision行政士事务所。",
        },
        vi: {
          tag: "Vụ án ma túy",
          h1: "Vụ án ma túy & xem xét vi phạm xuất nhập cảnh",
          lead: "Các vụ án liên quan đến ma túy — cần sa, methamphetamine, ma túy tổng hợp — phải chịu sự xem xét nghiêm khắc nhất theo luật xuất nhập cảnh Hàn Quốc. Dù thủ tục hình sự đã kết thúc, vẫn có thể diễn ra xem xét vi phạm xuất nhập cảnh (사범심사) riêng biệt ảnh hưởng đến tư cách lưu trú.",
          s1: "Vụ án ma túy ảnh hưởng thế nào đến tư cách lưu trú?",
          p1: "Điều 11(1) Luật Quản lý Xuất nhập cảnh liệt kê hành vi vi phạm Luật Quản lý Ma túy là lý do từ chối nhập cảnh. Với người nước ngoài đang cư trú tại Hàn Quốc bị xử phạt vì vụ án ma túy, Bộ Tư pháp sẽ tiến hành xem xét vi phạm để quyết định có áp dụng trục xuất hoặc khuyến nghị xuất cảnh hay không.",
          items1: [
            "Lần đầu · lượng nhỏ · án treo: Khuyến nghị xuất cảnh + cấm tái nhập cảnh 6 tháng–2 năm",
            "Sử dụng · sản xuất · buôn lậu: Nguy cơ cao bị trục xuất + cấm tái nhập cảnh (5 năm–vĩnh viễn)",
            "Tái phạm trong thời gian lưu trú: Hầu hết các trường hợp đều bị trục xuất",
            "Tiền án ma túy lộ khi gia hạn/thay đổi visa: Khả năng từ chối cao",
          ],
          s2: "Quy trình xem xét vi phạm",
          p2: "Sau xử lý hình sự (không khởi tố · phạt tiền · án treo · thực giam), có thể khởi động xem xét vi phạm xuất nhập cảnh.",
          steps: [
            "Kết thúc điều tra cảnh sát/kiểm sát → Thông báo cho cơ quan xuất nhập cảnh",
            "Cơ quan Xuất nhập cảnh gửi giấy triệu tập hoặc thông báo",
            "Phỏng vấn với điều tra viên (hoàn cảnh vụ án, nguy cơ tái phạm, cơ sở cuộc sống tại Hàn)",
            "Quyết định: ① Tiếp tục lưu trú ② Khuyến nghị xuất cảnh ③ Trục xuất",
          ],
          s3: "Vision có thể hỗ trợ gì?",
          p3: "Với vụ án ma túy, ứng phó pháp lý ngay lập tức rất quan trọng. Văn phòng chúng tôi cung cấp:",
          services: [
            "Đại diện tham dự phỏng vấn xem xét vi phạm và nộp ý kiến bằng văn bản",
            "Chuẩn bị tài liệu giảm nhẹ (lịch sử điều trị tự nguyện, quan hệ gia đình, đóng góp xã hội)",
            "Đàm phán rút ngắn thời gian cấm tái nhập cảnh nếu bị khuyến nghị xuất cảnh",
            "Xây dựng chiến lược công khai tiền án khi gia hạn/thay đổi visa",
          ],
          cta: "Đặt lịch tư vấn ngay",
          back: "Quay lại danh sách vi phạm",
          faqTitle: "Câu hỏi thường gặp",
          faqs: [
            { q: "Chỉ hút cần sa một lần có thể bị trục xuất không?", a: "Có. Vi phạm liên quan đến ma túy là lý do từ chối nhập cảnh theo Luật Xuất nhập cảnh. Dù lần đầu với lượng nhỏ, vẫn có thể bị khuyến nghị xuất cảnh hoặc cấm tái nhập cảnh qua xem xét vi phạm. Mức xử phạt phụ thuộc vào thời gian lưu trú, đóng góp xã hội và nguy cơ tái phạm." },
            { q: "Nếu được hưởng án treo trong xét xử hình sự, có tránh được trục xuất không?", a: "Án treo không ngăn được trục xuất. Xem xét vi phạm xuất nhập cảnh tiến hành độc lập với xử lý hình sự. Tuy nhiên, án treo + lịch sử điều trị + cơ sở cuộc sống ổn định có thể là tài liệu có lợi để giảm nhẹ xử phạt." },
            { q: "Nhận được thông báo xem xét vi phạm, tôi có thể tự đi một mình không?", a: "Không khuyến nghị. Lời khai trong buổi xem xét ảnh hưởng trực tiếp đến kết quả xử phạt. Có hành chính sư đi cùng hoặc nộp ý kiến bằng văn bản chuẩn bị trước sẽ cải thiện đáng kể kết quả." },
          ],
          notice: "Trang này chỉ cung cấp thông tin pháp luật chung và không phải lời khuyên pháp lý cho từng trường hợp cụ thể. Liên hệ văn phòng Vision để được tư vấn cụ thể.",
        },
      };
      const c = t[l] || t.ko;
      const ACCENT = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E9ECEF", bg: "#f8f9fb", warn: "#fff8e6", warnBorder: "#f59e0b" };
      return (
        <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: ACCENT.primary, marginBottom: 8 }}>{c.tag}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: ACCENT.navy, lineHeight: 1.25, marginBottom: 18 }}>{c.h1}</h1>
            <p style={{ fontSize: 17, color: ACCENT.muted, lineHeight: 1.75, marginBottom: 36, borderBottom: `1px solid ${ACCENT.border}`, paddingBottom: 32 }}>{c.lead}</p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s1}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p1}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>
              {c.items1.map((item, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{item}</li>)}
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s2}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p2}</p>
            <ol style={{ paddingLeft: 22, marginBottom: 32 }}>
              {c.steps.map((step, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{step}</li>)}
            </ol>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s3}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p3}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>
              {c.services.map((svc, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{svc}</li>)}
            </ul>

            <div style={{ background: ACCENT.primary, color: "#fff", borderRadius: 10, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 18, marginBottom: 40 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>선샤인행정사사무소</div>
                <div style={{ opacity: 0.9, fontSize: 15 }}>서울 중구 퇴계로 324, 3층 · +82-2-363-2251</div>
              </div>
              <a href={`/${locale}#contact`} style={{ background: "#fff", color: ACCENT.primary, padding: "11px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" as const }}>{c.cta}</a>
            </div>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 18 }}>{c.faqTitle}</h2>
            {c.faqs.map((faq, i) => (
              <div key={i} style={{ borderTop: `1px solid ${ACCENT.border}`, padding: "18px 0" }}>
                <div style={{ fontWeight: 600, color: ACCENT.navy, marginBottom: 8, fontSize: 15 }}>{faq.q}</div>
                <div style={{ color: ACCENT.muted, lineHeight: 1.7, fontSize: 14 }}>{faq.a}</div>
              </div>
            ))}

            <div style={{ marginTop: 40, background: ACCENT.warn, border: `1px solid ${ACCENT.warnBorder}`, borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{c.notice}</div>

            <div style={{ marginTop: 32 }}>
              <a href={`/${locale}/offenses`} style={{ color: ACCENT.primary, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>← {c.back}</a>
            </div>
          </div>
        </main>
      );
    },
  },
  "immigration-fines": {
    meta: {
      ko: { title: "출입국 범칙금 기준표 완벽 가이드 · Law in Korea", description: "외국인등록 미이행·체류기간 초과·불법취업 등 출입국관리법 위반 범칙금 기준액 총정리. 위반 유형별·기간별 금액과 대응 방법을 확인하세요." },
      en: { title: "Korea Immigration Fine Schedule — Complete Guide · Law in Korea", description: "Official immigration fine amounts for failure to register, overstay, unauthorized employment and more. Understand your exposure and what to do next." },
      ja: { title: "出入国犯則金基準表 完全ガイド · Law in Korea", description: "外国人登録未了・在留期間超過・不法就労など出入国管理法違反の犯則金基準額を一覧で解説。違反種別・期間別の金額と対応方法。" },
      zh: { title: "出入境罚款基准表完整指南 · Law in Korea", description: "外国人登记未办理、超期滞留、非法就业等出入境管理法违规罚款金额一览。了解各违规类型和期间的金额及应对方法。" },
      vi: { title: "Bảng Tiêu Chuẩn Phạt Xuất Nhập Cảnh Hàn Quốc — Hướng Dẫn Đầy Đủ · Law in Korea", description: "Mức phạt chính thức cho các vi phạm luật xuất nhập cảnh: không đăng ký, ở quá hạn, làm việc trái phép và hơn thế nữa. Hiểu rõ mức phạt của bạn." },
    },
    /**
     * 표는 app/lib/fines.ts 한 곳에서 온다 — 이 페이지와 /{locale}/fines 가 같은 데이터를 쓴다.
     * 예전에는 로케일마다 표를 따로 적어서 ko 16개 / en 7 / ja 6 / zh 5 / vi 5 로 갈라졌다.
     */
    render: (l, locale) => {
      const A = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E9ECEF", bg: "#f8f9fb", warn: "#fff8e6", warnBorder: "#f59e0b", red: "#dc2626" };
      const L = fineLabels(l);
      const groups = finesFor(l);
      const t = {
        ko: {
          tag: "출입국 범칙금",
          h1: "출입국 범칙금 기준표 — 위반 유형별 완전 정리",
          lead: "출입국관리법을 위반하면 위반 행위의 종류와 위반 기간(또는 위반 횟수)에 따라 범칙금 또는 과태료가 부과됩니다. 아래 기준액은 출입국관리법 시행규칙 [별표 7]·[별표 8], 같은 법 시행령 [별표 2], 재외동포법 시행령 [별표] 에 규정된 금액입니다.",
          tip1: "📌 범칙금 통지를 받았다면",
          tip1body: "범칙금은 납부 기한 내 납부하지 않으면 가산금이 부과되고, 강제징수 또는 출국정지로 이어질 수 있습니다. 통지서를 받은 즉시 내용을 확인하고 전문가와 상담하세요.",
          tip2: "⚠️ 범칙금 vs 과태료 vs 형사처벌",
          tip2body: "출입국관리법 위반은 범칙금(행정 통고처분), 과태료, 형사처벌(벌금·징역) 중 하나 또는 복합적으로 부과될 수 있습니다. 특히 불법취업·불법고용·위변조 여권은 형사처벌 대상이며 강제퇴거로 이어질 수 있습니다.",
          faqs: [
            { q: "범칙금 고지서를 받았는데 어떻게 해야 하나요?", a: "고지서에 명시된 납부 기한 내에 납부해야 합니다. 이의가 있는 경우 법무부 출입국사무소에 이의신청을 할 수 있으며, 기한 내 미납 시 가산금 부과 및 강제징수 조치가 취해질 수 있습니다." },
            { q: "범칙금 납부 후에도 강제퇴거가 될 수 있나요?", a: "네. 범칙금 납부는 행정제재 해소이며, 강제퇴거 여부는 별도의 사범심사를 통해 결정됩니다. 특히 불법취업·마약 사건 등은 범칙금 납부와 별개로 강제퇴거 심사가 진행될 수 있습니다." },
            { q: "체류기간을 며칠 초과했는데 큰 문제가 될까요?", a: "단기 초과(1개월 미만)는 범칙금 수준이지만, 자진 출국 시 재입국 금지 기간이 부과될 수 있습니다. 장기 초과일수록 범칙금 금액이 급증하고 강제퇴거 위험도 높아집니다. 초과 사실을 인지한 즉시 전문가와 상담하세요." },
          ],
          faqTitle: "자주 묻는 질문",
          cta: "지금 상담 예약",
          ctaBody: "범칙금 통지, 불법취업 고용 문제, 체류기간 초과 등 출입국 관련 사안은 선샤인행정사사무소와 즉시 상담하세요.",
          back: "사건 유형 목록으로",
          notice: "※ 이 페이지의 기준액은 법령 별표에 규정된 금액입니다. 실제 부과액은 위반 정황·위반 횟수·고용인원 등에 따라 가중되거나 감경될 수 있으며, 처분은 담당 심사관의 판단과 개별 사정에 따라 달라집니다. 일반 정보 제공 목적이며 개별 사건에 대한 법률 자문이 아닙니다.",
        },
        en: {
          tag: "Immigration Fines",
          h1: "Korea Immigration Fine Schedule — Complete Guide",
          lead: "A breach of Korea's Immigration Act attracts either a fine or an administrative penalty, set by the type of breach and how long it lasted — or how many times it happened. The amounts below are those fixed in Tables 7 and 8 of the Enforcement Rule, Table 2 of the Enforcement Decree, and the Table to the Enforcement Decree of the Overseas Koreans Act.",
          tip1: "📌 Received a Fine Notice?",
          tip1body: "Fines must be paid by the stated deadline. Late payment results in surcharges and may lead to forced collection or a departure ban. Check the notice immediately and consult a specialist.",
          tip2: "⚠️ Fine vs Administrative Penalty vs Criminal Punishment",
          tip2body: "Immigration violations may result in a fine (administrative notification), a penalty, criminal punishment (fine or imprisonment), or a combination. Illegal employment, use of forged passports, and long-term overstay can lead to criminal prosecution and deportation.",
          faqs: [
            { q: "I received a fine notice. What should I do?", a: "Pay by the deadline shown on the notice. If you dispute the amount, you may file an objection with the immigration office. Failure to pay on time results in surcharges and potential forced collection." },
            { q: "Can I still be deported after paying the fine?", a: "Yes. Paying the fine resolves the administrative penalty, but deportation is decided separately through an immigration review. Violations such as illegal employment or drug offences can lead to deportation proceedings regardless of fine payment." },
            { q: "I overstayed by only a few days. Is this a serious problem?", a: "Short overstays (< 1 month) attract the lowest fine tier, but a re-entry restriction may still apply upon voluntary departure. The fine and deportation risk escalate sharply with longer overstays. Seek advice as soon as you are aware of the situation." },
          ],
          faqTitle: "Frequently Asked Questions",
          cta: "Book a Consultation",
          ctaBody: "For fine notices, illegal employment issues, overstay, or any immigration matter, contact Vision Administrative Office for immediate assistance.",
          back: "Back to Offense Types",
          notice: "The amounts on this page are those fixed in the statutory schedules. The sum actually imposed may be increased or reduced according to the circumstances, repeat violations and the number of workers employed, and the decision depends on the reviewing officer's judgement. This page is general information, not legal advice on an individual case.",
        },
        ja: {
          tag: "出入国犯則金",
          h1: "出入国犯則金基準表 — 違反種別・期間別完全ガイド",
          lead: "出入国管理法に違反すると、違反行為の種類と違反期間（または違反回数）に応じて犯則金または過料が科されます。以下の金額は、出入国管理法施行規則［別表7］・［別表8］、同法施行令［別表2］、在外同胞法施行令［別表］に定められた基準額です。",
          tip1: "📌 犯則金通知を受け取ったら",
          tip1body: "期限内に納付しないと延滞金が課され、強制徴収または出国禁止につながる可能性があります。通知書を受け取ったらすぐに内容を確認し、専門家にご相談ください。",
          tip2: "⚠️ 犯則金・過怠料・刑事処罰の違い",
          tip2body: "出入国管理法違反は、犯則金（行政通告処分）、過怠料、刑事処罰（罰金・懲役）のいずれか、または複合的に課される場合があります。特に不法就労・不法雇用・旅券偽造は刑事処罰対象となり得ます。",
          faqs: [
            { q: "犯則金通知書を受け取りました。どうすればよいですか？", a: "通知書に記載された期限内に納付してください。異議がある場合は、出入国事務所に異議申立てができます。期限内未納の場合は延滞金が課され、強制徴収措置が取られる可能性があります。" },
            { q: "犯則金を納付しても強制退去になりますか？", a: "はい。犯則金の納付は行政制裁の解消であり、強制退去の可否は別途の犯則審査で決定されます。不法就労や薬物事件などは、犯則金納付とは別に退去審査が進む場合があります。" },
          ],
          faqTitle: "よくある質問",
          cta: "今すぐ相談予約",
          ctaBody: "犯則金通知・不法雇用・在留期間超過など出入国に関するお困りごとはVision行政士事務所にご相談ください。",
          back: "違反の種類に戻る",
          notice: "※ このページの基準額は法令の別表に定められた金額です。実際の賦課額は違反の情状・違反回数・雇用人数などにより加重または減軽されることがあり、処分は担当審査官の判断と個別事情により異なります。一般的な情報提供が目的であり、個別事件に対する法律助言ではありません。",
        },
        zh: {
          tag: "出入境罚款",
          h1: "出入境罚款基准表 — 违规类型完整指南",
          lead: "违反出入境管理法时，将根据违规行为的种类与违规期间（或违规次数）科处罚款或过怠金。下列金额依据出入境管理法施行规则［别表7］·［别表8］、同法施行令［别表2］及在外同胞法施行令［别表］的规定。",
          tip1: "📌 收到罚款通知后",
          tip1body: "未在规定期限内缴纳罚款将产生滞纳金，并可能导致强制征收或禁止出境。收到通知后请立即确认内容并咨询专业人士。",
          tip2: "⚠️ 罚款与行政处罚、刑事处罚的区别",
          tip2body: "出入境管理法违规可能面临罚款（行政通告处分）、行政处罚或刑事处罚（罚金·拘役）中的一种或多种。非法就业、雇用非法劳工、护照伪造等属刑事处罚对象，可能导致强制遣返。",
          faqs: [
            { q: "收到罚款通知书该怎么办？", a: "请在通知书指定期限内缴纳。如有异议，可向出入境事务所提出申诉。逾期未缴将产生滞纳金并可能被强制征收。" },
            { q: "缴纳罚款后还会被强制遣返吗？", a: "是的。缴纳罚款仅解决行政处罚，是否被强制遣返将通过单独的审查程序决定。非法就业或毒品案件可能在缴纳罚款之外另行进行遣返审查。" },
          ],
          faqTitle: "常见问题",
          cta: "立即预约咨询",
          ctaBody: "关于罚款通知、非法雇用、超期滞留等出入境事项，请立即联系Vision行政士事务所。",
          back: "返回违规类型",
          notice: "※ 本页金额为法令别表规定的基准额。实际科处金额可能依违规情节、违规次数、雇用人数等加重或减轻，处分取决于审查官的判断与个案情况。本页仅供一般信息参考，并非针对个别案件的法律意见。",
        },
        vi: {
          tag: "Phạt vi phạm xuất nhập cảnh",
          h1: "Bảng Tiêu Chuẩn Phạt Xuất Nhập Cảnh Hàn Quốc — Hướng Dẫn Đầy Đủ",
          lead: "Vi phạm Luật Quản lý Xuất nhập cảnh Hàn Quốc sẽ bị phạt tiền hoặc phạt hành chính, tùy loại vi phạm và thời gian vi phạm — hoặc số lần vi phạm. Các mức dưới đây được quy định tại Bảng 7 và 8 của Thông tư thi hành, Bảng 2 của Nghị định thi hành, và Bảng kèm Nghị định thi hành Luật Kiều bào.",
          tip1: "📌 Nhận được thông báo phạt?",
          tip1body: "Phạt phải được nộp trước hạn chót ghi trên thông báo. Nộp muộn dẫn đến phụ phí và có thể dẫn đến cưỡng chế thu hoặc lệnh cấm xuất cảnh. Kiểm tra thông báo ngay và tư vấn chuyên gia.",
          tip2: "⚠️ Phạt hành chính vs. Xử phạt hình sự",
          tip2body: "Vi phạm luật xuất nhập cảnh có thể dẫn đến phạt hành chính, xử phạt hoặc xử lý hình sự (phạt tiền hoặc tù giam), hoặc kết hợp. Làm việc trái phép, thuê lao động không phép và hộ chiếu giả mạo có thể dẫn đến truy tố hình sự và trục xuất.",
          faqs: [
            { q: "Tôi nhận được thông báo phạt. Tôi phải làm gì?", a: "Nộp phạt trước hạn chót ghi trên thông báo. Nếu bạn không đồng ý, có thể nộp đơn phản đối tại văn phòng xuất nhập cảnh. Không nộp đúng hạn sẽ bị phụ phí và có thể bị cưỡng chế thu." },
            { q: "Tôi có thể bị trục xuất sau khi nộp phạt không?", a: "Có. Nộp phạt giải quyết xử phạt hành chính, nhưng trục xuất được quyết định riêng qua quy trình xem xét xuất nhập cảnh. Vi phạm như làm việc trái phép hoặc vụ án ma túy có thể dẫn đến xem xét trục xuất bất kể đã nộp phạt." },
          ],
          faqTitle: "Câu hỏi thường gặp",
          cta: "Đặt lịch tư vấn ngay",
          ctaBody: "Về thông báo phạt, vấn đề thuê lao động trái phép, ở quá hạn hoặc bất kỳ vấn đề xuất nhập cảnh nào, hãy liên hệ văn phòng Vision để được hỗ trợ ngay.",
          back: "Quay lại danh sách vi phạm",
          notice: "Các mức trên trang này là mức chuẩn do pháp luật ấn định. Số tiền thực tế có thể tăng hoặc giảm tùy hoàn cảnh, số lần tái phạm và số lao động được thuê, và quyết định phụ thuộc vào đánh giá của cán bộ xem xét. Trang này cung cấp thông tin chung, không phải tư vấn pháp lý cho vụ việc cụ thể.",
        },
      };
      const c = t[l] || t.ko;
      return (
        <main lang={l} style={{ background: A.bg, minHeight: "100vh", wordBreak: l === "ko" ? "keep-all" : "normal" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: A.primary, marginBottom: 8 }}>{c.tag}</div>
            <h1 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, color: A.navy, lineHeight: 1.25, marginBottom: 18 }}>{c.h1}</h1>
            <p style={{ fontSize: 16, color: A.muted, lineHeight: 1.75, marginBottom: 20 }}>{c.lead}</p>

            <div style={{ background: "#eef4fc", border: `1px solid ${A.primary}`, borderRadius: 8, padding: "14px 18px", marginBottom: 32, fontSize: 14, lineHeight: 1.7 }}>
              <strong style={{ color: A.navy }}>{L.ui.summary.replace("{groups}", String(groups.length)).replace("{tiers}", String(FINE_TIER_COUNT))}</strong>
              <span style={{ margin: "0 8px", color: A.border }}>|</span>
              <a href={`/${locale}/fines`} style={{ color: A.primary, fontWeight: 700, textDecoration: "none" }}>{L.ui.seeAll} →</a>
            </div>

            {groups.map((g) => (
              <div key={g.id} id={g.id} style={{ marginBottom: 32, scrollMarginTop: 90 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: g.severity === "high" ? A.red : A.navy, marginBottom: 6 }}>{g.title}</h2>
                <div style={{ fontSize: 12, color: A.primary, marginBottom: 4, fontWeight: 600 }}>{L.kinds[g.kind]} · {g.lawText}</div>
                <p style={{ fontSize: 14, color: A.muted, marginBottom: 10, lineHeight: 1.6 }}>{g.desc}</p>
                <table style={{ width: "100%", borderCollapse: "collapse" as const, tableLayout: "fixed" as const, fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: g.severity === "high" ? "#fff1f2" : "#f1f5f9" }}>
                      <th scope="col" style={{ width: "58%", padding: "8px 10px", textAlign: "left" as const, borderBottom: `1px solid ${A.border}`, fontWeight: 600, color: A.navy }}>{g.scale === "count" ? L.ui.colCount : L.ui.colPeriod}</th>
                      <th scope="col" style={{ padding: "8px 10px", textAlign: "right" as const, borderBottom: `1px solid ${A.border}`, fontWeight: 600, color: g.severity === "high" ? A.red : A.navy }}>{L.ui.colAmount}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.rows.map((r) => (
                      <tr key={r.key} style={{ borderBottom: `1px solid ${A.border}` }}>
                        <th scope="row" style={{ padding: "8px 10px", textAlign: "left" as const, fontWeight: 400, color: A.muted }}>{r.period}</th>
                        <td style={{ padding: "8px 10px", textAlign: "right" as const, fontWeight: 600, color: g.severity === "high" ? A.red : A.navy, whiteSpace: "nowrap" as const }}>{r.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {g.byHeadcount ? <p style={{ fontSize: 12, color: "#b45309", margin: "10px 0 0", lineHeight: 1.6 }}>{L.ui.headcountNote}</p> : null}
              </div>
            ))}

            <div style={{ background: "#fffbeb", border: `1px solid ${A.warnBorder}`, borderRadius: 8, padding: "16px 20px", marginBottom: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 15 }}>{c.tip1}</div>
              <p style={{ fontSize: 14, color: "#78350f", lineHeight: 1.65, margin: 0 }}>{c.tip1body}</p>
            </div>
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "16px 20px", marginBottom: 36 }}>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 15, color: A.red }}>{c.tip2}</div>
              <p style={{ fontSize: 14, color: "#7f1d1d", lineHeight: 1.65, margin: 0 }}>{c.tip2body}</p>
            </div>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: A.navy, marginBottom: 16 }}>{c.faqTitle}</h2>
            {c.faqs.map((faq, i) => (
              <div key={i} style={{ marginBottom: 16, padding: "16px 20px", background: "#fff", border: `1px solid ${A.border}`, borderRadius: 8 }}>
                <div style={{ fontWeight: 700, color: A.navy, marginBottom: 6, fontSize: 15 }}>Q. {faq.q}</div>
                <div style={{ color: A.muted, fontSize: 14, lineHeight: 1.65 }}>A. {faq.a}</div>
              </div>
            ))}

            <div style={{ marginTop: 40, background: A.primary, borderRadius: 10, padding: "28px 24px", textAlign: "center" as const }}>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, marginBottom: 14, lineHeight: 1.6 }}>{c.ctaBody}</p>
              <a href={`/${locale}/contact`} style={{ display: "inline-block", background: "#fff", color: A.primary, padding: "12px 28px", borderRadius: 6, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>{c.cta}</a>
            </div>

            <div style={{ marginTop: 20, background: A.warn, border: `1px solid ${A.warnBorder}`, borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{c.notice}</div>
            <div style={{ marginTop: 24, display: "flex", gap: 18, flexWrap: "wrap" as const }}>
              <a href={`/${locale}/offenses`} style={{ color: A.primary, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>← {c.back}</a>
              <a href={`/${locale}/fines`} style={{ color: A.primary, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>{L.ui.seeAll} →</a>
            </div>
          </div>
        </main>
      );
    },
  },
  assault: {
    meta: {
      ko: { title: "폭행·상해 사건과 출입국 심사 · Law in Korea", description: "외국인의 폭행·상해 사건이 체류 자격에 미치는 영향과 사범심사 대응 방법 — 선샤인행정사사무소." },
      en: { title: "Assault & Battery — Immigration Review in Korea · Law in Korea", description: "How assault and bodily injury convictions affect foreign nationals' visa status in Korea and how to respond to an immigration offense review." },
      ja: { title: "暴行・傷害事件と出入国審査 · Law in Korea", description: "外国人の暴行・傷害事件が在留資格に与える影響と犯則審査への対応方法。" },
      zh: { title: "暴行·伤害案件与出入境审查 · Law in Korea", description: "外国人暴行·伤害案件对居留资格的影响及出入境犯罪审查应对方法。" },
      vi: { title: "Vụ án bạo hành & xem xét xuất nhập cảnh · Law in Korea", description: "Bị kết án bạo hành ảnh hưởng thế nào đến tư cách lưu trú của người nước ngoài tại Hàn Quốc và cách ứng phó." },
    },
    render: (l, locale) => {
      const t = {
        ko: { tag: "폭행·상해", h1: "폭행·상해 사건과 출입국 심사", lead: "폭행·상해 사건은 체류 자격 심사(사범심사) 대상이 될 수 있습니다. 형사 처분이 마무리된 이후에도 별도의 출입국 심사가 진행될 수 있으며, 피해 정도와 전과 유무가 처분 수위에 큰 영향을 미칩니다.", s1: "폭행·상해가 체류 자격에 미치는 영향", p1: "출입국관리법 제11조는 사회 안전을 해칠 우려가 있는 외국인을 입국 금지 또는 심사 대상으로 규정합니다. 폭행·상해 전과는 비자 갱신·변경 시에도 검토됩니다.", items1: ["단순폭행(형법 제260조): 경미한 경우 출국권고 + 재입국 금지 1년 이내 가능", "상해(형법 제257조): 중등도 이상이면 강제퇴거 가능성", "중상해·특수폭행: 강제퇴거 및 장기 재입국 금지 가능", "피해자 합의 여부가 처분 수위에 유리하게 작용"], s2: "사범심사 절차", p2: "폭행·상해 사건으로 형사 처분 이후 출입국 사범심사가 진행될 수 있습니다.", steps: ["경찰·검찰 수사 종결 → 출입국 당국 통보", "출입국·외국인청 출석 통지", "심사관 면담 (사건 경위, 피해 정도, 재범 가능성)", "처분 결정: ① 체류 유지 ② 출국권고 ③ 강제퇴거"], s3: "선샤인행정사사무소가 할 수 있는 일", p3: "선샤인행정사사무소는 다음과 같이 대응합니다:", services: ["사범심사 대리 및 의견서 제출", "피해자 합의 자료 및 정상 참작 서류 준비", "초범·우발적 사건의 경우 처분 경감 협의", "체류 자격 유지를 위한 전략적 대응"], cta: "지금 상담 예약", back: "사건 유형 목록으로", faqTitle: "자주 묻는 질문", faqs: [{ q: "싸움 한 번으로 강제퇴거가 될 수 있나요?", a: "가능합니다. 단순폭행도 사범심사 대상이 되며, 피해 정도·전과·체류 기간에 따라 처분이 결정됩니다." }, { q: "무죄 판결을 받으면 출입국 심사에 영향이 없나요?", a: "형사 무죄가 출입국 심사에서도 면제를 보장하지 않습니다. 출입국 심사는 독립적으로 진행됩니다." }, { q: "폭행과 상해의 차이는 무엇인가요?", a: "폭행은 신체에 대한 유형력 행사이고, 상해는 그 결과로 신체적 손상이 발생한 경우입니다. 상해는 더 중한 처분으로 이어질 수 있습니다." }], notice: "※ 이 페이지는 일반적인 법령 정보 제공 목적이며 개별 사건에 대한 법률 조언이 아닙니다. 구체적인 상담은 선샤인행정사사무소에 문의하십시오." },
        en: { tag: "Assault & Battery", h1: "Assault Offense & Immigration Review in Korea", lead: "Assault and bodily injury offenses by foreign nationals in Korea can trigger a separate immigration offense review (사범심사) even after criminal proceedings conclude. The severity of injury and prior record significantly affect the outcome.", s1: "How Assault Affects Your Visa Status", p1: "Article 11 of the Immigration Control Act designates persons deemed a threat to public safety as subject to entry ban or immigration review. Assault convictions are also scrutinised during visa renewal and change applications.", items1: ["Simple assault (Art. 260): Minor cases — departure recommendation + re-entry ban up to 1 year", "Bodily injury (Art. 257): Moderate or severe injury raises forced departure risk", "Serious injury / aggravated assault: Forced departure and long re-entry ban possible", "Victim settlement (합의) is a significant mitigating factor"], s2: "The Offense Review Process", p2: "After a criminal disposition for assault, immigration may initiate a separate offense review.", steps: ["Police/prosecutor investigation concluded → Notification to immigration", "Summons from Immigration Office", "Officer interview (circumstances, severity, recidivism risk)", "Decision: ① Continue stay ② Departure recommendation ③ Forced departure"], s3: "How Vision Can Help", p3: "Our office provides:", services: ["Representation and written opinion at the offense review", "Preparation of victim settlement and mitigating documents", "Negotiation for reduced penalty in first-offense or impulsive incidents", "Strategic response to protect your residency status"], cta: "Book a Consultation", back: "Back to Offense Types", faqTitle: "Frequently Asked Questions", faqs: [{ q: "Can a single fight lead to deportation?", a: "Yes. Even simple assault can trigger an immigration review. The outcome depends on severity, prior record, and length of stay." }, { q: "Does acquittal in criminal court affect the immigration review?", a: "Not automatically. The immigration offense review is independent. A criminal acquittal is helpful but does not guarantee no immigration consequence." }, { q: "What is the difference between assault and bodily injury charges?", a: "Assault involves the application of force; bodily injury results in physical harm. Immigration reviews treat bodily injury more seriously." }], notice: "This page provides general legal information only and does not constitute legal advice for individual cases." },
        ja: { tag: "暴行・傷害事件", h1: "暴行・傷害事件と出入国審査", lead: "外国人の暴行・傷害事件は、刑事処分が終わった後も別途の在留審査（사범심사）が行われる場合があります。被害の程度と前科の有無が処分に大きく影響します。", s1: "暴行・傷害事件が在留資格に与える影響", p1: "出入国管理法第11条は社会安全を脅かすおそれのある外国人を入国禁止または審査対象と規定しています。暴行・傷害前科はビザ更新・変更時にも審査されます。", items1: ["単純暴行（刑法第260条）：軽微な場合、出国勧告＋再入国禁止1年以内", "傷害（刑法第257条）：中程度以上は強制退去の可能性", "重傷害・特殊暴行：強制退去および長期再入国禁止の可能性", "被害者との示談が処分に有利に作用"], s2: "犯則審査の手続き", p2: "暴行・傷害事件の刑事処分後、出入国犯則審査が行われる場合があります。", steps: ["警察・検察の捜査終結 → 出入国当局への通報", "出入国・外国人庁からの出頭通知", "審査官面談（事件経緯・被害程度・再犯リスク）", "処分決定：① 在留継続 ② 出国勧告 ③ 強制退去"], s3: "Visionにできること", p3: "当事務所は以下のサービスを提供します：", services: ["犯則審査への代理出席と意見書提出", "被害者示談・情状酌量資料の準備", "初犯・偶発的事案における処分軽減交渉", "在留資格維持のための戦略的対応"], cta: "今すぐ相談予約", back: "違反の種類一覧へ", faqTitle: "よくある質問", faqs: [{ q: "一度の喧嘩で強制退去になりますか？", a: "可能性があります。単純暴行でも犯則審査の対象となり、被害程度・前科・在留期間によって処分が決まります。" }, { q: "無罪判決があれば出入国審査に影響しませんか？", a: "刑事無罪は出入国審査での免除を保証しません。審査は独立して行われます。" }, { q: "暴行と傷害の違いは何ですか？", a: "暴行は有形力の行使であり、傷害はその結果として身体的損害が生じた場合です。傷害の方がより重い処分につながる可能性があります。" }], notice: "※ このページは一般的な法令情報の提供を目的としており、個別事案に対する法的助言ではありません。" },
        zh: { tag: "暴行·伤害案件", h1: "暴行·伤害案件与出入境审查", lead: "外国人暴行·伤害案件在刑事程序结束后，仍可能进行单独的出入境犯罪审查。伤害程度与前科情况对处分结果影响重大。", s1: "暴行·伤害对居留资格的影响", p1: "《出入境管理法》第11条将可能危害社会安全的外国人列为入境禁止或审查对象。暴行·伤害前科在续签签证时也会被审查。", items1: ["简单暴行（刑法第260条）：轻微情形可能被建议出境，再入境禁止1年以内", "伤害（刑法第257条）：中度以上伤害有强制出境风险", "重伤害·特殊暴行：强制出境及长期禁止再入境可能性高", "与被害人和解可对处分产生积极影响"], s2: "犯罪审查程序", p2: "暴行·伤害案件刑事处分后，可能启动出入境犯罪审查。", steps: ["警察·检察侦查结束 → 通知出入境当局", "出入境·外国人厅发出席通知", "审查官面谈（案件经过·伤害程度·再犯风险）", "处分决定：① 继续居留 ② 建议出境 ③ 强制出境"], s3: "Vision能提供的帮助", p3: "本事务所提供以下服务：", services: ["代理出席犯罪审查并提交书面意见", "准备被害人和解及从轻处罚材料", "初犯·偶发事件处分减轻协商", "保护居留资格的战略性应对"], cta: "立即预约咨询", back: "返回违规类型列表", faqTitle: "常见问题", faqs: [{ q: "打一次架会被强制遣返吗？", a: "有可能。即使是简单暴行也可能触发出入境审查，结果取决于伤害程度、前科及居留时间。" }, { q: "刑事无罪判决对出入境审查有影响吗？", a: "不一定。出入境审查独立进行，刑事无罪并不保证不受出入境处分。" }, { q: "暴行与伤害有何区别？", a: "暴行是对身体施加有形力；伤害是造成身体损害的结果。出入境审查对伤害的处分更为严重。" }], notice: "※ 本页面仅供一般法律信息参考，不构成针对个案的法律建议。" },
        vi: { tag: "Bạo hành & Thương tích", h1: "Vụ án bạo hành & xem xét vi phạm xuất nhập cảnh", lead: "Các vụ án bạo hành và gây thương tích của người nước ngoài tại Hàn Quốc có thể kích hoạt xem xét vi phạm xuất nhập cảnh riêng biệt ngay cả sau khi thủ tục hình sự kết thúc.", s1: "Vụ án bạo hành ảnh hưởng thế nào đến tư cách lưu trú?", p1: "Điều 11 Luật Quản lý Xuất nhập cảnh quy định người nước ngoài bị coi là mối đe dọa an toàn công cộng là đối tượng bị cấm nhập cảnh hoặc xem xét. Tiền án bạo hành cũng được kiểm tra khi gia hạn visa.", items1: ["Bạo hành đơn giản (Điều 260): Trường hợp nhẹ — khuyến nghị xuất cảnh + cấm tái nhập cảnh đến 1 năm", "Gây thương tích (Điều 257): Mức độ vừa trở lên có nguy cơ bị trục xuất", "Gây thương tích nặng/bạo hành đặc biệt: Nguy cơ cao bị trục xuất và cấm dài hạn", "Hòa giải với nạn nhân là yếu tố giảm nhẹ quan trọng"], s2: "Quy trình xem xét vi phạm", p2: "Sau xử lý hình sự về bạo hành, cơ quan xuất nhập cảnh có thể tiến hành xem xét vi phạm riêng.", steps: ["Kết thúc điều tra cảnh sát/kiểm sát → Thông báo cơ quan xuất nhập cảnh", "Cơ quan Xuất nhập cảnh gửi giấy triệu tập", "Phỏng vấn điều tra viên (hoàn cảnh vụ án, mức độ thương tích, nguy cơ tái phạm)", "Quyết định: ① Tiếp tục lưu trú ② Khuyến nghị xuất cảnh ③ Trục xuất"], s3: "Vision có thể hỗ trợ gì?", p3: "Văn phòng chúng tôi cung cấp:", services: ["Đại diện tại buổi xem xét vi phạm và nộp ý kiến bằng văn bản", "Chuẩn bị tài liệu hòa giải với nạn nhân và giảm nhẹ", "Đàm phán giảm nhẹ xử phạt cho lần đầu hoặc vụ việc bộc phát", "Ứng phó chiến lược để bảo vệ tư cách lưu trú"], cta: "Đặt lịch tư vấn ngay", back: "Quay lại danh sách vi phạm", faqTitle: "Câu hỏi thường gặp", faqs: [{ q: "Một lần đánh nhau có thể dẫn đến trục xuất không?", a: "Có. Ngay cả bạo hành đơn giản cũng có thể kích hoạt xem xét. Kết quả phụ thuộc vào mức độ nghiêm trọng, tiền án và thời gian lưu trú." }, { q: "Được tuyên vô tội có ảnh hưởng đến xem xét xuất nhập cảnh không?", a: "Không tự động. Xem xét xuất nhập cảnh tiến hành độc lập. Vô tội hình sự hữu ích nhưng không đảm bảo không có hậu quả xuất nhập cảnh." }, { q: "Sự khác biệt giữa tội bạo hành và gây thương tích là gì?", a: "Bạo hành là dùng vũ lực đối với người khác; gây thương tích là khi hành động đó dẫn đến tổn thương thể chất. Xem xét xuất nhập cảnh xử lý gây thương tích nghiêm khắc hơn." }], notice: "Trang này chỉ cung cấp thông tin pháp luật chung và không phải lời khuyên pháp lý cho từng trường hợp cụ thể." },
      };
      const c = t[l] || t.ko;
      const ACCENT = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E9ECEF", bg: "#f8f9fb", warn: "#fff8e6", warnBorder: "#f59e0b" };
      return (
        <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: ACCENT.primary, marginBottom: 8 }}>{c.tag}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: ACCENT.navy, lineHeight: 1.25, marginBottom: 18 }}>{c.h1}</h1>
            <p style={{ fontSize: 17, color: ACCENT.muted, lineHeight: 1.75, marginBottom: 36, borderBottom: `1px solid ${ACCENT.border}`, paddingBottom: 32 }}>{c.lead}</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s1}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p1}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.items1.map((item, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{item}</li>)}</ul>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s2}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p2}</p>
            <ol style={{ paddingLeft: 22, marginBottom: 32 }}>{c.steps.map((step, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{step}</li>)}</ol>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s3}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p3}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.services.map((svc, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{svc}</li>)}</ul>
            <div style={{ background: ACCENT.primary, color: "#fff", borderRadius: 10, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 18, marginBottom: 40 }}>
              <div><div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>선샤인행정사사무소</div><div style={{ opacity: 0.9, fontSize: 15 }}>서울 중구 퇴계로 324, 3층 · +82-2-363-2251</div></div>
              <a href={`/${locale}#contact`} style={{ background: "#fff", color: ACCENT.primary, padding: "11px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" as const }}>{c.cta}</a>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 18 }}>{c.faqTitle}</h2>
            {c.faqs.map((faq, i) => (<div key={i} style={{ borderTop: `1px solid ${ACCENT.border}`, padding: "18px 0" }}><div style={{ fontWeight: 600, color: ACCENT.navy, marginBottom: 8, fontSize: 15 }}>{faq.q}</div><div style={{ color: ACCENT.muted, lineHeight: 1.7, fontSize: 14 }}>{faq.a}</div></div>))}
            <div style={{ marginTop: 40, background: ACCENT.warn, border: `1px solid ${ACCENT.warnBorder}`, borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{c.notice}</div>
            <div style={{ marginTop: 32 }}><a href={`/${locale}/offenses`} style={{ color: ACCENT.primary, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>← {c.back}</a></div>
          </div>
        </main>
      );
    },
  },
  dui: {
    meta: {
      ko: { title: "음주운전과 비자·체류 자격 영향 · Law in Korea", description: "음주운전(DUI)이 외국인의 비자 갱신·체류 자격에 미치는 영향과 사범심사 대응 방법 — 선샤인행정사사무소." },
      en: { title: "DUI & Visa Status in Korea · Law in Korea", description: "How a drunk driving conviction affects visa renewal and residency for foreign nationals in Korea and how to respond." },
      ja: { title: "飲酒運転とビザ・在留資格への影響 · Law in Korea", description: "飲酒運転（DUI）が外国人のビザ更新・在留資格に与える影響と対応方法。" },
      zh: { title: "酒驾与签证·居留资格影响 · Law in Korea", description: "酒驾（DUI）对外国人签证续签及居留资格的影响与应对方法。" },
      vi: { title: "DUI & Tư cách lưu trú tại Hàn Quốc · Law in Korea", description: "Bị kết án lái xe say rượu ảnh hưởng thế nào đến gia hạn visa và cư trú của người nước ngoài tại Hàn Quốc." },
    },
    render: (l, locale) => {
      const t = {
        ko: { tag: "음주운전", h1: "음주운전과 비자·체류 자격", lead: "음주운전(DUI)은 한국에서 체류 중인 외국인의 비자 갱신·변경, 체류 자격 유지에 직접적인 영향을 줄 수 있습니다. 특히 반복 음주운전은 사범심사로 이어질 가능성이 높습니다.", s1: "음주운전이 체류 자격에 미치는 영향", p1: "도로교통법 제44조는 혈중알코올농도 0.03% 이상을 음주운전으로 규정합니다. 외국인이 음주운전으로 처벌받으면 비자 갱신 심사 시 전과 내역으로 반영될 수 있습니다.", items1: ["초범·BAC 0.03~0.08%: 비자 갱신 시 소명 요구 가능성", "초범·BAC 0.08% 이상 또는 사고 동반: 갱신 불허 또는 사범심사 가능성", "반복 음주운전: 사범심사 및 강제퇴거 위험 증가", "취업비자(E-7 등) 소지자의 경우 고용 자격에도 영향 가능"], s2: "사범심사 절차", p2: "음주운전 전과가 비자 심사에서 드러나거나 재범 시 사범심사가 진행될 수 있습니다.", steps: ["음주운전 적발 → 형사 처분 (벌금·면허정지·실형)", "비자 갱신·변경 신청 시 전과 검토", "필요 시 출입국 사범심사 통보 및 출석 요구", "처분 결정: ① 갱신 허가 ② 조건부 허가 ③ 불허"], s3: "선샤인행정사사무소가 할 수 있는 일", p3: "선샤인행정사사무소는 다음과 같이 지원합니다:", services: ["음주운전 전과 공개 전략 수립 (비자 신청 시)", "정상 참작 자료 준비 (반성문, 음주 교육 수료증 등)", "사범심사 대리 및 의견서 제출", "취업비자 소지자의 고용주 대응 지원"], cta: "지금 상담 예약", back: "사건 유형 목록으로", faqTitle: "자주 묻는 질문", faqs: [{ q: "음주운전 1회로 비자 갱신이 거절될 수 있나요?", a: "가능성이 있습니다. 혈중알코올 수치, 사고 여부, 처벌 수위에 따라 갱신 심사에서 소명 요구 또는 불허가 발생할 수 있습니다." }, { q: "초범과 반복 음주운전의 출입국 처분 차이는?", a: "초범은 주로 비자 갱신 시 소명 수준에서 마무리되는 경우가 많으나, 반복 음주운전은 사범심사 및 강제퇴거 위험이 크게 높아집니다." }, { q: "취업비자로 운전 업무 중 음주운전 적발 시 문제가 되나요?", a: "네. 취업비자로 운전 업무를 수행하는 경우 음주운전은 직무 관련 위반으로 더 중하게 처분될 수 있습니다." }], notice: "※ 이 페이지는 일반적인 법령 정보 제공 목적이며 개별 사건에 대한 법률 조언이 아닙니다." },
        en: { tag: "DUI / Drunk Driving", h1: "DUI Offense & Your Visa Status in Korea", lead: "A drunk driving (DUI) conviction under Korea's Road Traffic Act can affect your visa renewal, status change, and overall residency. Repeat DUI significantly increases immigration enforcement risk.", s1: "How DUI Affects Your Visa", p1: "Korea's Road Traffic Act Article 44 defines drunk driving at 0.03% BAC and above. A DUI conviction becomes part of your criminal record and may be flagged during visa renewal or change applications.", items1: ["First offense, BAC 0.03–0.08%: Possible request to explain during visa renewal", "First offense, BAC 0.08%+ or accident: Risk of renewal denial or immigration review", "Repeat DUI: Elevated risk of immigration review and forced departure", "Work visa (E-series) holders: Employment qualification may be affected"], s2: "The Review Process", p2: "A DUI conviction can surface during visa renewal screening or trigger an immigration offense review.", steps: ["DUI arrest → Criminal disposition (fine, license suspension, imprisonment)", "DUI conviction reviewed during visa renewal/change application", "If flagged: immigration offense review notice and summons", "Decision: ① Renewal approved ② Conditional approval ③ Denial"], s3: "How Vision Can Help", p3: "Our office assists with:", services: ["Strategy for disclosing DUI conviction in visa applications", "Preparation of mitigating documents (reflection letter, DUI education certificate)", "Representation and written opinion for immigration review", "Employer support for work visa holders"], cta: "Book a Consultation", back: "Back to Offense Types", faqTitle: "Frequently Asked Questions", faqs: [{ q: "Can a single DUI cause my visa renewal to be denied?", a: "It depends on BAC level, whether an accident occurred, and the penalty imposed. Low-level first offenses typically result in a request for explanation; more serious ones may lead to denial." }, { q: "What is the difference in immigration consequences between a first and repeat DUI?", a: "A first offense usually surfaces as a question during renewal. Repeat offenses significantly raise the risk of an immigration review and potential forced departure." }, { q: "I drive commercially on a work visa. Will a DUI affect my visa?", a: "Yes. Driving-related work visa holders who receive a DUI face heightened scrutiny as it directly relates to their permitted activities." }], notice: "This page provides general legal information only and does not constitute legal advice." },
        ja: { tag: "飲酒運転", h1: "飲酒運転とビザ・在留資格", lead: "飲酒運転（DUI）は韓国在住の外国人のビザ更新・変更や在留資格維持に直接影響を与える可能性があります。特に繰り返しの飲酒運転は犯則審査につながるリスクがあります。", s1: "飲酒運転が在留資格に与える影響", p1: "道路交通法第44条は血中アルコール濃度0.03%以上を飲酒運転と定めています。外国人が飲酒運転で処罰された場合、ビザ更新時に前科として照会される可能性があります。", items1: ["初犯・BAC 0.03〜0.08%：ビザ更新時に説明要求の可能性", "初犯・BAC 0.08%以上または事故伴う：更新不許可または犯則審査の可能性", "繰り返し飲酒運転：犯則審査および強制退去リスク増大", "就労ビザ（E-7等）保有者の場合：雇用資格に影響の可能性"], s2: "審査手続き", p2: "飲酒運転の前科がビザ審査で発覚するか、再犯の場合に犯則審査が開始される可能性があります。", steps: ["飲酒運転摘発 → 刑事処分（罰金・免許停止・実刑）", "ビザ更新・変更申請時に前科照会", "必要に応じ出入国犯則審査の通知・出頭要求", "処分決定：① 更新許可 ② 条件付き許可 ③ 不許可"], s3: "Visionにできること", p3: "当事務所は以下をサポートします：", services: ["ビザ申請時の飲酒運転前科開示戦略の立案", "情状酌量資料の準備（反省文・飲酒教育修了証等）", "犯則審査への代理出席と意見書提出", "就労ビザ保有者の雇用主対応支援"], cta: "今すぐ相談予約", back: "違反の種類一覧へ", faqTitle: "よくある質問", faqs: [{ q: "飲酒運転1回でビザ更新が拒否されますか？", a: "血中アルコール濃度、事故の有無、処罰の程度によります。軽微な初犯は説明要求で終わることが多いですが、重大な場合は不許可になる可能性があります。" }, { q: "初犯と繰り返し飲酒運転では出入国処分にどう違いますか？", a: "初犯は更新時の照会程度で済むことが多いですが、繰り返し飲酒運転は犯則審査・強制退去リスクが大幅に高まります。" }, { q: "就労ビザで業務用車両を運転中に飲酒運転で摘発された場合は？", a: "就労ビザの許可活動に直接関わるため、より重く審査される可能性があります。" }], notice: "※ このページは一般的な法令情報の提供を目的としており、個別事案の法的助言ではありません。" },
        zh: { tag: "酒驾", h1: "酒驾与签证·居留资格", lead: "酒驾（DUI）可能直接影响在韩外国人的签证续签、变更及居留资格维持。反复酒驾将大幅增加被出入境执法的风险。", s1: "酒驾对居留资格的影响", p1: "韩国《道路交通法》第44条规定血液酒精浓度0.03%以上为酒驾。外国人因酒驾受到处罚，续签时可能被列为前科记录审查。", items1: ["初犯·BAC 0.03–0.08%：续签时可能被要求说明", "初犯·BAC 0.08%以上或涉及事故：续签不批或出入境审查风险", "反复酒驾：出入境审查及强制出境风险显著上升", "持就业签证（E-7等）者：雇用资格可能受影响"], s2: "审查程序", p2: "酒驾前科在签证续签审查中被发现，或再犯时可能启动犯罪审查。", steps: ["酒驾被查 → 刑事处分（罚款·吊销驾照·实刑）", "签证续签·变更申请时前科审查", "必要时出入境通知并要求出席", "处分决定：① 批准续签 ② 附条件批准 ③ 不予批准"], s3: "Vision能提供的帮助", p3: "本事务所提供以下服务：", services: ["签证申请时酒驾前科披露策略制定", "准备从轻处罚材料（悔过书、酒驾教育证书等）", "代理出席出入境审查并提交书面意见", "就业签证持有人的雇主应对支持"], cta: "立即预约咨询", back: "返回违规类型列表", faqTitle: "常见问题", faqs: [{ q: "一次酒驾会导致签证续签被拒吗？", a: "视血液酒精浓度、是否发生事故及处罚程度而定。轻微初犯通常只需说明，严重情形可能被拒签。" }, { q: "初犯与多次酒驾的出入境处分有何不同？", a: "初犯通常在续签审查中询问了解，多次酒驾将大幅增加出入境审查和强制出境风险。" }, { q: "持就业签证驾驶营业车辆后酒驾被查会有问题吗？", a: "是的。与许可活动直接相关，将受到更严格审查。" }], notice: "※ 本页面仅供一般法律信息参考，不构成针对个案的法律建议。" },
        vi: { tag: "Lái xe say rượu (DUI)", h1: "Vi phạm DUI & Tư cách lưu trú tại Hàn Quốc", lead: "Bị kết án lái xe say rượu (DUI) theo Luật Giao thông Đường bộ Hàn Quốc có thể ảnh hưởng đến gia hạn visa và tư cách lưu trú. DUI tái phạm làm tăng đáng kể nguy cơ bị cơ quan xuất nhập cảnh xử lý.", s1: "DUI ảnh hưởng thế nào đến tư cách lưu trú?", p1: "Điều 44 Luật Giao thông Đường bộ định nghĩa lái xe say rượu ở mức BAC 0,03% trở lên. Bị kết án DUI sẽ được ghi vào tiền án và có thể bị kiểm tra khi gia hạn hoặc thay đổi visa.", items1: ["Lần đầu, BAC 0,03–0,08%: Có thể bị yêu cầu giải thích khi gia hạn visa", "Lần đầu, BAC 0,08%+ hoặc có tai nạn: Nguy cơ từ chối gia hạn hoặc xem xét xuất nhập cảnh", "DUI tái phạm: Tăng nguy cơ xem xét xuất nhập cảnh và trục xuất", "Người có visa làm việc E: Tư cách tuyển dụng có thể bị ảnh hưởng"], s2: "Quy trình xem xét", p2: "Tiền án DUI có thể xuất hiện khi gia hạn visa hoặc kích hoạt xem xét vi phạm xuất nhập cảnh.", steps: ["Bị bắt DUI → Xử lý hình sự (phạt tiền, tước bằng lái, tù giam)", "Tiền án DUI được xem xét khi gia hạn/thay đổi visa", "Nếu bị đánh dấu: thông báo xem xét vi phạm và triệu tập", "Quyết định: ① Chấp thuận gia hạn ② Chấp thuận có điều kiện ③ Từ chối"], s3: "Vision có thể hỗ trợ gì?", p3: "Văn phòng chúng tôi hỗ trợ:", services: ["Chiến lược công khai tiền án DUI trong hồ sơ visa", "Chuẩn bị tài liệu giảm nhẹ (thư phản tỉnh, chứng chỉ giáo dục DUI)", "Đại diện và ý kiến bằng văn bản cho xem xét xuất nhập cảnh", "Hỗ trợ người sử dụng lao động cho người có visa làm việc"], cta: "Đặt lịch tư vấn ngay", back: "Quay lại danh sách vi phạm", faqTitle: "Câu hỏi thường gặp", faqs: [{ q: "Một lần DUI có thể khiến visa bị từ chối gia hạn không?", a: "Phụ thuộc vào mức BAC, có tai nạn không và mức phạt. Lần đầu nhẹ thường chỉ cần giải thích; nghiêm trọng hơn có thể bị từ chối." }, { q: "Hậu quả xuất nhập cảnh khác nhau thế nào giữa lần đầu và tái phạm DUI?", a: "Lần đầu thường chỉ được hỏi khi gia hạn. Tái phạm làm tăng đáng kể nguy cơ xem xét và trục xuất." }, { q: "Tôi lái xe thương mại theo visa làm việc, DUI có ảnh hưởng visa không?", a: "Có. Vi phạm trực tiếp liên quan đến hoạt động được phép theo visa nên sẽ bị xem xét nghiêm khắc hơn." }], notice: "Trang này chỉ cung cấp thông tin pháp luật chung và không phải lời khuyên pháp lý." },
      };
      const c = t[l] || t.ko;
      const ACCENT = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E9ECEF", bg: "#f8f9fb", warn: "#fff8e6", warnBorder: "#f59e0b" };
      return (
        <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: ACCENT.primary, marginBottom: 8 }}>{c.tag}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: ACCENT.navy, lineHeight: 1.25, marginBottom: 18 }}>{c.h1}</h1>
            <p style={{ fontSize: 17, color: ACCENT.muted, lineHeight: 1.75, marginBottom: 36, borderBottom: `1px solid ${ACCENT.border}`, paddingBottom: 32 }}>{c.lead}</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s1}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p1}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.items1.map((item, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{item}</li>)}</ul>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s2}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p2}</p>
            <ol style={{ paddingLeft: 22, marginBottom: 32 }}>{c.steps.map((step, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{step}</li>)}</ol>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s3}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p3}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.services.map((svc, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{svc}</li>)}</ul>
            <div style={{ background: ACCENT.primary, color: "#fff", borderRadius: 10, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 18, marginBottom: 40 }}>
              <div><div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>선샤인행정사사무소</div><div style={{ opacity: 0.9, fontSize: 15 }}>서울 중구 퇴계로 324, 3층 · +82-2-363-2251</div></div>
              <a href={`/${locale}#contact`} style={{ background: "#fff", color: ACCENT.primary, padding: "11px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" as const }}>{c.cta}</a>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 18 }}>{c.faqTitle}</h2>
            {c.faqs.map((faq, i) => (<div key={i} style={{ borderTop: `1px solid ${ACCENT.border}`, padding: "18px 0" }}><div style={{ fontWeight: 600, color: ACCENT.navy, marginBottom: 8, fontSize: 15 }}>{faq.q}</div><div style={{ color: ACCENT.muted, lineHeight: 1.7, fontSize: 14 }}>{faq.a}</div></div>))}
            <div style={{ marginTop: 40, background: ACCENT.warn, border: `1px solid ${ACCENT.warnBorder}`, borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{c.notice}</div>
            <div style={{ marginTop: 32 }}><a href={`/${locale}/offenses`} style={{ color: ACCENT.primary, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>← {c.back}</a></div>
          </div>
        </main>
      );
    },
  },
  overstay: {
    meta: {
      ko: { title: "체류기간 초과(오버스테이) 대응 가이드 · Law in Korea", description: "한국에서 체류기간을 초과한 외국인을 위한 처분 안내, 자진 출국 전략, 재입국 금지 기간 단축 방법 — 선샤인행정사사무소." },
      en: { title: "Overstaying Your Visa in Korea — What Happens & What To Do · Law in Korea", description: "Consequences of overstaying a Korean visa, voluntary departure strategy, and how to minimize re-entry bans." },
      ja: { title: "在留期間超過（オーバーステイ）対応ガイド · Law in Korea", description: "韓国での在留期間超過に対する処分、自進出国戦略、再入国禁止期間短縮方法の解説。" },
      zh: { title: "超期滞留应对指南 · Law in Korea", description: "在韩超期滞留的处分说明、自愿出境策略及缩短再入境禁止期的方法。" },
      vi: { title: "Ở quá hạn visa tại Hàn Quốc — Hậu quả & Cách ứng phó · Law in Korea", description: "Hậu quả của việc ở quá hạn visa Hàn Quốc, chiến lược tự nguyện xuất cảnh và cách giảm thiểu lệnh cấm tái nhập cảnh." },
    },
    render: (l, locale) => {
      const t = {
        ko: { tag: "체류기간 초과", h1: "체류기간 초과(오버스테이)와 출입국 처분", lead: "체류 기간을 단 하루라도 초과하면 불법 체류가 됩니다. 자진 출국 또는 적발 여부, 초과 기간에 따라 처분 수위가 크게 달라집니다.", s1: "체류기간 초과의 법적 의미와 처분", p1: "출입국관리법 제17조는 외국인이 허가된 체류 기간 내 체류해야 함을 규정하며, 동법 제94조는 초과 시 처벌 규정을 둡니다.", items1: ["단기 초과(1개월 미만): 범칙금 부과, 자진 출국 시 재입국 금지 1년 가능", "중기 초과(1~6개월): 범칙금 증가 + 재입국 금지 1~3년", "장기 초과(6개월 이상): 강제퇴거 및 재입국 금지 3~5년 이상", "자진 신고 vs 적발: 자진 신고 시 처분 경감 가능"], s2: "처분 절차", p2: "체류기간 초과가 확인되면 다음 절차가 진행됩니다.", steps: ["초과 사실 확인 (자진 신고 또는 단속 적발)", "출입국·외국인청 출석 및 조사", "범칙금 부과 및 처분 결정", "출국 이행 또는 강제퇴거 집행"], s3: "선샤인행정사사무소가 할 수 있는 일", p3: "선샤인행정사사무소는 다음 서비스를 제공합니다:", services: ["자진 출국 전 처분 최소화 전략 수립", "재입국 금지 기간 단축을 위한 소명 자료 준비", "강제퇴거 위기 시 사범심사 대리", "출국 후 재입국 금지 해제 신청 지원"], cta: "지금 상담 예약", back: "사건 유형 목록으로", faqTitle: "자주 묻는 질문", faqs: [{ q: "며칠만 초과했는데 심각한 문제가 될까요?", a: "단기 초과도 불법 체류입니다. 다만 자진 출국 시 처분 수위가 낮아질 수 있습니다. 즉시 전문가와 상담하세요." }, { q: "만료 후 소급하여 체류 기간을 연장할 수 있나요?", a: "원칙적으로 불가합니다. 체류 기간 만료 전에 연장 신청을 해야 합니다. 불가피한 사유가 있는 경우 예외적 구제 방법이 있을 수 있습니다." }, { q: "오버스테이 이력이 향후 비자 신청에 나타나나요?", a: "네. 오버스테이 이력은 향후 비자 심사에서 중요한 심사 요소가 됩니다. 재입국 금지 중에는 비자 신청 자체가 제한됩니다." }], notice: "※ 이 페이지는 일반적인 법령 정보 제공 목적이며 개별 사건에 대한 법률 조언이 아닙니다." },
        en: { tag: "Overstay", h1: "Overstaying Your Visa in Korea — What Happens Next", lead: "Remaining in Korea even one day beyond your permitted stay constitutes an overstay. The consequences vary significantly based on duration, whether you self-report, and your overall immigration history.", s1: "Legal Consequences of Overstay", p1: "Immigration Act Article 17 requires foreign nationals to stay within their permitted period. Article 94 provides penalties for violations.", items1: ["Short overstay (< 1 month): Fine, re-entry ban up to 1 year upon voluntary departure", "Mid-range overstay (1–6 months): Increased fine + re-entry ban 1–3 years", "Long overstay (6+ months): Forced departure, re-entry ban 3–5+ years", "Self-reporting vs. caught: Self-reporting can significantly reduce the penalty"], s2: "The Overstay Process", p2: "Once an overstay is confirmed, the following process applies.", steps: ["Overstay identified (self-report or enforcement)", "Appearance at Immigration Office for investigation", "Fine issued and disposition determined", "Voluntary departure or execution of forced departure"], s3: "How Vision Can Help", p3: "Our office provides:", services: ["Pre-departure strategy to minimize penalties", "Preparation of documents to reduce re-entry ban duration", "Immigration review representation if forced departure is threatened", "Support for lifting re-entry bans after departure"], cta: "Book a Consultation", back: "Back to Offense Types", faqTitle: "Frequently Asked Questions", faqs: [{ q: "I overstayed just a few days. Is this a serious problem?", a: "Any overstay is technically illegal, but short overstays with voluntary departure typically result in lower fines and shorter re-entry bans. Seek advice immediately." }, { q: "Can I extend my stay retroactively after expiry?", a: "Generally no. Extensions must be filed before expiry. Exceptions may exist for compelling circumstances such as hospitalization." }, { q: "Will my overstay appear on future visa applications?", a: "Yes. Overstay history is a significant factor in future visa screening. During any re-entry ban period, visa applications are restricted." }], notice: "This page provides general legal information only and does not constitute legal advice." },
        ja: { tag: "在留期間超過", h1: "在留期間超過（オーバーステイ）と出入国処分", lead: "許可された在留期間を1日でも超過すると、不法在留となります。自進出国か摘発か、超過期間によって処分の重さが大きく異なります。", s1: "在留期間超過の法的意味と処分", p1: "出入国管理法第17条は外国人が許可された在留期間内に在留することを義務付け、第94条は超過時の処罰規定を定めています。", items1: ["短期超過（1か月未満）：犯則金、自進出国時に再入国禁止1年の可能性", "中期超過（1〜6か月）：犯則金増加＋再入国禁止1〜3年", "長期超過（6か月以上）：強制退去および再入国禁止3〜5年以上", "自進申告 vs 摘発：自進申告により処分が軽減される可能性"], s2: "処分手続き", p2: "在留期間超過が確認されると、以下の手続きが進みます。", steps: ["超過確認（自進申告または摘発）", "出入国・外国人庁への出頭・調査", "犯則金賦課・処分決定", "自進出国または強制退去執行"], s3: "Visionにできること", p3: "当事務所は以下のサービスを提供します：", services: ["出国前の処分最小化戦略の立案", "再入国禁止期間短縮のための疎明資料準備", "強制退去リスク時の犯則審査代理", "出国後の再入国禁止解除申請支援"], cta: "今すぐ相談予約", back: "違反の種類一覧へ", faqTitle: "よくある質問", faqs: [{ q: "数日超過しただけでも深刻な問題になりますか？", a: "短期超過も不法在留です。ただし自進出国の場合は処分が軽くなる可能性があります。直ちに専門家にご相談ください。" }, { q: "期限切れ後に在留期間を遡って延長できますか？", a: "原則としてできません。やむを得ない事情がある場合は例外的な救済方法がある場合があります。" }, { q: "オーバーステイの経歴は将来のビザ申請に影響しますか？", a: "はい。オーバーステイの経歴は将来のビザ審査で重要な審査要素となります。" }], notice: "※ このページは一般的な法令情報の提供を目的としており、個別事案の法的助言ではありません。" },
        zh: { tag: "超期滞留", h1: "超期滞留（Overstay）与出入境处分", lead: "在韩居留期限哪怕超过一天即构成非法滞留。处分轻重取决于超期时长、是否自首及出入境记录。", s1: "超期滞留的法律后果", p1: "《出入境管理法》第17条规定外国人须在许可期限内居留，第94条规定违反时的处罚。", items1: ["短期超期（1个月未满）：罚款，自愿出境时可能禁止再入境1年", "中期超期（1–6个月）：罚款增加＋禁止再入境1–3年", "长期超期（6个月以上）：强制出境，禁止再入境3–5年以上", "自首 vs 被查：自首可显著减轻处分"], s2: "处分程序", p2: "超期滞留一经确认，将进行以下程序。", steps: ["超期确认（自首或执法查获）", "赴出入境·外国人厅接受调查", "罚款处分决定", "自愿出境或强制出境执行"], s3: "Vision能提供的帮助", p3: "本事务所提供以下服务：", services: ["出境前最小化处分策略制定", "准备缩短禁止再入境期限的说明材料", "强制出境风险时代理出入境审查", "出境后申请解除入境禁止支持"], cta: "立即预约咨询", back: "返回违规类型列表", faqTitle: "常见问题", faqs: [{ q: "只超期了几天也会有严重问题吗？", a: "任何超期都属非法滞留，但短期超期自愿出境通常面临较低罚款和较短禁止再入境期。请立即咨询专业人士。" }, { q: "到期后可以追溯延期居留期限吗？", a: "原则上不可以。须在到期前申请延期。不可抗力情形下可能有例外救济途径。" }, { q: "超期滞留记录会在未来签证申请中显示吗？", a: "是的。超期记录是未来签证审查的重要考量因素。在禁止再入境期间，签证申请本身受到限制。" }], notice: "※ 本页面仅供一般法律信息参考，不构成针对个案的法律建议。" },
        vi: { tag: "Ở quá hạn visa", h1: "Ở quá hạn visa tại Hàn Quốc — Hậu quả và Cách ứng phó", lead: "Ở lại Hàn Quốc dù chỉ một ngày sau khi hết hạn visa đã là vi phạm. Hậu quả khác nhau đáng kể tùy theo thời gian, tự khai hay bị phát hiện và lịch sử xuất nhập cảnh.", s1: "Hậu quả pháp lý của việc ở quá hạn", p1: "Điều 17 Luật Quản lý Xuất nhập cảnh yêu cầu người nước ngoài phải ở trong thời gian được phép. Điều 94 quy định xử phạt vi phạm.", items1: ["Ở quá hạn ngắn (< 1 tháng): Phạt tiền, cấm tái nhập cảnh đến 1 năm khi tự nguyện xuất cảnh", "Ở quá hạn trung bình (1–6 tháng): Phạt tăng + cấm tái nhập cảnh 1–3 năm", "Ở quá hạn dài (6+ tháng): Trục xuất, cấm tái nhập cảnh 3–5+ năm", "Tự khai vs bị phát hiện: Tự khai có thể giảm đáng kể mức phạt"], s2: "Quy trình xử lý", p2: "Khi xác nhận ở quá hạn, quy trình sau sẽ áp dụng.", steps: ["Xác nhận ở quá hạn (tự khai hoặc bị phát hiện)", "Đến Cơ quan Xuất nhập cảnh để điều tra", "Phạt tiền và quyết định xử phạt", "Tự nguyện xuất cảnh hoặc thực thi trục xuất"], s3: "Vision có thể hỗ trợ gì?", p3: "Văn phòng chúng tôi cung cấp:", services: ["Chiến lược giảm thiểu xử phạt trước khi xuất cảnh", "Chuẩn bị tài liệu rút ngắn thời gian cấm tái nhập cảnh", "Đại diện xem xét xuất nhập cảnh nếu bị đe dọa trục xuất", "Hỗ trợ xin dỡ bỏ lệnh cấm tái nhập cảnh sau khi xuất cảnh"], cta: "Đặt lịch tư vấn ngay", back: "Quay lại danh sách vi phạm", faqTitle: "Câu hỏi thường gặp", faqs: [{ q: "Tôi chỉ ở quá hạn vài ngày. Có nghiêm trọng không?", a: "Bất kỳ thời gian ở quá hạn nào cũng là vi phạm pháp luật, nhưng ở quá hạn ngắn với tự nguyện xuất cảnh thường dẫn đến phạt tiền thấp hơn. Hãy tìm tư vấn ngay." }, { q: "Có thể gia hạn visa sau khi đã hết hạn không?", a: "Thường là không. Gia hạn phải được nộp trước khi hết hạn. Có thể có ngoại lệ trong hoàn cảnh bắt buộc." }, { q: "Lịch sử ở quá hạn có xuất hiện trong đơn xin visa tương lai không?", a: "Có. Lịch sử ở quá hạn là yếu tố quan trọng trong việc xem xét visa. Trong thời gian cấm tái nhập cảnh, đơn xin visa bị hạn chế." }], notice: "Trang này chỉ cung cấp thông tin pháp luật chung và không phải lời khuyên pháp lý." },
      };
      const c = t[l] || t.ko;
      const ACCENT = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E9ECEF", bg: "#f8f9fb", warn: "#fff8e6", warnBorder: "#f59e0b" };
      return (
        <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: ACCENT.primary, marginBottom: 8 }}>{c.tag}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: ACCENT.navy, lineHeight: 1.25, marginBottom: 18 }}>{c.h1}</h1>
            <p style={{ fontSize: 17, color: ACCENT.muted, lineHeight: 1.75, marginBottom: 36, borderBottom: `1px solid ${ACCENT.border}`, paddingBottom: 32 }}>{c.lead}</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s1}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p1}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.items1.map((item, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{item}</li>)}</ul>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s2}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p2}</p>
            <ol style={{ paddingLeft: 22, marginBottom: 32 }}>{c.steps.map((step, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{step}</li>)}</ol>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s3}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p3}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.services.map((svc, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{svc}</li>)}</ul>
            <div style={{ background: ACCENT.primary, color: "#fff", borderRadius: 10, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 18, marginBottom: 40 }}>
              <div><div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>선샤인행정사사무소</div><div style={{ opacity: 0.9, fontSize: 15 }}>서울 중구 퇴계로 324, 3층 · +82-2-363-2251</div></div>
              <a href={`/${locale}#contact`} style={{ background: "#fff", color: ACCENT.primary, padding: "11px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" as const }}>{c.cta}</a>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 18 }}>{c.faqTitle}</h2>
            {c.faqs.map((faq, i) => (<div key={i} style={{ borderTop: `1px solid ${ACCENT.border}`, padding: "18px 0" }}><div style={{ fontWeight: 600, color: ACCENT.navy, marginBottom: 8, fontSize: 15 }}>{faq.q}</div><div style={{ color: ACCENT.muted, lineHeight: 1.7, fontSize: 14 }}>{faq.a}</div></div>))}
            <div style={{ marginTop: 40, background: ACCENT.warn, border: `1px solid ${ACCENT.warnBorder}`, borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{c.notice}</div>
            <div style={{ marginTop: 32 }}><a href={`/${locale}/offenses`} style={{ color: ACCENT.primary, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>← {c.back}</a></div>
          </div>
        </main>
      );
    },
  },
  "sexual-offense": {
    meta: {
      ko: { title: "성범죄와 강제퇴거·입국금지 · Law in Korea", description: "성범죄 유죄 판결이 외국인의 체류 자격에 미치는 영향, 자동 통보 제도, 등록 대상자 입국금지 — 선샤인행정사사무소." },
      en: { title: "Sexual Offense & Immigration Consequences in Korea · Law in Korea", description: "How sexual offense convictions trigger mandatory immigration review, the court notification system, and visa bars for registered sex offenders in Korea." },
      ja: { title: "性犯罪と強制退去・入国禁止 · Law in Korea", description: "性犯罪の有罪判決が外国人の在留資格に与える影響、法院通報制度、登録対象者の入国禁止について。" },
      zh: { title: "性犯罪与强制出境·入境禁止 · Law in Korea", description: "性犯罪定罪对外国人居留资格的影响、法院通报制度及登记对象入境禁止规定。" },
      vi: { title: "Tội phạm tình dục & Hậu quả xuất nhập cảnh tại Hàn Quốc · Law in Korea", description: "Bị kết án tội phạm tình dục kích hoạt xem xét xuất nhập cảnh bắt buộc như thế nào, hệ thống thông báo tòa án và lệnh cấm nhập cảnh." },
    },
    render: (l, locale) => {
      const t = {
        ko: { tag: "성범죄", h1: "성범죄와 출입국 강제퇴거·입국금지", lead: "성범죄 유죄 판결은 출입국법상 가장 엄중한 처분으로 이어질 수 있습니다. 법원은 유죄 확정 후 법무부 출입국 당국에 자동 통보하며, 성범죄 등록 대상자는 입국 자체가 금지될 수 있습니다.", s1: "성범죄가 체류 자격에 미치는 영향", p1: "출입국관리법 제11조 및 성폭력범죄의 처벌 등에 관한 특례법에 따라, 성범죄 유죄 판결은 출입국 당국의 사범심사 대상이 됩니다.", items1: ["유죄 확정 시 법원 → 법무부 출입국 당국 자동 통보", "집행유예를 포함한 모든 유죄 판결: 사범심사 대상", "성범죄 등록 대상자: 입국금지 처분 가능", "강간·유사강간 등 중범: 강제퇴거 및 영구 재입국 금지 가능"], s2: "사범심사 절차", p2: "성범죄 유죄 판결 이후 법원 통보를 통해 사범심사가 자동 개시될 수 있습니다.", steps: ["형사재판 유죄 확정 → 법무부 출입국 당국 통보", "사범심사 출석 통지", "심사관 면담 (사건 경위, 피해자 관계, 재범 가능성)", "처분 결정: ① 체류 유지 ② 출국권고 ③ 강제퇴거 ④ 입국금지"], s3: "선샤인행정사사무소가 할 수 있는 일", p3: "선샤인행정사사무소는 다음 서비스를 제공합니다:", services: ["사범심사 대리 출석 및 의견서 제출", "처분 경감을 위한 정상 참작 자료 준비", "입국금지 처분에 대한 이의신청 지원", "비자 이력 공개 전략 수립"], cta: "지금 상담 예약", back: "사건 유형 목록으로", faqTitle: "자주 묻는 질문", faqs: [{ q: "집행유예 판결도 사범심사 대상이 되나요?", a: "네. 집행유예를 포함한 모든 유죄 판결은 법무부 통보 대상이며, 사범심사를 통해 출국권고 또는 강제퇴거 처분이 내려질 수 있습니다." }, { q: "무죄 판결을 받으면 비자에 영향이 없나요?", a: "형사 무죄 판결은 출입국 심사에서 유리하게 작용하지만, 수사 및 기소 사실 자체가 심사에서 참고될 수 있습니다." }, { q: "성범죄자로 등록되면 한국에 재입국할 수 없나요?", a: "성범죄 등록 대상자는 출입국관리법 제11조에 따라 입국금지 대상이 될 수 있으며, 해제 신청을 통해 구제를 받는 경우도 있습니다." }], notice: "※ 이 페이지는 일반적인 법령 정보 제공 목적이며 개별 사건에 대한 법률 조언이 아닙니다." },
        en: { tag: "Sexual Offense", h1: "Sexual Offense & Immigration Consequences in Korea", lead: "A sexual offense conviction in Korea can trigger one of the most severe immigration responses. Courts automatically notify immigration authorities upon conviction, and registered sex offenders may be permanently barred from entry.", s1: "How Sexual Offense Convictions Affect Immigration Status", p1: "Under Immigration Control Act Article 11 and the Act on Special Cases Concerning the Punishment of Sexual Crimes, a sexual offense conviction triggers a mandatory immigration offense review.", items1: ["Conviction → automatic court notification to immigration authorities", "All convictions including suspended sentences: Subject to immigration offense review", "Registered sex offenders: Entry ban possible under Immigration Act Art. 11", "Rape / quasi-rape and other serious offenses: Forced departure and permanent re-entry ban possible"], s2: "The Offense Review Process", p2: "After a sexual offense conviction, the court notification triggers an automatic immigration review.", steps: ["Criminal conviction finalized → Court notifies immigration authority", "Immigration offense review summons issued", "Officer interview (circumstances, relationship with victim, recidivism risk)", "Decision: ① Continue stay ② Departure recommendation ③ Forced departure ④ Entry ban"], s3: "How Vision Can Help", p3: "Our office provides:", services: ["Representation and written opinion at the immigration offense review", "Preparation of mitigating documents to reduce the disposition", "Support for appealing an entry ban decision", "Strategy for disclosure of visa history"], cta: "Book a Consultation", back: "Back to Offense Types", faqTitle: "Frequently Asked Questions", faqs: [{ q: "Does a suspended sentence still trigger an immigration review?", a: "Yes. All convictions, including those with suspended sentences, are notified to immigration authorities and may lead to a departure recommendation or forced departure." }, { q: "If I am not convicted, is my visa affected?", a: "A criminal acquittal is favorable in the immigration review, but the fact of investigation and prosecution may still be considered." }, { q: "Can a sex offender re-enter Korea?", a: "Registered sex offenders may be subject to an entry ban under Immigration Act Art. 11. An application to lift the ban is possible in some circumstances." }], notice: "This page provides general legal information only and does not constitute legal advice." },
        ja: { tag: "性犯罪", h1: "性犯罪と強制退去・入国禁止", lead: "性犯罪の有罪判決は、出入国法上で最も厳しい処分につながる可能性があります。法院は有罪確定後、法務部出入国当局に自動通報します。", s1: "性犯罪が在留資格に与える影響", p1: "出入国管理法第11条および性犯罪処罰特例法に基づき、性犯罪の有罪判決は犯則審査の対象となります。", items1: ["有罪確定 → 法院から法務部出入国当局への自動通報", "執行猶予を含む全ての有罪判決：犯則審査対象", "性犯罪登録対象者：入国禁止処分の可能性", "強姦・準強姦等の重大犯罪：強制退去および永久再入国禁止の可能性"], s2: "犯則審査の手続き", p2: "性犯罪の有罪判決後、法院通報により犯則審査が自動的に開始される場合があります。", steps: ["刑事裁判有罪確定 → 法務部出入国当局への通報", "犯則審査出頭通知の発付", "審査官面談（事件経緯・被害者関係・再犯リスク）", "処分決定：① 在留継続 ② 出国勧告 ③ 強制退去 ④ 入国禁止"], s3: "Visionにできること", p3: "当事務所は以下のサービスを提供します：", services: ["犯則審査への代理出席と意見書提出", "処分軽減のための情状酌量資料の準備", "入国禁止処分に対する異議申立て支援", "ビザ履歴開示戦略の立案"], cta: "今すぐ相談予約", back: "違反の種類一覧へ", faqTitle: "よくある質問", faqs: [{ q: "執行猶予判決でも犯則審査の対象になりますか？", a: "はい。執行猶予を含む全ての有罪判決は法務部への通報対象であり、出国勧告または強制退去処分が下される場合があります。" }, { q: "無罪判決があればビザに影響はありませんか？", a: "刑事無罪は犯則審査において有利に働きますが、捜査・起訴の事実自体が審査で参考にされる場合があります。" }, { q: "性犯罪者として登録されると韓国に再入国できなくなりますか？", a: "登録対象者は出入国管理法第11条に基づき入国禁止対象となる場合があり、解除申請で救済される事例もあります。" }], notice: "※ このページは一般的な法令情報の提供を目的としており、個別事案の法的助言ではありません。" },
        zh: { tag: "性犯罪", h1: "性犯罪与强制出境·入境禁止", lead: "性犯罪定罪可能导致出入境法下最严厉的处分。法院在定罪确认后会自动通报法务部出入境当局，性犯罪登记对象可能被禁止入境。", s1: "性犯罪对居留资格的影响", p1: "根据《出入境管理法》第11条及《性犯罪处罚特例法》，性犯罪定罪是出入境犯罪审查的对象。", items1: ["定罪确认 → 法院自动通报出入境当局", "包括缓刑在内的所有定罪：犯罪审查对象", "性犯罪登记对象：可能被入境禁止", "强奸·准强奸等重大犯罪：强制出境及永久禁止再入境可能性高"], s2: "犯罪审查程序", p2: "性犯罪定罪后，法院通报将自动触发出入境犯罪审查。", steps: ["刑事定罪确认 → 法院通报出入境当局", "发出犯罪审查出席通知", "审查官面谈（案件经过·被害人关系·再犯风险）", "处分决定：① 继续居留 ② 建议出境 ③ 强制出境 ④ 入境禁止"], s3: "Vision能提供的帮助", p3: "本事务所提供以下服务：", services: ["代理出席出入境犯罪审查并提交书面意见", "准备从轻处罚的情状材料", "对入境禁止处分提出申诉的支持", "签证履历披露策略制定"], cta: "立即预约咨询", back: "返回违规类型列表", faqTitle: "常见问题", faqs: [{ q: "缓刑判决也会触发出入境审查吗？", a: "是的。包括缓刑在内的所有定罪都是通报对象，可能被处以出境建议或强制出境。" }, { q: "无罪判决对签证有影响吗？", a: "刑事无罪对出入境审查有利，但被调查和起诉的事实本身可能仍会被审查参考。" }, { q: "被列为性犯罪登记对象后无法再入境韩国吗？", a: "登记对象可能依法被入境禁止，部分情形下可通过申请解除获得救济。" }], notice: "※ 本页面仅供一般法律信息参考，不构成针对个案的法律建议。" },
        vi: { tag: "Tội phạm tình dục", h1: "Tội phạm tình dục & Hậu quả xuất nhập cảnh tại Hàn Quốc", lead: "Bị kết án tội phạm tình dục tại Hàn Quốc có thể dẫn đến xử lý xuất nhập cảnh nghiêm khắc nhất. Tòa án tự động thông báo cho cơ quan xuất nhập cảnh sau khi kết án, và người phạm tội tình dục đã đăng ký có thể bị cấm nhập cảnh.", s1: "Bị kết án tội phạm tình dục ảnh hưởng thế nào đến tư cách lưu trú?", p1: "Theo Điều 11 Luật Quản lý Xuất nhập cảnh và Luật về các Trường hợp Đặc biệt liên quan đến Hình phạt Tội phạm Tình dục, bị kết án tội phạm tình dục kích hoạt xem xét vi phạm xuất nhập cảnh bắt buộc.", items1: ["Bị kết án → Tòa án tự động thông báo cơ quan xuất nhập cảnh", "Mọi bản án kể cả án treo: Đối tượng xem xét vi phạm xuất nhập cảnh", "Người phạm tội tình dục đã đăng ký: Có thể bị cấm nhập cảnh theo Điều 11", "Hiếp dâm/cưỡng dâm và tội nghiêm trọng khác: Nguy cơ cao bị trục xuất và cấm vĩnh viễn"], s2: "Quy trình xem xét vi phạm", p2: "Sau khi bị kết án tội phạm tình dục, thông báo của tòa án kích hoạt xem xét xuất nhập cảnh tự động.", steps: ["Bản án hình sự được xác nhận → Tòa án thông báo cơ quan xuất nhập cảnh", "Ban hành giấy triệu tập xem xét vi phạm xuất nhập cảnh", "Phỏng vấn điều tra viên (hoàn cảnh, mối quan hệ với nạn nhân, nguy cơ tái phạm)", "Quyết định: ① Tiếp tục lưu trú ② Khuyến nghị xuất cảnh ③ Trục xuất ④ Cấm nhập cảnh"], s3: "Vision có thể hỗ trợ gì?", p3: "Văn phòng chúng tôi cung cấp:", services: ["Đại diện và ý kiến bằng văn bản tại xem xét vi phạm xuất nhập cảnh", "Chuẩn bị tài liệu giảm nhẹ để giảm mức xử phạt", "Hỗ trợ kháng cáo quyết định cấm nhập cảnh", "Chiến lược công khai lịch sử visa"], cta: "Đặt lịch tư vấn ngay", back: "Quay lại danh sách vi phạm", faqTitle: "Câu hỏi thường gặp", faqs: [{ q: "Án treo có kích hoạt xem xét xuất nhập cảnh không?", a: "Có. Mọi bản án kể cả án treo đều được thông báo cho cơ quan xuất nhập cảnh và có thể dẫn đến khuyến nghị xuất cảnh hoặc trục xuất." }, { q: "Nếu tôi không bị kết án, visa có bị ảnh hưởng không?", a: "Vô tội trong hình sự có lợi cho xem xét xuất nhập cảnh, nhưng thực tế bị điều tra và truy tố vẫn có thể được xem xét." }, { q: "Người phạm tội tình dục có thể tái nhập cảnh Hàn Quốc không?", a: "Người đã đăng ký tội phạm tình dục có thể bị cấm nhập cảnh theo Điều 11. Trong một số hoàn cảnh có thể nộp đơn xin dỡ bỏ lệnh cấm." }], notice: "Trang này chỉ cung cấp thông tin pháp luật chung và không phải lời khuyên pháp lý." },
      };
      const c = t[l] || t.ko;
      const ACCENT = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E9ECEF", bg: "#f8f9fb", warn: "#fff8e6", warnBorder: "#f59e0b" };
      return (
        <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: ACCENT.primary, marginBottom: 8 }}>{c.tag}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: ACCENT.navy, lineHeight: 1.25, marginBottom: 18 }}>{c.h1}</h1>
            <p style={{ fontSize: 17, color: ACCENT.muted, lineHeight: 1.75, marginBottom: 36, borderBottom: `1px solid ${ACCENT.border}`, paddingBottom: 32 }}>{c.lead}</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s1}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p1}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.items1.map((item, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{item}</li>)}</ul>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s2}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p2}</p>
            <ol style={{ paddingLeft: 22, marginBottom: 32 }}>{c.steps.map((step, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{step}</li>)}</ol>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s3}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p3}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.services.map((svc, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{svc}</li>)}</ul>
            <div style={{ background: ACCENT.primary, color: "#fff", borderRadius: 10, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 18, marginBottom: 40 }}>
              <div><div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>선샤인행정사사무소</div><div style={{ opacity: 0.9, fontSize: 15 }}>서울 중구 퇴계로 324, 3층 · +82-2-363-2251</div></div>
              <a href={`/${locale}#contact`} style={{ background: "#fff", color: ACCENT.primary, padding: "11px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" as const }}>{c.cta}</a>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 18 }}>{c.faqTitle}</h2>
            {c.faqs.map((faq, i) => (<div key={i} style={{ borderTop: `1px solid ${ACCENT.border}`, padding: "18px 0" }}><div style={{ fontWeight: 600, color: ACCENT.navy, marginBottom: 8, fontSize: 15 }}>{faq.q}</div><div style={{ color: ACCENT.muted, lineHeight: 1.7, fontSize: 14 }}>{faq.a}</div></div>))}
            <div style={{ marginTop: 40, background: ACCENT.warn, border: `1px solid ${ACCENT.warnBorder}`, borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{c.notice}</div>
            <div style={{ marginTop: 32 }}><a href={`/${locale}/offenses`} style={{ color: ACCENT.primary, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>← {c.back}</a></div>
          </div>
        </main>
      );
    },
  },
  "voice-phishing": {
    meta: {
      ko: { title: "보이스피싱 가담과 외국인 출입국 제재 · Law in Korea", description: "보이스피싱 범죄에 가담한 외국인의 형사 처벌 및 강제퇴거 위험, 모든 단계 가담자의 공범 책임 — 선샤인행정사사무소." },
      en: { title: "Voice Phishing Offenses & Immigration Consequences in Korea · Law in Korea", description: "Foreign nationals involved in voice phishing (telephone fraud) at any level face serious immigration consequences in Korea." },
      ja: { title: "ボイスフィッシング（電話詐欺）と外国人出入国制裁 · Law in Korea", description: "ボイスフィッシング犯罪に加担した外国人の刑事処罰と強制退去リスク、共犯責任について。" },
      zh: { title: "电话诈骗（Voice Phishing）与外国人出入境制裁 · Law in Korea", description: "参与电话诈骗犯罪的外国人面临的刑事处罚及强制出境风险，各环节参与者的共犯责任。" },
      vi: { title: "Tội phạm Voice Phishing & Hậu quả xuất nhập cảnh tại Hàn Quốc · Law in Korea", description: "Người nước ngoài tham gia vào tội phạm lừa đảo qua điện thoại ở bất kỳ cấp độ nào đều đối mặt với hậu quả xuất nhập cảnh nghiêm trọng tại Hàn Quốc." },
    },
    render: (l, locale) => {
      const t = {
        ko: { tag: "보이스피싱", h1: "보이스피싱과 외국인 출입국 제재", lead: "보이스피싱 범죄에 가담한 외국인에 대한 단속이 강화되고 있습니다. 직접 사기 전화를 하지 않더라도 자금 인출·이체만 담당해도 공범으로 처벌받을 수 있습니다.", s1: "보이스피싱 가담과 출입국 처분", p1: "통신사기피해환급법 및 형법상 사기죄가 적용됩니다. 조직 내 역할에 관계없이 가담 사실이 확인되면 형사처벌 및 사범심사 대상이 됩니다.", items1: ["콜센터 직원·현금 인출책 등 모든 단계 가담: 공범으로 형사처벌", "범죄 단체 조직 또는 주도: 가중 처벌 + 강제퇴거 가능성 높음", "단순 가담(자금 전달 등): 집행유예 가능하나 사범심사 대상", "재범 또는 조직 가담: 영구 재입국 금지 위험"], s2: "사범심사 절차", p2: "보이스피싱 관련 형사 처분 이후 출입국 사범심사가 진행됩니다.", steps: ["경찰·검찰 수사 및 형사 처분", "출입국·외국인청 사범심사 통보", "심사관 면담 (가담 역할, 피해 규모, 재범 위험)", "처분 결정: ① 체류 유지 ② 출국권고 ③ 강제퇴거"], s3: "선샤인행정사사무소가 할 수 있는 일", p3: "선샤인행정사사무소는 다음 서비스를 제공합니다:", services: ["사범심사 대리 출석 및 의견서 제출", "가담 역할의 경미함 소명 자료 준비", "피해 변제 이력 등 정상 참작 자료 제출", "자진 신고를 통한 처분 경감 전략 수립"], cta: "지금 상담 예약", back: "사건 유형 목록으로", faqTitle: "자주 묻는 질문", faqs: [{ q: "돈만 전달했는데도 유죄가 될 수 있나요?", a: "네. 보이스피싱 범죄에서 자금 전달은 핵심 역할 중 하나로, 공범으로 처벌받을 수 있습니다." }, { q: "가족 비자에도 영향이 있나요?", a: "보이스피싱 처벌은 주로 당사자에게 영향을 미치지만, 체류 자격 취소로 인한 동반 가족의 체류에도 영향이 생길 수 있습니다." }, { q: "출입국 처분을 협의할 수 있나요?", a: "사범심사 단계에서 처분 수위를 낮추기 위한 협의가 가능합니다. 자진 신고, 피해 변제, 조직 내 역할의 경미함 등을 소명하면 처분 경감에 유리합니다." }], notice: "※ 이 페이지는 일반적인 법령 정보 제공 목적이며 개별 사건에 대한 법률 조언이 아닙니다." },
        en: { tag: "Voice Phishing", h1: "Voice Phishing Offenses & Immigration Consequences in Korea", lead: "Korea has sharply increased enforcement against foreign nationals involved in voice phishing (보이스피싱) schemes. Participation at any level — including acting as a cash-out mule — can constitute criminal co-conspiracy and trigger serious immigration consequences.", s1: "Involvement in Voice Phishing and Immigration Consequences", p1: "Korea's Act on Special Cases Concerning Prevention of Telecommunication-Based Financial Fraud and the Criminal Act apply. Any confirmed involvement triggers criminal liability and an immigration offense review.", items1: ["All roles (call center operators, cash withdrawers, money transferrers): Criminal co-conspirator liability", "Organizers or leaders: Aggravated punishment + high forced departure risk", "Minor participation (e.g., money delivery): Suspended sentence possible, but still subject to immigration review", "Repeat offense or organized crime involvement: Risk of permanent re-entry ban"], s2: "The Offense Review Process", p2: "After criminal disposition for voice phishing, an immigration offense review is initiated.", steps: ["Police/prosecutor investigation and criminal disposition", "Immigration Office notified for offense review", "Officer interview (role in scheme, scale of damages, recidivism risk)", "Decision: ① Continue stay ② Departure recommendation ③ Forced departure"], s3: "How Vision Can Help", p3: "Our office provides:", services: ["Representation and written opinion at the immigration offense review", "Preparation of documents demonstrating minor role in the scheme", "Submission of evidence of victim restitution as a mitigating factor", "Self-reporting strategy to reduce disposition severity"], cta: "Book a Consultation", back: "Back to Offense Types", faqTitle: "Frequently Asked Questions", faqs: [{ q: "I only received money transfers — am I still guilty?", a: "Yes. Receiving and transferring funds is one of the core roles in a voice phishing scheme and is treated as criminal co-conspiracy." }, { q: "Will my family visa be affected?", a: "The penalty primarily affects the person convicted. However, a visa cancellation may indirectly affect accompanying family members' residency status." }, { q: "Can I negotiate a reduced immigration penalty?", a: "Yes. At the offense review stage, demonstrating a minor role, evidence of restitution, and cooperation with authorities can reduce the severity of the disposition." }], notice: "This page provides general legal information only and does not constitute legal advice." },
        ja: { tag: "ボイスフィッシング", h1: "ボイスフィッシング（電話詐欺）と外国人出入国制裁", lead: "ボイスフィッシング犯罪に加担した外国人への摘発が強化されています。直接詐欺電話をかけなくても、資金引き出し・送金役を担っただけで共犯として処罰されます。", s1: "ボイスフィッシング加担と出入国処分", p1: "通信詐欺被害還付法および刑法の詐欺罪が適用されます。組織内の役割に関わらず加担が確認されると刑事処罰および犯則審査の対象となります。", items1: ["コールセンター員・現金引出役等全段階の加担：共犯として刑事処罰", "犯罪団体の組織・主導：加重処罰＋強制退去の可能性高い", "単純加担（資金伝達等）：執行猶予可能も犯則審査対象", "再犯または組織加担：永久再入国禁止のリスク"], s2: "犯則審査の手続き", p2: "ボイスフィッシング関連の刑事処分後、出入国犯則審査が行われます。", steps: ["警察・検察の捜査・刑事処分", "出入国・外国人庁への犯則審査通報", "審査官面談（加担役割・被害規模・再犯リスク）", "処分決定：① 在留継続 ② 出国勧告 ③ 強制退去"], s3: "Visionにできること", p3: "当事務所は以下のサービスを提供します：", services: ["犯則審査への代理出席と意見書提出", "加担役割の軽微さを示す疎明資料の準備", "被害弁済履歴等の情状酌量資料の提出", "自進申告による処分軽減戦略の立案"], cta: "今すぐ相談予約", back: "違反の種類一覧へ", faqTitle: "よくある質問", faqs: [{ q: "お金の受け渡しだけでも有罪になりますか？", a: "はい。資金伝達はボイスフィッシング犯罪の核心的役割の一つであり、共犯として処罰される可能性があります。" }, { q: "家族ビザにも影響しますか？", a: "処罰は主として本人に影響しますが、在留資格取り消しにより同伴家族の在留にも影響が出る場合があります。" }, { q: "出入国処分を交渉で軽減できますか？", a: "犯則審査段階で役割の軽微さ・被害弁済・自進申告等を疎明することで処分軽減につながる場合があります。" }], notice: "※ このページは一般的な法令情報の提供を目的としており、個別事案の法的助言ではありません。" },
        zh: { tag: "电话诈骗（Voice Phishing）", h1: "电话诈骗与外国人出入境制裁", lead: "韩国对参与电话诈骗（보이스피싱）犯罪的外国人的执法力度持续加强。即使只是担任取款或转账角色，也可能以共犯身份被追究刑事责任并面临出入境制裁。", s1: "参与电话诈骗与出入境处分", p1: "《通信诈骗被害还款法》及刑法诈骗罪均可适用。无论在组织中担任何种角色，一旦确认参与，即成为刑事处罚及犯罪审查对象。", items1: ["电话中心员工·取款员等各环节参与者：以共犯被追究刑事责任", "组织或主导犯罪团伙：加重处罚＋强制出境可能性高", "简单参与（如传递资金等）：可能获缓刑，但仍为犯罪审查对象", "再犯或有组织犯罪参与：永久禁止再入境风险"], s2: "犯罪审查程序", p2: "电话诈骗相关刑事处分后，将启动出入境犯罪审查。", steps: ["警察·检察侦查及刑事处分", "出入境·外国人厅收到犯罪审查通报", "审查官面谈（参与角色·受害规模·再犯风险）", "处分决定：① 继续居留 ② 建议出境 ③ 强制出境"], s3: "Vision能提供的帮助", p3: "本事务所提供以下服务：", services: ["代理出席出入境犯罪审查并提交书面意见", "准备证明参与角色轻微的说明材料", "提交受害赔偿记录等从轻处罚材料", "通过自首制定减轻处分策略"], cta: "立即预约咨询", back: "返回违规类型列表", faqTitle: "常见问题", faqs: [{ q: "我只负责收转款项，也会被认定有罪吗？", a: "是的。收转款项是电话诈骗犯罪的核心角色之一，可能以共犯被追究刑事责任。" }, { q: "会影响家庭签证吗？", a: "处罚主要影响当事人本人，但签证被撤销可能对随行家属的居留产生间接影响。" }, { q: "可以通过协商减轻出入境处分吗？", a: "在犯罪审查阶段，证明参与角色轻微、提供受害赔偿证明及自首，有助于减轻处分。" }], notice: "※ 本页面仅供一般法律信息参考，不构成针对个案的法律建议。" },
        vi: { tag: "Tội phạm Voice Phishing", h1: "Tội phạm Voice Phishing & Hậu quả xuất nhập cảnh tại Hàn Quốc", lead: "Hàn Quốc đã tăng cường mạnh việc thực thi pháp luật đối với người nước ngoài tham gia vào các vụ lừa đảo qua điện thoại (보이스피싱). Tham gia ở bất kỳ cấp độ nào — kể cả vai trò rút tiền — có thể cấu thành đồng phạm hình sự và kích hoạt hậu quả xuất nhập cảnh nghiêm trọng.", s1: "Tham gia vào Voice Phishing và hậu quả xuất nhập cảnh", p1: "Luật về các Trường hợp Đặc biệt về Ngăn chặn Thiệt hại từ Gian lận Tài chính qua Viễn thông và Luật Hình sự được áp dụng. Bất kỳ sự tham gia được xác nhận nào đều kích hoạt trách nhiệm hình sự và xem xét vi phạm xuất nhập cảnh.", items1: ["Mọi vai trò (nhân viên tổng đài, người rút tiền, người chuyển tiền): Trách nhiệm đồng phạm hình sự", "Tổ chức hoặc lãnh đạo: Phạt nặng hơn + nguy cơ cao bị trục xuất", "Tham gia nhỏ (ví dụ: chuyển tiền): Có thể được án treo, nhưng vẫn bị xem xét xuất nhập cảnh", "Tái phạm hoặc tham gia tội phạm có tổ chức: Nguy cơ bị cấm tái nhập cảnh vĩnh viễn"], s2: "Quy trình xem xét vi phạm", p2: "Sau khi bị xử lý hình sự về voice phishing, xem xét vi phạm xuất nhập cảnh được khởi động.", steps: ["Điều tra cảnh sát/kiểm sát và xử lý hình sự", "Cơ quan Xuất nhập cảnh được thông báo để xem xét vi phạm", "Phỏng vấn điều tra viên (vai trò trong kế hoạch, quy mô thiệt hại, nguy cơ tái phạm)", "Quyết định: ① Tiếp tục lưu trú ② Khuyến nghị xuất cảnh ③ Trục xuất"], s3: "Vision có thể hỗ trợ gì?", p3: "Văn phòng chúng tôi cung cấp:", services: ["Đại diện và ý kiến bằng văn bản tại xem xét vi phạm xuất nhập cảnh", "Chuẩn bị tài liệu chứng minh vai trò nhỏ trong kế hoạch", "Nộp bằng chứng bồi thường cho nạn nhân như yếu tố giảm nhẹ", "Chiến lược tự khai để giảm mức xử phạt"], cta: "Đặt lịch tư vấn ngay", back: "Quay lại danh sách vi phạm", faqTitle: "Câu hỏi thường gặp", faqs: [{ q: "Tôi chỉ nhận chuyển tiền — tôi có còn bị kết án không?", a: "Có. Nhận và chuyển tiền là một trong những vai trò cốt lõi trong kế hoạch lừa đảo qua điện thoại và bị coi là đồng phạm hình sự." }, { q: "Visa gia đình tôi có bị ảnh hưởng không?", a: "Hình phạt chủ yếu ảnh hưởng đến người bị kết án. Tuy nhiên, hủy visa có thể gián tiếp ảnh hưởng đến tư cách lưu trú của thành viên gia đình đi kèm." }, { q: "Tôi có thể thương lượng giảm nhẹ hình phạt xuất nhập cảnh không?", a: "Có. Ở giai đoạn xem xét vi phạm, chứng minh vai trò nhỏ, bằng chứng bồi thường và hợp tác với cơ quan chức năng có thể giảm mức xử phạt." }], notice: "Trang này chỉ cung cấp thông tin pháp luật chung và không phải lời khuyên pháp lý." },
      };
      const c = t[l] || t.ko;
      const ACCENT = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E9ECEF", bg: "#f8f9fb", warn: "#fff8e6", warnBorder: "#f59e0b" };
      return (
        <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: ACCENT.primary, marginBottom: 8 }}>{c.tag}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: ACCENT.navy, lineHeight: 1.25, marginBottom: 18 }}>{c.h1}</h1>
            <p style={{ fontSize: 17, color: ACCENT.muted, lineHeight: 1.75, marginBottom: 36, borderBottom: `1px solid ${ACCENT.border}`, paddingBottom: 32 }}>{c.lead}</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s1}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p1}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.items1.map((item, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{item}</li>)}</ul>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s2}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p2}</p>
            <ol style={{ paddingLeft: 22, marginBottom: 32 }}>{c.steps.map((step, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{step}</li>)}</ol>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s3}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p3}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.services.map((svc, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{svc}</li>)}</ul>
            <div style={{ background: ACCENT.primary, color: "#fff", borderRadius: 10, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 18, marginBottom: 40 }}>
              <div><div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>선샤인행정사사무소</div><div style={{ opacity: 0.9, fontSize: 15 }}>서울 중구 퇴계로 324, 3층 · +82-2-363-2251</div></div>
              <a href={`/${locale}#contact`} style={{ background: "#fff", color: ACCENT.primary, padding: "11px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" as const }}>{c.cta}</a>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 18 }}>{c.faqTitle}</h2>
            {c.faqs.map((faq, i) => (<div key={i} style={{ borderTop: `1px solid ${ACCENT.border}`, padding: "18px 0" }}><div style={{ fontWeight: 600, color: ACCENT.navy, marginBottom: 8, fontSize: 15 }}>{faq.q}</div><div style={{ color: ACCENT.muted, lineHeight: 1.7, fontSize: 14 }}>{faq.a}</div></div>))}
            <div style={{ marginTop: 40, background: ACCENT.warn, border: `1px solid ${ACCENT.warnBorder}`, borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{c.notice}</div>
            <div style={{ marginTop: 32 }}><a href={`/${locale}/offenses`} style={{ color: ACCENT.primary, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>← {c.back}</a></div>
          </div>
        </main>
      );
    },
  },
  "false-documents": {
    meta: {
      ko: { title: "서류 위·변조와 비자 취소·입국금지 · Law in Korea", description: "비자 신청 등에 위조·변조 서류 제출 시 형사처벌, 비자 취소, 입국금지 위험 — 선샤인행정사사무소." },
      en: { title: "False & Forged Documents — Visa Cancellation & Entry Ban in Korea · Law in Korea", description: "Submitting forged or falsified documents for visa applications in Korea leads to criminal prosecution, visa cancellation, and potential entry ban." },
      ja: { title: "書類偽造・変造とビザ取り消し・入国禁止 · Law in Korea", description: "ビザ申請等での偽造・変造書類提出時の刑事処罰、ビザ取り消し、入国禁止のリスク。" },
      zh: { title: "文件伪造·变造与签证取消·入境禁止 · Law in Korea", description: "在韩申请签证时提交伪造·变造文件面临的刑事处罚、签证取消及入境禁止风险。" },
      vi: { title: "Tài liệu giả mạo & Hủy visa và Cấm nhập cảnh tại Hàn Quốc · Law in Korea", description: "Nộp tài liệu giả mạo hoặc bị làm giả để xin visa Hàn Quốc dẫn đến truy tố hình sự, hủy visa và có thể cấm nhập cảnh." },
    },
    render: (l, locale) => {
      const t = {
        ko: { tag: "위·변조 서류", h1: "서류 위·변조와 비자 취소·입국금지", lead: "비자 신청, 취업 허가 등에 위조·변조 서류를 제출하면 형사처벌과 함께 비자 취소, 입국금지, 강제퇴거 처분을 받을 수 있습니다.", s1: "서류 위·변조의 유형과 결과", p1: "형법 제225조(공문서 위조·변조) 및 출입국관리법이 적용됩니다. 위조 서류 제출은 형사처벌 외에 출입국 사범심사를 통해 비자 취소 또는 입국금지로 이어질 수 있습니다.", items1: ["학력증명서·재직증명서 위조: 비자 취소 + 형사처벌", "여권 위조·변조: 중범죄로 강제퇴거 및 장기 입국금지", "허위 초청장·고용계약서 제출: 비자 불허 및 재신청 제한", "위조 사실 인지 여부와 관계없이 제출 책임"], s2: "처분 절차", p2: "위조 서류 사실이 드러나면 다음 절차가 진행됩니다.", steps: ["위조 서류 발각 (심사 중 또는 수사 중)", "형사 수사 개시 (경찰·검찰)", "출입국 사범심사 통보 및 비자 취소·입국금지 검토", "처분 결정 및 집행"], s3: "선샤인행정사사무소가 할 수 있는 일", p3: "선샤인행정사사무소는 다음 서비스를 제공합니다:", services: ["위조 인지 여부에 대한 소명 자료 준비", "사범심사 대리 출석 및 의견서 제출", "비자 취소 처분에 대한 이의신청 지원", "입국금지 해제 신청 전략 수립"], cta: "지금 상담 예약", back: "사건 유형 목록으로", faqTitle: "자주 묻는 질문", faqs: [{ q: "위조인 줄 몰랐다고 해도 처벌받나요?", a: "위조 사실을 몰랐더라도 제출 책임은 신청인에게 있습니다. 다만 고의성이 없음을 입증하면 처분 경감에 도움이 될 수 있습니다." }, { q: "대행업체가 제출한 서류가 위조였다면 내 책임인가요?", a: "원칙적으로 신청인 본인이 책임을 집니다. 대행업체의 기망 사실을 입증하면 일부 구제 가능성이 있으나 사전에 검토를 철저히 해야 합니다." }, { q: "입국금지 기간은 얼마나 되나요?", a: "위조 서류의 종류와 피해 정도에 따라 다르며, 여권 위조의 경우 장기 또는 영구 입국금지로 이어질 수 있습니다." }], notice: "※ 이 페이지는 일반적인 법령 정보 제공 목적이며 개별 사건에 대한 법률 조언이 아닙니다." },
        en: { tag: "False / Forged Documents", h1: "False & Forged Documents — Visa Cancellation & Entry Ban", lead: "Submitting forged or falsified documents — whether diplomas, employment letters, or passports — for visa applications or work permits in Korea leads to criminal prosecution, visa cancellation, and potential entry ban.", s1: "Types of Document Fraud and Consequences", p1: "Criminal Act Article 225 (forgery of official documents) and the Immigration Control Act both apply. Submitting forged documents results in criminal prosecution and an immigration offense review that may lead to visa cancellation or entry ban.", items1: ["Forged academic certificates / employment letters: Visa cancellation + criminal prosecution", "Forged or altered passports: Serious crime — forced departure and long-term entry ban", "False invitation letters / employment contracts: Visa denial and reapplication restrictions", "Responsibility for submission regardless of knowledge of forgery"], s2: "The Disposition Process", p2: "Once forged documents are discovered, the following process unfolds.", steps: ["Forged documents discovered (during screening or investigation)", "Criminal investigation initiated (police/prosecutor)", "Immigration offense review notified; visa cancellation and entry ban considered", "Disposition decided and executed"], s3: "How Vision Can Help", p3: "Our office provides:", services: ["Preparation of evidence demonstrating lack of knowledge of forgery", "Representation and written opinion at the immigration offense review", "Support for appealing a visa cancellation", "Strategy for applying to lift an entry ban"], cta: "Book a Consultation", back: "Back to Offense Types", faqTitle: "Frequently Asked Questions", faqs: [{ q: "What if I didn't know the documents were fake?", a: "The person who submits the documents bears responsibility, even without knowledge of the forgery. However, demonstrating lack of intent can help mitigate the disposition." }, { q: "Is it my responsibility if an agent submitted fake documents?", a: "In principle, the applicant is responsible. Evidence of the agent's deception may provide some relief, but all documents should be carefully reviewed beforehand." }, { q: "What is the entry ban period for false documents?", a: "It depends on the type and severity of the forgery. Passport forgery in particular can result in a long-term or permanent entry ban." }], notice: "This page provides general legal information only and does not constitute legal advice." },
        ja: { tag: "書類偽造・変造", h1: "書類偽造・変造とビザ取り消し・入国禁止", lead: "ビザ申請、就労許可等に偽造・変造書類を提出すると、刑事処罰に加えてビザ取り消し、入国禁止、強制退去処分を受ける可能性があります。", s1: "書類偽造の種類と結果", p1: "刑法第225条（公文書偽造・変造）および出入国管理法が適用されます。偽造書類の提出は刑事処罰のほか、出入国犯則審査を通じてビザ取り消しまたは入国禁止につながります。", items1: ["学歴証明書・在職証明書の偽造：ビザ取り消し＋刑事処罰", "旅券偽造・変造：重大犯罪として強制退去および長期入国禁止", "虚偽の招待状・雇用契約書の提出：ビザ不許可および再申請制限", "偽造の認識の有無に関わらず提出責任"], s2: "処分手続き", p2: "偽造書類が発覚すると以下の手続きが進みます。", steps: ["偽造書類の発覚（審査中または捜査中）", "刑事捜査の開始（警察・検察）", "出入国犯則審査の通報・ビザ取り消し・入国禁止の検討", "処分決定・執行"], s3: "Visionにできること", p3: "当事務所は以下のサービスを提供します：", services: ["偽造認識の有無に関する疎明資料の準備", "犯則審査への代理出席と意見書提出", "ビザ取り消し処分に対する異議申立て支援", "入国禁止解除申請戦略の立案"], cta: "今すぐ相談予約", back: "違反の種類一覧へ", faqTitle: "よくある質問", faqs: [{ q: "偽造と知らずに提出した場合も処罰されますか？", a: "偽造を知らなくても提出責任は申請者にあります。ただし故意のなかったことを立証すれば処分軽減に役立つ場合があります。" }, { q: "代行業者が提出した書類が偽造だった場合、私の責任になりますか？", a: "原則として申請者本人が責任を負います。代行業者の欺罔を立証できれば一部救済の可能性がありますが、事前の検討が重要です。" }, { q: "入国禁止期間はどのくらいですか？", a: "偽造書類の種類と被害の程度によります。旅券偽造は長期または永久入国禁止につながる場合があります。" }], notice: "※ このページは一般的な法令情報の提供を目的としており、個別事案の法的助言ではありません。" },
        zh: { tag: "文件伪造·变造", h1: "文件伪造·变造与签证取消·入境禁止", lead: "在签证申请、就业许可等场合提交伪造·变造文件，将面临刑事处罚、签证取消、入境禁止乃至强制出境。", s1: "文件伪造的类型及后果", p1: "《刑法》第225条（伪造·变造公文书）及《出入境管理法》均可适用。提交伪造文件除受刑事处罚外，还可能通过出入境犯罪审查导致签证取消或入境禁止。", items1: ["伪造学历证明·在职证明：签证取消＋刑事处罚", "护照伪造·变造：重大犯罪，强制出境及长期入境禁止", "提交虚假邀请函·劳动合同：签证不批及再申请受限", "无论是否知悉伪造，提交者均承担责任"], s2: "处分程序", p2: "一旦发现伪造文件，将进行以下程序。", steps: ["伪造文件被发现（审查中或侦查中）", "启动刑事侦查（警察·检察）", "通报出入境犯罪审查，审查签证取消及入境禁止", "处分决定及执行"], s3: "Vision能提供的帮助", p3: "本事务所提供以下服务：", services: ["准备证明不知情的说明材料", "代理出席出入境犯罪审查并提交书面意见", "对签证取消处分提出申诉", "制定入境禁止解除申请策略"], cta: "立即预约咨询", back: "返回违规类型列表", faqTitle: "常见问题", faqs: [{ q: "不知道是伪造文件也会被处罚吗？", a: "提交文件的责任由申请人承担，即使不知情。但证明无故意有助于减轻处分。" }, { q: "代理机构提交了伪造文件，是我的责任吗？", a: "原则上申请人本人承担责任。证明代理机构的欺骗行为可能有部分救济途径，但事前审查至关重要。" }, { q: "伪造文件的入境禁止期有多长？", a: "因伪造文件类型和危害程度而异，护照伪造可能导致长期或永久入境禁止。" }], notice: "※ 本页面仅供一般法律信息参考，不构成针对个案的法律建议。" },
        vi: { tag: "Tài liệu giả mạo", h1: "Tài liệu giả mạo & Hủy visa và Cấm nhập cảnh tại Hàn Quốc", lead: "Nộp tài liệu giả mạo hoặc bị làm giả — bằng cấp, thư xác nhận việc làm, hộ chiếu — cho đơn xin visa hoặc giấy phép làm việc tại Hàn Quốc dẫn đến truy tố hình sự, hủy visa và có thể cấm nhập cảnh.", s1: "Các loại gian lận tài liệu và hậu quả", p1: "Điều 225 Luật Hình sự (làm giả tài liệu chính thức) và Luật Quản lý Xuất nhập cảnh đều được áp dụng. Nộp tài liệu giả mạo dẫn đến truy tố hình sự và xem xét vi phạm xuất nhập cảnh có thể dẫn đến hủy visa hoặc cấm nhập cảnh.", items1: ["Chứng chỉ học vấn / thư xác nhận việc làm giả mạo: Hủy visa + truy tố hình sự", "Hộ chiếu giả mạo hoặc bị làm giả: Tội nghiêm trọng — trục xuất và cấm nhập cảnh dài hạn", "Thư mời giả mạo / hợp đồng lao động: Từ chối visa và hạn chế tái nộp đơn", "Chịu trách nhiệm về việc nộp tài liệu bất kể có biết là giả mạo hay không"], s2: "Quy trình xử lý", p2: "Khi phát hiện tài liệu giả mạo, quy trình sau diễn ra.", steps: ["Phát hiện tài liệu giả mạo (trong quá trình xem xét hoặc điều tra)", "Khởi tố điều tra hình sự (cảnh sát/kiểm sát)", "Thông báo xem xét vi phạm xuất nhập cảnh; xem xét hủy visa và cấm nhập cảnh", "Quyết định và thực thi xử phạt"], s3: "Vision có thể hỗ trợ gì?", p3: "Văn phòng chúng tôi cung cấp:", services: ["Chuẩn bị bằng chứng chứng minh không biết tài liệu là giả mạo", "Đại diện và ý kiến bằng văn bản tại xem xét vi phạm xuất nhập cảnh", "Hỗ trợ kháng cáo quyết định hủy visa", "Chiến lược xin dỡ bỏ lệnh cấm nhập cảnh"], cta: "Đặt lịch tư vấn ngay", back: "Quay lại danh sách vi phạm", faqTitle: "Câu hỏi thường gặp", faqs: [{ q: "Nếu tôi không biết tài liệu là giả mạo thì sao?", a: "Người nộp tài liệu chịu trách nhiệm, ngay cả khi không biết. Tuy nhiên, chứng minh thiếu ý định có thể giúp giảm nhẹ xử phạt." }, { q: "Nếu đại lý nộp tài liệu giả mạo, đó có phải trách nhiệm của tôi không?", a: "Về nguyên tắc, người nộp đơn chịu trách nhiệm. Bằng chứng về hành vi lừa đảo của đại lý có thể cung cấp một số cứu trợ, nhưng cần xem xét kỹ tất cả tài liệu trước khi nộp." }, { q: "Thời gian cấm nhập cảnh cho tài liệu giả mạo là bao lâu?", a: "Phụ thuộc vào loại và mức độ nghiêm trọng của việc làm giả. Làm giả hộ chiếu đặc biệt có thể dẫn đến cấm nhập cảnh dài hạn hoặc vĩnh viễn." }], notice: "Trang này chỉ cung cấp thông tin pháp luật chung và không phải lời khuyên pháp lý." },
      };
      const c = t[l] || t.ko;
      const ACCENT = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E9ECEF", bg: "#f8f9fb", warn: "#fff8e6", warnBorder: "#f59e0b" };
      return (
        <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: ACCENT.primary, marginBottom: 8 }}>{c.tag}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: ACCENT.navy, lineHeight: 1.25, marginBottom: 18 }}>{c.h1}</h1>
            <p style={{ fontSize: 17, color: ACCENT.muted, lineHeight: 1.75, marginBottom: 36, borderBottom: `1px solid ${ACCENT.border}`, paddingBottom: 32 }}>{c.lead}</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s1}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p1}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.items1.map((item, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{item}</li>)}</ul>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s2}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p2}</p>
            <ol style={{ paddingLeft: 22, marginBottom: 32 }}>{c.steps.map((step, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{step}</li>)}</ol>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s3}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p3}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.services.map((svc, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{svc}</li>)}</ul>
            <div style={{ background: ACCENT.primary, color: "#fff", borderRadius: 10, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 18, marginBottom: 40 }}>
              <div><div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>선샤인행정사사무소</div><div style={{ opacity: 0.9, fontSize: 15 }}>서울 중구 퇴계로 324, 3층 · +82-2-363-2251</div></div>
              <a href={`/${locale}#contact`} style={{ background: "#fff", color: ACCENT.primary, padding: "11px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" as const }}>{c.cta}</a>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 18 }}>{c.faqTitle}</h2>
            {c.faqs.map((faq, i) => (<div key={i} style={{ borderTop: `1px solid ${ACCENT.border}`, padding: "18px 0" }}><div style={{ fontWeight: 600, color: ACCENT.navy, marginBottom: 8, fontSize: 15 }}>{faq.q}</div><div style={{ color: ACCENT.muted, lineHeight: 1.7, fontSize: 14 }}>{faq.a}</div></div>))}
            <div style={{ marginTop: 40, background: ACCENT.warn, border: `1px solid ${ACCENT.warnBorder}`, borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{c.notice}</div>
            <div style={{ marginTop: 32 }}><a href={`/${locale}/offenses`} style={{ color: ACCENT.primary, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>← {c.back}</a></div>
          </div>
        </main>
      );
    },
  },
  "property-crime": {
    meta: {
      ko: { title: "절도·사기·횡령과 체류 자격 심사 · Law in Korea", description: "재산범죄(절도·사기·횡령)가 외국인의 체류 자격에 미치는 영향, 조직적·반복적 범죄의 강제퇴거 위험 — 선샤인행정사사무소." },
      en: { title: "Property Crime & Visa Status in Korea (Theft, Fraud, Embezzlement) · Law in Korea", description: "How theft, fraud, and embezzlement convictions affect foreign nationals' visa and residency in Korea — especially investment visa holders." },
      ja: { title: "財産犯罪（窃盗・詐欺・横領）と在留資格審査 · Law in Korea", description: "財産犯罪の有罪判決が外国人の在留資格に与える影響と、組織的・反復的犯罪の強制退去リスク。" },
      zh: { title: "财产犯罪（盗窃·诈骗·侵占）与居留资格审查 · Law in Korea", description: "财产犯罪定罪对外国人居留资格的影响，有组织·反复犯罪的强制出境风险。" },
      vi: { title: "Tội phạm tài sản & Tư cách lưu trú tại Hàn Quốc · Law in Korea", description: "Bị kết án trộm cắp, gian lận và biển thủ ảnh hưởng thế nào đến visa và cư trú của người nước ngoài tại Hàn Quốc." },
    },
    render: (l, locale) => {
      const t = {
        ko: { tag: "재산범죄", h1: "절도·사기·횡령과 체류 자격", lead: "절도, 사기, 횡령 등 재산범죄로 유죄 판결을 받은 외국인은 체류 자격 심사 대상이 됩니다. 특히 조직적·반복적 범행은 강제퇴거 위험이 높습니다.", s1: "재산범죄가 체류 자격에 미치는 영향", p1: "형법 제329조부터 제365조에 걸쳐 절도, 사기, 공갈, 횡령 등 재산범죄가 규정됩니다. 유죄 판결 시 출입국 사범심사가 진행될 수 있습니다.", items1: ["단순 절도(소액): 초범의 경우 출국권고 또는 체류 유지 가능", "사기·횡령: 피해 금액이 클수록 강제퇴거 처분 위험 증가", "조직적·반복적 재산범죄: 강제퇴거 및 장기 재입국 금지", "투자비자(D-8) 소지자의 금융 범죄: 비자 취소 위험 높음"], s2: "사범심사 절차", p2: "재산범죄 유죄 판결 이후 사범심사가 진행될 수 있습니다.", steps: ["형사 처분 확정 (벌금·집행유예·실형)", "출입국·외국인청 사범심사 통보", "심사관 면담 (피해 규모, 피해자 합의, 재범 가능성)", "처분 결정: ① 체류 유지 ② 출국권고 ③ 강제퇴거"], s3: "선샤인행정사사무소가 할 수 있는 일", p3: "선샤인행정사사무소는 다음 서비스를 제공합니다:", services: ["사범심사 대리 출석 및 의견서 제출", "피해자 합의 자료 및 정상 참작 서류 준비", "초범·소액 절도의 경우 처분 경감 협의", "투자비자 소지자의 비자 취소 방어 지원"], cta: "지금 상담 예약", back: "사건 유형 목록으로", faqTitle: "자주 묻는 질문", faqs: [{ q: "소액 물건을 훔쳤는데 강제퇴거가 될까요?", a: "소액 초범의 경우 강제퇴거보다는 출국권고 수준에서 마무리될 가능성이 있습니다. 하지만 모든 재산범죄는 사범심사 대상이 됩니다." }, { q: "피해자 합의가 출입국 처분에 도움이 되나요?", a: "네. 피해자 합의는 형사 처분 경감뿐 아니라 출입국 사범심사에서도 중요한 정상 참작 요소가 됩니다." }, { q: "사기 전과가 가족 비자에 영향을 주나요?", a: "사기 전과는 주로 당사자에게 영향을 미치지만, 가족 초청 비자 심사에서 배우자의 전과가 심사 요소로 반영될 수 있습니다." }], notice: "※ 이 페이지는 일반적인 법령 정보 제공 목적이며 개별 사건에 대한 법률 조언이 아닙니다." },
        en: { tag: "Property Crime", h1: "Property Crime & Visa Status in Korea (Theft, Fraud, Embezzlement)", lead: "Convictions for theft, fraud, and embezzlement can subject foreign nationals to an immigration offense review in Korea. Organized or repeat property crime significantly increases the risk of forced departure.", s1: "How Property Crime Convictions Affect Immigration Status", p1: "Criminal Act Articles 329–365 govern theft, fraud, extortion, and embezzlement. A conviction may trigger an immigration offense review that affects residency status.", items1: ["Simple theft (minor amount): First offense — departure recommendation or continued stay possible", "Fraud / embezzlement: Larger amounts increase forced departure risk", "Organized / repeat property crime: Forced departure and long re-entry ban", "Investment visa (D-8) holders: Financial crime raises high risk of visa cancellation"], s2: "The Offense Review Process", p2: "After a property crime conviction, an immigration offense review may be initiated.", steps: ["Criminal disposition finalized (fine, suspended sentence, imprisonment)", "Immigration Office notified for offense review", "Officer interview (scale of damage, victim settlement, recidivism risk)", "Decision: ① Continue stay ② Departure recommendation ③ Forced departure"], s3: "How Vision Can Help", p3: "Our office provides:", services: ["Representation and written opinion at the immigration offense review", "Preparation of victim settlement and mitigating documents", "Negotiation for reduced penalty in first-offense or small-amount cases", "Support for defending against visa cancellation for investment visa holders"], cta: "Book a Consultation", back: "Back to Offense Types", faqTitle: "Frequently Asked Questions", faqs: [{ q: "I stole goods worth a small amount — will I be deported?", a: "For a minor first offense, the outcome is more likely a departure recommendation than forced departure. However, all property crimes are subject to an immigration review." }, { q: "Does victim forgiveness help?", a: "Yes. A victim settlement is an important mitigating factor both in criminal proceedings and in the immigration offense review." }, { q: "Does a fraud conviction affect family members' visas?", a: "A fraud conviction primarily affects the person convicted. However, a spouse's criminal history may be considered in family visa applications." }], notice: "This page provides general legal information only and does not constitute legal advice." },
        ja: { tag: "財産犯罪", h1: "絶盗・詐欺・横領と在留資格審査", lead: "窃盗、詐欺、横領等の財産犯罪で有罪判決を受けた外国人は在留資格審査の対象となります。特に組織的・反復的犯罪は強制退去リスクが高まります。", s1: "財産犯罪が在留資格に与える影響", p1: "刑法第329条から第365条に窃盗、詐欺、恐喝、横領等の財産犯罪が規定されています。有罪判決時に出入国犯則審査が行われる場合があります。", items1: ["単純窃盗（少額）：初犯の場合、出国勧告または在留継続の可能性", "詐欺・横領：被害金額が大きいほど強制退去処分のリスク増大", "組織的・反復的財産犯罪：強制退去および長期再入国禁止", "投資ビザ（D-8）保有者の金融犯罪：ビザ取り消しリスク高い"], s2: "犯則審査手続き", p2: "財産犯罪の有罪判決後、犯則審査が行われる場合があります。", steps: ["刑事処分確定（罰金・執行猶予・実刑）", "出入国・外国人庁への犯則審査通報", "審査官面談（被害規模・被害者示談・再犯可能性）", "処分決定：① 在留継続 ② 出国勧告 ③ 強制退去"], s3: "Visionにできること", p3: "当事務所は以下のサービスを提供します：", services: ["犯則審査への代理出席と意見書提出", "被害者示談・情状酌量資料の準備", "初犯・少額窃盗の処分軽減交渉", "投資ビザ保有者のビザ取り消し対応支援"], cta: "今すぐ相談予約", back: "違反の種類一覧へ", faqTitle: "よくある質問", faqs: [{ q: "少額の物を盗んだだけで強制退去になりますか？", a: "少額の初犯であれば、強制退去よりも出国勧告で終わる可能性があります。ただし全ての財産犯罪は犯則審査の対象となります。" }, { q: "被害者との示談は出入国処分に役立ちますか？", a: "はい。被害者示談は刑事処分の軽減だけでなく、出入国犯則審査においても重要な情状酌量要素となります。" }, { q: "詐欺前科が家族のビザに影響しますか？", a: "詐欺前科は主として本人に影響しますが、家族招請ビザ審査で配偶者の前科が審査要素として考慮される場合があります。" }], notice: "※ このページは一般的な法令情報の提供を目的としており、個別事案の法的助言ではありません。" },
        zh: { tag: "财产犯罪", h1: "盗窃·诈骗·侵占与居留资格审查", lead: "因盗窃、诈骗、侵占等财产犯罪被定罪的外国人是居留资格审查的对象。有组织·反复犯罪将显著增加被强制出境的风险。", s1: "财产犯罪对居留资格的影响", p1: "《刑法》第329条至第365条规定了盗窃、诈骗、恐吓、侵占等财产犯罪。定罪时可能启动出入境犯罪审查。", items1: ["简单盗窃（少量）：初犯可能被建议出境或继续居留", "诈骗·侵占：受害金额越大，强制出境处分风险越高", "有组织·反复财产犯罪：强制出境及长期禁止再入境", "投资签证（D-8）持有者的金融犯罪：签证取消风险高"], s2: "犯罪审查程序", p2: "财产犯罪定罪后，可能启动出入境犯罪审查。", steps: ["刑事处分确认（罚款·缓刑·实刑）", "出入境·外国人厅收到犯罪审查通报", "审查官面谈（受害规模·被害人和解·再犯风险）", "处分决定：① 继续居留 ② 建议出境 ③ 强制出境"], s3: "Vision能提供的帮助", p3: "本事务所提供以下服务：", services: ["代理出席出入境犯罪审查并提交书面意见", "准备被害人和解及从轻处罚材料", "初犯·小额盗窃处分减轻协商", "投资签证持有人签证取消防御支持"], cta: "立即预约咨询", back: "返回违规类型列表", faqTitle: "常见问题", faqs: [{ q: "偷了少量物品会被强制遣返吗？", a: "少量初犯通常以出境建议而非强制出境结案。但所有财产犯罪均为犯罪审查对象。" }, { q: "被害人宽恕对出入境处分有帮助吗？", a: "是的。被害人和解在刑事处分减轻和出入境犯罪审查中均是重要从轻情节。" }, { q: "诈骗前科会影响家属签证吗？", a: "诈骗前科主要影响本人，但在家庭邀请签证审查中，配偶的前科可能被作为审查因素。" }], notice: "※ 本页面仅供一般法律信息参考，不构成针对个案的法律建议。" },
        vi: { tag: "Tội phạm tài sản", h1: "Tội phạm tài sản & Tư cách lưu trú tại Hàn Quốc (Trộm cắp, Gian lận, Biển thủ)", lead: "Bị kết án trộm cắp, gian lận và biển thủ có thể khiến người nước ngoài phải chịu xem xét vi phạm xuất nhập cảnh tại Hàn Quốc. Tội phạm tài sản có tổ chức hoặc tái phạm làm tăng đáng kể nguy cơ bị trục xuất.", s1: "Bị kết án tội phạm tài sản ảnh hưởng thế nào đến tư cách lưu trú?", p1: "Các Điều 329–365 Luật Hình sự quy định về trộm cắp, gian lận, tống tiền và biển thủ. Bị kết án có thể kích hoạt xem xét vi phạm xuất nhập cảnh ảnh hưởng đến tư cách lưu trú.", items1: ["Trộm cắp đơn giản (số tiền nhỏ): Lần đầu — có thể bị khuyến nghị xuất cảnh hoặc tiếp tục lưu trú", "Gian lận / biển thủ: Số tiền lớn hơn làm tăng nguy cơ bị trục xuất", "Tội phạm tài sản có tổ chức / tái phạm: Trục xuất và cấm tái nhập cảnh dài hạn", "Người có visa đầu tư (D-8): Tội phạm tài chính có nguy cơ hủy visa cao"], s2: "Quy trình xem xét vi phạm", p2: "Sau khi bị kết án tội phạm tài sản, xem xét vi phạm xuất nhập cảnh có thể được khởi động.", steps: ["Bản án hình sự được xác nhận (phạt tiền, án treo, tù giam)", "Cơ quan Xuất nhập cảnh được thông báo để xem xét vi phạm", "Phỏng vấn điều tra viên (quy mô thiệt hại, hòa giải với nạn nhân, nguy cơ tái phạm)", "Quyết định: ① Tiếp tục lưu trú ② Khuyến nghị xuất cảnh ③ Trục xuất"], s3: "Vision có thể hỗ trợ gì?", p3: "Văn phòng chúng tôi cung cấp:", services: ["Đại diện và ý kiến bằng văn bản tại xem xét vi phạm xuất nhập cảnh", "Chuẩn bị tài liệu hòa giải với nạn nhân và giảm nhẹ", "Đàm phán giảm nhẹ xử phạt cho lần đầu hoặc vụ trộm cắp nhỏ", "Hỗ trợ bảo vệ khỏi hủy visa cho người có visa đầu tư"], cta: "Đặt lịch tư vấn ngay", back: "Quay lại danh sách vi phạm", faqTitle: "Câu hỏi thường gặp", faqs: [{ q: "Tôi trộm đồ vật nhỏ — tôi có bị trục xuất không?", a: "Đối với lần đầu phạm tội nhỏ, kết quả có nhiều khả năng là khuyến nghị xuất cảnh hơn là trục xuất. Tuy nhiên, mọi tội phạm tài sản đều phải chịu xem xét xuất nhập cảnh." }, { q: "Sự tha thứ của nạn nhân có giúp ích không?", a: "Có. Hòa giải với nạn nhân là yếu tố giảm nhẹ quan trọng cả trong thủ tục hình sự và xem xét vi phạm xuất nhập cảnh." }, { q: "Tiền án gian lận có ảnh hưởng đến visa của thành viên gia đình không?", a: "Tiền án gian lận chủ yếu ảnh hưởng đến người bị kết án. Tuy nhiên, tiền án của vợ/chồng có thể được xem xét trong đơn xin visa gia đình." }], notice: "Trang này chỉ cung cấp thông tin pháp luật chung và không phải lời khuyên pháp lý." },
      };
      const c = t[l] || t.ko;
      const ACCENT = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E9ECEF", bg: "#f8f9fb", warn: "#fff8e6", warnBorder: "#f59e0b" };
      return (
        <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: ACCENT.primary, marginBottom: 8 }}>{c.tag}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: ACCENT.navy, lineHeight: 1.25, marginBottom: 18 }}>{c.h1}</h1>
            <p style={{ fontSize: 17, color: ACCENT.muted, lineHeight: 1.75, marginBottom: 36, borderBottom: `1px solid ${ACCENT.border}`, paddingBottom: 32 }}>{c.lead}</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s1}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p1}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.items1.map((item, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{item}</li>)}</ul>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s2}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p2}</p>
            <ol style={{ paddingLeft: 22, marginBottom: 32 }}>{c.steps.map((step, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{step}</li>)}</ol>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s3}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p3}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.services.map((svc, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{svc}</li>)}</ul>
            <div style={{ background: ACCENT.primary, color: "#fff", borderRadius: 10, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 18, marginBottom: 40 }}>
              <div><div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>선샤인행정사사무소</div><div style={{ opacity: 0.9, fontSize: 15 }}>서울 중구 퇴계로 324, 3층 · +82-2-363-2251</div></div>
              <a href={`/${locale}#contact`} style={{ background: "#fff", color: ACCENT.primary, padding: "11px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" as const }}>{c.cta}</a>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 18 }}>{c.faqTitle}</h2>
            {c.faqs.map((faq, i) => (<div key={i} style={{ borderTop: `1px solid ${ACCENT.border}`, padding: "18px 0" }}><div style={{ fontWeight: 600, color: ACCENT.navy, marginBottom: 8, fontSize: 15 }}>{faq.q}</div><div style={{ color: ACCENT.muted, lineHeight: 1.7, fontSize: 14 }}>{faq.a}</div></div>))}
            <div style={{ marginTop: 40, background: ACCENT.warn, border: `1px solid ${ACCENT.warnBorder}`, borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{c.notice}</div>
            <div style={{ marginTop: 32 }}><a href={`/${locale}/offenses`} style={{ color: ACCENT.primary, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>← {c.back}</a></div>
          </div>
        </main>
      );
    },
  },
  "unauthorized-employment": {
    meta: {
      ko: { title: "불법취업·체류자격 외 활동과 출입국 처분 · Law in Korea", description: "취업 허가 없이 일하거나 허가 범위를 초과한 외국인과 고용주에 대한 처분, 자진 신고 방법 — 선샤인행정사사무소." },
      en: { title: "Unauthorized Employment in Korea — Consequences & How to Respond · Law in Korea", description: "Working without a valid work visa in Korea: penalties for employees and employers, types of unauthorized work, and how to regularize your status." },
      ja: { title: "不法就労と在留資格違反 · Law in Korea", description: "就労ビザなしで働いた外国人と雇用主への処罰、資格外活動の種類と対応方法。" },
      zh: { title: "非法就业与签证类别违规 · Law in Korea", description: "无就业签证从事工作的外国人及雇主的处罚、非法就业类型及应对方法。" },
      vi: { title: "Làm việc trái phép tại Hàn Quốc · Law in Korea", description: "Hình phạt cho người lao động và người sử dụng lao động khi làm việc không có visa làm việc và cách hợp pháp hóa tư cách lưu trú." },
    },
    render: (l, locale) => {
      const t = {
        ko: { tag: "불법취업", h1: "불법취업과 체류 자격 위반", lead: "취업 체류 자격 없이 일하거나, 허가된 범위를 벗어난 업무에 종사하면 불법취업에 해당합니다. 외국인 본인뿐 아니라 고용주도 처벌받습니다.", s1: "불법취업의 유형과 결과", p1: "출입국관리법 제17조는 외국인이 허가된 체류 자격 범위 내에서만 활동하도록 규정하며, 제20조는 체류자격 외 활동에 별도 허가를 요구합니다.", items1: ["관광(B-2)·단기방문(C-3) 등 무취업 비자로 취업: 강제퇴거 가능", "유학생(D-2)이 허가 시간 초과 아르바이트: 체류 자격 취소 위험", "취업 허가 범위 외 업종에서 근무: 체류자격 외 활동 위반", "고용주: 미등록 외국인 고용 시 형사처벌 및 대규모 범칙금"], s2: "사범심사 및 처벌 절차", p2: "불법취업이 적발되면 외국인 본인과 고용주 모두 처분 대상이 됩니다.", steps: ["단속 또는 신고로 불법취업 적발", "출입국·외국인청 조사 및 사범심사", "처분 결정 (범칙금, 출국권고, 강제퇴거)", "고용주 별도 형사 수사 및 범칙금 처분"], s3: "선샤인행정사사무소가 할 수 있는 일", p3: "선샤인행정사사무소는 다음 서비스를 제공합니다:", services: ["자진 신고 및 체류 자격 정상화 절차 안내", "사범심사 대리 및 의견서 제출", "처분 최소화를 위한 소명 자료 준비", "고용주 대리 대응 및 범칙금 이의신청 지원"], cta: "지금 상담 예약", back: "사건 유형 목록으로", faqTitle: "자주 묻는 질문", faqs: [{ q: "유학생 비자로 아르바이트를 해도 되나요?", a: "유학생(D-2)은 법무부 허가 범위 내에서 시간제 근무가 가능하지만, 허가 없이 초과 근무하면 불법취업에 해당합니다." }, { q: "고용주가 괜찮다고 해서 일했는데 제 책임인가요?", a: "네. 고용주의 허락 여부와 관계없이 외국인 본인도 출입국법 위반 책임을 집니다." }, { q: "자진 신고하면 처분이 줄어드나요?", a: "자진 신고는 처분 수위를 낮추는 데 유리한 요소가 될 수 있습니다. 전문가와 상담 후 신고 방법을 결정하는 것이 중요합니다." }], notice: "※ 이 페이지는 일반적인 법령 정보 제공 목적이며 개별 사건에 대한 법률 조언이 아닙니다." },
        en: { tag: "Unauthorized Employment", h1: "Working Without Authorization in Korea", lead: "Working in Korea without a valid work visa — or outside your permitted work scope — constitutes unauthorized employment. Both the employee and the employer face serious consequences.", s1: "Types and Consequences of Unauthorized Employment", p1: "Immigration Act Article 17 requires foreigners to work only within their authorized scope. Article 20 requires separate permission for activities outside the visa category.", items1: ["Working on tourist/short-stay visa (B-2, C-3): Forced departure possible", "Student (D-2) exceeding permitted part-time hours: Visa cancellation risk", "Working outside permitted industry for your work visa: Visa category violation", "Employer: Criminal penalty and large fines for hiring unauthorized workers"], s2: "The Investigation and Review Process", p2: "When unauthorized employment is discovered, both the worker and employer face proceedings.", steps: ["Unauthorized employment discovered through enforcement or report", "Immigration Office investigation and offense review", "Disposition: fine, departure recommendation, or forced departure", "Separate criminal investigation and fine for employer"], s3: "How Vision Can Help", p3: "Our office provides:", services: ["Guidance on self-reporting and regularizing status", "Representation and written opinion at immigration review", "Preparation of mitigating documents for reduced penalty", "Employer representation and fine objection support"], cta: "Book a Consultation", back: "Back to Offense Types", faqTitle: "Frequently Asked Questions", faqs: [{ q: "Can I work part-time on a student visa?", a: "D-2 students are permitted to work part-time within Ministry of Justice-approved limits. Exceeding those limits without authorization constitutes unauthorized employment." }, { q: "My employer said it was fine. Am I still responsible?", a: "Yes. The employer's permission does not remove your personal liability under immigration law. Both you and your employer face separate penalties." }, { q: "Does self-reporting reduce the penalty?", a: "Self-reporting is considered a mitigating factor and can result in reduced penalties. Consult an expert before taking action." }], notice: "This page provides general legal information only and does not constitute legal advice." },
        ja: { tag: "不法就労", h1: "不法就労と在留資格違反", lead: "就労ビザなしで働いたり、許可された範囲外の業務に従事すると不法就労に該当します。外国人本人だけでなく雇用主も処罰されます。", s1: "不法就労の類型と結果", p1: "出入国管理法第17条は外国人が許可された在留資格の範囲内でのみ活動できることを規定し、第20条は資格外活動に許可を要求しています。", items1: ["観光・短期滞在ビザでの就労：強制退去の可能性", "留学生（D-2）の許可超過アルバイト：在留資格取り消しリスク", "許可業種外での勤務：資格外活動違反", "雇用主：未登録外国人雇用で刑事処罰・多額の犯則金"], s2: "犯則審査・処罰手続き", p2: "不法就労が発覚すると、外国人本人と雇用主の両方が処分対象となります。", steps: ["摘発または通報により不法就労発覚", "出入国・外国人庁の調査・犯則審査", "処分決定（犯則金・出国勧告・強制退去）", "雇用主の刑事捜査・犯則金処分"], s3: "Visionにできること", p3: "当事務所は以下のサービスを提供します：", services: ["自進申告・在留資格正常化手続きの案内", "犯則審査代理出席・意見書提出", "処分最小化のための疎明資料準備", "雇用主代理対応・犯則金異議申立て支援"], cta: "今すぐ相談予約", back: "違反の種類一覧へ", faqTitle: "よくある質問", faqs: [{ q: "学生ビザでアルバイトはできますか？", a: "留学生（D-2）は法務部の許可範囲内でアルバイトができますが、許可なく超過勤務すると不法就労に該当します。" }, { q: "雇用主が大丈夫と言ったので働きましたが、私の責任になりますか？", a: "はい。雇用主の許可の有無にかかわらず、外国人本人も出入国法違反の責任を負います。" }, { q: "自進申告すると処分が軽くなりますか？", a: "自進申告は処分を軽減する有利な要素になります。専門家と相談のうえ決定することが重要です。" }], notice: "※ このページは一般的な法令情報の提供を目的としており、個別事案の法的助言ではありません。" },
        zh: { tag: "非法就业", h1: "非法就业与签证类别违规", lead: "在无合法就业签证情况下工作，或从事超出许可范围的工作，均构成非法就业。外国人本人和雇主均面临严重后果。", s1: "非法就业类型及后果", p1: "《出入境管理法》第17条规定外国人只能在许可范围内活动，第20条对签证类别外活动要求另行许可。", items1: ["持旅游/短期签证从事工作：可能被强制出境", "留学生（D-2）超时打工：签证被撤销风险", "在许可行业范围外工作：签证类别外活动违规", "雇主：雇用无证外国人面临刑事处罚和高额罚款"], s2: "调查与审查程序", p2: "非法就业一经发现，劳动者本人和雇主均面临处分程序。", steps: ["执法或举报发现非法就业", "出入境·外国人厅调查及犯罪审查", "处分决定（罚款·建议出境·强制出境）", "雇主单独刑事侦查及罚款处分"], s3: "Vision能提供的帮助", p3: "本事务所提供以下服务：", services: ["自首及居留资格正常化程序指导", "代理出席出入境审查并提交书面意见", "准备从轻处罚说明材料", "雇主代理应对及罚款异议支持"], cta: "立即预约咨询", back: "返回违规类型列表", faqTitle: "常见问题", faqs: [{ q: "持学生签证可以做兼职吗？", a: "留学生（D-2）可在法务部许可范围内做兼职，但未经许可超时工作构成非法就业。" }, { q: "雇主说可以，我做了还算我的责任吗？", a: "是的。无论雇主是否允许，外国人本人同样承担出入境法违规责任。" }, { q: "自首会减轻处分吗？", a: "自首是减轻处分的有利因素。建议先咨询专业人士再决定如何申报。" }], notice: "※ 本页面仅供一般法律信息参考，不构成针对个案的法律建议。" },
        vi: { tag: "Làm việc trái phép", h1: "Làm việc không có giấy phép tại Hàn Quốc", lead: "Làm việc tại Hàn Quốc mà không có visa làm việc hợp lệ — hoặc ngoài phạm vi được phép — là vi phạm. Cả người lao động và người sử dụng lao động đều đối mặt với hậu quả nghiêm trọng.", s1: "Các loại và hậu quả của làm việc trái phép", p1: "Điều 17 Luật Xuất nhập cảnh yêu cầu người nước ngoài chỉ làm việc trong phạm vi được phép. Điều 20 yêu cầu giấy phép riêng cho hoạt động ngoài loại visa.", items1: ["Làm việc trên visa du lịch/lưu trú ngắn hạn: Có thể bị trục xuất", "Sinh viên (D-2) làm bán thời gian quá số giờ cho phép: Nguy cơ hủy visa", "Làm việc ngoài ngành được phép theo visa làm việc: Vi phạm loại visa", "Người sử dụng lao động: Bị xử phạt hình sự và phạt tiền lớn"], s2: "Quy trình điều tra và xem xét", p2: "Khi phát hiện làm việc trái phép, cả người lao động và người sử dụng lao động đều đối mặt với thủ tục xử lý.", steps: ["Phát hiện làm việc trái phép qua thực thi hoặc tố cáo", "Điều tra tại Cơ quan Xuất nhập cảnh và xem xét vi phạm", "Quyết định xử phạt: phạt tiền, khuyến nghị xuất cảnh, hoặc trục xuất", "Điều tra hình sự và phạt tiền riêng cho người sử dụng lao động"], s3: "Vision có thể hỗ trợ gì?", p3: "Văn phòng chúng tôi cung cấp:", services: ["Hướng dẫn tự khai và quy trình hợp pháp hóa tư cách lưu trú", "Đại diện tại xem xét xuất nhập cảnh và nộp ý kiến bằng văn bản", "Chuẩn bị tài liệu giảm nhẹ để giảm mức phạt", "Đại diện người sử dụng lao động và hỗ trợ phản đối phạt tiền"], cta: "Đặt lịch tư vấn ngay", back: "Quay lại danh sách vi phạm", faqTitle: "Câu hỏi thường gặp", faqs: [{ q: "Tôi có thể làm bán thời gian trên visa sinh viên không?", a: "Sinh viên D-2 được phép làm bán thời gian trong giới hạn được Bộ Tư pháp phê duyệt. Vượt quá giới hạn đó là làm việc trái phép." }, { q: "Chủ sử dụng lao động nói ổn. Tôi vẫn phải chịu trách nhiệm không?", a: "Có. Sự cho phép của người sử dụng lao động không loại bỏ trách nhiệm cá nhân của bạn theo luật xuất nhập cảnh." }, { q: "Tự khai có giảm mức phạt không?", a: "Tự khai được coi là yếu tố giảm nhẹ. Hãy tư vấn chuyên gia trước khi hành động." }], notice: "Trang này chỉ cung cấp thông tin pháp luật chung và không phải lời khuyên pháp lý." },
      };
      const c = t[l] || t.ko;
      const ACCENT = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E9ECEF", bg: "#f8f9fb", warn: "#fff8e6", warnBorder: "#f59e0b" };
      return (
        <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: ACCENT.primary, marginBottom: 8 }}>{c.tag}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: ACCENT.navy, lineHeight: 1.25, marginBottom: 18 }}>{c.h1}</h1>
            <p style={{ fontSize: 17, color: ACCENT.muted, lineHeight: 1.75, marginBottom: 36, borderBottom: `1px solid ${ACCENT.border}`, paddingBottom: 32 }}>{c.lead}</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s1}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p1}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.items1.map((item, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{item}</li>)}</ul>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s2}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p2}</p>
            <ol style={{ paddingLeft: 22, marginBottom: 32 }}>{c.steps.map((step, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{step}</li>)}</ol>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s3}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p3}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>{c.services.map((svc, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{svc}</li>)}</ul>
            <div style={{ background: ACCENT.primary, color: "#fff", borderRadius: 10, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 18, marginBottom: 40 }}>
              <div><div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>선샤인행정사사무소</div><div style={{ opacity: 0.9, fontSize: 15 }}>서울 중구 퇴계로 324, 3층 · +82-2-363-2251</div></div>
              <a href={`/${locale}#contact`} style={{ background: "#fff", color: ACCENT.primary, padding: "11px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" as const }}>{c.cta}</a>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 18 }}>{c.faqTitle}</h2>
            {c.faqs.map((faq, i) => (<div key={i} style={{ borderTop: `1px solid ${ACCENT.border}`, padding: "18px 0" }}><div style={{ fontWeight: 600, color: ACCENT.navy, marginBottom: 8, fontSize: 15 }}>{faq.q}</div><div style={{ color: ACCENT.muted, lineHeight: 1.7, fontSize: 14 }}>{faq.a}</div></div>))}
            <div style={{ marginTop: 40, background: ACCENT.warn, border: `1px solid ${ACCENT.warnBorder}`, borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{c.notice}</div>
            <div style={{ marginTop: 32 }}><a href={`/${locale}/offenses`} style={{ color: ACCENT.primary, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>← {c.back}</a></div>
          </div>
        </main>
      );
    },
  },
};

export async function generateStaticParams() {
  const slugs = ["dui", "assault", "drugs", "illegal-employment", "illegal-stay", "theft", "fraud", "traffic", "sexual-offense", "violence", "other", "immigration-fines", "overstay", "unauthorized-employment", "voice-phishing", "false-documents", "property-crime"];
  return VALID_LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = VALID_LOCALES.includes(locale as L) ? (locale as L) : "ko";
  const content = SLUG_CONTENT[slug];
  if (content) {
    const m = content.meta[l];
    return { title: m.title, description: m.description, alternates: alternatesFor(l, `/offenses/${slug}`) };
  }
  return { title: COMING_SOON[l].title + " · 선샤인행정사사무소" };
}

import React from "react";

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!VALID_LOCALES.includes(locale as L)) notFound();
  const l = locale as L;

  const content = SLUG_CONTENT[slug];
  if (content) {
    return <>{content.render(l, locale)}</>;
  }

  const c = COMING_SOON[l];
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 24 }}>🔧</div>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>{c.title}</h1>
      <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>{c.msg}</p>
      <a href={`/${l}/offenses`} style={{ display: "inline-block", background: "#1e4a8a", color: "#fff", padding: "12px 28px", borderRadius: 6, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{c.back}</a>
    </main>
  );
}
