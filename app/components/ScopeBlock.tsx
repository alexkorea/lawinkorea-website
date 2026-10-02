/**
 * 업무범위 블록 — "행정사가 할 수 있는 일 / 할 수 없는 일" (맥7 K-exec 2026-10-03 지시 4·7장).
 * about(회사허브)·사범심사 허브가 같은 원천을 쓴다. 문구를 페이지에 다시 적지 말 것.
 *
 * 근거: 행정사법 제2조 제1항(서류 작성·사실증명 서류 작성·번역·제출 대행), 변호사법 제3조,
 * 공인노무사법 제2조, 세무사법 제2조. 행정사법에 행정심판 '대리' 규정은 없다 → "청구서 작성·제출 지원"까지만.
 * 외국어 사무소명은 Boss 미확정이므로 ko 외 로캘에서는 사무소명을 쓰지 않는다.
 */
type L = "ko" | "en" | "zh" | "ja" | "vi";

const T: Record<L, {
  title: string;
  canLabel: string;
  can: string[];
  canNote: string;
  cannotLabel: string;
  cannot: string[];
  cannotExtra: string[];
  cannotNote: string;
}> = {
  ko: {
    title: "행정사가 할 수 있는 일과 할 수 없는 일",
    canLabel: "행정사가 할 수 있는 일",
    can: [
      "사범심사 관련 서류 작성·제출",
      "의견서·반성문·탄원서 작성 지원",
      "행정심판 청구서 작성·제출 지원",
    ],
    canNote:
      "근거: 행정사법 제2조 제1항 — 행정기관에 제출하는 서류의 작성, 권리·의무나 사실증명에 관한 서류의 작성, 작성한 서류의 제출 대행.",
    cannotLabel: "행정사가 할 수 없는 일",
    cannot: ["형사재판 변호·소송 대리는 변호사 업무입니다."],
    cannotExtra: [
      "노동 관계 법령에 따른 신고·진정·청구 등의 대리는 공인노무사 업무입니다.",
      "조세 신고·불복 청구의 대리는 세무사 업무입니다.",
    ],
    cannotNote:
      "선샤인행정사사무소는 형사사건 변호, 법원 소송, 행정심판 대리를 하지 않습니다. 이런 절차가 필요하면 해당 전문가 상담을 받으시도록 안내합니다.",
  },
  en: {
    title: "What an administrative scrivener can and cannot do",
    canLabel: "What we can do",
    can: [
      "Prepare and submit documents for an immigration offense review",
      "Help you draft statements of opinion, letters of apology and petitions",
      "Help you prepare and file a petition for administrative appeal",
    ],
    canNote:
      "Basis: Article 2(1) of Korea's Haengjeongsa Act (the statute governing administrative agents) — drafting documents submitted to administrative agencies, drafting documents that certify facts, and submitting the documents so prepared.",
    cannotLabel: "What we cannot do",
    cannot: ["Defending you in a criminal trial or representing you in a lawsuit is the work of a lawyer."],
    cannotExtra: [
      "Acting for you in filings and complaints under labor laws is the work of a certified labor consultant.",
      "Acting for you in tax returns and tax appeals is the work of a certified tax accountant.",
    ],
    cannotNote:
      "We do not defend criminal cases, appear in court, or act as your representative in an administrative appeal. If your case needs that, we will tell you so and suggest you consult the right professional.",
  },
  zh: {
    title: "行政士能做什么、不能做什么",
    canLabel: "行政士可以做的事",
    can: [
      "撰写并提交出入境违规审查相关文件",
      "协助撰写意见书、悔过书和求情信",
      "协助撰写并提交行政审判请求书",
    ],
    canNote:
      "依据：韩国《行政士法》第2条第1款——撰写向行政机关提交的文件、撰写证明事实的文件、代为提交所撰写的文件。",
    cannotLabel: "行政士不能做的事",
    cannot: ["刑事审判中的辩护和诉讼代理属于律师业务。"],
    cannotExtra: [
      "依劳动关系法令进行的申报、申诉、请求等代理属于公认劳务士业务。",
      "税务申报及税务争议请求的代理属于税务士业务。",
    ],
    cannotNote:
      "本事务所不承办刑事辩护和法院诉讼，也不代理行政审判。如您的案件需要这些程序，我们会如实说明并建议您咨询相应的专业人士。",
  },
  ja: {
    title: "行政書士にできること・できないこと",
    canLabel: "行政書士にできること",
    can: [
      "出入国事犯審査に関する書類の作成・提出",
      "意見書・反省文・嘆願書の作成支援",
      "行政審判請求書の作成・提出支援",
    ],
    canNote:
      "根拠：韓国行政士法第2条第1項 — 行政機関に提出する書類の作成、事実証明に関する書類の作成、作成した書類の提出代行。",
    cannotLabel: "行政書士にできないこと",
    cannot: ["刑事裁判の弁護・訴訟代理は弁護士の業務です。"],
    cannotExtra: [
      "労働関係法令に基づく申告・陳情・請求などの代理は公認労務士の業務です。",
      "租税の申告・不服申立ての代理は税務士の業務です。",
    ],
    cannotNote:
      "当事務所は刑事弁護、裁判所での訴訟、行政審判の代理は行いません。こうした手続きが必要な場合は、その旨をお伝えし、該当する専門家へのご相談をご案内します。",
  },
  vi: {
    title: "Hành chính sĩ được làm gì và không được làm gì",
    canLabel: "Việc chúng tôi có thể làm",
    can: [
      "Soạn và nộp hồ sơ liên quan đến thẩm tra vi phạm xuất nhập cảnh",
      "Hỗ trợ soạn bản ý kiến, thư hối lỗi và đơn xin giảm nhẹ",
      "Hỗ trợ soạn và nộp đơn yêu cầu xét lại quyết định hành chính",
    ],
    canNote:
      "Căn cứ: Luật Hành chính sĩ Hàn Quốc, Điều 2 khoản 1 — soạn văn bản nộp cho cơ quan hành chính, soạn văn bản chứng minh sự việc và nộp thay các văn bản đã soạn.",
    cannotLabel: "Việc chúng tôi không thể làm",
    cannot: ["Bào chữa trong phiên tòa hình sự và đại diện tố tụng là công việc của luật sư."],
    cannotExtra: [
      "Đại diện khai báo, khiếu nại theo pháp luật lao động là công việc của chuyên viên lao động được cấp phép.",
      "Đại diện kê khai thuế và khiếu nại về thuế là công việc của chuyên viên thuế được cấp phép.",
    ],
    cannotNote:
      "Chúng tôi không bào chữa vụ án hình sự, không đại diện tại tòa án và không làm người đại diện trong thủ tục xét lại quyết định hành chính. Nếu vụ việc cần những thủ tục đó, chúng tôi sẽ nói rõ và gợi ý bạn tham khảo chuyên gia phù hợp.",
  },
};

export default function ScopeBlock({ locale, extended = false }: { locale: string; extended?: boolean }) {
  const t = T[(locale in T ? locale : "ko") as L];
  const cannot = extended ? [...t.cannot, ...t.cannotExtra] : t.cannot;
  return (
    <section id="scope" style={{ margin: "0 0 48px" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", margin: "0 0 20px" }}>{t.title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        <div style={{ border: "1px solid #bfdbfe", background: "#eff6ff", borderRadius: 10, padding: "20px 24px" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e40af", margin: "0 0 12px" }}>{t.canLabel}</h3>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#1f2937", lineHeight: 1.8, fontSize: 15 }}>
            {t.can.map((x) => <li key={x}>{x}</li>)}
          </ul>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: "#475569", lineHeight: 1.6 }}>{t.canNote}</p>
        </div>
        <div style={{ border: "1px solid #fde68a", background: "#fffbeb", borderRadius: 10, padding: "20px 24px" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#92400e", margin: "0 0 12px" }}>{t.cannotLabel}</h3>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#1f2937", lineHeight: 1.8, fontSize: 15 }}>
            {cannot.map((x) => <li key={x}>{x}</li>)}
          </ul>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: "#475569", lineHeight: 1.6 }}>{t.cannotNote}</p>
        </div>
      </div>
    </section>
  );
}
