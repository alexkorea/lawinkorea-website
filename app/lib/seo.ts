import type { Metadata } from "next";
import { SITE } from "./constants";
import type { Locale } from "./content";

export const LOCALES: readonly Locale[] = ["ko", "en", "zh", "ja", "vi"] as const;

/**
 * WEBSITE STANDARD v2.0 §3 — canonical/hreflang 정확성.
 * path 는 로케일 접두사를 뺀 경로("", "/about", "/blog/foo").
 * onlyLocales 를 주면 실제로 그 언어판이 존재하는 로케일에만 hreflang 을 건다.
 */
export function alternatesFor(
  locale: string,
  path: string,
  onlyLocales: readonly string[] = LOCALES
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of onlyLocales) languages[l] = `${SITE.url}/${l}${path}`;
  languages["x-default"] = `${SITE.url}/ko${path}`;
  return {
    canonical: `${SITE.url}/${locale}${path}`,
    languages,
  };
}

export const OG_LOCALE: Record<string, string> = {
  ko: "ko_KR",
  en: "en_US",
  zh: "zh_CN",
  ja: "ja_JP",
  vi: "vi_VN",
};

/** 페이지별 title(50~60자)·description(120~155자) — STANDARD §2 */
type Seo = { title: string; description: string };

export const PAGE_SEO: Record<string, Record<Locale, Seo>> = {
  about: {
    ko: {
      title: "사무소 소개 — 출입국사범심사 전문 비전행정사사무소",
      description:
        "비전행정사사무소는 외국인 출입국사범심사 대응을 전문으로 하는 서울 중구 소재 행정사 사무소입니다. 음주운전·형사사건·불법취업·출국명령 등 체류 위기 대응 전문 분야와 5개 국어 상담 체계를 안내합니다.",
    },
    en: {
      title: "About VISION — Korea Immigration Offense Review Specialists",
      description:
        "VISION Administrative Scrivener Office in Seoul specializes in immigration offense review for foreign nationals in Korea. Learn about our practice areas — DUI, criminal charges, unauthorized employment, departure orders — and five-language support.",
    },
    zh: {
      title: "事务所介绍 — 韩国出入境事犯审查专业行政士",
      description:
        "VISION行政士事务所位于首尔中区，专注于外国人出入境事犯审查应对。介绍我们的专业领域——酒驾、刑事案件、非法就业、出境命令等居留危机应对，以及五种语言的咨询体系。",
    },
    ja: {
      title: "事務所紹介 — 韓国出入国事犯審査の専門行政書士",
      description:
        "VISION行政書士事務所はソウル中区に所在し、外国人の出入国事犯審査対応を専門としています。飲酒運転・刑事事件・不法就労・出国命令など在留危機への対応分野と、5か国語対応体制をご案内します。",
    },
    vi: {
      title: "Giới thiệu VISION — Chuyên gia xem xét vi phạm XNC Hàn Quốc",
      description:
        "Văn phòng Hành chính VISION tại Jung-gu, Seoul chuyên hỗ trợ xem xét vi phạm xuất nhập cảnh cho người nước ngoài. Tìm hiểu lĩnh vực chuyên môn — DUI, án hình sự, lao động trái phép, lệnh xuất cảnh — và hỗ trợ 5 ngôn ngữ.",
    },
  },
  cases: {
    ko: {
      title: "주요 대응 사례 — 사범심사·출국명령 처리 사례 모음",
      description:
        "비전행정사사무소가 지원한 출입국사범심사 대응 사례를 유형별로 정리했습니다. 음주운전, 형사사건 입건, 허가 외 취업, 체류기간 초과 자진출국 등 실제 처리 흐름과 쟁점을 익명·재구성해 소개합니다.",
    },
    en: {
      title: "Case Highlights — Immigration Offense Review Outcomes",
      description:
        "Anonymised, reconstructed case summaries from VISION's immigration offense review practice in Korea: DUI, criminal charges, unauthorized employment, and overstay voluntary departure — the issues raised and how each submission was prepared.",
    },
    zh: {
      title: "主要应对案例 — 事犯审查·出境命令处理实例",
      description:
        "整理VISION行政士事务所支援的出入境事犯审查应对案例。涵盖酒驾、刑事案件立案、许可外就业、超期滞留自愿出境等实际处理流程与争议点，均已匿名化重构。",
    },
    ja: {
      title: "主な対応事例 — 事犯審査・出国命令の処理実例",
      description:
        "VISION行政書士事務所が支援した出入国事犯審査対応の事例を類型別に整理しました。飲酒運転、刑事事件立件、許可外就労、在留期間超過の自主出国など、実際の流れと争点を匿名・再構成してご紹介します。",
    },
    vi: {
      title: "Các trường hợp tiêu biểu — Kết quả xem xét vi phạm XNC",
      description:
        "Tóm tắt các vụ việc đã ẩn danh và tái dựng từ thực tiễn xem xét vi phạm xuất nhập cảnh của VISION: DUI, án hình sự, lao động ngoài phạm vi cho phép, xuất cảnh tự nguyện do quá hạn — vấn đề và cách chuẩn bị hồ sơ.",
    },
  },
  contact: {
    ko: {
      title: "상담 신청 — 출입국사범심사 무료 초기 진단",
      description:
        "출입국사범심사 통보를 받았다면 기한 내 대응이 결과를 좌우합니다. 전화·이메일·카카오톡으로 상황을 알려주시면 평일 기준 1시간 이내에 초기 진단 결과와 필요한 준비 서류를 회신드립니다.",
    },
    en: {
      title: "Contact VISION — Free Initial Immigration Case Review",
      description:
        "If you have received an immigration offense review notice, responding within the deadline decides the outcome. Send us your situation by phone, email or KakaoTalk and we reply with an initial assessment within one hour on weekdays.",
    },
    zh: {
      title: "联系我们 — 出入境事犯审查免费初步诊断",
      description:
        "收到出入境事犯审查通知后，在期限内应对将左右结果。通过电话、电子邮件或KakaoTalk告知您的情况，我们将在工作日1小时内回复初步诊断结果与所需准备文件。",
    },
    ja: {
      title: "お問い合わせ — 出入国事犯審査の無料初期診断",
      description:
        "出入国事犯審査の通知を受け取ったら、期限内の対応が結果を左右します。電話・メール・カカオトークで状況をお知らせいただければ、平日1時間以内に初期診断結果と必要書類をご返信します。",
    },
    vi: {
      title: "Liên hệ VISION — Chẩn đoán ban đầu miễn phí về hồ sơ XNC",
      description:
        "Nếu bạn nhận được thông báo xem xét vi phạm xuất nhập cảnh, phản hồi đúng hạn sẽ quyết định kết quả. Hãy gửi tình huống qua điện thoại, email hoặc KakaoTalk — chúng tôi trả lời trong 1 giờ vào ngày làm việc.",
    },
  },
  documents: {
    ko: {
      title: "준비서류 — 출입국사범심사 제출 서류 체크리스트",
      description:
        "출입국사범심사 출석 전에 준비해야 할 서류를 단계별로 정리했습니다. 신분·체류 관련 기본 서류부터 형사 처분 결과 자료, 정상 참작 자료(재직·가족·합의서)까지 누락 없이 확인하세요.",
    },
    en: {
      title: "Required Documents — Immigration Offense Review Checklist",
      description:
        "A step-by-step checklist of what to prepare before an immigration offense review in Korea: identity and residence records, criminal disposition documents, and mitigating evidence such as employment, family and settlement papers.",
    },
    zh: {
      title: "所需文件 — 出入境事犯审查提交材料清单",
      description:
        "整理出席出入境事犯审查前需准备的文件。从身份·居留相关基本材料，到刑事处分结果资料、酌情减轻材料（在职证明、家庭关系、和解书）等，帮助您逐项确认无遗漏。",
    },
    ja: {
      title: "必要書類 — 出入国事犯審査の提出書類チェックリスト",
      description:
        "出入国事犯審査の出席前に準備すべき書類を段階別に整理しました。身分・在留に関する基本書類から刑事処分結果資料、情状酌量資料（在職・家族・示談書）まで漏れなくご確認ください。",
    },
    vi: {
      title: "Hồ sơ cần chuẩn bị — Danh mục nộp khi xem xét vi phạm XNC",
      description:
        "Danh mục từng bước những giấy tờ cần chuẩn bị trước buổi xem xét vi phạm xuất nhập cảnh tại Hàn Quốc: giấy tờ nhân thân và lưu trú, kết quả xử lý hình sự, và tài liệu giảm nhẹ như việc làm, gia đình, biên bản hòa giải.",
    },
  },
  faq: {
    ko: {
      title: "자주 묻는 질문 — 출입국사범심사 Q&A",
      description:
        "사범심사와 형사처벌의 차이, 출국명령을 받은 뒤 대응 방법, 소명서 작성 주체, 음주운전 이후 체류자격 유지 가능성 등 상담에서 가장 자주 나오는 질문에 대해 행정사가 직접 답변합니다.",
    },
    en: {
      title: "FAQ — Korea Immigration Offense Review Questions Answered",
      description:
        "How an immigration offense review differs from criminal punishment, what to do after a departure order, who should write the written explanation, and whether visa status survives a DUI — answered by a certified administrative scrivener.",
    },
    zh: {
      title: "常见问题 — 韩国出入境事犯审查问答",
      description:
        "事犯审查与刑事处罚的区别、收到出境命令后的应对方法、说明书由谁撰写、酒驾后能否维持居留资格等——咨询中最常见的问题，由行政士直接解答。",
    },
    ja: {
      title: "よくある質問 — 韓国出入国事犯審査Q&A",
      description:
        "事犯審査と刑事処罰の違い、出国命令を受けた後の対応方法、疎明書の作成主体、飲酒運転後の在留資格維持の可否など、ご相談で最も多い質問に行政書士が直接お答えします。",
    },
    vi: {
      title: "Câu hỏi thường gặp — Hỏi đáp xem xét vi phạm XNC Hàn Quốc",
      description:
        "Xem xét vi phạm xuất nhập cảnh khác xử phạt hình sự thế nào, làm gì sau khi nhận lệnh xuất cảnh, ai nên viết bản giải trình, có giữ được tư cách lưu trú sau DUI — được hành chính sĩ giải đáp trực tiếp.",
    },
  },
  process: {
    ko: {
      title: "상담 진행 절차 — 접수부터 사범심사 동행까지",
      description:
        "비전행정사사무소의 상담은 초기 진단, 자료 정리, 소명서 작성, 출석 시뮬레이션, 사범심사 동행, 결과 통보 후 후속 대응 순으로 진행됩니다. 각 단계에서 무엇을 준비하고 얼마나 걸리는지 안내합니다.",
    },
    en: {
      title: "Our Process — From Intake to Immigration Review Attendance",
      description:
        "VISION's engagement runs through initial assessment, document assembly, drafting the written explanation, interview rehearsal, attendance at the immigration review, and follow-up after the decision. See what each stage requires and how long it takes.",
    },
    zh: {
      title: "咨询进行程序 — 从受理到事犯审查陪同",
      description:
        "VISION行政士事务所的咨询按初步诊断、资料整理、说明书撰写、出席模拟、事犯审查陪同、结果通知后续应对的顺序进行。为您介绍各阶段需准备的内容与所需时间。",
    },
    ja: {
      title: "相談進行手続き — 受付から事犯審査の同行まで",
      description:
        "VISION行政書士事務所の相談は、初期診断、資料整理、疎明書作成、出席シミュレーション、事犯審査同行、結果通知後のフォローの順に進みます。各段階で何を準備し、どれくらいかかるかをご案内します。",
    },
    vi: {
      title: "Quy trình tư vấn — Từ tiếp nhận đến đồng hành buổi xem xét",
      description:
        "Quy trình của VISION gồm chẩn đoán ban đầu, tập hợp tài liệu, soạn bản giải trình, diễn tập phỏng vấn, đồng hành tại buổi xem xét vi phạm và xử lý tiếp sau khi có kết quả. Xem mỗi bước cần gì và mất bao lâu.",
    },
  },
  "urgent-consultation": {
    ko: {
      title: "긴급 상담 — 출국명령·강제퇴거 통보 즉시 대응",
      description:
        "출국명령이나 강제퇴거 통보를 받았다면 대응 기한이 짧습니다. 전화 02-363-2251 또는 카카오톡으로 즉시 연락 주시면 남은 기한과 가능한 대응 방법을 우선 확인해 드립니다.",
    },
    en: {
      title: "Urgent Consultation — Departure Order & Deportation Response",
      description:
        "Departure orders and deportation notices come with short deadlines. Call +82-2-363-2251 or reach us on KakaoTalk and we will first confirm how much time remains and which response options are still open to you.",
    },
    zh: {
      title: "紧急咨询 — 出境命令·强制驱逐通知即时应对",
      description:
        "收到出境命令或强制驱逐通知后，应对期限非常短。请立即拨打02-363-2251或通过KakaoTalk联系我们，我们将优先确认剩余期限与可行的应对方案。",
    },
    ja: {
      title: "緊急相談 — 出国命令・強制退去通知への即時対応",
      description:
        "出国命令や強制退去の通知には短い対応期限があります。電話 02-363-2251 またはカカオトークですぐにご連絡いただければ、残りの期限と取りうる対応方法を優先的に確認いたします。",
    },
    vi: {
      title: "Tư vấn khẩn cấp — Ứng phó lệnh xuất cảnh và trục xuất",
      description:
        "Lệnh xuất cảnh và thông báo trục xuất có thời hạn phản hồi rất ngắn. Hãy gọi +82-2-363-2251 hoặc liên hệ qua KakaoTalk — chúng tôi sẽ xác định trước thời hạn còn lại và các phương án còn khả thi.",
    },
  },
  "visa-impact": {
    ko: {
      title: "비자별 영향 — 체류자격에 따라 달라지는 사범심사 결과",
      description:
        "같은 위반이라도 E-9, E-7, D-2, F-2, F-6 등 체류자격에 따라 사범심사 결과와 회복 가능성이 달라집니다. 자격별로 어떤 점이 유리하고 불리한지, 무엇을 먼저 준비해야 하는지 정리했습니다.",
    },
    en: {
      title: "Visa Impact by Type — How Status Changes Review Outcomes",
      description:
        "The same violation plays out differently on an E-9, E-7, D-2, F-2 or F-6 status. This page sets out what helps and what hurts under each visa category, and which documents to prepare first for your immigration offense review.",
    },
    zh: {
      title: "签证影响 — 居留资格不同，事犯审查结果也不同",
      description:
        "即使是相同的违规，E-9、E-7、D-2、F-2、F-6等居留资格不同，事犯审查结果与恢复可能性也不同。本页整理了各资格的有利与不利因素，以及应优先准备的材料。",
    },
    ja: {
      title: "ビザへの影響 — 在留資格で変わる事犯審査の結果",
      description:
        "同じ違反でも、E-9・E-7・D-2・F-2・F-6など在留資格によって事犯審査の結果と回復可能性は異なります。資格ごとに有利・不利となる点と、まず準備すべき書類を整理しました。",
    },
    vi: {
      title: "Tác động đến visa — Tư cách lưu trú thay đổi kết quả xem xét",
      description:
        "Cùng một vi phạm nhưng kết quả xem xét và khả năng phục hồi khác nhau tùy tư cách E-9, E-7, D-2, F-2 hay F-6. Trang này nêu rõ điểm có lợi và bất lợi theo từng loại visa, cùng giấy tờ cần chuẩn bị trước.",
    },
  },
};

export function pageMetadata(rawLocale: string, key: keyof typeof PAGE_SEO, path: string): Metadata {
  const locale = (LOCALES as readonly string[]).includes(rawLocale) ? (rawLocale as Locale) : "ko";
  const seo = PAGE_SEO[key][locale];
  return {
    // 루트 레이아웃의 "%s · Law in Korea" 템플릿이 붙으면 60자를 넘으므로 absolute 사용
    title: { absolute: seo.title },
    description: seo.description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: "website",
      title: seo.title,
      description: seo.description,
      url: `${SITE.url}/${locale}${path}`,
      locale: OG_LOCALE[locale],
    },
  };
}
