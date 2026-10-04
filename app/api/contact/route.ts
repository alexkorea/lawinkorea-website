import { NextResponse } from "next/server";
import {
  adminNotifyMail,
  customerConfirmMail,
  kstStamp,
  toMailLocale,
  type MailLocale,
} from "@/app/lib/intake-mail";
import { COMPANY } from "@/app/lib/constants";

export const runtime = "nodejs";

const NOTION_API = "https://api.notion.com/v1/pages";

// 발신 표시명은 brand_registry.md 의 브랜드 E(선샤인행정사사무소) 고정이다.
// 이 사이트 운영 주체는 행정사사무소이므로 법조 직역·법률사무소 계열 표현
// (금지어 목록은 scripts/seo-gate.mjs BANNED_TERMS)을 발신명·제목·본문에 쓰면 법 위반이다(2026-09-22 보스 직접 지적).
// 발신 주소는 Resend 에 검증된 도메인이어야 한다. lawinkorea.com 은 미검증이라
// 그대로 쓰면 403 validation_error 로 전부 실패한다. 검증되면 주소만 바꾼다.
const MAIL_FROM = "선샤인행정사사무소 <noreply@ko-visas.com>";
const NOTIFY_EMAIL = "5000meter@gmail.com";

// Resend 단일 발송기. 실패는 삼키지 않고 false 로 알린다 —
// 호출부가 '한 경로라도 성공' 판정에 쓴다.
async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[contact API] RESEND_API_KEY 미설정 — 메일 발송 불가");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("[contact API] Resend", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("[contact API] Resend 예외", e);
    return false;
  }
}

// 관리자 알림 메일. Notion 저장 성공 여부와 무관하게 반드시 보낸다 —
// 이 사이트는 예전에 Notion 이 유일한 경로여서, env 가 비어 있는 동안
// 문의가 100% 유실되고 고객에게는 500 만 돌아갔다.
// 표 형식은 고객 확인메일과 동일하다(2026-09-22 보스 지시).
async function sendAdminEmail(
  data: Record<string, unknown>,
  locale: MailLocale,
  customerEmail: string,
  notionNote: string,
  receivedAt: string,
  flag: string,
): Promise<boolean> {
  const { subject, html } = adminNotifyMail(data, locale, notionNote, receivedAt, flag);
  return sendMail({
    to: NOTIFY_EMAIL,
    subject,
    html,
    // 관리자가 '회신' 을 누르면 곧바로 고객에게 가도록 (이메일 없으면 생략)
    ...(customerEmail ? { replyTo: customerEmail } : {}),
  });
}

// 고객 확인메일. 접수 내용 전문을 고객이 제출한 페이지 언어로 보낸다.
// 실패해도 접수 자체를 실패로 만들지 않는다(관리자 알림이 본선이다).
async function sendCustomerEmail(
  data: Record<string, unknown>,
  locale: MailLocale,
  customerEmail: string,
  receivedAt: string,
): Promise<boolean> {
  if (!customerEmail) return false;
  const { subject, html } = customerConfirmMail(data, locale, receivedAt);
  // 고객에게 보이는 회신 주소는 대외 표기 이메일(help@lawinkorea.com)로 — 개인 Gmail 주소 노출 금지(LAW-V1b 7).
  return sendMail({ to: customerEmail, subject, html, replyTo: COMPANY.email });
}

function rt(text: unknown) {
  const v = String(text ?? "").slice(0, 2000);
  if (!v) return undefined;
  return { rich_text: [{ text: { content: v } }] };
}

function plain(text: unknown) {
  const v = String(text ?? "").slice(0, 2000);
  return v;
}

function emailField(value: unknown) {
  const v = plain(value);
  return v ? { email: v } : undefined;
}

function phoneField(value: unknown) {
  const v = plain(value);
  return v ? { phone_number: v } : undefined;
}

function dateField(value: unknown) {
  const v = plain(value);
  if (!v) return undefined;
  // Validate it's a date-like string
  if (!/^\d{4}-\d{2}-\d{2}/.test(v)) return undefined;
  return { date: { start: v } };
}

function selectField(value: unknown) {
  const v = plain(value);
  if (!v) return undefined;
  return { select: { name: v } };
}

function caseTypeMap(raw: string): string {
  // Map various locale labels to a canonical Korean label
  const lower = raw.toLowerCase();
  if (lower.includes("dui") || lower.includes("음주") || lower.includes("酒驾") || lower.includes("飲酒")) return "음주운전 (DUI)";
  if (lower.includes("drug") || lower.includes("마약") || lower.includes("毒品") || lower.includes("麻薬")) return "마약 사건";
  if (lower.includes("phishing") || lower.includes("보이스") || lower.includes("电信") || lower.includes("ボイス")) return "보이스피싱";
  if (lower.includes("illegal") || lower.includes("불법취업") || lower.includes("非法") || lower.includes("不法")) return "불법취업";
  if (lower.includes("sex") || lower.includes("성범죄") || lower.includes("성매매") || lower.includes("性犯") || lower.includes("性买")) return "성범죄";
  if (lower.includes("denied") || lower.includes("거절") || lower.includes("拒") || lower.includes("補完")) return "비자 거절";
  if (lower.includes("deport") || lower.includes("강제퇴거") || lower.includes("出境命令") || lower.includes("退去")) return "강제퇴거";
  if (lower.includes("entry ban") || lower.includes("입국금지") || lower.includes("入境禁") || lower.includes("入国禁")) return "입국금지 해제";
  if (lower.includes("permanent") || lower.includes("영주권") || lower.includes("永居") || lower.includes("永住") || lower.includes("naturalization") || lower.includes("국적")) return "영주권/국적";
  if (lower.includes("criminal") || lower.includes("형사") || lower.includes("刑事")) return "형사사건";
  return "기타";
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 허니팟. 예전에는 채워져 오면 조용히 {ok:true} 로 버렸는데, 브라우저 자동완성이
    // 숨은 input 을 채워버려 사람이 낸 문의가 통째로 사라졌다(2026-09-22 실측:
    // 브라우저 제출은 crm 필드 없는 {"ok":true}, 관리자 메일 0통). 이제는 버리지 않고
    // 제목에 [스팸의심] 을 달아 관리자에게 보내고 CRM 저장만 건너뛴다.
    const honeypot = plain(data.website) !== "";

    // 검증이 없으면 빈 본문 POST 한 번에 관리자 알림 메일이 나가고 200 이 돌아간다
    // (2026-09-22 실측: 11:01 KST 에 본문이 표 0행인 알림 메일 1통이 실제로 나갔고,
    // Gmail 이 빈 본문을 스팸으로 분류했다). 연락 수단이 하나도 없는 접수는
    // 받아도 회신할 수 없다.
    //
    // 이메일은 "필수" 가 아니라 "있으면 형식 검증" 이다. 예전에 email 을 필수로 걸었다가
    // 전화번호만 남긴 문의를 400 으로 되돌려 보내 통째로 버린 사고가 있었다
    // (게이트웨이 /api/intake). 연락 수단은 이메일 '또는' 전화번호로 유지한다.
    const nameV = plain(data.name);
    const emailV = plain(data.email);
    const contactV = plain(data.contact) || plain(data.phone);
    const messageV = plain(data.message).trim();

    if (!nameV || !(emailV || contactV)) {
      return NextResponse.json(
        { ok: false, error: "이름과 연락처(이메일 또는 전화번호)를 입력해 주세요." },
        { status: 400 },
      );
    }
    if (emailV && !/^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/.test(emailV)) {
      return NextResponse.json(
        { ok: false, error: "이메일 형식이 올바르지 않습니다." },
        { status: 400 },
      );
    }
    // 문의내용 최소 길이. 봇의 빈/한두 글자 POST 를 메일 발송 전에 끊는다.
    if (messageV.length < 10) {
      return NextResponse.json(
        { ok: false, error: "문의내용을 10자 이상 입력해 주세요." },
        { status: 400 },
      );
    }

    const NOTION_API_KEY = process.env.NOTION_API_KEY;
    const NOTION_DB_ID = process.env.NOTION_DB_ID;
    const customerEmail = emailV;
    const mailLocale = toMailLocale(data.locale);
    const receivedAt = kstStamp();

    const name = nameV;
    const submittedAt = new Date().toISOString();

    const properties: Record<string, unknown> = {
      Name: { title: [{ text: { content: name } }] },
      "Submitted At": { date: { start: submittedAt } },
      Status: { select: { name: "신규" } },
      Source: rt(data.source ?? "lawinkorea.com"),
    };

    const locale = plain(data.locale);
    if (locale) properties["Locale"] = selectField(locale);

    const nationality = rt(data.nationality);
    if (nationality) properties["Nationality"] = nationality;

    const email = emailField(data.email);
    if (email) properties["Email"] = email;

    const contact = phoneField(data.contact);
    if (contact) properties["Contact"] = contact;

    const preferredChannel = selectField(data.preferredChannel);
    if (preferredChannel) properties["Preferred Channel"] = preferredChannel;

    const visa = rt(data.visa);
    if (visa) properties["Visa"] = visa;

    const expiry = dateField(data.expiry);
    if (expiry) properties["Visa Expiry"] = expiry;

    const residence = rt(data.residence);
    if (residence) properties["Years in Korea"] = residence;

    const caseDate = dateField(data.caseDate);
    if (caseDate) properties["Case Date"] = caseDate;

    const caseTypeRaw = plain(data.caseType);
    if (caseTypeRaw) {
      properties["Case Type"] = { select: { name: caseTypeMap(caseTypeRaw) } };
    }

    const criminalStatus = rt(data.criminalStatus);
    if (criminalStatus) properties["Criminal Status"] = criminalStatus;

    const reviewNotice = rt(data.reviewNotice);
    if (reviewNotice) properties["Review Notice"] = reviewNotice;

    const appearanceDate = dateField(data.appearanceDate);
    if (appearanceDate) properties["Appearance Date"] = appearanceDate;

    const family = rt(data.family);
    if (family) properties["Family"] = family;

    const occupation = rt(data.occupation);
    if (occupation) properties["Occupation"] = occupation;

    const korean = rt(data.korean);
    if (korean) properties["Korean Level"] = korean;

    const message = rt(data.message);
    if (message) properties["Message"] = message;

    const userAgent = rt(req.headers.get("user-agent") || "");
    if (userAgent) properties["User Agent"] = userAgent;

    const body = {
      parent: { database_id: NOTION_DB_ID },
      properties,
    };

    // Notion 저장은 '있으면 좋은' 경로로 강등한다. 실패해도 절대 여기서 끝내지 않는다.
    let notionOk = false;
    let notionNote = "미설정(NOTION_API_KEY/NOTION_DB_ID 없음)";
    if (honeypot) {
      notionNote = "건너뜀(허니팟 감지 — 스팸의심)";
      console.warn("[contact API] 허니팟 감지 — CRM 저장 건너뜀, 관리자 알림은 발송", { name });
    } else if (NOTION_API_KEY && NOTION_DB_ID) {
      try {
        const res = await fetch(NOTION_API, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${NOTION_API_KEY}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        notionOk = res.ok;
        if (!res.ok) {
          notionNote = `저장 실패 ${res.status}`;
          console.error("Notion API error:", res.status, await res.text());
        } else {
          notionNote = "저장됨";
        }
      } catch (e) {
        notionNote = "저장 예외";
        console.error("Notion API 예외:", e);
      }
    } else {
      console.error("[contact API] NOTION env 미설정 — CRM 저장 건너뜀");
    }

    // 관리자 알림은 Notion 성패와 무관하게 보낸다.
    const mailOk = await sendAdminEmail(
      data as Record<string, unknown>,
      mailLocale,
      customerEmail,
      notionNote,
      receivedAt,
      honeypot ? "[스팸의심]" : "",
    );

    // 고객 확인메일 — 접수 내용 전문, 고객이 쓴 언어로. 스팸의심 건에는 보내지 않는다.
    let customerMailOk = false;
    if (!honeypot) {
      customerMailOk = await sendCustomerEmail(
        data as Record<string, unknown>,
        mailLocale,
        customerEmail,
        receivedAt,
      );
    }

    // 어느 경로로도 남지 않았을 때만 실패로 알린다. 성공으로 위장하지 않는다.
    if (!notionOk && !mailOk) {
      console.error("[contact API] 접수 경로 전부 실패", { name, email: customerEmail });
      return NextResponse.json(
        { ok: false, error: "접수에 실패했습니다. 02-363-2251 로 연락해 주세요." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, crm: notionOk, confirmSent: customerMailOk });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
