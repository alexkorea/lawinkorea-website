// 연락 안내 문구(LAW-V1b, 보스 msg 1803/1808/1816 — 2026-10-04).
// 운영시간 외 안내·회신 기준·상담 언어·메신저 라벨을 홈·문의·긴급상담·모바일 고정 바가 같이 쓴다.
// 상담 비용이 없다는 뜻의 표현은 쓰지 않는다(보스 확정 1).

export type ContactLocale = "ko" | "en" | "ja" | "zh" | "vi";

/** 운영시간 외 안내 — 문장은 보스 지시 원문(ko)과 그 번역. */
export const HOURS_NOTICE: Record<ContactLocale, string> = {
  ko: "평일 09:30–17:30 운영. 운영시간 외 접수는 다음 영업일 오전에 회신합니다.",
  en: "Open weekdays 09:30–17:30 (Korea time). Inquiries received outside these hours are answered the next business day morning.",
  ja: "平日 09:30–17:30 営業。営業時間外のお問い合わせは、翌営業日の午前に返信します。",
  zh: "工作日 09:30–17:30 营业。非营业时间收到的咨询，将于下一个工作日上午回复。",
  vi: "Làm việc ngày thường 09:30–17:30 (giờ Hàn Quốc). Yêu cầu nhận ngoài giờ làm việc sẽ được phản hồi vào sáng ngày làm việc tiếp theo.",
};

/** 회신 기준 — 운영시간 안에서의 기준임을 함께 적는다. */
export const REPLY_NOTICE: Record<ContactLocale, string> = {
  ko: "평일 1시간 이내 회신(운영시간 기준)",
  en: "Reply within 1 hour on weekdays (during business hours)",
  ja: "平日1時間以内に返信（営業時間内）",
  zh: "工作日1小时内回复（营业时间内）",
  vi: "Phản hồi trong vòng 1 giờ vào ngày thường (trong giờ làm việc)",
};

/** 상담 가능 언어 — ko·en·ja·zh·vi 순서, COMPANY.availableLanguage 와 같은 목록. */
export const LANGS_NOTICE: Record<ContactLocale, string> = {
  ko: "상담 언어: 한국어 · 영어 · 일본어 · 중국어 · 베트남어",
  en: "Consultation in Korean · English · Japanese · Chinese · Vietnamese",
  ja: "相談言語：韓国語・英語・日本語・中国語・ベトナム語",
  zh: "咨询语言：韩语·英语·日语·中文·越南语",
  vi: "Ngôn ngữ tư vấn: tiếng Hàn · tiếng Anh · tiếng Nhật · tiếng Trung · tiếng Việt",
};

export const MESSENGER_TEXT: Record<
  ContactLocale,
  { title: string; whatsapp: string; scan: string; phone: string; email: string; form: string; kakao: string }
> = {
  ko: { title: "메신저·전화·이메일로 문의", whatsapp: "WhatsApp으로 바로 문의", scan: "휴대폰 카메라로 QR 코드를 스캔하면 대화창이 열립니다.", phone: "전화", email: "이메일", form: "문의 양식", kakao: "카카오톡" },
  en: { title: "Contact us by messenger, phone or email", whatsapp: "Message us on WhatsApp", scan: "Scan a QR code with your phone camera to open the chat.", phone: "Phone", email: "Email", form: "Inquiry form", kakao: "KakaoTalk" },
  ja: { title: "メッセンジャー・電話・メールでのお問い合わせ", whatsapp: "WhatsAppで問い合わせる", scan: "スマートフォンのカメラでQRコードを読み取ると、トーク画面が開きます。", phone: "電話", email: "メール", form: "お問い合わせフォーム", kakao: "カカオトーク" },
  zh: { title: "通过即时通讯、电话或电子邮件联系", whatsapp: "通过 WhatsApp 咨询", scan: "用手机相机扫描二维码即可打开对话。", phone: "电话", email: "电子邮件", form: "咨询表单", kakao: "KakaoTalk" },
  vi: { title: "Liên hệ qua ứng dụng nhắn tin, điện thoại hoặc email", whatsapp: "Nhắn tin qua WhatsApp", scan: "Quét mã QR bằng camera điện thoại để mở cuộc trò chuyện.", phone: "Điện thoại", email: "Email", form: "Biểu mẫu liên hệ", kakao: "KakaoTalk" },
};

/** QR 이미지 — public/qr/ (원본 ~/law-v1/qr/, visaskorea.com 과 같은 계정) */
export const MESSENGER_QR = [
  { key: "kakao", src: "/qr/kakao.jpg", label: "kakao" as const, width: 300, height: 290 },
  { key: "line", src: "/qr/line.jpg", label: "LINE", width: 150, height: 150 },
  { key: "wechat", src: "/qr/wechat.jpg", label: "WeChat", width: 300, height: 300 },
  { key: "whatsapp", src: "/qr/whatsapp.jpg", label: "WhatsApp", width: 300, height: 300 },
];
