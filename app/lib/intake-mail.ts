// 접수 메일 본문 생성기 (고객 확인메일 + 관리자 알림 공통)
//
// 왜 있는가: 고객 확인메일이 "접수되었습니다. 신청 서비스: 테스트" 한 줄만 나가서
// 고객이 무엇을 어떻게 접수했는지 확인할 수 없었다(2026-09-22 보스 직접 지적).
// 고객 확인메일에는 접수 내용 전문이 들어가야 한다 — 접수시각(KST)·이름·연락처·
// 이메일·사안·문의내용 원문·다음 단계·사무소명·연락처.
//
// 금지: 금액 표현, 성공 보장 표현("반드시", "100%", "보장"), 그리고 운영 주체가
// 행정사사무소이므로 법조 직역·법률사무소 계열 표현(금지어 목록은 scripts/seo-gate.mjs BANNED_TERMS).

import { COMPANY, SITE } from "./constants";

export const MAIL_LOCALES = ["ko", "en", "zh", "ja", "vi"] as const;
export type MailLocale = (typeof MAIL_LOCALES)[number];

export function toMailLocale(raw: unknown): MailLocale {
  const v = String(raw ?? "").toLowerCase().slice(0, 2);
  return (MAIL_LOCALES as readonly string[]).includes(v) ? (v as MailLocale) : "ko";
}

export function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** 접수시각은 서버가 UTC 라서 반드시 KST 로 변환해 보여준다. */
export function kstStamp(d: Date = new Date()): string {
  const f = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return f.format(d).replace(/\.\s?/g, "-").replace(/-$/, "").replace(/-\s/, " ") + " (KST)";
}

type Copy = {
  subject: (name: string) => string;
  greeting: (name: string) => string;
  intro: string;
  detailsTitle: string;
  nextTitle: string;
  next: string[];
  officeTitle: string;
  noReply: string;
  privacy: string;
  labels: Record<string, string>;
  officeName: string;
  officeDesc: string;
  hours: string;
};

const L: Record<MailLocale, Copy> = {
  ko: {
    subject: (n) => `[접수완료] ${n} 님의 상담 신청이 접수되었습니다 — ${COMPANY.nameKo}`,
    greeting: (n) => `${n} 님, 안녕하세요.`,
    intro: `상담 신청이 정상적으로 접수되었습니다. 접수된 내용을 아래와 같이 확인해 주세요.`,
    detailsTitle: "접수 내용",
    nextTitle: "다음 단계",
    next: [
      "담당자가 접수 내용을 검토한 뒤 <strong>영업일 기준 1일 이내</strong>에 회신드립니다.",
      `상담 가능 시간은 <strong>${COMPANY.hoursKo}</strong> 입니다.`,
      "추가로 알려주실 내용이 있으면 이 메일에 그대로 답장해 주세요.",
    ],
    officeTitle: "사무소 정보",
    noReply: "이 메일은 접수 확인용으로 자동 발송되었습니다. 답장하시면 담당자에게 전달됩니다.",
    privacy: "입력하신 정보는 이 상담 회신 목적으로만 사용됩니다.",
    labels: {
      receivedAt: "접수시각",
      name: "이름",
      contact: "연락처",
      email: "이메일",
      caseType: "사안 / 서비스",
      message: "문의내용",
      locale: "언어",
      source: "접수 경로",
      nationality: "국적",
      visa: "체류자격",
    },
    officeName: COMPANY.nameKo,
    officeDesc: `대표 행정사 ${COMPANY.representative} · ${COMPANY.addressKo}`,
    hours: COMPANY.hoursKo,
  },
  en: {
    subject: (n) => `[Received] Consultation request from ${n} — ${COMPANY.nameKo}`,
    greeting: (n) => `Dear ${n},`,
    intro: `We have received your consultation request. Please find the full details of your submission below.`,
    detailsTitle: "Your submission",
    nextTitle: "What happens next",
    next: [
      "A staff member will review your submission and reply <strong>within one business day</strong>.",
      `Consultation hours: <strong>${COMPANY.hoursEn}</strong>.`,
      "If you have anything to add, simply reply to this email.",
    ],
    officeTitle: "Office",
    noReply: "This is an automated confirmation. Replies to this message reach our staff.",
    privacy: "Your information is used only to respond to this inquiry.",
    labels: {
      receivedAt: "Received at",
      name: "Name",
      contact: "Phone",
      email: "Email",
      caseType: "Case / Service",
      message: "Your message",
      locale: "Language",
      source: "Submitted from",
      nationality: "Nationality",
      visa: "Visa status",
    },
    officeName: `${COMPANY.nameKo} (licensed administrative office, Korea)`,
    officeDesc: `Principal administrative agent ${COMPANY.representative} · ${COMPANY.addressEn}`,
    hours: COMPANY.hoursEn,
  },
  zh: {
    subject: (n) => `[已受理] ${n} 的咨询申请已收到 — ${COMPANY.nameKo}`,
    greeting: (n) => `${n} 您好，`,
    intro: `您的咨询申请已成功受理。请核对以下受理内容。`,
    detailsTitle: "受理内容",
    nextTitle: "后续流程",
    next: [
      "工作人员确认内容后将在 <strong>1 个工作日内</strong> 回复您。",
      `咨询时间：<strong>${COMPANY.hoursZh}</strong>。`,
      "如需补充说明，请直接回复此邮件。",
    ],
    officeTitle: "事务所信息",
    noReply: "本邮件为受理确认自动发送。回复本邮件可直接送达工作人员。",
    privacy: "您提供的信息仅用于本次咨询回复。",
    labels: {
      receivedAt: "受理时间",
      name: "姓名",
      contact: "联系电话",
      email: "邮箱",
      caseType: "事项 / 服务",
      message: "咨询内容",
      locale: "语言",
      source: "受理来源",
      nationality: "国籍",
      visa: "签证类型",
    },
    officeName: `${COMPANY.nameKo}（韩国行政士事务所）`,
    officeDesc: `代表行政士 ${COMPANY.representative} · ${COMPANY.addressEn}`,
    hours: COMPANY.hoursZh,
  },
  ja: {
    subject: (n) => `[受付完了] ${n} 様のご相談申込を受け付けました — ${COMPANY.nameKo}`,
    greeting: (n) => `${n} 様`,
    intro: `ご相談のお申込を受け付けました。受付内容は下記のとおりです。`,
    detailsTitle: "受付内容",
    nextTitle: "次のご案内",
    next: [
      "担当者が内容を確認のうえ、<strong>営業日1日以内</strong>にご返信いたします。",
      `ご相談対応時間：<strong>${COMPANY.hoursJa}</strong>。`,
      "追加のご連絡は、本メールにそのままご返信ください。",
    ],
    officeTitle: "事務所情報",
    noReply: "本メールは受付確認の自動送信です。ご返信は担当者に届きます。",
    privacy: "ご記入いただいた情報は、本件のご返信のみに使用いたします。",
    labels: {
      receivedAt: "受付日時",
      name: "お名前",
      contact: "連絡先",
      email: "メールアドレス",
      caseType: "ご相談内容 / サービス",
      message: "お問い合わせ内容",
      locale: "言語",
      source: "受付経路",
      nationality: "国籍",
      visa: "在留資格",
    },
    officeName: `${COMPANY.nameKo}（韓国 行政士事務所）`,
    officeDesc: `代表行政士 ${COMPANY.representative} · ${COMPANY.addressEn}`,
    hours: COMPANY.hoursJa,
  },
  vi: {
    subject: (n) => `[Đã tiếp nhận] Yêu cầu tư vấn của ${n} — ${COMPANY.nameKo}`,
    greeting: (n) => `Kính gửi ${n},`,
    intro: `Chúng tôi đã tiếp nhận yêu cầu tư vấn của bạn. Vui lòng kiểm tra toàn bộ nội dung đã tiếp nhận bên dưới.`,
    detailsTitle: "Nội dung đã tiếp nhận",
    nextTitle: "Các bước tiếp theo",
    next: [
      "Nhân viên sẽ xem xét nội dung và phản hồi <strong>trong vòng 1 ngày làm việc</strong>.",
      `Giờ tư vấn: <strong>${COMPANY.hoursEn}</strong>.`,
      "Nếu cần bổ sung thông tin, bạn chỉ cần trả lời email này.",
    ],
    officeTitle: "Thông tin văn phòng",
    noReply: "Đây là email xác nhận tự động. Bạn có thể trả lời trực tiếp email này.",
    privacy: "Thông tin của bạn chỉ được dùng để phản hồi yêu cầu tư vấn này.",
    labels: {
      receivedAt: "Thời điểm tiếp nhận",
      name: "Họ tên",
      contact: "Số điện thoại",
      email: "Email",
      caseType: "Vụ việc / Dịch vụ",
      message: "Nội dung yêu cầu",
      locale: "Ngôn ngữ",
      source: "Nguồn tiếp nhận",
      nationality: "Quốc tịch",
      visa: "Tình trạng visa",
    },
    officeName: `${COMPANY.nameKo} (văn phòng hành chính sĩ, Hàn Quốc)`,
    officeDesc: `Hành chính sĩ đại diện ${COMPANY.representative} · ${COMPANY.addressEn}`,
    hours: COMPANY.hoursEn,
  },
};

export type IntakeRow = { key: string; value: string };

/** 접수 원문을 표 순서대로 정리한다. 빈 값은 버린다. */
export function buildRows(data: Record<string, unknown>, receivedAt: string): IntakeRow[] {
  const order = [
    "receivedAt",
    "name",
    "contact",
    "email",
    "caseType",
    "nationality",
    "visa",
    "message",
    "locale",
    "source",
  ];
  const merged: Record<string, unknown> = { ...data, receivedAt };
  // phone 은 contact 의 별칭으로 들어올 수 있다.
  if (!merged.contact && merged.phone) merged.contact = merged.phone;
  const rows: IntakeRow[] = [];
  for (const key of order) {
    const v = String(merged[key] ?? "").trim();
    if (v) rows.push({ key, value: v });
  }
  return rows;
}

function table(rows: IntakeRow[], labels: Record<string, string>): string {
  const body = rows
    .map(({ key, value }) => {
      const label = esc(labels[key] ?? key);
      const shown = esc(value).replace(/\r?\n/g, "<br>");
      return `<tr><th style="text-align:left;padding:9px 12px;border:1px solid #E9ECEF;background:#F8F9FA;font-weight:600;color:#43474e;white-space:nowrap;vertical-align:top">${label}</th><td style="padding:9px 12px;border:1px solid #E9ECEF;color:#191c1d;line-height:1.7">${shown}</td></tr>`;
    })
    .join("");
  return `<table style="border-collapse:collapse;width:100%;max-width:640px;font-size:14px">${body}</table>`;
}

function shell(inner: string): string {
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.75;color:#191c1d;max-width:640px">${inner}</div>`;
}

/** 고객 확인메일 — 접수 내용 전문 + 다음 단계 + 사무소 정보. */
export function customerConfirmMail(
  data: Record<string, unknown>,
  locale: MailLocale,
  receivedAt: string = kstStamp(),
): { subject: string; html: string } {
  const c = L[locale];
  const name = String(data.name ?? "").trim() || c.labels.name;
  const rows = buildRows(data, receivedAt);
  const html = shell(
    `<p style="margin:0 0 6px">${esc(c.greeting(name))}</p>` +
      `<p style="margin:0 0 20px">${esc(c.intro)}</p>` +
      `<h3 style="font-size:16px;margin:0 0 10px;color:#001F3F">${esc(c.detailsTitle)}</h3>` +
      table(rows, c.labels) +
      `<h3 style="font-size:16px;margin:26px 0 10px;color:#001F3F">${esc(c.nextTitle)}</h3>` +
      `<ul style="margin:0 0 20px;padding-left:20px">${c.next.map((n) => `<li style="margin:0 0 6px">${n}</li>`).join("")}</ul>` +
      `<h3 style="font-size:16px;margin:26px 0 10px;color:#001F3F">${esc(c.officeTitle)}</h3>` +
      `<p style="margin:0 0 4px"><strong>${esc(c.officeName)}</strong></p>` +
      `<p style="margin:0 0 4px;color:#43474e;font-size:14px">${esc(c.officeDesc)}</p>` +
      `<p style="margin:0 0 4px;font-size:14px">Tel ${esc(COMPANY.phone)} (${esc(COMPANY.phoneIntl)}) · ${esc(COMPANY.email)}</p>` +
      `<p style="margin:0 0 20px;font-size:14px"><a href="${SITE.url}" style="color:#0056B3">${SITE.domain}</a></p>` +
      `<hr style="border:none;border-top:1px solid #E9ECEF;margin:22px 0 12px">` +
      `<p style="margin:0 0 4px;color:#74777f;font-size:12px">${esc(c.noReply)}</p>` +
      `<p style="margin:0;color:#74777f;font-size:12px">${esc(c.privacy)}</p>`,
  );
  return { subject: c.subject(name), html };
}

/** 관리자 알림 — 고객 확인메일과 동일한 표 형식(라벨은 한국어 고정). */
export function adminNotifyMail(
  data: Record<string, unknown>,
  locale: MailLocale,
  crmNote: string,
  receivedAt: string = kstStamp(),
  flag = "",
): { subject: string; html: string } {
  const ko = L.ko;
  const name = String(data.name ?? "").trim() || "익명";
  const rows = buildRows({ ...data, locale }, receivedAt);
  const html = shell(
    `<h2 style="font-size:18px;margin:0 0 14px;color:#001F3F">${esc(SITE.domain)} 새 문의${flag ? ` ${esc(flag)}` : ""}</h2>` +
      table(rows, ko.labels) +
      `<p style="margin:16px 0 0;color:#74777f;font-size:12px">CRM: ${esc(crmNote)}</p>` +
      `<p style="margin:4px 0 0;color:#74777f;font-size:12px">이 메일에 '회신' 하면 고객에게 직접 갑니다(고객 이메일이 있을 때).</p>`,
  );
  // 제목에 사안(서비스)까지 넣는다 — visaskorea.com 알림과 동일한 형식이라
  // 받은편지함에서 제목만 보고 분류·우선순위 판단이 된다.
  const service = String(data.caseType ?? "").trim();
  const subject =
    `${flag ? `${flag} ` : ""}[${SITE.domain} 문의] ${name}` + (service ? ` — ${service}` : "");
  return { subject, html };
}
