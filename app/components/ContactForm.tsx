"use client";

import { useState } from "react";
import { ACCENT, COMPANY } from "../lib/constants";

// /api/contact 는 계속 살아 있었는데 이것을 부르는 UI 가 사이트 어디에도 없었다
// (2026-09-22 실측: 저장소·라이브 모두 <form> 0개). 상담 페이지는 "아래 양식으로"
// 라고 안내만 하고 양식이 없어서 문의가 애초에 들어올 수 없었다.

const LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof LOCALES)[number];

type Copy = {
  name: string;
  email: string;
  phone: string;
  caseType: string;
  caseTypes: string[];
  message: string;
  submit: string;
  sending: string;
  ok: string;
  fail: string;
  required: string;
  privacy: string;
};

const COPY: Record<L, Copy> = {
  ko: {
    name: "성함",
    email: "이메일",
    phone: "연락처",
    caseType: "사건 유형",
    caseTypes: ["선택해 주세요", "음주운전 (DUI)", "마약 사건", "보이스피싱", "불법취업", "성범죄", "비자 거절", "강제퇴거", "입국금지 해제", "영주권/국적", "형사사건", "기타"],
    message: "상황 설명",
    submit: "상담 신청",
    sending: "접수 중…",
    ok: "접수되었습니다. 영업일 기준 1일 이내에 회신드립니다.",
    fail: `접수에 실패했습니다. ${COMPANY.phone} 로 연락해 주세요.`,
    required: "성함과 연락처(이메일 또는 전화번호)를 입력해 주세요.",
    privacy: "입력하신 정보는 상담 회신 목적으로만 사용됩니다.",
  },
  en: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    caseType: "Case type",
    caseTypes: ["Please select", "DUI", "Drug case", "Voice phishing", "Illegal employment", "Sex offense", "Visa denied", "Deportation", "Entry ban relief", "Permanent residency / Nationality", "Criminal case", "Other"],
    message: "Describe your situation",
    submit: "Request consultation",
    sending: "Sending…",
    ok: "Received. We will reply within one business day.",
    fail: `Submission failed. Please call ${COMPANY.phoneIntl}.`,
    required: "Please enter your name and either an email or a phone number.",
    privacy: "Your information is used only to reply to this inquiry.",
  },
  ja: {
    name: "お名前",
    email: "メールアドレス",
    phone: "連絡先",
    caseType: "案件の種類",
    caseTypes: ["選択してください", "飲酒運転 (DUI)", "麻薬事件", "ボイスフィッシング", "不法就労", "性犯罪", "ビザ却下", "強制退去", "入国禁止解除", "永住権・国籍", "刑事事件", "その他"],
    message: "状況のご説明",
    submit: "相談を申し込む",
    sending: "送信中…",
    ok: "受け付けました。1営業日以内にご返信いたします。",
    fail: `送信に失敗しました。${COMPANY.phoneIntl} までご連絡ください。`,
    required: "お名前と連絡先（メールまたは電話番号）をご入力ください。",
    privacy: "ご入力いただいた情報はご返信の目的にのみ使用します。",
  },
  zh: {
    name: "姓名",
    email: "邮箱",
    phone: "联系方式",
    caseType: "案件类型",
    caseTypes: ["请选择", "酒驾 (DUI)", "毒品案件", "电信诈骗", "非法就业", "性犯罪", "签证拒签", "强制出境", "解除入境禁止", "永居/国籍", "刑事案件", "其他"],
    message: "情况说明",
    submit: "申请咨询",
    sending: "提交中…",
    ok: "已收到。我们将在一个工作日内回复。",
    fail: `提交失败，请拨打 ${COMPANY.phoneIntl}。`,
    required: "请填写姓名和联系方式（邮箱或电话）。",
    privacy: "您填写的信息仅用于回复本次咨询。",
  },
  vi: {
    name: "Họ và tên",
    email: "Email",
    phone: "Số điện thoại",
    caseType: "Loại vụ việc",
    caseTypes: ["Vui lòng chọn", "Lái xe khi say rượu (DUI)", "Vụ việc ma túy", "Lừa đảo qua điện thoại", "Làm việc bất hợp pháp", "Tội phạm tình dục", "Từ chối visa", "Trục xuất", "Gỡ lệnh cấm nhập cảnh", "Thường trú / Quốc tịch", "Vụ án hình sự", "Khác"],
    message: "Mô tả tình huống",
    submit: "Gửi yêu cầu tư vấn",
    sending: "Đang gửi…",
    ok: "Đã tiếp nhận. Chúng tôi sẽ phản hồi trong vòng 1 ngày làm việc.",
    fail: `Gửi không thành công. Vui lòng gọi ${COMPANY.phoneIntl}.`,
    required: "Vui lòng nhập họ tên và email hoặc số điện thoại.",
    privacy: "Thông tin của bạn chỉ được dùng để phản hồi yêu cầu này.",
  },
};

const labelStyle = { display: "block", fontSize: 14, fontWeight: 600, color: ACCENT.text, marginBottom: 6 } as const;
const fieldStyle = {
  width: "100%",
  padding: "11px 13px",
  fontSize: 15,
  color: ACCENT.text,
  border: `1px solid ${ACCENT.borderSoft}`,
  borderRadius: 8,
  background: "#fff",
  boxSizing: "border-box" as const,
};

export default function ContactForm({ locale }: { locale: string }) {
  const l: L = (LOCALES as readonly string[]).includes(locale) ? (locale as L) : "ko";
  const c = COPY[l];
  const [state, setState] = useState<"idle" | "sending" | "ok" | "fail">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const contact = String(fd.get("contact") ?? "").trim();
    if (!name || (!email && !contact)) {
      setError(c.required);
      setState("fail");
      return;
    }
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          contact,
          caseType: String(fd.get("caseType") ?? ""),
          message: String(fd.get("message") ?? ""),
          // 허니팟. input 이름을 "website" 로 두면 브라우저 자동완성이 숨은 칸을
          // 채워버려 사람이 낸 문의가 스팸으로 분류된다(2026-09-22). 이름은
          // 자동완성 휴리스틱에 걸리지 않는 것으로 쓰고, 서버 계약(website)만 유지한다.
          website: String(fd.get("cf_ref_code") ?? ""),
          locale: l,
          source: "lawinkorea.com/contact",
        }),
      });
      // 서버는 '한 경로라도 성공' 이면 200 을 준다. 응답을 반드시 확인한다.
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body?.error || c.fail);
        setState("fail");
        return;
      }
      setState("ok");
    } catch {
      setError(c.fail);
      setState("fail");
    }
  }

  if (state === "ok") {
    return (
      <div style={{ border: `1px solid ${ACCENT.primary}`, background: ACCENT.soft, borderRadius: 10, padding: "20px 24px", color: ACCENT.navy, fontSize: 15, lineHeight: 1.7 }}>
        {c.ok}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ border: `1px solid ${ACCENT.border}`, borderRadius: 10, padding: "24px", background: "#fff" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle} htmlFor="cf-name">{c.name} *</label>
          <input id="cf-name" name="name" required style={fieldStyle} autoComplete="name" />
        </div>
        <div>
          <label style={labelStyle} htmlFor="cf-email">{c.email}</label>
          <input id="cf-email" name="email" type="email" style={fieldStyle} autoComplete="email" />
        </div>
        <div>
          <label style={labelStyle} htmlFor="cf-contact">{c.phone}</label>
          <input id="cf-contact" name="contact" style={fieldStyle} autoComplete="tel" />
        </div>
        <div>
          <label style={labelStyle} htmlFor="cf-case">{c.caseType}</label>
          <select id="cf-case" name="caseType" defaultValue="" style={fieldStyle}>
            <option value="">{c.caseTypes[0]}</option>
            {c.caseTypes.slice(1).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle} htmlFor="cf-message">{c.message}</label>
        <textarea id="cf-message" name="message" rows={6} style={{ ...fieldStyle, resize: "vertical" }} />
      </div>

      {/* 허니팟 — 사람에게는 보이지 않는다. 채워져 오면 서버가 [스팸의심] 을 달아
          관리자에게만 보내고 CRM 저장을 건너뛴다(조용히 버리지 않는다). */}
      <input
        name="cf_ref_code"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      {state === "fail" && error && (
        <p style={{ color: "#b3261e", fontSize: 14, margin: "0 0 14px" }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        style={{
          background: state === "sending" ? ACCENT.borderSoft : ACCENT.primary,
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "13px 28px",
          fontSize: 16,
          fontWeight: 700,
          cursor: state === "sending" ? "default" : "pointer",
        }}
      >
        {state === "sending" ? c.sending : c.submit}
      </button>

      <p style={{ color: ACCENT.textMuteSoft, fontSize: 13, margin: "14px 0 0" }}>{c.privacy}</p>
    </form>
  );
}
