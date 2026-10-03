import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { breadcrumbSchema, faqSchema } from "../../lib/schema";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

const CONTENT: Record<L, { title: string; items: { q: string; a: string }[] }> = {
  ko: {
    title: "자주 묻는 질문",
    items: [
      { q: "사범심사와 형사처벌은 다른 건가요?", a: "네. 형사처벌은 검찰·법원이 담당하고, 사범심사는 출입국·외국인청이 별도로 진행합니다. 형사 무죄 또는 기소유예를 받았더라도 사범심사는 별도로 진행될 수 있습니다." },
      { q: "기소유예를 받아도 사범심사를 받나요?", a: "기소유예를 받았더라도 사범심사는 형사처분과 별도로 진행될 수 있습니다. 형사처분은 검찰·법원이, 사범심사는 출입국·외국인청이 각각 판단하기 때문입니다. 기소유예를 받았다고 해서 체류 문제까지 자동으로 정리되는 것은 아니며, 실제 판단은 개별 사건에 따라 달라집니다." },
      { q: "출국명령을 받으면 반드시 출국해야 하나요?", a: "출국명령에 대해 이의신청을 할 수 있으며, 일정 요건을 충족하면 체류 허가를 받을 수 있는 경우도 있습니다. 기한 내 대응이 중요합니다." },
      { q: "소명서는 직접 작성해야 하나요?", a: "직접 작성도 가능하지만, 사실관계 정리와 법적 맥락 이해가 필요합니다. 행정사를 통해 작성하면 더 체계적인 소명이 가능합니다." },
      { q: "한국어를 못해도 상담받을 수 있나요?", a: "네. 영어, 중국어, 일본어로도 상담 가능합니다." },
      { q: "음주운전 외국인도 체류 자격을 유지할 수 있나요?", a: "가능한 경우가 있습니다. 초범 여부, 혈중알코올농도, 반성 태도, 체류 기간 등 다양한 요소가 고려됩니다. 상담을 통해 가능성을 검토해 드립니다." },
      { q: "상담은 비대면으로도 가능한가요?", a: "네. 화상 또는 메시지 방식으로도 상담 가능합니다." },
    ],
  },
  en: {
    title: "Frequently Asked Questions",
    items: [
      { q: "Is immigration offense review different from criminal punishment?", a: "Yes. Criminal punishment is handled by the prosecution and courts, while immigration offense review is conducted separately by the Immigration Office. Even if you received a not-guilty verdict or suspended indictment, an immigration review may still proceed." },
      { q: "If I receive a departure order, must I leave immediately?", a: "You can appeal a departure order, and in some cases you may receive permission to stay if certain conditions are met. Timely response is critical." },
      { q: "Can I write the written explanation myself?", a: "Yes, but it requires clear fact organization and understanding of the legal context. Having an administrative scrivener assist typically leads to a more thorough submission." },
      { q: "Can I consult if I don't speak Korean?", a: "Yes. Consultations are available in English, Chinese, and Japanese." },
      { q: "Can a foreign national keep their visa status after a DUI?", a: "It depends on whether it's a first offense, the BAC level, attitude, length of stay, and other factors. We review the possibilities during consultation." },
      { q: "Is remote consultation available?", a: "Yes. We offer video and messaging consultations." },
    ],
  },
  zh: {
    title: "常见问题",
    items: [
      { q: "事犯审查和刑事处罚是不同的吗？", a: "是的。刑事处罚由检察院·法院负责，事犯审查由出入境·外国人厅单独进行。即使获得无罪或不起诉决定，事犯审查仍可能单独进行。" },
      { q: "收到出境命令后必须立即出境吗？", a: "可以对出境命令提出异议，符合一定条件时也可能获得居留许可。在期限内及时应对非常重要。" },
      { q: "说明书需要自己撰写吗？", a: "可以自行撰写，但需要整理事实关系和了解法律背景。通过行政士协助撰写通常更为系统全面。" },
      { q: "不懂韩语也可以咨询吗？", a: "可以。提供英语、中文、日语咨询服务。" },
      { q: "酒驾的外国人也能维持居留资格吗？", a: "视情况而定。会综合考虑初犯与否、血液酒精浓度、反省态度、居留期间等多种因素。请通过咨询了解可能性。" },
      { q: "可以进行远程咨询吗？", a: "可以。提供视频或消息方式的远程咨询。" },
    ],
  },
  ja: {
    title: "よくある質問",
    items: [
      { q: "事犯審査と刑事処罰は違うのですか？", a: "はい。刑事処罰は検察・裁判所が担当し、事犯審査は出入国・外国人庁が別途行います。無罪や起訴猶予を受けていても、事犯審査は別途進められる場合があります。" },
      { q: "出国命令を受けたら必ず出国しなければなりませんか？", a: "出国命令に対して異議申し立てができ、一定の条件を満たせば在留許可を受けられる場合もあります。期限内の対応が重要です。" },
      { q: "疎明書は自分で作成しなければなりませんか？", a: "ご自身で作成することもできますが、事実関係の整理と法的文脈の理解が必要です。行政書士を通じた作成の方が、より体系的な疎明が可能です。" },
      { q: "韓国語ができなくても相談できますか？", a: "はい。英語、中国語、日本語でも相談可能です。" },
      { q: "飲酒運転の外国人でも在留資格を維持できますか？", a: "場合によります。初犯か否か、血中アルコール濃度、反省態度、在留期間など様々な要素が考慮されます。ご相談を通じて可能性をご確認ください。" },
      { q: "非対面での相談は可能ですか？", a: "はい。ビデオまたはメッセージ形式でも対応可能です。" },
    ],
  },
  vi: {
    title: "Câu hỏi thường gặp",
    items: [
      { q: "Xem xét vi phạm xuất nhập cảnh khác với xử phạt hình sự không?", a: "Có. Xử phạt hình sự do viện kiểm sát và tòa án xử lý, còn xem xét vi phạm xuất nhập cảnh do Cục Xuất nhập cảnh thực hiện riêng biệt. Dù được tuyên không có tội hoặc tạm đình chỉ truy tố, xem xét xuất nhập cảnh vẫn có thể tiến hành." },
      { q: "Nhận lệnh xuất cảnh có phải rời đi ngay không?", a: "Bạn có thể kháng cáo lệnh xuất cảnh, và trong một số trường hợp có thể được phép ở lại nếu đáp ứng điều kiện nhất định. Phản hồi kịp thời là rất quan trọng." },
      { q: "Tôi có thể tự viết giải trình không?", a: "Có thể, nhưng cần sắp xếp sự kiện rõ ràng và hiểu bối cảnh pháp lý. Việc nhờ hành chính viên hỗ trợ thường dẫn đến bài giải trình toàn diện hơn." },
      { q: "Tôi không biết tiếng Hàn có được tư vấn không?", a: "Có. Tư vấn bằng tiếng Anh, tiếng Trung và tiếng Nhật." },
      { q: "Người nước ngoài bị DUI có thể giữ tư cách lưu trú không?", a: "Tùy thuộc vào lần đầu vi phạm hay tái phạm, nồng độ cồn, thái độ hối lỗi, thời gian lưu trú và các yếu tố khác. Chúng tôi sẽ xem xét khả năng trong buổi tư vấn." },
      { q: "Có thể tư vấn từ xa không?", a: "Có. Chúng tôi tư vấn qua video và nhắn tin." },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "faq", "/faq");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as L)) notFound();
  const l = locale as L;
  const c = CONTENT[l];
  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(c.items)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(l, [{ name: c.title, path: "/faq" }])),
        }}
      />
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0a1628", marginBottom: 40 }}>{c.title}</h1>
      <div style={{ display: "grid", gap: 16 }}>
        {c.items.map((item, i) => (
          <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "20px 24px", background: "#fff" }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#0a1628", marginBottom: 8, display: "flex", gap: 10 }}>
              <span style={{ color: "#1e4a8a", flexShrink: 0 }}>Q.</span>
              <span>{item.q}</span>
            </div>
            <div style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, display: "flex", gap: 10 }}>
              <span style={{ color: "#64748b", flexShrink: 0, fontWeight: 600 }}>A.</span>
              <span>{item.a}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
