// FORM-REPLYTO-1019(보스 msg 3598) — 사무소로 가는 알림 메일에서 '회신' 을 누르면 고객에게 가도록.
// reply_to 는 고객이 적은 이메일, 이름이 있으면 "이름" <email>. 이메일이 없으면 reply_to 를 빼고
// 본문 맨 위에 NO_EMAIL_LINE 을 싣는다(그대로 회신하면 noreply@ko-visas.com 으로 간다).
// 헤더 인젝션 방지: 이메일 값에 개행·쉼표·<> 가 있으면 ok:false — 호출부가 400 으로 거부한다.
const HEADER_UNSAFE = /[\r\n,<>]/
const EMAIL_RE = /^[^\s@<>()",;:\\]+@[^\s@<>()",;:\\]+\.[^\s@<>()",;:\\]{2,}$/

export const NO_EMAIL_LINE = "고객 이메일 없음 — 전화로 회신"

export type CustomerReplyTo = { ok: true; replyTo?: string } | { ok: false }

export function customerReplyTo(name: unknown, email: unknown): CustomerReplyTo {
  const e = typeof email === "string" ? email.trim() : ""
  if (!e) return { ok: true }
  if (HEADER_UNSAFE.test(e)) return { ok: false }
  if (e.length > 254 || !EMAIL_RE.test(e)) return { ok: true }
  const n = (typeof name === "string" ? name : "")
    .replace(/[\r\n"\\<>,;]/g, " ").replace(/\s+/g, " ").trim().slice(0, 60)
  return { ok: true, replyTo: n ? `"${n}" <${e}>` : e }
}

export function noEmailBanner(): string {
  return `<p style="margin:0 0 12px;padding:10px 14px;background:#fff7ed;border-left:4px solid #ea580c;color:#9a3412;font-weight:bold;">${NO_EMAIL_LINE}</p>`
}
