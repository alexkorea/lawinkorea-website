import { NextResponse } from "next/server";

export const runtime = "nodejs";

const NOTION_API = "https://api.notion.com/v1/pages";

// 발신은 Resend 에 검증된 도메인이어야 한다. lawinkorea.com 은 미검증이라 그대로 쓰면
// 403 validation_error 로 전부 실패한다(2026-09-22 확인). 검증되면 이 상수만 되돌리면 된다.
const MAIL_FROM = "선샤인행정사사무소 <noreply@ko-visas.com>";
const NOTIFY_EMAIL = "5000meter@gmail.com";

// 관리자 알림 메일. Notion 저장 성공 여부와 무관하게 반드시 보낸다 —
// 이 사이트는 예전에 Notion 이 유일한 경로여서, env 가 비어 있는 동안
// 문의가 100% 유실되고 고객에게는 500 만 돌아갔다.
async function sendAdminEmail(
  data: Record<string, unknown>,
  customerEmail: string,
  notionNote: string,
): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[contact API] RESEND_API_KEY 미설정 — 관리자 알림 발송 불가");
    return false;
  }
  const rows = Object.entries(data)
    .filter(([k, v]) => k !== "website" && String(v ?? "").trim() !== "")
    .map(([k, v]) => `<tr><td style="padding:6px 10px;border:1px solid #ddd;background:#f7f7f7">${k}</td><td style="padding:6px 10px;border:1px solid #ddd">${String(v).replace(/</g, "&lt;")}</td></tr>`)
    .join("");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [NOTIFY_EMAIL],
        // 관리자가 '회신' 을 누르면 곧바로 고객에게 가도록 (이메일 없으면 생략)
        ...(customerEmail ? { reply_to: customerEmail } : {}),
        subject: `[lawinkorea.com 문의] ${String(data.name ?? "익명")}`,
        html: `<h2>lawinkorea.com 새 문의</h2><table style="border-collapse:collapse">${rows}</table>`
          + `<p style="color:#666;font-size:12px;margin-top:14px">CRM: ${notionNote}</p>`,
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
    if (data.website) return NextResponse.json({ ok: true })
    const NOTION_API_KEY = process.env.NOTION_API_KEY;
    const NOTION_DB_ID = process.env.NOTION_DB_ID;
    const customerEmail = plain(data.email);

    const name = plain(data.name) || "Anonymous";
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
    if (NOTION_API_KEY && NOTION_DB_ID) {
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
    const mailOk = await sendAdminEmail(data as Record<string, unknown>, customerEmail, notionNote);

    // 어느 경로로도 남지 않았을 때만 실패로 알린다. 성공으로 위장하지 않는다.
    if (!notionOk && !mailOk) {
      console.error("[contact API] 접수 경로 전부 실패", { name, email: customerEmail });
      return NextResponse.json(
        { ok: false, error: "접수에 실패했습니다. 02-363-2251 로 연락해 주세요." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, crm: notionOk });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
