import { COMPANY } from "../lib/constants";

// 대표 프로필(LAW-V1b 4, 보스 msg 1808) — 소개 페이지·홈 담당자 영역 공통.
// 사진 = visaskorea.com 공식 사진(public/team/hankt.jpg). 등록 정보는 사업자등록번호만 적는다 —
// 경력·행정사 자격번호·처리 건수는 넣지 않는다.
type L = "ko" | "en" | "ja" | "zh" | "vi";

const TEXT: Record<L, { heading: string; role: string; bizName: string; rep: string; bizNo: string }> = {
  ko: { heading: "담당 행정사", role: "대표 행정사", bizName: "상호", rep: "대표", bizNo: "사업자등록번호" },
  en: { heading: "Your administrative scrivener", role: "Representative administrative scrivener", bizName: "Business name", rep: "Representative", bizNo: "Business registration no." },
  ja: { heading: "担当行政書士", role: "代表行政書士", bizName: "商号", rep: "代表", bizNo: "事業者登録番号" },
  zh: { heading: "负责行政士", role: "代表行政士", bizName: "商号", rep: "代表", bizNo: "营业执照号码" },
  vi: { heading: "Hành chính sĩ phụ trách", role: "Hành chính sĩ đại diện", bizName: "Tên doanh nghiệp", rep: "Người đại diện", bizNo: "Số đăng ký kinh doanh" },
};

export const REP_PHOTO = "/team/hankt.jpg";
export const REP_PHOTO_ALT = "한경택 대표 행정사";

export default function RepresentativeCard({ locale, showHeading = true }: { locale: L; showHeading?: boolean }) {
  const t = TEXT[locale];
  return (
    <section className="rep-card" style={{ margin: "0 0 32px" }}>
      {showHeading && <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a1628", margin: "0 0 16px" }}>{t.heading}</h2>}
      <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", border: "1px solid #e2e8f0", borderRadius: 10, background: "#fff", padding: 20 }}>
        <img
          src={REP_PHOTO}
          alt={REP_PHOTO_ALT}
          width={120}
          height={120}
          loading="lazy"
          decoding="async"
          style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
        />
        <div style={{ minWidth: 0 }}>
          <p style={{ margin: "0 0 2px", fontSize: 13, color: "#1e4a8a", fontWeight: 700 }}>{t.role}</p>
          <p style={{ margin: "0 0 8px", fontSize: 20, color: "#0a1628", fontWeight: 700 }}>{COMPANY.representative}</p>
          <p style={{ margin: 0, fontSize: 13, color: "#475569", lineHeight: 1.7 }}>
            {t.bizName} {COMPANY.nameKo} · {t.rep} {COMPANY.representative}
            <br />
            {t.bizNo} {COMPANY.bizRegNo}
          </p>
        </div>
      </div>
    </section>
  );
}
