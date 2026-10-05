"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ACCENT, COMPANY } from "../lib/constants";

const NAV: Record<string, {
  about: string; cases: string; process: string; blog: string; offenses: string; dispositions: string; contact: string;
  address: string; addressDetail: string; tel: string; hours: string; hoursVal: string;
  copy: string;
  bizName: string; bizRep: string; bizNo: string;
}> = {
  ko: {
    about: "소개", cases: "사례", process: "절차", blog: "블로그", offenses: "위반 유형", dispositions: "처분 유형", contact: "상담 문의",
    address: "서울특별시 중구 퇴계로 324, 3층 (성우빌딩)",
    addressDetail: "(우) 04614",
    tel: "대표전화",
    hours: "운영시간",
    hoursVal: "평일 09:30 – 17:30",
    copy: "선샤인행정사사무소 · Law in Korea. All rights reserved.",
    bizName: "상호", bizRep: "대표", bizNo: "사업자등록번호",
  },
  en: {
    about: "About", cases: "Cases", process: "Process", blog: "Blog", offenses: "Offense Types", dispositions: "Disposition Types", contact: "Contact",
    address: "3F, 324 Toegye-ro, Jung-gu, Seoul (Sungwoo Bldg.)",
    addressDetail: "04614, Republic of Korea",
    tel: "Phone",
    hours: "Hours",
    hoursVal: "Mon–Fri 09:30 – 17:30 KST",
    copy: "선샤인행정사사무소 · Law in Korea. All rights reserved.",
    bizName: "Business name", bizRep: "Representative", bizNo: "Business Registration No.",
  },
  ja: {
    about: "紹介", cases: "事例", process: "手続き", blog: "ブログ", offenses: "違反の種類", dispositions: "処分の種類", contact: "お問い合わせ",
    address: "ソウル特別市中区退渓路324 3階（成友ビル）",
    addressDetail: "〒04614 大韓民国",
    tel: "電話",
    hours: "営業時間",
    hoursVal: "平日 09:30 – 17:30 KST",
    copy: "선샤인행정사사무소 · Law in Korea. All rights reserved.",
    bizName: "商号", bizRep: "代表", bizNo: "事業者登録番号",
  },
  zh: {
    about: "简介", cases: "案例", process: "流程", blog: "博客", offenses: "违规类型", dispositions: "处分类型", contact: "联系咨询",
    address: "首尔特别市中区退溪路324, 3楼（成友大厦）",
    addressDetail: "邮编 04614，大韩民国",
    tel: "电话",
    hours: "营业时间",
    hoursVal: "周一至周五 09:30 – 17:30 KST",
    copy: "선샤인행정사사무소 · Law in Korea. All rights reserved.",
    bizName: "商号", bizRep: "代表", bizNo: "营业执照号码",
  },
  vi: {
    about: "Giới thiệu", cases: "Trường hợp", process: "Quy trình", blog: "Blog", offenses: "Loại vi phạm", dispositions: "Loại xử lý", contact: "Tư vấn",
    address: "Tầng 3, 324 Toegye-ro, Jung-gu, Seoul (Tòa nhà Sungwoo)",
    addressDetail: "04614, Đại Hàn Dân Quốc",
    tel: "Điện thoại",
    hours: "Giờ làm việc",
    hoursVal: "Thứ 2–6: 09:30 – 17:30 KST",
    copy: "선샤인행정사사무소 · Law in Korea. All rights reserved.",
    bizName: "Tên doanh nghiệp", bizRep: "Người đại diện", bizNo: "Số đăng ký kinh doanh",
  },
};

export default function SiteFooter() {
  const pathname = usePathname();
  const localeMatch = pathname.match(/^\/(ko|en|zh|ja|vi)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "ko";
  const t = NAV[locale] || NAV.ko;
  const base = `/${locale}`;

  return (
    <footer style={{ background: "#0a1628", color: "#94a3b8", marginTop: 0 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
        {/* 회사 정보 */}
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>선샤인행정사사무소</div>
          <div style={{ fontSize: 13, lineHeight: 1.7 }}>
            <div>{t.address}</div>
            <div>{t.addressDetail}</div>
            <div style={{ marginTop: 8 }}>{t.tel}: 02-363-2251</div>
            <div>{t.hours}: {t.hoursVal}</div>
          </div>
        </div>

        {/* 메뉴 — QA01-FIX2(맥7) 링크 터치 높이 20 → 44px, QA01-FIX3 에서 36px 로(너무 성김). 간격 8 은 링크 높이로 흡수 */}
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 12, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Menu</div>
          <nav style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
            {[
              { href: `${base}/`, label: t.about },
              { href: `${base}/offenses`, label: t.offenses },
              { href: `${base}/dispositions`, label: t.dispositions },
              { href: `${base}/cases`, label: t.cases },
              { href: `${base}/process`, label: t.process },
              { href: `${base}/blog`, label: t.blog },
              { href: `${base}/contact`, label: t.contact },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ color: "#94a3b8", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", minHeight: 36 }}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 주요 서비스 */}
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 12, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Services</div>
          <nav style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
            {[
              { href: `${base}/offenses/drugs`, label: locale === "ko" ? "마약 사건" : locale === "ja" ? "薬物事件" : locale === "zh" ? "毒品案件" : locale === "vi" ? "Vụ án ma túy" : "Drug Offense" },
              { href: `${base}/offenses/dui`, label: locale === "ko" ? "음주운전" : locale === "ja" ? "飲酒運転" : locale === "zh" ? "酒驾" : locale === "vi" ? "Lái xe say rượu" : "DUI" },
              { href: `${base}/offenses/immigration-fines`, label: locale === "ko" ? "출입국 범칙금" : locale === "ja" ? "犯則金" : locale === "zh" ? "出入境罚款" : locale === "vi" ? "Phạt xuất nhập cảnh" : "Immigration Fines" },
              { href: `${base}/fines`, label: locale === "ko" ? "벌금기준 전체표" : locale === "ja" ? "罰金基準表" : locale === "zh" ? "罚款标准全表" : locale === "vi" ? "Bảng mức phạt" : "Fine Standards" },
              { href: `${base}/dispositions/deportation-order`, label: locale === "ko" ? "강제퇴거" : locale === "ja" ? "強制退去" : locale === "zh" ? "强制遣返" : locale === "vi" ? "Trục xuất" : "Deportation" },
              { href: `${base}/dispositions/entry-ban`, label: locale === "ko" ? "입국금지" : locale === "ja" ? "入国禁止" : locale === "zh" ? "禁止入境" : locale === "vi" ? "Cấm nhập cảnh" : "Entry Ban" },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ color: "#94a3b8", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", minHeight: 36 }}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* 사업자 표시 — 전 페이지·전 언어 공통, 값은 lib/constants.ts COMPANY 단일 원천(배포 게이트가 존재를 검사, 맥7 2026-10-03) */}
      <div style={{ borderTop: "1px solid #1e2d47", padding: "16px 24px 0", textAlign: "center" as const, fontSize: 12, color: "#94a3b8", lineHeight: 1.7 }}>
        {t.bizName} {COMPANY.nameKo} · {t.bizRep} {COMPANY.representative} · {t.bizNo} {COMPANY.bizRegNo}
      </div>
      <div style={{ padding: "8px 24px 16px", textAlign: "center" as const, fontSize: 12, color: "#475569" }}>
        © {t.copy}
        <span style={{ margin: "0 8px" }}>·</span>
        <Link href={`${base}/privacy`} style={{ color: "#475569", textDecoration: "none", display: "inline-block", padding: "6px 4px", margin: "-6px -4px" }}>Privacy</Link>
        <span style={{ margin: "0 8px" }}>·</span>
        <Link href={`${base}/terms`} style={{ color: "#475569", textDecoration: "none", display: "inline-block", padding: "6px 4px", margin: "-6px -4px" }}>Terms</Link>
      </div>
    </footer>
  );
}
