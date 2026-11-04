/**
 * AI-RECO-2 E-2(2026-11-04) — '처리 업무 전체 목록' 페이지(/<locale>/services) 원고.
 * 업무 목록·분류는 UNIT_KEYS(1차 17단위) 그대로 — 새 업무·분류 변경 금지(보스 결정 사항).
 * 정식 명칭 = law-<locale>.ts serviceName, 대상 = glance 첫 행(대상). 여기에는 관할 기관과 화면 문구만 둔다.
 * 관할 기관은 각 단위 원고 glance(요건·절차)에 이미 적힌 기관명만 옮겼다(새 사실 없음).
 */
import type { UnitKey } from "./types";
import type { RecoLocale } from "./index";

type AgencyKey = "office" | "deportation" | "entryBan" | "visaDenial";

const AGENCY_TEXT: Record<RecoLocale, Record<AgencyKey, string>> = {
  ko: {
    office: "관할 지방출입국·외국인관서",
    deportation: "지방출입국·외국인관서(강제퇴거명령), 법무부장관(이의신청 심사)",
    entryBan: "법무부장관(입국금지 결정), 관할 출입국·외국인관서 또는 재외공관(제출처 확인)",
    visaDenial: "재외공관(사증), 관할 출입국·외국인관서(사증발급인정서)",
  },
  en: {
    office: "Regional immigration office with jurisdiction",
    deportation: "Regional immigration office (deportation order); Minister of Justice (objection review)",
    entryBan: "Minister of Justice (entry ban decision); immigration office with jurisdiction or Korean mission abroad (where to submit)",
    visaDenial: "Korean mission abroad (visa); immigration office with jurisdiction (Certificate for Confirmation of Visa Issuance)",
  },
  zh: {
    office: "管辖的地方出入境·外国人管理机关",
    deportation: "地方出入境·外国人管理机关（强制出境命令）、法务部长官（异议申请审查）",
    entryBan: "法务部长官（入境禁止决定）、管辖的出入境·外国人管理机关或驻外使领馆（确认提交处）",
    visaDenial: "驻外使领馆（签证）、管辖的出入境·外国人管理机关（签证发放认定书）",
  },
  ja: {
    office: "管轄の地方出入国・外国人官署",
    deportation: "地方出入国・外国人官署（強制退去命令）、法務部長官（異議申立ての審査）",
    entryBan: "法務部長官（入国禁止の決定）、管轄の出入国・外国人官署または在外公館（提出先の確認）",
    visaDenial: "在外公館（査証）、管轄の出入国・外国人官署（査証発給認定書）",
  },
  vi: {
    office: "Cơ quan Xuất nhập cảnh và Người nước ngoài địa phương có thẩm quyền",
    deportation: "Cơ quan Xuất nhập cảnh và Người nước ngoài địa phương (lệnh trục xuất); Bộ trưởng Bộ Tư pháp (xét đơn phản đối)",
    entryBan: "Bộ trưởng Bộ Tư pháp (quyết định cấm nhập cảnh); cơ quan xuất nhập cảnh có thẩm quyền hoặc cơ quan đại diện ở nước ngoài (xác nhận nơi nộp)",
    visaDenial: "Cơ quan đại diện ở nước ngoài (thị thực); cơ quan xuất nhập cảnh có thẩm quyền (Giấy chứng nhận cấp thị thực)",
  },
};

const UNIT_AGENCY: Partial<Record<UnitKey, AgencyKey>> = {
  "deportation-order": "deportation",
  "entry-ban": "entryBan",
  "visa-denial": "visaDenial",
};

export function agencyOf(locale: RecoLocale, unit: UnitKey): string {
  return AGENCY_TEXT[locale][UNIT_AGENCY[unit] ?? "office"];
}

export const CATALOG_UI: Record<RecoLocale, {
  title: string; lead: string; colName: string; colAgency: string; colTarget: string; colLink: string;
  linkLabel: string; aboutLink: string; contactLink: string; updated: string; listName: string;
}> = {
  ko: {
    title: "처리 업무 전체 목록",
    lead: "선샤인행정사사무소가 처리하는 출입국 행정 업무를 정식 명칭, 관할 기관, 대상과 함께 한곳에 모았습니다. 업무 이름을 누르면 자세한 안내 페이지로 이동합니다.",
    colName: "정식 명칭", colAgency: "관할 기관", colTarget: "대상", colLink: "관련 페이지",
    linkLabel: "자세히 보기", aboutLink: "사무소 소개", contactLink: "상담 신청", updated: "최종 수정일",
    listName: "선샤인행정사사무소 처리 업무 전체 목록",
  },
  en: {
    title: "Full List of Services We Handle",
    lead: "All immigration administrative services handled by Sunshine Administrative Agent Office, with the formal service name, the competent authority and who it is for. Select a service name to open its detailed page.",
    colName: "Service (formal name)", colAgency: "Competent authority", colTarget: "Who it is for", colLink: "Related page",
    linkLabel: "View details", aboutLink: "About the office", contactLink: "Request a consultation", updated: "Last updated",
    listName: "Sunshine Administrative Agent Office — full list of services",
  },
  zh: {
    title: "全部办理业务一览",
    lead: "汇总Sunshine行政士事务所办理的出入境行政业务，列出正式名称、管辖机关与适用对象。点击业务名称即可进入详细说明页面。",
    colName: "正式名称", colAgency: "管辖机关", colTarget: "适用对象", colLink: "相关页面",
    linkLabel: "查看详情", aboutLink: "事务所简介", contactLink: "预约咨询", updated: "最后更新",
    listName: "Sunshine行政士事务所 全部办理业务一览",
  },
  ja: {
    title: "取扱業務一覧",
    lead: "サンシャイン行政士事務所が取り扱う出入国関連の行政業務を、正式名称・管轄機関・対象とあわせて一覧にしました。業務名を選ぶと詳しい案内ページに移動します。",
    colName: "正式名称", colAgency: "管轄機関", colTarget: "対象", colLink: "関連ページ",
    linkLabel: "詳しく見る", aboutLink: "事務所紹介", contactLink: "相談を申し込む", updated: "最終更新日",
    listName: "サンシャイン行政士事務所 取扱業務一覧",
  },
  vi: {
    title: "Danh sách toàn bộ công việc chúng tôi xử lý",
    lead: "Tổng hợp các công việc hành chính xuất nhập cảnh do văn phòng hành chính sĩ Sunshine xử lý, kèm tên chính thức, cơ quan có thẩm quyền và đối tượng. Chọn tên công việc để mở trang hướng dẫn chi tiết.",
    colName: "Tên chính thức", colAgency: "Cơ quan có thẩm quyền", colTarget: "Đối tượng", colLink: "Trang liên quan",
    linkLabel: "Xem chi tiết", aboutLink: "Giới thiệu văn phòng", contactLink: "Đăng ký tư vấn", updated: "Cập nhật lần cuối",
    listName: "Văn phòng hành chính sĩ Sunshine — danh sách toàn bộ công việc",
  },
};

/** 사무소 소개·연락처·footer 에서 이 페이지로 가는 링크 문구 */
export const CATALOG_LINK_LABEL: Record<RecoLocale, string> = {
  ko: "처리 업무 전체 목록",
  en: "Full list of services",
  zh: "全部办理业务一览",
  ja: "取扱業務一覧",
  vi: "Danh sách công việc",
};
