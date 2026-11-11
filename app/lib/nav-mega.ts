// QA1103-FIX 5(맥7 2026-11-04) — PC 헤더 '사건 유형'·'받은 처분' 드롭다운(메가메뉴) 데이터.
// 상세 페이지가 실제로 있는 slug 만 싣는다(offenses/[slug]·dispositions/[slug] 의 SLUG_CONTENT + departure-order).
// '준비 중'(COMING_SOON) slug 는 넣지 않는다. 라벨은 홈 '주요 업무 분야' 카드·상세 H1 과 같은 말.
export type MegaLoc = "ko" | "en" | "ja" | "zh" | "vi";
export type MegaGroupKey = "offenses" | "dispositions";

export const MEGA_LABEL: Record<MegaLoc, Record<MegaGroupKey, string> & { all: string }> = {
  ko: { offenses: "사건 유형", dispositions: "받은 처분", all: "전체 보기" },
  en: { offenses: "Offenses", dispositions: "Dispositions", all: "View all" },
  ja: { offenses: "事件の種類", dispositions: "受けた処分", all: "すべて見る" },
  zh: { offenses: "案件类型", dispositions: "所受处分", all: "查看全部" },
  vi: { offenses: "Vụ việc", dispositions: "Quyết định", all: "Xem tất cả" },
};

export const MEGA_ITEMS: Record<MegaGroupKey, { slug: string; t: Record<MegaLoc, string> }[]> = {
  offenses: [
    { slug: "dui", t: { ko: "음주운전과 교통사건", en: "DUI & Traffic Offenses", ja: "飲酒運転・交通事件", zh: "酒驾及交通案件", vi: "Lái xe say rượu & vi phạm giao thông" } },
    { slug: "assault", t: { ko: "폭행·상해", en: "Assault & Bodily Injury", ja: "暴行・傷害", zh: "殴打及伤害", vi: "Đánh người & gây thương tích" } },
    { slug: "drugs", t: { ko: "마약사건", en: "Drug Offenses", ja: "薬物事件", zh: "毒品案件", vi: "Vụ án ma túy" } },
    { slug: "sexual-offense", t: { ko: "성범죄", en: "Sexual Offenses", ja: "性犯罪", zh: "性犯罪", vi: "Tội phạm tình dục" } },
    { slug: "property-crime", t: { ko: "사기·절도·재산범죄", en: "Fraud, Theft & Property Crimes", ja: "詐欺・窃盗・財産犯罪", zh: "诈骗、盗窃及财产犯罪", vi: "Lừa đảo, trộm cắp & tội phạm tài sản" } },
    { slug: "voice-phishing", t: { ko: "보이스피싱 관련 사건", en: "Voice Phishing", ja: "ボイスフィッシング関連事件", zh: "电话诈骗相关案件", vi: "Liên quan đến lừa đảo qua điện thoại" } },
    { slug: "unauthorized-employment", t: { ko: "불법취업", en: "Unauthorized Employment", ja: "不法就労", zh: "非法就业", vi: "Làm việc trái phép" } },
    { slug: "overstay", t: { ko: "불법체류", en: "Overstay", ja: "不法在留", zh: "超期滞留", vi: "Ở quá hạn" } },
    { slug: "false-documents", t: { ko: "허위서류와 허위신고", en: "False & Forged Documents", ja: "書類偽造・変造", zh: "文件伪造·变造", vi: "Tài liệu giả mạo" } },
  ],
  dispositions: [
    // EYE1111-5(맥7 11-11): 허브 처분 비교 순서대로 출국권고를 출국명령 앞에. 라벨 = 상세 H1 앞말(5로캘)
    { slug: "departure-recommendation", t: { ko: "출국권고", en: "Departure Recommendation", ja: "出国勧告", zh: "出境建议", vi: "Khuyến nghị xuất cảnh" } },
    { slug: "departure-order", t: { ko: "출국명령", en: "Departure Order", ja: "出国命令", zh: "出境命令", vi: "Lệnh xuất cảnh" } },
    { slug: "deportation-order", t: { ko: "강제퇴거", en: "Deportation Order", ja: "強制退去", zh: "强制驱逐", vi: "Lệnh trục xuất" } },
    { slug: "visa-denial", t: { ko: "사증발급거부", en: "Visa Denial", ja: "査証発給拒否", zh: "签证发放拒绝", vi: "Từ chối cấp thị thực" } },
    { slug: "entry-ban", t: { ko: "입국금지와 재입국", en: "Entry Ban", ja: "入国禁止・再入国", zh: "禁止入境及再次入境", vi: "Cấm nhập cảnh & tái nhập cảnh" } },
  ],
};

// 허브 본문이 있는 로캘만 '전체 보기' 링크를 단다(외국어 /offenses 는 아직 '준비 중' 문구뿐, /dispositions 는 5로캘 본문 있음).
export const MEGA_HUB_READY: Record<MegaGroupKey, MegaLoc[]> = {
  offenses: ["ko"],
  dispositions: ["ko", "en", "ja", "zh", "vi"],
};
