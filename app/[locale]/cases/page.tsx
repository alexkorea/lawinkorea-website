import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { breadcrumbSchema } from "../../lib/schema";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

const FIELD_LABELS: Record<L, { situation: string; issue: string; handling: string; result: string }> = {
  ko: { situation: "상황", issue: "쟁점", handling: "처리", result: "결과" },
  en: { situation: "Situation", issue: "Issue", handling: "Handling", result: "Result" },
  zh: { situation: "情况", issue: "争议点", handling: "处理", result: "结果" },
  ja: { situation: "状況", issue: "争点", handling: "対応", result: "結果" },
  vi: { situation: "Tình huống", issue: "Vấn đề", handling: "Xử lý", result: "Kết quả" },
};

const CONTENT: Record<L, {
  title: string;
  sub: string;
  cases: { label: string; year: string; situation: string; issue: string; handling: string; result: string }[];
  note: string;
}> = {
  ko: {
    title: "주요 대응 사례",
    sub: "선샤인행정사사무소가 지원한 사범심사 대응 사례를 유형별로 재구성해 소개합니다. 모든 사례는 개인정보 보호를 위해 익명·재구성되었으며, 결과는 사안별로 달라질 수 있습니다.",
    cases: [
      {
        label: "음주운전(DUI) 관련 사범심사",
        year: "2025년",
        situation: "외국인등록을 마친 A씨는 혈중알코올농도 기준을 초과한 상태로 운전하다 적발되어 형사 입건됨과 동시에 출입국사범심사 대상 통보를 받았습니다.",
        issue: "초범 여부와 측정 수치, 이후 반성 태도가 처분 수위 판단에 영향을 미치는 상황이었고, 기한 내 소명자료 제출이 관건이었습니다.",
        handling: "재직증명서·반성문 등 정상 참작 자료를 정리해 소명서를 작성하고, 기한 내 출입국·외국인청에 제출을 지원했습니다.",
        result: "심사 절차가 진행되었고, 소명자료 제출 이후 처분 결과가 통지되었습니다. 결과는 개인 이력·사안에 따라 달라질 수 있습니다.",
      },
      {
        label: "형사사건 입건에 따른 체류자격 영향 검토",
        year: "2025년",
        situation: "B씨는 폭행 관련 형사사건으로 입건되어 체류자격 유지 여부에 대한 불안을 느끼고 상담을 요청했습니다.",
        issue: "기소유예·약식기소 등 형사 처분 결과가 확정되기 전이라, 출입국사범심사 진행 시점과 대응 전략을 정하는 것이 쟁점이었습니다.",
        handling: "체류 이력과 사건 경위를 정리하고, 형사 절차 진행 상황에 맞춰 필요한 소명자료를 사전에 준비했습니다.",
        result: "형사 처분 확정 이후 관련 절차가 진행되었으며, 준비된 자료를 바탕으로 소명 절차를 지원했습니다.",
      },
      {
        label: "허가 외 취업활동에 따른 출국명령 검토",
        year: "2024년",
        situation: "C씨는 체류자격에서 허용하지 않는 범위의 취업활동을 하다 적발되어 출국명령 가능성을 통보받았습니다.",
        issue: "취업활동 경위와 기간, 위반 인지 여부 등 사실관계 확인이 우선 과제였습니다.",
        handling: "취업활동 경위를 사실대로 정리하고, 사안에 맞는 소명자료를 준비해 제출을 지원했습니다.",
        result: "관련 절차에 따라 처분이 통지되었습니다. 취업활동 위반은 사안별 편차가 커 개별 상담이 필요합니다.",
      },
      {
        label: "체류기간 초과(오버스테이) 자진출국 검토",
        year: "2024년",
        situation: "D씨는 비자 만료 이후 일정 기간 체류를 지속한 상태로, 자진출국과 재입국 제한 가능성에 대해 상담을 요청했습니다.",
        issue: "초과 체류 기간에 따른 재입국 제한 기준과 자진출국 신고 요건 충족 여부가 쟁점이었습니다.",
        handling: "체류 경위와 초과 기간을 확인하고, 자진출국 절차 및 필요 서류에 대한 안내를 지원했습니다.",
        result: "관련 절차 안내에 따라 신고 및 후속 절차가 진행되었습니다.",
      },
    ],
    note: "위 사례는 실제 상담 사례를 개인정보 보호를 위해 재구성·각색한 것으로, 특정 개인을 특정할 수 없도록 처리되었습니다. 사례별 처분 결과를 보장하지 않으며, 모든 사안은 개별적으로 검토되어야 합니다. 본인 상황에 맞는 정확한 안내는 상담을 통해 확인하시기 바랍니다.",
  },
  en: {
    title: "Case Highlights",
    sub: "A selection of immigration offense review cases we have supported, reorganized by type. All cases have been anonymized and recomposed to protect privacy; outcomes vary by case.",
    cases: [
      {
        label: "DUI-Related Offense Review",
        year: "2025",
        situation: "Client A, a registered foreign resident, was stopped for driving over the legal blood alcohol limit and was both criminally charged and notified of an immigration offense review.",
        issue: "Whether this was a first offense, the measured BAC level, and subsequent remorse would shape the disposition, with timely submission of supporting materials being critical.",
        handling: "We compiled mitigating documents (proof of employment, letter of apology) into a written explanation and supported submission to the Immigration Office within the deadline.",
        result: "The review proceeded and a disposition was issued after the materials were submitted. Outcomes vary by individual history and circumstances.",
      },
      {
        label: "Criminal Charge — Visa Status Impact Review",
        year: "2025",
        situation: "Client B was criminally charged in an assault-related case and sought consultation out of concern for their visa status.",
        issue: "Since the criminal outcome (suspended prosecution, summary indictment, etc.) had not yet been finalized, timing the immigration review response was the key question.",
        handling: "We organized the stay history and case background, preparing the necessary materials in step with the criminal proceedings.",
        result: "Once the criminal disposition was finalized, the related procedure proceeded, supported by the materials prepared in advance.",
      },
      {
        label: "Unauthorized Employment — Departure Order Review",
        year: "2024",
        situation: "Client C was found working outside the scope permitted by their visa status and was notified of a possible departure order.",
        issue: "The primary task was establishing the facts — the nature and duration of the work, and whether the violation was knowing.",
        handling: "We documented the employment circumstances accurately and prepared case-appropriate supporting materials for submission.",
        result: "A disposition was issued following the procedure. Outcomes for employment violations vary significantly by case, requiring individual consultation.",
      },
      {
        label: "Overstay — Voluntary Departure Review",
        year: "2024",
        situation: "Client D had remained in Korea past their visa expiry and sought consultation on voluntary departure and re-entry restrictions.",
        issue: "The key issues were the re-entry restriction period based on overstay duration and whether the voluntary departure reporting requirements were met.",
        handling: "We reviewed the stay history and overstay period, and guided the client through the voluntary departure procedure and required documents.",
        result: "The reporting and follow-up procedure proceeded according to the guidance provided.",
      },
    ],
    note: "The cases above are recomposed from actual consultations, anonymized so no individual can be identified. No specific outcome is guaranteed for any case, and every matter must be reviewed individually. Please consult us for guidance specific to your situation.",
  },
  zh: {
    title: "主要应对案例",
    sub: "以下为Sunshine行政士事务所支援过的事犯审查应对案例，按类型重新整理介绍。所有案例均为保护个人信息而匿名、重新编排，结果因案而异。",
    cases: [
      {
        label: "酒驾（DUI）相关事犯审查",
        year: "2025年",
        situation: "已完成外国人登记的A先生/女士因血液酒精浓度超标驾车被查获，被刑事立案的同时收到出入境事犯审查通知。",
        issue: "是否初犯、测定数值及事后反省态度会影响处分程度，能否在期限内提交说明材料是关键。",
        handling: "整理在职证明书、悔过书等酌情材料撰写说明书，并协助在期限内提交至出入境·外国人厅。",
        result: "审查程序得以进行，材料提交后收到处分结果通知。结果因个人履历及案情而异。",
      },
      {
        label: "刑事立案对居留资格影响审查",
        year: "2025年",
        situation: "B先生/女士因暴力相关刑事案件被立案，担心居留资格受影响而前来咨询。",
        issue: "由于起诉犹豫、简易起诉等刑事处分结果尚未确定，如何安排事犯审查应对时机是关键问题。",
        handling: "整理居留履历及案件经过，配合刑事程序进展提前准备所需说明材料。",
        result: "刑事处分确定后相关程序得以推进，事先准备的材料为说明程序提供了支持。",
      },
      {
        label: "许可范围外就业与出境命令审查",
        year: "2024年",
        situation: "C先生/女士从事超出居留资格许可范围的就业活动被查获，收到可能下达出境命令的通知。",
        issue: "首要课题是核实就业活动的经过、期间及是否明知违规。",
        handling: "如实整理就业活动经过，准备符合案情的说明材料并协助提交。",
        result: "按相关程序收到处分通知。就业违规案件因情况差异较大，需个别咨询。",
      },
      {
        label: "超期逗留与自愿出境审查",
        year: "2024年",
        situation: "D先生/女士签证到期后继续在韩居留一段时间，就自愿出境及再入境限制可能性前来咨询。",
        issue: "关键在于根据超期居留时长确定再入境限制标准，以及是否满足自愿出境申报要求。",
        handling: "核实居留经过及超期时长，就自愿出境程序及所需文件提供指导。",
        result: "按指导内容进行了申报及后续程序。",
      },
    ],
    note: "以上案例为保护个人信息，基于实际咨询案例重新编排、匿名处理，无法特定个人身份。不保证任何案例的特定处分结果，所有案件均需个别审查。请通过咨询获取适合您情况的准确指导。",
  },
  ja: {
    title: "主な対応事例",
    sub: "ビジョン行政士事務所が支援した事犯審査対応事例を類型別に再構成してご紹介します。すべての事例は個人情報保護のため匿名化・再構成されており、結果は事案により異なります。",
    cases: [
      {
        label: "飲酒運転（DUI）関連事犯審査",
        year: "2025年",
        situation: "外国人登録済みのAさんは、血中アルコール濃度基準を超えた状態で運転し摘発され、刑事立件と同時に出入国事犯審査対象の通知を受けました。",
        issue: "初犯か否か、測定数値、その後の反省態度が処分の程度判断に影響する状況で、期限内の疎明資料提出が重要でした。",
        handling: "在職証明書・反省文等の情状酌量資料を整理して疎明書を作成し、期限内に出入国・外国人庁への提出を支援しました。",
        result: "審査手続きが進行し、資料提出後に処分結果が通知されました。結果は個人の履歴・事案により異なります。",
      },
      {
        label: "刑事立件による在留資格影響の検討",
        year: "2025年",
        situation: "Bさんは暴行関連の刑事事件で立件され、在留資格維持への不安から相談を依頼しました。",
        issue: "起訴猶予・略式起訴等の刑事処分結果が確定する前で、事犯審査対応の時期と戦略を定めることが課題でした。",
        handling: "在留履歴と事件経緯を整理し、刑事手続きの進行状況に合わせて必要な疎明資料を事前に準備しました。",
        result: "刑事処分確定後に関連手続きが進行し、事前準備した資料をもとに疎明手続きを支援しました。",
      },
      {
        label: "許可外就労活動による出国命令の検討",
        year: "2024年",
        situation: "Cさんは在留資格で許可されない範囲の就労活動を行い摘発され、出国命令の可能性を通知されました。",
        issue: "就労活動の経緯・期間、違反の認識有無等の事実確認が最優先の課題でした。",
        handling: "就労活動の経緯を事実どおりに整理し、事案に応じた疎明資料を準備して提出を支援しました。",
        result: "関連手続きに従い処分が通知されました。就労違反は事案ごとの差が大きく、個別相談が必要です。",
      },
      {
        label: "在留期間超過（オーバーステイ）自主出国の検討",
        year: "2024年",
        situation: "Dさんはビザ失効後も一定期間在留を続けた状態で、自主出国と再入国制限の可能性について相談を依頼しました。",
        issue: "超過在留期間に応じた再入国制限基準と、自主出国申告要件の充足有無が争点でした。",
        handling: "在留経緯と超過期間を確認し、自主出国手続きおよび必要書類についてご案内しました。",
        result: "案内内容に従い申告及び後続手続きが進行しました。",
      },
    ],
    note: "上記事例は実際の相談事例を個人情報保護のため再構成・脚色したもので、特定個人を識別できないよう処理されています。事例ごとの処分結果を保証するものではなく、すべての案件は個別に検討される必要があります。ご自身の状況に応じた正確なご案内はご相談を通じてご確認ください。",
  },
  vi: {
    title: "Các trường hợp tiêu biểu",
    sub: "Giới thiệu các trường hợp xem xét vi phạm xuất nhập cảnh mà Văn phòng Hành chính sĩ Sunshine đã hỗ trợ, được sắp xếp lại theo loại hình. Tất cả trường hợp đã được ẩn danh và tái cấu trúc để bảo vệ thông tin cá nhân; kết quả khác nhau tùy từng trường hợp.",
    cases: [
      {
        label: "Xem xét vi phạm liên quan đến lái xe say rượu (DUI)",
        year: "Năm 2025",
        situation: "Anh/chị A, người nước ngoài đã đăng ký cư trú, bị phát hiện lái xe vượt ngưỡng nồng độ cồn cho phép, vừa bị khởi tố hình sự vừa nhận thông báo xem xét vi phạm xuất nhập cảnh.",
        issue: "Việc có phải lần đầu vi phạm hay không, chỉ số đo được, và thái độ hối lỗi sau đó ảnh hưởng đến mức độ xử lý; việc nộp tài liệu giải trình đúng hạn là yếu tố then chốt.",
        handling: "Chúng tôi tổng hợp các tài liệu giảm nhẹ (giấy xác nhận việc làm, thư xin lỗi) thành văn bản giải trình và hỗ trợ nộp lên Cục Xuất nhập cảnh đúng thời hạn.",
        result: "Quy trình xem xét đã được tiến hành và kết quả xử lý được thông báo sau khi nộp tài liệu. Kết quả khác nhau tùy theo lý lịch và hoàn cảnh cá nhân.",
      },
      {
        label: "Xem xét ảnh hưởng đến tư cách lưu trú do bị khởi tố hình sự",
        year: "Năm 2025",
        situation: "Anh/chị B bị khởi tố hình sự trong một vụ liên quan đến hành hung và tìm đến tư vấn vì lo ngại về tư cách lưu trú.",
        issue: "Do kết quả xử lý hình sự (tạm hoãn khởi tố, khởi tố rút gọn, v.v.) chưa được xác định, việc xác định thời điểm ứng phó với xem xét xuất nhập cảnh là vấn đề then chốt.",
        handling: "Chúng tôi tổng hợp lịch sử lưu trú và bối cảnh vụ việc, chuẩn bị tài liệu cần thiết theo tiến độ của thủ tục hình sự.",
        result: "Sau khi xử lý hình sự được xác định, thủ tục liên quan đã được tiến hành với sự hỗ trợ của tài liệu đã chuẩn bị trước.",
      },
      {
        label: "Xem xét lệnh xuất cảnh do làm việc trái phạm vi cho phép",
        year: "Năm 2024",
        situation: "Anh/chị C bị phát hiện làm việc ngoài phạm vi tư cách lưu trú cho phép và nhận thông báo có thể bị ra lệnh xuất cảnh.",
        issue: "Nhiệm vụ ưu tiên hàng đầu là xác minh sự thật — tính chất, thời gian làm việc và việc có nhận thức về vi phạm hay không.",
        handling: "Chúng tôi ghi nhận chính xác hoàn cảnh làm việc và chuẩn bị tài liệu giải trình phù hợp với từng trường hợp để nộp.",
        result: "Kết quả xử lý được thông báo theo thủ tục liên quan. Các vi phạm về việc làm có sự khác biệt lớn tùy từng trường hợp, cần tư vấn riêng.",
      },
      {
        label: "Xem xét xuất cảnh tự nguyện do ở quá hạn visa",
        year: "Năm 2024",
        situation: "Anh/chị D đã ở lại Hàn Quốc một thời gian sau khi visa hết hạn và tìm đến tư vấn về xuất cảnh tự nguyện cũng như khả năng bị hạn chế nhập cảnh lại.",
        issue: "Vấn đề then chốt là tiêu chuẩn hạn chế nhập cảnh lại theo thời gian ở quá hạn và việc có đáp ứng yêu cầu khai báo xuất cảnh tự nguyện hay không.",
        handling: "Chúng tôi xác minh lịch sử lưu trú và thời gian quá hạn, hướng dẫn về thủ tục xuất cảnh tự nguyện và các giấy tờ cần thiết.",
        result: "Việc khai báo và thủ tục tiếp theo đã được tiến hành theo hướng dẫn.",
      },
    ],
    note: "Các trường hợp trên được tái cấu trúc từ các buổi tư vấn thực tế, ẩn danh để không thể xác định danh tính cá nhân. Không có kết quả cụ thể nào được đảm bảo cho bất kỳ trường hợp nào, và mọi vụ việc đều cần được xem xét riêng. Vui lòng tư vấn với chúng tôi để được hướng dẫn phù hợp với tình huống của bạn.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "cases", "/cases");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) notFound();
  const l = locale as L;
  const c = CONTENT[l];
  const fl = FIELD_LABELS[l];

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(l, [{ name: c.title, path: "/cases" }])),
        }}
      />
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0a1628", marginBottom: 12 }}>{c.title}</h1>
      <p style={{ color: "#64748b", fontSize: 17, lineHeight: 1.7, marginBottom: 48 }}>{c.sub}</p>

      <div style={{ display: "grid", gap: 24 }}>
        {c.cases.map((item, i) => (
          <div key={i} style={{
            border: "1px solid #e2e8f0",
            borderRadius: 10,
            padding: "24px 28px",
            background: "#fff",
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 17, color: "#0a1628" }}>{item.label}</div>
              <div style={{ fontSize: 13, color: "#94a3b8" }}>{item.year}</div>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {[
                [fl.situation, item.situation],
                [fl.issue, item.issue],
                [fl.handling, item.handling],
                [fl.result, item.result],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", flexWrap: "wrap", gap: 4, columnGap: 12 }}>
                  <div style={{ flexShrink: 0, minWidth: 36, fontWeight: 700, fontSize: 13, color: "#1e4a8a" }}>{k}</div>
                  <p style={{ flex: 1, minWidth: 200, color: "#475569", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{v}</p>
                </div>
              ))}
            </div>
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
