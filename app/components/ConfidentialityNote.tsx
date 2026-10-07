// 상담 내용 비밀 유지 안내(LAW-V1 P1-3) — 홈·문의·긴급상담 공통.
// 결과를 약속하지 않고 법적 의무 사실만 적는다. 조문 문언은 국가법령정보센터 현행판에서 확인:
// 행정사법(법률 제19034호, 2022-11-15 시행) 제23조(비밀엄수), 2026-10-04 확인.
// 원문: https://www.law.go.kr/법령/행정사법/제23조 — 화면에는 출처·확인일·외부링크를 싣지 않는다(WQA-1007-FIX, DWELL-RULE).

type L = "ko" | "en" | "ja" | "zh" | "vi";

const TEXT: Record<L, { title: string; body: string }> = {
  ko: {
    title: "상담 내용의 비밀 유지",
    body: "행정사법 제23조(비밀엄수)는 행정사 또는 행정사이었던 사람(행정사의 사무직원 또는 사무직원이었던 사람을 포함)이 정당한 사유 없이 직무상 알게 된 사실을 다른 사람에게 누설해서는 안 된다고 정하고 있습니다. 선샤인행정사사무소의 행정사와 사무직원도 이 법적 의무를 집니다.",
  },
  en: {
    title: "Confidentiality of your consultation",
    body: "Article 23 (Duty of Confidentiality) of the Korean Certified Administrative Agents Act (행정사법) provides that a certified administrative agent, or a person who was one (including current or former office staff), must not disclose to others, without justifiable grounds, any facts learned in the course of their duties. The certified administrative agents and staff of 선샤인행정사사무소 (Sunshine) are subject to this legal duty.",
  },
  ja: {
    title: "ご相談内容の秘密保持",
    body: "韓国の行政士法第23条（秘密厳守）は、行政士または行政士であった者（行政士の事務職員または事務職員であった者を含む）が、正当な理由なく職務上知り得た事実を他人に漏らしてはならないと定めています。선샤인행정사사무소（サンシャイン）の行政士と事務職員も、この法的義務を負っています。",
  },
  zh: {
    title: "咨询内容的保密",
    body: "韩国《行政士法》第23条（保守秘密）规定：行政士或曾任行政士的人（包括行政士的事务职员或曾任事务职员的人）无正当理由不得向他人泄露因职务而知悉的事实。선샤인행정사사무소（Sunshine）的行政士和事务职员同样负有这一法定义务。",
  },
  vi: {
    title: "Bảo mật nội dung tư vấn",
    body: "Điều 23 (Nghĩa vụ giữ bí mật) Luật Hành chính sư Hàn Quốc (행정사법) quy định hành chính sư hoặc người từng là hành chính sư (bao gồm nhân viên văn phòng hiện tại hoặc trước đây của hành chính sư) không được tiết lộ cho người khác, khi không có lý do chính đáng, những sự việc biết được trong khi thực hiện nhiệm vụ. Hành chính sư và nhân viên của 선샤인행정사사무소 (Sunshine) cũng có nghĩa vụ pháp lý này.",
  },
};

export default function ConfidentialityNote({ locale }: { locale: string }) {
  const t = TEXT[(locale in TEXT ? locale : "ko") as L];
  return (
    <section
      aria-labelledby="confidentiality-note"
      style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "20px 24px", margin: "0 0 32px" }}
    >
      <h2 id="confidentiality-note" style={{ fontSize: 17, fontWeight: 700, color: "#0a1628", margin: "0 0 10px" }}>{t.title}</h2>
      <p style={{ color: "#374151", fontSize: 15, lineHeight: 1.8, margin: 0 }}>{t.body}</p>
    </section>
  );
}
