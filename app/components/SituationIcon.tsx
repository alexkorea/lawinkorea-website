// QA1103-FIX 1(맥7 2026-11-04) — 홈 '이런 상황이라면' 8칸 작은 아이콘(선 아이콘 24px, 장식용 aria-hidden).
// 사진 대신 아이콘: 카드 사진은 '같은 사진 돌려쓰기 금지' 규칙이 있어, 8칸에 새 사진을 늘리는 대신 주제를 나타내는 기호만 둔다.
const PATHS: Record<string, string[]> = {
  police: ["M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z", "M9 12l2 2 4-4"],
  court: ["M12 3v18", "M5 7h14", "M5 7l-3 6a3 3 0 0 0 6 0L5 7z", "M19 7l-3 6a3 3 0 0 0 6 0l-3-6z", "M8 21h8"],
  summons: ["M4 6h16v12H4z", "M4 7l8 6 8-6"],
  extension: ["M7 3h8l4 4v14H7z", "M15 3v4h4", "M10 13h6", "M10 17h4"],
  departure: ["M2 16l20-6-2-3-7 2-6-5-2 1 4 6-4 1-2-2-2 1z", "M3 21h18"],
  deportation: ["M5 4v17", "M5 4h11l-2 4 2 4H5"],
  work: ["M4 8h16v11H4z", "M9 8V5h6v3", "M4 13h16"],
  employer: ["M3 21V8l9-5 9 5v13", "M9 21v-6h6v6", "M8 10h.01M12 10h.01M16 10h.01"],
};

export default function SituationIcon({ name }: { name: keyof typeof PATHS | string }) {
  const d = PATHS[name] ?? PATHS.extension;
  return (
    <span
      aria-hidden="true"
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#eff6ff", color: "#1e40af", flexShrink: 0 }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {d.map((p, i) => (
          <path key={i} d={p} />
        ))}
      </svg>
    </span>
  );
}

// 8칸 순서(5언어 공통) → 상세 페이지·아이콘. 경로는 로캘 접두 없이.
export const SITUATION_TARGETS: { path: string; icon: string }[] = [
  { path: "/process", icon: "police" }, // 경찰 조사 → 형사절차부터 이어지는 사범심사 진행 절차
  { path: "/immigration-offense-review", icon: "court" }, // 검찰·법원 처분 → 사범심사란
  { path: "/situations/immigration-summons", icon: "summons" }, // 출입국 출석 통지
  { path: "/visa-impact", icon: "extension" }, // 비자 연장·변경 → 비자별 체류 영향
  { path: "/dispositions/departure-order", icon: "departure" }, // 출국명령
  { path: "/dispositions/deportation-order", icon: "deportation" }, // 강제퇴거·입국금지
  { path: "/offenses/unauthorized-employment", icon: "work" }, // 불법취업·자격 외 활동
  { path: "/offenses/unauthorized-employment", icon: "employer" }, // 외국인 고용 사업주(고용주 처벌 포함)
];

export const MORE_LABEL: Record<string, string> = { ko: "자세히 보기 →", en: "Learn more →", ja: "詳しく見る →", zh: "查看详情 →", vi: "Xem chi tiết →" };
