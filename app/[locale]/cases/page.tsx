import { notFound } from "next/navigation";
import type { Metadata } from "next";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

const CONTENT: Record<L, {
  title: string;
  sub: string;
  cases: { label: string; desc: string }[];
  note: string;
}> = {
  ko: {
    title: "주요 사례 유형",
    sub: "음주운전·형사사건·출입국법 위반 등 외국인 체류 위기 상황별 대응 사례를 안내합니다.",
    cases: [
      { label: "음주운전(DUI)", desc: "혈중알코올농도 기준 위반으로 적발된 경우, 형사 처분과 별도로 사범심사 대상이 될 수 있습니다. 초범 여부, 측정 수치, 반성 태도에 따라 결과가 달라집니다." },
      { label: "폭행·상해", desc: "형사사건으로 입건된 경우 체류 자격에 영향을 미칠 수 있습니다. 기소 유예 또는 선고 결과에 따라 소명 전략이 달라집니다." },
      { label: "불법취업·취업활동 위반", desc: "취업 자격 없이 근무하거나 허가 외 취업활동을 한 경우, 출국명령 또는 강제퇴거 대상이 될 수 있습니다." },
      { label: "마약 관련", desc: "마약류 소지·투약 등으로 입건된 외국인은 강제퇴거 절차가 진행될 가능성이 높습니다. 사실관계 확인과 소명이 중요합니다." },
      { label: "체류 기간 초과", desc: "비자 만료 후 계속 체류한 경우, 자진 출국 요건 충족 여부 및 재입국 제한 가능성을 검토해야 합니다." },
      { label: "출국명령·강제퇴거", desc: "출국명령이 내려진 경우 이의신청 또는 체류 허가 신청 가능 여부를 검토합니다. 강제퇴거 집행 전 단계 대응이 핵심입니다." },
    ],
    note: "사례마다 상황이 다르므로 개별 검토가 필요합니다. 상담을 통해 본인 상황에 맞는 대응 방향을 안내받으시기 바랍니다.",
  },
  en: {
    title: "Case Types",
    sub: "Common immigration offense situations for foreign nationals — DUI, criminal cases, visa violations, and more.",
    cases: [
      { label: "DUI / Drunk Driving", desc: "Being caught over the legal blood alcohol limit may trigger an immigration offense review separate from criminal proceedings. Outcome depends on prior record, BAC level, and attitude." },
      { label: "Assault / Bodily Harm", desc: "Criminal charges for assault may affect your visa status. Whether charges are suspended or a sentence is handed down will shape the response strategy." },
      { label: "Unauthorized Employment", desc: "Working without proper work authorization or outside the scope of your visa may result in a departure order or deportation." },
      { label: "Drug-Related Offenses", desc: "Foreign nationals charged with possession or use of narcotics face a high likelihood of deportation proceedings. Accurate fact-checking and written explanation are critical." },
      { label: "Overstay", desc: "Remaining in Korea after visa expiry requires checking eligibility for voluntary departure and assessing re-entry restrictions." },
      { label: "Departure Order / Deportation", desc: "If a departure order has been issued, we review eligibility for appeal or stay application before enforcement." },
    ],
    note: "Each case is unique and requires individual assessment. Please contact us for a consultation tailored to your situation.",
  },
  zh: {
    title: "主要案例类型",
    sub: "酒驾、刑事案件、出入境法律违规等外国人留居危机情况的案例介绍。",
    cases: [
      { label: "酒后驾车 (DUI)", desc: "被查出血液酒精浓度超标时，除刑事处罚外，还可能成为事犯审查对象。结果取决于初犯与否、数值及反省态度。" },
      { label: "暴力/伤害", desc: "因刑事案件被立案调查时，可能影响居留资格。根据起诉结果或判决，应对策略有所不同。" },
      { label: "非法就业", desc: "无就业资格从事工作或从事许可范围外工作，可能被处以出境命令或强制驱逐。" },
      { label: "毒品相关", desc: "因持有或使用毒品被立案的外国人，很可能面临强制驱逐程序。核实事实和提交说明至关重要。" },
      { label: "超期逗留", desc: "签证到期后继续留韩时，需检查是否符合自愿出境条件及再入境限制可能性。" },
      { label: "出境命令/强制驱逐", desc: "如已下达出境命令，我们将审查是否可提出异议或申请居留许可。" },
    ],
    note: "每个案例情况各异，需个别审查。请通过咨询了解适合您情况的应对方向。",
  },
  ja: {
    title: "主要事例の種類",
    sub: "飲酒運転・刑事事件・出入国法違反など、外国人の在留危機状況別の対応事例をご案内します。",
    cases: [
      { label: "飲酒運転 (DUI)", desc: "血中アルコール濃度基準違反で摘発された場合、刑事処分とは別に事犯審査の対象となり得ます。初犯か否か、数値、反省態度により結果が異なります。" },
      { label: "暴行・傷害", desc: "刑事事件で立件された場合、在留資格に影響する可能性があります。起訴猶予または判決結果に応じて対応戦略が異なります。" },
      { label: "不法就労", desc: "就労資格なしで勤務したり、許可外の就労活動を行った場合、出国命令または強制退去の対象となる可能性があります。" },
      { label: "薬物関連", desc: "薬物の所持・使用等で立件された外国人は、強制退去手続きが進む可能性が高いです。事実確認と疎明が重要です。" },
      { label: "在留期間超過", desc: "ビザ失効後も在留した場合、自主出国要件の充足と再入国制限の可能性を確認する必要があります。" },
      { label: "出国命令・強制退去", desc: "出国命令が下された場合、異議申し立てまたは在留許可申請の可否を検討します。" },
    ],
    note: "事例ごとに状況が異なるため、個別検討が必要です。ご相談を通じてご自身の状況に合った対応方針をご案内します。",
  },
  vi: {
    title: "Các loại trường hợp",
    sub: "Các tình huống vi phạm xuất nhập cảnh phổ biến — lái xe say rượu, vụ án hình sự, vi phạm visa và nhiều hơn nữa.",
    cases: [
      { label: "Lái xe say rượu (DUI)", desc: "Bị phát hiện vượt ngưỡng nồng độ cồn cho phép có thể dẫn đến xem xét vi phạm xuất nhập cảnh ngoài xử lý hình sự. Kết quả phụ thuộc vào lần vi phạm đầu tiên hay tái phạm, chỉ số đo và thái độ hối lỗi." },
      { label: "Hành hung / Thương tích", desc: "Bị khởi tố hình sự về tội hành hung có thể ảnh hưởng đến tư cách lưu trú. Chiến lược ứng phó phụ thuộc vào kết quả khởi tố hay bản án." },
      { label: "Làm việc trái phép", desc: "Làm việc mà không có giấy phép lao động hợp lệ hoặc ngoài phạm vi visa có thể dẫn đến lệnh xuất cảnh hoặc trục xuất." },
      { label: "Liên quan đến ma túy", desc: "Người nước ngoài bị buộc tội tàng trữ hoặc sử dụng chất ma túy có nguy cơ cao bị trục xuất. Xác minh sự thật và giải trình bằng văn bản là rất quan trọng." },
      { label: "Ở quá hạn", desc: "Ở lại Hàn Quốc sau khi visa hết hạn cần kiểm tra điều kiện xuất cảnh tự nguyện và đánh giá khả năng bị hạn chế nhập cảnh lại." },
      { label: "Lệnh xuất cảnh / Trục xuất", desc: "Nếu đã có lệnh xuất cảnh, chúng tôi xem xét khả năng kháng cáo hoặc nộp đơn xin ở lại trước khi thi hành." },
    ],
    note: "Mỗi trường hợp đều độc đáo và cần đánh giá riêng. Vui lòng liên hệ để được tư vấn phù hợp với tình huống của bạn.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = VALID_LOCALES.includes(locale as L) ? (locale as L) : "ko";
  return { title: CONTENT[l].title + " · 비전행정사사무소" };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) notFound();
  const l = locale as L;
  const c = CONTENT[l];

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0a1628", marginBottom: 12 }}>{c.title}</h1>
      <p style={{ color: "#64748b", fontSize: 17, lineHeight: 1.7, marginBottom: 48 }}>{c.sub}</p>

      <div style={{ display: "grid", gap: 20 }}>
        {c.cases.map((item, i) => (
          <div key={i} style={{
            border: "1px solid #e2e8f0",
            borderRadius: 10,
            padding: "24px 28px",
            background: "#fff",
          }}>
            <div style={{ fontWeight: 700, fontSize: 17, color: "#0a1628", marginBottom: 8 }}>{item.label}</div>
            <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 48,
        background: "#f0f7ff",
        border: "1px solid #bdd7f7",
        borderRadius: 10,
        padding: "20px 24px",
        color: "#1e4a8a",
        fontSize: 15,
        lineHeight: 1.7,
      }}>
        {c.note}
      </div>
    </main>
  );
}
