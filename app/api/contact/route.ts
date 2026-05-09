import { NextResponse } from "next/server";

export const runtime = "nodejs";

const NOTION_API = "https://api.notion.com/v1/pages";

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

    if (!NOTION_API_KEY || !NOTION_DB_ID) {
      console.error("Missing NOTION env vars");
      return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
    }

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

    const res = await fetch(NOTION_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Notion API error:", res.status, errText);
      return NextResponse.json({ ok: false, error: "Submission failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
