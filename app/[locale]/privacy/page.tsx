import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { alternatesFor } from "../../lib/seo";
import { COMPANY, ACCENT } from "../../lib/constants";

// QA01-FIX3(맥7 2026-10-05) — "Coming soon" 자리에 정식 개인정보 처리방침(5언어).
// 운영 주체 = NAS team-relay/brand_registry.md 브랜드 E(선샤인행정사사무소). 외국어 사무소명은 Boss 미확정이라 국문 그대로 쓴다.
// 수집 항목 = ContactForm 실제 필드(name·email·contact·caseType·nationality·message) + /api/contact 가 남기는 User-Agent.
// 보유기간 1년 = ContactForm 동의 문구와 같아야 한다. 위탁·국외 이전 = /api/contact 가 실제로 부르는 Resend·Notion,
// 관리자 알림 수신함(Gmail), 호스팅(Cloudflare), 방문 통계(Google Analytics, HtmlShell).

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

type Section = { h: string; p?: string[]; list?: string[]; table?: { head: string[]; rows: string[][] } };
type Doc = { title: string; description: string; intro: string; sections: Section[]; effective: string };

const EMAIL = COMPANY.email;
const PHONE = COMPANY.phone;
const NAME = COMPANY.nameKo;
const REP = COMPANY.representative;
const BIZ = COMPANY.bizRegNo;
const ADDR_KO = "서울특별시 중구 퇴계로 324, 3층 (광희동2가, 성우빌딩)";
const ADDR_EN = COMPANY.addressEn;

const DOCS: Record<L, Doc> = {
  ko: {
    title: "개인정보처리방침",
    description: `${NAME}(lawinkorea.com)가 상담 문의로 받는 개인정보의 항목, 이용 목적, 보유기간(상담 완료 후 1년), 처리 위탁과 국외 이전, 정보주체의 권리와 문의처를 안내합니다.`,
    intro: `${NAME}(이하 "사무소")는 lawinkorea.com 을 운영하면서 「개인정보 보호법」에 따라 이용자의 개인정보를 보호하고 관련 고충을 신속하게 처리하기 위해 다음과 같이 개인정보처리방침을 공개합니다.`,
    sections: [
      { h: "1. 운영 주체", list: [`상호: ${NAME}`, `대표 행정사: ${REP}`, `사업자등록번호: ${BIZ}`, `주소: ${ADDR_KO}`, `전화: ${PHONE}`, `이메일: ${EMAIL}`] },
      { h: "2. 개인정보의 처리 목적", p: ["사무소는 다음 목적으로만 개인정보를 처리하며, 목적이 바뀌면 별도 동의를 받습니다."], list: ["상담 문의 접수와 회신(전화·이메일·메신저)", "상담 내용에 따른 업무 안내와 수임 여부 검토", "문의 접수 확인 메일 발송"] },
      { h: "3. 처리하는 개인정보 항목", list: ["상담 문의 양식(필수): 성함, 연락처(이메일 또는 전화번호 중 하나 이상), 상황 설명", "상담 문의 양식(선택): 사건 유형, 국적", "자동 수집: 문의를 보낸 브라우저 정보(User-Agent), 방문 통계용 쿠키(아래 8항)"], p: ["상황 설명란에는 범죄경력 등 민감한 내용을 꼭 필요한 범위에서만 적어 주십시오. 외국인등록번호·여권번호는 양식으로 받지 않습니다."] },
      { h: "4. 보유 및 이용 기간", p: ["상담 완료 후 1년간 보관한 뒤 파기합니다. 다만 관계 법령이 보존을 요구하는 경우 그 기간 동안 보관합니다. 상담 후 업무를 맡기신 경우 그 업무 처리에 필요한 기간은 별도 계약에 따릅니다."] },
      { h: "5. 개인정보의 제3자 제공", p: ["사무소는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만 이용자가 미리 동의한 경우와 법령에 특별한 규정이 있는 경우는 예외로 합니다."] },
      { h: "6. 처리 위탁 및 국외 이전", p: ["원활한 상담 접수를 위해 아래와 같이 처리를 위탁하며, 수탁 업체 서버가 국외(미국 등)에 있어 문의를 보내는 시점에 네트워크로 이전됩니다. 보유기간은 4항과 같고, 위탁 목적이 끝나면 파기를 요청합니다. 국외 이전을 원하지 않으시면 양식 대신 전화로 상담하실 수 있습니다."],
        table: { head: ["수탁자(국가)", "위탁 업무", "이전 항목"], rows: [
          ["Resend, Inc.(미국)", "접수 알림·확인 메일 발송", "문의 양식 입력 내용"],
          ["Notion Labs, Inc.(미국)", "상담 문의 기록 보관", "문의 양식 입력 내용, 브라우저 정보"],
          ["Google LLC(미국)", "사무소 메일 수신함(Gmail), 방문 통계(Google Analytics)", "문의 양식 입력 내용, 방문 기록(쿠키)"],
          ["Cloudflare, Inc.(미국)", "웹사이트 호스팅·전송", "접속 기록"],
        ] } },
      { h: "7. 개인정보의 파기", p: ["보유기간이 끝나거나 처리 목적이 달성되면 지체 없이 파기합니다. 전자 파일은 복구할 수 없는 방법으로 삭제하고, 종이 문서는 분쇄하거나 소각합니다."] },
      { h: "8. 쿠키와 방문 통계", p: ["사이트 이용 현황을 파악하기 위해 Google Analytics 쿠키를 사용합니다. 브라우저 설정에서 쿠키 저장을 거부할 수 있으며, 거부해도 상담 문의는 그대로 이용할 수 있습니다."] },
      { h: "9. 정보주체의 권리와 행사 방법", p: ["이용자는 언제든지 자신의 개인정보 열람, 정정·삭제, 처리정지, 동의 철회를 요구할 수 있습니다. 아래 문의처로 전화나 이메일로 요청하시면 지체 없이 조치합니다. 법정대리인을 통해서도 요청할 수 있습니다."] },
      { h: "10. 개인정보 보호책임자와 문의처", list: [`개인정보 보호책임자: ${REP} (대표 행정사)`, `전화: ${PHONE}`, `이메일: ${EMAIL}`], p: ["개인정보 침해에 대한 상담은 개인정보침해신고센터(국번 없이 118, privacy.kisa.or.kr), 개인정보분쟁조정위원회(1833-6972, www.kopico.go.kr)에도 문의할 수 있습니다."] },
    ],
    effective: "이 방침은 2026년 10월 5일부터 시행합니다.",
  },
  en: {
    title: "Privacy Policy",
    description: `How ${NAME} (lawinkorea.com) handles the personal information you send through the consultation form: items collected, purpose, 1-year retention, processors and overseas transfer, your rights and contact.`,
    intro: `${NAME} ("the Office"), which operates lawinkorea.com, publishes this Privacy Policy under Korea's Personal Information Protection Act to protect your personal information and handle related requests promptly.`,
    sections: [
      { h: "1. Operator", list: [`Name: ${NAME}`, `Representative administrative agent: ${REP}`, `Business registration no.: ${BIZ}`, `Address: ${ADDR_EN}`, `Phone: ${PHONE}`, `Email: ${EMAIL}`] },
      { h: "2. Purpose of processing", p: ["We process personal information only for the purposes below and will ask for separate consent if the purpose changes."], list: ["Receiving and replying to consultation requests (phone, email, messenger)", "Explaining services and reviewing whether we can take on your matter", "Sending a confirmation email for your request"] },
      { h: "3. Items processed", list: ["Consultation form (required): name, contact (at least one of email or phone number), description of your situation", "Consultation form (optional): case type, nationality", "Collected automatically: browser information (User-Agent) of the request, analytics cookies (section 8)"], p: ["Please include sensitive details such as criminal records only to the extent necessary. We do not ask for resident registration or passport numbers in the form."] },
      { h: "4. Retention period", p: ["Kept for 1 year after the consultation ends, then destroyed, unless a law requires longer retention. If you engage us after the consultation, retention for that work follows the separate agreement."] },
      { h: "5. Provision to third parties", p: ["We do not provide your personal information to third parties, except where you have consented in advance or a law specifically requires it."] },
      { h: "6. Processors and overseas transfer", p: ["We entrust processing as below. Their servers are located outside Korea (e.g. the United States), so your information is transferred over the network when you submit the form. Retention follows section 4, and we ask processors to delete it when the purpose ends. If you do not want the overseas transfer, you can consult us by phone instead of the form."],
        table: { head: ["Processor (country)", "Task", "Items transferred"], rows: [
          ["Resend, Inc. (USA)", "Sending notification and confirmation emails", "Form entries"],
          ["Notion Labs, Inc. (USA)", "Storing consultation records", "Form entries, browser information"],
          ["Google LLC (USA)", "Office mailbox (Gmail), site analytics (Google Analytics)", "Form entries, visit records (cookies)"],
          ["Cloudflare, Inc. (USA)", "Website hosting and delivery", "Access logs"],
        ] } },
      { h: "7. Destruction", p: ["When the retention period ends or the purpose is achieved, we destroy the information without delay: electronic files are deleted so they cannot be recovered, and paper documents are shredded or incinerated."] },
      { h: "8. Cookies and analytics", p: ["We use Google Analytics cookies to understand how the site is used. You can refuse cookies in your browser settings; the consultation form still works if you do."] },
      { h: "9. Your rights", p: ["You may at any time ask to access, correct, delete or stop the processing of your personal information, or withdraw consent. Contact us by phone or email below and we will act without delay. A legal representative may also make the request."] },
      { h: "10. Privacy officer and contact", list: [`Privacy officer: ${REP} (representative administrative agent)`, `Phone: ${PHONE}`, `Email: ${EMAIL}`], p: ["You can also contact the Korea Personal Information Infringement Report Center (118, privacy.kisa.or.kr) or the Personal Information Dispute Mediation Committee (1833-6972, www.kopico.go.kr)."] },
    ],
    effective: "This policy takes effect on October 5, 2026.",
  },
  ja: {
    title: "プライバシーポリシー",
    description: `${NAME}（lawinkorea.com）が相談フォームで受け取る個人情報の項目、利用目的、保有期間（相談終了後1年）、委託と国外移転、ご本人の権利とお問い合わせ先をご案内します。`,
    intro: `lawinkorea.com を運営する${NAME}（以下「事務所」）は、韓国「個人情報保護法」に基づき、利用者の個人情報を保護し関連するご要望に迅速に対応するため、次のとおりプライバシーポリシーを公開します。`,
    sections: [
      { h: "1. 運営者", list: [`名称: ${NAME}`, `代表行政士: ${REP}`, `事業者登録番号: ${BIZ}`, `住所: ${ADDR_EN}`, `電話: ${PHONE}`, `メール: ${EMAIL}`] },
      { h: "2. 個人情報の処理目的", p: ["事務所は次の目的にのみ個人情報を処理し、目的が変わる場合は別途同意をいただきます。"], list: ["ご相談の受付と回答（電話・メール・メッセンジャー）", "ご相談内容に応じた業務のご案内と受任の検討", "受付確認メールの送信"] },
      { h: "3. 処理する個人情報の項目", list: ["相談フォーム（必須）: お名前、連絡先（メールまたは電話番号のいずれか1つ以上）、状況の説明", "相談フォーム（任意）: 事件の種類、国籍", "自動収集: 送信したブラウザの情報（User-Agent）、アクセス解析用クッキー（8項）"], p: ["犯罪経歴などの機微な内容は必要な範囲でのみご記入ください。外国人登録番号・旅券番号はフォームでお受けしません。"] },
      { h: "4. 保有・利用期間", p: ["相談終了後1年間保管した後に破棄します。ただし関係法令で保存が求められる場合はその期間保管します。相談後に業務をご依頼いただいた場合、その業務に必要な期間は別途の契約に従います。"] },
      { h: "5. 第三者への提供", p: ["事務所は利用者の個人情報を第三者に提供しません。ただし事前にご同意いただいた場合と、法令に特別の定めがある場合は除きます。"] },
      { h: "6. 処理の委託と国外移転", p: ["相談の受付のため次のとおり処理を委託しています。委託先のサーバーは国外（米国など）にあるため、フォーム送信時にネットワークを通じて移転されます。保有期間は4項のとおりで、目的終了時には削除を求めます。国外移転を望まない場合は、フォームではなくお電話でご相談いただけます。"],
        table: { head: ["委託先（国）", "委託業務", "移転項目"], rows: [
          ["Resend, Inc.（米国）", "受付通知・確認メールの送信", "フォーム入力内容"],
          ["Notion Labs, Inc.（米国）", "相談記録の保管", "フォーム入力内容、ブラウザ情報"],
          ["Google LLC（米国）", "事務所メール受信箱（Gmail）、アクセス解析（Google Analytics）", "フォーム入力内容、訪問記録（クッキー）"],
          ["Cloudflare, Inc.（米国）", "ウェブサイトのホスティング・配信", "アクセス記録"],
        ] } },
      { h: "7. 個人情報の破棄", p: ["保有期間の終了や目的の達成後は遅滞なく破棄します。電子ファイルは復元できない方法で削除し、紙の書類は裁断または焼却します。"] },
      { h: "8. クッキーとアクセス解析", p: ["サイトの利用状況を把握するため Google Analytics のクッキーを使用します。ブラウザの設定でクッキーを拒否でき、拒否しても相談フォームはそのままご利用いただけます。"] },
      { h: "9. ご本人の権利と行使方法", p: ["ご本人はいつでも個人情報の閲覧、訂正・削除、処理停止、同意の撤回を求めることができます。下記の連絡先へお電話またはメールでご請求いただければ遅滞なく対応します。法定代理人を通じたご請求も可能です。"] },
      { h: "10. 個人情報保護責任者とお問い合わせ先", list: [`個人情報保護責任者: ${REP}（代表行政士）`, `電話: ${PHONE}`, `メール: ${EMAIL}`], p: ["個人情報侵害申告センター（局番なし118、privacy.kisa.or.kr）、個人情報紛争調停委員会（1833-6972、www.kopico.go.kr）にもご相談いただけます。"] },
    ],
    effective: "本ポリシーは2026年10月5日から施行します。",
  },
  zh: {
    title: "隐私政策",
    description: `${NAME}（lawinkorea.com）通过咨询表单收集的个人信息项目、使用目的、保留期限（咨询结束后1年）、委托处理与境外转移、信息主体的权利及联系方式。`,
    intro: `运营 lawinkorea.com 的${NAME}（以下简称"事务所"）依据韩国《个人信息保护法》，为保护用户个人信息并及时处理相关诉求，公开本隐私政策如下。`,
    sections: [
      { h: "1. 运营主体", list: [`名称: ${NAME}`, `代表行政士: ${REP}`, `营业执照号: ${BIZ}`, `地址: ${ADDR_EN}`, `电话: ${PHONE}`, `邮箱: ${EMAIL}`] },
      { h: "2. 个人信息处理目的", p: ["事务所仅为以下目的处理个人信息，目的变更时将另行征得同意。"], list: ["受理并回复咨询（电话、邮件、即时通讯）", "根据咨询内容说明业务并评估是否受理", "发送咨询受理确认邮件"] },
      { h: "3. 处理的个人信息项目", list: ["咨询表单（必填）: 姓名、联系方式（邮箱或电话至少一项）、情况说明", "咨询表单（选填）: 案件类型、国籍", "自动收集: 提交时的浏览器信息（User-Agent）、访问统计 Cookie（第8条）"], p: ["犯罪记录等敏感内容请仅在必要范围内填写。表单不收集外国人登录证号码、护照号码。"] },
      { h: "4. 保留及使用期限", p: ["咨询结束后保存1年后销毁。但相关法律要求保存的，按该期限保存。咨询后委托办理业务的，该业务所需期限依另行签订的合同。"] },
      { h: "5. 向第三方提供", p: ["事务所不向第三方提供用户的个人信息。但用户事先同意或法律另有特别规定的除外。"] },
      { h: "6. 委托处理及境外转移", p: ["为顺利受理咨询，事务所委托以下机构处理。受托方服务器位于境外（美国等），提交表单时信息通过网络转移。保留期限同第4条，目的结束后要求删除。如不希望境外转移，可不使用表单而通过电话咨询。"],
        table: { head: ["受托方（国家）", "委托业务", "转移项目"], rows: [
          ["Resend, Inc.（美国）", "发送受理通知及确认邮件", "表单填写内容"],
          ["Notion Labs, Inc.（美国）", "保存咨询记录", "表单填写内容、浏览器信息"],
          ["Google LLC（美国）", "事务所邮箱（Gmail）、访问统计（Google Analytics）", "表单填写内容、访问记录（Cookie）"],
          ["Cloudflare, Inc.（美国）", "网站托管与传输", "访问记录"],
        ] } },
      { h: "7. 个人信息的销毁", p: ["保留期限届满或处理目的达成后立即销毁。电子文件以无法恢复的方式删除，纸质文件粉碎或焚烧。"] },
      { h: "8. Cookie 与访问统计", p: ["为了解网站使用情况，本站使用 Google Analytics Cookie。您可以在浏览器设置中拒绝 Cookie，拒绝后仍可正常使用咨询表单。"] },
      { h: "9. 信息主体的权利及行使方式", p: ["您可随时要求查阅、更正、删除、停止处理个人信息或撤回同意。请通过下方电话或邮箱提出，事务所将立即处理。也可通过法定代理人提出。"] },
      { h: "10. 个人信息保护负责人及联系方式", list: [`个人信息保护负责人: ${REP}（代表行政士）`, `电话: ${PHONE}`, `邮箱: ${EMAIL}`], p: ["也可咨询韩国个人信息侵害举报中心（拨打118，privacy.kisa.or.kr）或个人信息纠纷调解委员会（1833-6972，www.kopico.go.kr）。"] },
    ],
    effective: "本政策自2026年10月5日起施行。",
  },
  vi: {
    title: "Chính sách bảo mật",
    description: `Cách ${NAME} (lawinkorea.com) xử lý thông tin cá nhân gửi qua biểu mẫu tư vấn: mục thu thập, mục đích, thời hạn lưu 1 năm, ủy thác và chuyển ra nước ngoài, quyền của bạn và đầu mối liên hệ.`,
    intro: `${NAME} ("Văn phòng"), đơn vị vận hành lawinkorea.com, công bố Chính sách bảo mật này theo Luật Bảo vệ thông tin cá nhân của Hàn Quốc để bảo vệ thông tin cá nhân của người dùng và xử lý kịp thời các yêu cầu liên quan.`,
    sections: [
      { h: "1. Đơn vị vận hành", list: [`Tên: ${NAME}`, `Hành chính sĩ đại diện: ${REP}`, `Số đăng ký kinh doanh: ${BIZ}`, `Địa chỉ: ${ADDR_EN}`, `Điện thoại: ${PHONE}`, `Email: ${EMAIL}`] },
      { h: "2. Mục đích xử lý", p: ["Văn phòng chỉ xử lý thông tin cá nhân cho các mục đích dưới đây và sẽ xin đồng ý riêng nếu mục đích thay đổi."], list: ["Tiếp nhận và trả lời yêu cầu tư vấn (điện thoại, email, ứng dụng nhắn tin)", "Giới thiệu dịch vụ và xem xét khả năng nhận việc", "Gửi email xác nhận đã tiếp nhận yêu cầu"] },
      { h: "3. Thông tin được xử lý", list: ["Biểu mẫu tư vấn (bắt buộc): họ tên, liên hệ (ít nhất một trong email hoặc số điện thoại), mô tả tình huống", "Biểu mẫu tư vấn (tùy chọn): loại vụ việc, quốc tịch", "Tự động thu thập: thông tin trình duyệt khi gửi (User-Agent), cookie thống kê truy cập (mục 8)"], p: ["Vui lòng chỉ ghi nội dung nhạy cảm như tiền án ở mức cần thiết. Biểu mẫu không yêu cầu số đăng ký người nước ngoài hay số hộ chiếu."] },
      { h: "4. Thời hạn lưu giữ", p: ["Lưu 1 năm sau khi kết thúc tư vấn rồi hủy, trừ khi pháp luật yêu cầu lưu lâu hơn. Nếu bạn ủy thác công việc sau khi tư vấn, thời hạn cho công việc đó theo hợp đồng riêng."] },
      { h: "5. Cung cấp cho bên thứ ba", p: ["Văn phòng không cung cấp thông tin cá nhân của bạn cho bên thứ ba, trừ khi bạn đã đồng ý trước hoặc pháp luật có quy định riêng."] },
      { h: "6. Ủy thác xử lý và chuyển ra nước ngoài", p: ["Văn phòng ủy thác xử lý như dưới đây. Máy chủ của bên nhận ủy thác đặt ở nước ngoài (như Hoa Kỳ), nên thông tin được chuyển qua mạng khi bạn gửi biểu mẫu. Thời hạn lưu theo mục 4 và Văn phòng yêu cầu xóa khi hết mục đích. Nếu không muốn chuyển ra nước ngoài, bạn có thể tư vấn qua điện thoại thay cho biểu mẫu."],
        table: { head: ["Bên nhận ủy thác (quốc gia)", "Công việc", "Thông tin được chuyển"], rows: [
          ["Resend, Inc. (Hoa Kỳ)", "Gửi email thông báo và xác nhận", "Nội dung biểu mẫu"],
          ["Notion Labs, Inc. (Hoa Kỳ)", "Lưu hồ sơ yêu cầu tư vấn", "Nội dung biểu mẫu, thông tin trình duyệt"],
          ["Google LLC (Hoa Kỳ)", "Hộp thư của Văn phòng (Gmail), thống kê truy cập (Google Analytics)", "Nội dung biểu mẫu, lịch sử truy cập (cookie)"],
          ["Cloudflare, Inc. (Hoa Kỳ)", "Lưu trữ và truyền tải website", "Nhật ký truy cập"],
        ] } },
      { h: "7. Hủy thông tin", p: ["Khi hết thời hạn lưu hoặc đạt mục đích, Văn phòng hủy ngay: tệp điện tử được xóa theo cách không thể khôi phục, giấy tờ được cắt hủy hoặc đốt."] },
      { h: "8. Cookie và thống kê truy cập", p: ["Website dùng cookie Google Analytics để nắm tình hình sử dụng. Bạn có thể từ chối cookie trong cài đặt trình duyệt; biểu mẫu tư vấn vẫn dùng được bình thường."] },
      { h: "9. Quyền của bạn", p: ["Bạn có thể yêu cầu xem, sửa, xóa, ngừng xử lý thông tin cá nhân hoặc rút lại sự đồng ý bất cứ lúc nào. Hãy liên hệ qua điện thoại hoặc email dưới đây, Văn phòng sẽ xử lý ngay. Người đại diện theo pháp luật cũng có thể yêu cầu thay bạn."] },
      { h: "10. Người phụ trách bảo vệ thông tin cá nhân và liên hệ", list: [`Người phụ trách: ${REP} (hành chính sĩ đại diện)`, `Điện thoại: ${PHONE}`, `Email: ${EMAIL}`], p: ["Bạn cũng có thể liên hệ Trung tâm khai báo xâm phạm thông tin cá nhân (118, privacy.kisa.or.kr) hoặc Ủy ban hòa giải tranh chấp thông tin cá nhân (1833-6972, www.kopico.go.kr)."] },
    ],
    effective: "Chính sách này có hiệu lực từ ngày 5 tháng 10 năm 2026.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = VALID_LOCALES.includes(locale as L) ? (locale as L) : "ko";
  return {
    title: { absolute: `${DOCS[l].title} | ${NAME}` },
    description: DOCS[l].description,
    alternates: alternatesFor(l, "/privacy"),
  };
}

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

const h2Style = { fontSize: 20, fontWeight: 700, color: ACCENT.navy, margin: "36px 0 12px" } as const;
const pStyle = { color: ACCENT.textMute, lineHeight: 1.75, margin: "8px 0" } as const;
const cell = { border: `1px solid ${ACCENT.border}`, padding: "8px 10px", textAlign: "left" as const, verticalAlign: "top" as const };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) notFound();
  const d = DOCS[locale as L];
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0a1628" }}>{d.title}</h1>
      <p style={{ ...pStyle, marginTop: 16 }}>{d.intro}</p>
      {d.sections.map((s) => (
        <section key={s.h}>
          <h2 style={h2Style}>{s.h}</h2>
          {s.p?.map((t) => <p key={t} style={pStyle}>{t}</p>)}
          {s.list && (
            <ul style={{ ...pStyle, paddingLeft: 22, listStyle: "disc" }}>
              {s.list.map((t) => <li key={t} style={{ margin: "4px 0" }}>{t}</li>)}
            </ul>
          )}
          {s.table && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 14, color: ACCENT.textMute, marginTop: 8 }}>
                <thead>
                  <tr>{s.table.head.map((h) => <th key={h} style={{ ...cell, background: ACCENT.bg, color: ACCENT.navy }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {s.table.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i} style={cell}>{c}</td>)}</tr>)}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}
      <p style={{ ...pStyle, marginTop: 40, paddingTop: 20, borderTop: `1px solid ${ACCENT.border}` }}>{d.effective}</p>
    </main>
  );
}
