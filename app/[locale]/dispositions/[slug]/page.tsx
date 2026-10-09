import { notFound } from "next/navigation";
import HubBlogLinks, { HUB_POSTS, appendToMain } from "../../../components/HubBlogLinks";
import { alternatesFor, brandTitle } from "../../../lib/seo";
import { faqSchema } from "../../../lib/schema";
import type { Metadata } from "next";
import React from "react";
import { DEPARTURE_ORDER, DEPARTURE_RECOMMENDATION } from "./departure";

const VALID_LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type L = (typeof VALID_LOCALES)[number];

const LABELS: Record<L, { title: string; msg: string; back: string }> = {
  ko: { title: "준비 중", msg: "해당 페이지의 콘텐츠를 준비 중입니다. 빠른 시일 내에 업데이트됩니다.", back: "처분 유형 목록으로 돌아가기" },
  en: { title: "Coming Soon", msg: "This page is currently being prepared. It will be updated soon.", back: "Back to Dispositions" },
  ja: { title: "準備中", msg: "このページのコンテンツを準備中です。近日中に更新されます。", back: "処分の種類に戻る" },
  zh: { title: "准备中", msg: "此页面内容正在准备中，即将更新。", back: "返回处分类型" },
  vi: { title: "Đang chuẩn bị", msg: "Nội dung trang này đang được chuẩn bị và sẽ được cập nhật sớm.", back: "Quay lại các loại xử lý" },
};

type SlugContent = {
  meta: Record<L, { title: string; description: string }>;
  render: (l: L, locale: string) => React.ReactNode;
};

const SLUG_CONTENT: Record<string, SlugContent> = {
  "departure-order": DEPARTURE_ORDER,
  "departure-recommendation": DEPARTURE_RECOMMENDATION,

  "deportation-order": {
    meta: {
      ko: { title: "강제퇴거명령 — 절차·이의신청·재입국금지 · Law in Korea", description: "강제퇴거명령의 의미, 보호(구금) 절차, 이의신청 방법, 재입국 금지 기간 및 선샤인행정사사무소의 대응 방법을 안내합니다." },
      en: { title: "Forced Deportation Order (강제퇴거명령) in Korea — Process & Appeals · Law in Korea", description: "Everything you need to know about Korea's forced deportation order: what triggers it, detention process, appeal options, and re-entry ban periods." },
      ja: { title: "強制退去命令（강제퇴거명령）— 手続き・異議申立て・再入国禁止 · Law in Korea", description: "韓国の強制退去命令の意味、保護（拘禁）手続き、異議申立て方法、再入国禁止期間と対応方法を解説します。" },
      zh: { title: "强制出境命令（강제퇴거명령）— 程序·申诉·再入境禁止 · Law in Korea", description: "了解韩国强制出境命令的触发条件、保护（拘留）程序、申诉方法及再入境禁止期限。" },
      vi: { title: "Lệnh trục xuất cưỡng bức (강제퇴거명령) tại Hàn Quốc · Law in Korea", description: "Tìm hiểu về lệnh trục xuất cưỡng bức của Hàn Quốc: nguyên nhân, quy trình giam giữ, cách kháng cáo và thời gian cấm tái nhập cảnh." },
    },
    render: (l, locale) => {
      const t = {
        ko: {
          tag: "강제퇴거명령",
          h1: "강제퇴거명령(강제추방) — 절차, 이의신청, 재입국 금지",
          lead: "강제퇴거명령은 출입국관리법상 가장 무거운 행정 처분 중 하나입니다. 명령 발부 이후 보호(구금) 조치가 취해지며, 집행 완료 후에는 수년에서 영구적인 재입국 금지가 부과될 수 있습니다.",
          s1: "강제퇴거명령이 발부되는 이유",
          p1: "출입국관리법 제46조는 강제퇴거 대상을 규정합니다. 법무부 출입국 당국이 심사 결과 강제퇴거 사유에 해당한다고 판단하면 명령서를 발부합니다.",
          items1: [
            "체류 자격 없이 국내에 있는 경우",
            "금지 행위(마약·성범죄 등) 위반으로 유죄 확정",
            "국가 안보 또는 공공 질서를 위협한다고 판단",
            "허위 서류로 입국 또는 체류 자격 취득",
            "출국명령을 받고 기한까지 출국하지 않거나 조건을 위반한 경우(제68조 제4항)",
          ],
          s2: "강제퇴거 집행 절차",
          p2: "강제퇴거명령이 발부되면 아래 절차로 집행됩니다.",
          steps: [
            "강제퇴거명령서 발부 및 당사자에게 통지",
            "보호(구금) 조치: 외국인보호소 입소",
            "명령서를 받은 날부터 7일 이내 법무부장관에게 이의신청(제60조 제1항) 또는 행정 소송 제기 가능",
            "집행 유예 또는 보호 해제 결정 (드물게 인정)",
            "강제퇴거 집행 (항공편 탑승 후 출국)",
            "출국 후 재입국 금지 기간 적용 (1년~영구)",
          ],
          s3: "선샤인행정사사무소가 할 수 있는 일",
          p3: "선샤인행정사사무소는 강제퇴거명령을 받은 외국인을 위해 다음과 같이 지원합니다:",
          services: [
            "강제퇴거명령에 대한 이의신청 및 행정 소송 제기 검토",
            "보호 집행 정지 신청 지원",
            "재입국 금지 기간 단축 또는 해제 신청 지원",
            "귀국 후 재입국 방법 상담",
          ],
          cta: "지금 상담 예약",
          back: "처분 유형 목록으로",
          faqTitle: "자주 묻는 질문",
          faqs: [
            { q: "강제퇴거명령(강제추방)에 이의신청을 할 수 있나요?", a: "네. 강제퇴거명령서를 받은 날부터 7일 이내에 지방출입국·외국인관서의 장을 거쳐 법무부장관에게 이의신청서를 제출할 수 있고(제60조 제1항), 행정 법원에 취소 소송을 제기할 수도 있습니다. 소송 기간 중 집행 정지를 신청하면 퇴거를 일시 유예받을 수 있습니다." },
            { q: "보호(구금) 절차란 무엇인가요?", a: "강제퇴거명령 발부 후 당사자를 외국인보호소에 수용하는 절차입니다. 즉시 송환할 수 없는 경우 2개월의 범위에서 보호할 수 있고, 외국인보호위원회의 승인을 받아 매 3개월의 범위에서 연장할 수 있으며 총 보호기간은 9개월(법에 정한 예외는 20개월)을 넘을 수 없습니다(제63조). 보호 해제 신청 또는 보증금 납부로 일시 해제를 받을 수 있는 경우도 있습니다." },
            { q: "강제퇴거 집행을 유예받을 수 있나요?", a: "인도주의적 사유(중병, 영아 양육 등) 또는 행정 소송 진행 중인 경우 집행 유예가 인정되는 사례가 있습니다. 전문가 조력이 필수적입니다." },
            { q: "출국명령과 강제퇴거는 어떻게 다른가요? 재입국에도 영향이 있나요?", a: "출국명령은 강제퇴거 사유에 해당한다고 인정되지만 자기비용으로 자진 출국하려는 사람 등에게 출국기한을 정해 내리는 처분이고, 강제퇴거명령은 심사 결과 강제퇴거 사유에 해당한다고 인정될 때 내리는 처분입니다. 출국명령을 받고도 지정된 기한까지 출국하지 않으면 강제퇴거명령서가 발급되며, 강제퇴거명령에 대한 이의신청은 명령서를 받은 날부터 7일 이내에 해야 합니다. 강제퇴거명령을 받고 출국한 후 5년이 지나지 않은 사람은 법무부장관이 입국을 금지할 수 있는 대상으로 법에 규정되어 있고, 영주(F-5) 심사에서는 강제퇴거 후 출국 7년, 출국명령 후 출국 5년이 지나지 않으면 결격사유로 안내됩니다. 어떤 처분인지는 받으신 서류로 먼저 확인하고, 기한은 관할 출입국·외국인관서 안내를 따르세요." },
          ],
          notice: "※ 이 페이지는 일반적인 법령 정보 제공 목적이며 개별 사건에 대한 법률 조언이 아닙니다. 구체적인 상담은 선샤인행정사사무소에 문의하십시오.",
        },
        en: {
          tag: "Deportation Order",
          h1: "Forced Deportation Order (강제퇴거명령) — Process, Appeals & Re-entry Bans",
          lead: "A forced deportation order is one of the most severe administrative dispositions under Korea's Immigration Control Act. Once issued, detention is typically imposed, and execution results in a re-entry ban ranging from 1 year to permanent.",
          s1: "What Triggers a Forced Deportation Order?",
          p1: "Article 46 of the Immigration Control Act specifies grounds for forced deportation. The order is issued when the immigration authority determines that a person meets one or more of these grounds.",
          items1: [
            "Present in Korea without valid residency status",
            "Convicted of a prohibited act (drugs, sexual offenses, etc.)",
            "Deemed a threat to national security or public order",
            "Entry or residency obtained through false documents",
            "Failed to comply with a departure order",
          ],
          s2: "The Deportation Process",
          p2: "Once a forced deportation order is issued, the following process unfolds.",
          steps: [
            "Forced deportation order issued and notified to the person",
            "Detention (보호): placement in immigration detention facility",
            "Option to file an objection or administrative lawsuit",
            "Suspension of detention or execution (rare, requires compelling grounds)",
            "Execution of deportation (boarding aircraft and departure)",
            "Re-entry ban of 1 year to permanent applied after departure",
          ],
          s3: "How Sunshine Can Help",
          p3: "Our office provides the following support for those facing a forced deportation order:",
          services: [
            "Review of grounds for administrative appeal or litigation",
            "Application for suspension of detention",
            "Support for shortening or lifting the re-entry ban",
            "Consultation on lawful re-entry options after deportation",
          ],
          cta: "Book a Consultation",
          back: "Back to Dispositions",
          faqTitle: "Frequently Asked Questions",
          faqs: [
            { q: "Can I appeal a forced deportation order?", a: "Yes. You may submit an objection to the Minister of Justice, through the immigration office, within 7 days of receiving the deportation order (Article 60(1)), or file an administrative lawsuit for cancellation. Applying for suspension of execution during litigation can temporarily halt the deportation." },
            { q: "What is the detention (보호) process?", a: "After a deportation order is issued, the person is placed in an immigration detention facility (보호소). If immediate removal is not possible, detention may last up to 2 months; with approval of the Foreigner Detention Committee it can be extended by up to 3 months at a time, but the total may not exceed 9 months (20 months in the exceptions set by law) (Article 63). Release on bail or temporary release can sometimes be obtained." },
            { q: "Can deportation be suspended?", a: "In limited cases involving humanitarian grounds (serious illness, care of an infant, etc.) or pending administrative litigation, suspension of execution may be granted. Expert assistance is essential." },
            { q: "What is the difference between a departure order (exit order) and a deportation order in Korea?", a: "A departure order is issued, with an exit deadline, to a person who appears to fall under a deportation ground but wants to leave voluntarily at their own expense (among other cases), while a deportation order is issued when the immigration review finds that a deportation ground applies. If you do not leave by the deadline set in a departure order, a deportation order must be issued, and an objection to a deportation order must be filed within 7 days of receiving the order. A person who left after receiving a deportation order and has not yet passed 5 years is listed in the Immigration Act as someone the Minister of Justice may bar from entry, and in permanent-residence (F-5) screening the Ministry manual lists leaving under a deportation order within 7 years, or under a departure order within 5 years, as a disqualification. Check your own document to see which disposition you received, and confirm deadlines with the competent immigration office." },
          ],
          notice: "This page provides general legal information only and does not constitute legal advice. Contact our office for a specific consultation.",
        },
        ja: {
          tag: "強制退去命令",
          h1: "強制退去命令（強制送還） — 手続き・異議申立て・再入国禁止",
          lead: "強制退去命令は韓国の出入国管理法上、最も重い行政処分の一つです。命令発付後は保護（拘禁）措置が取られ、執行後は1年から永久の再入国禁止が課されます。",
          s1: "強制退去命令が発付される理由",
          p1: "出入国管理法第46条は強制退去対象者を規定しています。法務部が審査の結果、強制退去事由に該当すると判断した場合に命令書が発付されます。",
          items1: [
            "在留資格なしに国内に在留している場合",
            "禁止行為（薬物・性犯罪等）で有罪確定",
            "国家安保または公共秩序を脅かすと判断",
            "虚偽書類で入国または在留資格取得",
            "出国命令を受けて期限までに出国しない、または条件に違反した場合（第68条第4項）",
          ],
          s2: "強制退去執行手続き",
          p2: "強制退去命令が発付されると、以下の手続きで執行されます。",
          steps: [
            "強制退去命令書の発付・当事者への通知",
            "保護（拘禁）措置：外国人保護所への収容",
            "命令書を受け取った日から7日以内に法務部長官へ異議申立て（第60条第1項）または行政訴訟の提起",
            "執行猶予または保護解除の決定（稀なケース）",
            "強制退去の執行（航空便搭乗後出国）",
            "出国後の再入国禁止期間適用（1年〜永久）",
          ],
          s3: "サンシャインにできること",
          p3: "当事務所は強制退去命令を受けた外国人を以下のように支援します：",
          services: [
            "強制退去命令に対する異議申立・行政訴訟の検討",
            "保護執行停止申請の支援",
            "再入国禁止期間短縮・解除申請の支援",
            "帰国後の再入国方法についての相談",
          ],
          cta: "今すぐ相談予約",
          back: "処分の種類一覧へ",
          faqTitle: "よくある質問",
          faqs: [
            { q: "強制退去命令（強制送還）に異議申立てはできますか？", a: "はい。強制退去命令書を受け取った日から7日以内に、官署の長を経由して法務部長官に異議申立書を提出できます（第60条第1項）。行政裁判所への取消訴訟を提起することもできます。訴訟中に執行停止を申請すれば退去を一時猶予できる場合があります。" },
            { q: "保護（拘禁）手続きとはどういうものですか？", a: "強制退去命令後、外国人保護所に収容される手続きです。直ちに送還できない場合は2か月の範囲で保護でき、外国人保護委員会の承認を得て3か月ごとの範囲で延長できますが、総保護期間は9か月（法定の例外は20か月）を超えられません（第63条）。保釈金納付または一時解除を求めることも可能です。" },
            { q: "強制退去の執行を猶予してもらえますか？", a: "重病・乳幼児養育等の人道的事由や行政訴訟継続中の場合、執行猶予が認められる事例があります。専門家のサポートが不可欠です。" },
            { q: "韓国の出国命令と強制退去の違いは何ですか？", a: "出国命令は、強制退去事由に該当すると認められるものの自己負担で自主的に出国しようとする人などに対し、出国期限を定めて行う処分で、強制退去命令は審査の結果、強制退去事由に該当すると認められた場合に行う処分です。出国命令を受けても指定の期限までに出国しない場合は強制退去命令書が発給され、強制退去命令への異議申立ては命令書を受け取った日から7日以内に行う必要があります。強制退去命令を受けて出国した後5年が経過していない人は、法務部長官が入国を禁止できる対象として法に定められており、永住(F-5)の審査では、強制退去後の出国から7年、出国命令後の出国から5年が経過していない場合が欠格事由として案内されています。どの処分かは受け取った書類で確認し、期限は管轄の出入国在留管理官署の案内に従ってください。" },
          ],
          notice: "※ このページは一般的な法令情報の提供を目的としており、個別事案の法的助言ではありません。",
        },
        zh: {
          tag: "强制出境命令",
          h1: "强制出境命令（强制遣返） — 程序、申诉与再入境禁止",
          lead: "强制出境命令是韩国《出入境管理法》下最严厉的行政处分之一。命令发出后通常伴随保护（拘留）措施，执行后将适用1年至永久的再入境禁止。",
          s1: "强制出境命令的触发条件",
          p1: "《出入境管理法》第46条规定了强制出境对象。法务部经审查认定符合强制出境事由时，将发出命令书。",
          items1: [
            "无合法居留资格在韩停留",
            "因禁止行为（毒品·性犯罪等）获刑",
            "被认定威胁国家安全或公共秩序",
            "通过虚假文件入境或取得居留资格",
            "收到出境命令后未在期限内出境或违反条件（第68条第4款）",
          ],
          s2: "强制出境执行程序",
          p2: "强制出境命令发出后，将按以下程序执行。",
          steps: [
            "强制出境命令书发出并通知当事人",
            "保护（拘留）措施：送入外国人保护所",
            "自收到命令书之日起7日内向法务部长官提出异议（第60条第1款）或提起行政诉讼",
            "执行暂停或保护解除决定（罕见情形）",
            "强制出境执行（登机后出境）",
            "出境后适用再入境禁止期（1年至永久）",
          ],
          s3: "Sunshine能提供的帮助",
          p3: "本事务所为收到强制出境命令的外国人提供以下支持：",
          services: [
            "评估提起行政申诉或诉讼的可行性",
            "申请暂停保护执行",
            "申请缩短或解除再入境禁止的支持",
            "出境后合法再入境方式咨询",
          ],
          cta: "立即预约咨询",
          back: "返回处分类型",
          faqTitle: "常见问题",
          faqs: [
            { q: "可以对强制出境命令（强制遣返）提出申诉吗？", a: "是的。可自收到强制驱逐命令书之日起7日内，经官署长官向法务部长官提交异议申请书（第60条第1款），也可向行政法院提起撤销诉讼。诉讼期间申请执行停止可暂时阻止被驱逐出境。" },
            { q: "保护（拘留）程序是什么？", a: "强制出境命令发出后当事人被送入外国人保护所。无法立即遣返时可在2个月范围内保护，经外国人保护委员会批准可每次在3个月范围内延长，但总保护期不得超过9个月（法定例外为20个月）（第63条）。有时可通过缴纳保证金或申请临时解除获得释放。" },
            { q: "强制出境可以被暂停吗？", a: "在人道主义事由（重病·哺育婴儿等）或行政诉讼进行中等有限情形下，执行暂停可能获批。专业人士协助至关重要。" },
            { q: "韩国的出境命令和强制驱逐有什么区别？", a: "出境命令是对被认为属于强制驱逐事由、但愿意自费自行出境的人等，规定出境期限后作出的处分；强制驱逐命令则是审查后认定属于强制驱逐事由时作出的处分。收到出境命令后若未在指定期限内出境，将被发给强制驱逐命令书；对强制驱逐命令提出异议，须自收到命令书之日起7日内提出。被强制驱逐并出境后未满5年的人，属于法律规定法务部长官可以禁止入境的对象；在永住(F-5)审查中，被强制驱逐后出境未满7年、被出境命令后出境未满5年，也被列为欠格事由。具体属于哪种处分，请以所收文件为准，期限请向主管出入境·外国人机关确认。" },
          ],
          notice: "※ 本页面仅供一般法律信息参考，不构成针对个案的法律建议。",
        },
        vi: {
          tag: "Lệnh trục xuất cưỡng bức",
          h1: "Lệnh trục xuất cưỡng bức (강제퇴거명령) — Quy trình, Kháng cáo & Cấm tái nhập cảnh",
          lead: "Lệnh trục xuất cưỡng bức là một trong những quyết định hành chính nghiêm khắc nhất theo Luật Quản lý Xuất nhập cảnh Hàn Quốc. Sau khi ban hành, giam giữ thường được áp dụng, và sau khi thực thi dẫn đến cấm tái nhập cảnh từ 1 năm đến vĩnh viễn.",
          s1: "Điều gì kích hoạt lệnh trục xuất cưỡng bức?",
          p1: "Điều 46 Luật Quản lý Xuất nhập cảnh quy định căn cứ trục xuất cưỡng bức. Lệnh được ban hành khi cơ quan xuất nhập cảnh xác định một người đáp ứng một hoặc nhiều căn cứ này.",
          items1: [
            "Hiện diện tại Hàn Quốc mà không có tư cách lưu trú hợp lệ",
            "Bị kết án vì hành vi bị cấm (ma túy, tội phạm tình dục, v.v.)",
            "Bị xác định là mối đe dọa đối với an ninh quốc gia hoặc trật tự công cộng",
            "Nhập cảnh hoặc có được tư cách lưu trú thông qua tài liệu giả mạo",
            "Nhận lệnh xuất cảnh nhưng không rời đi trước thời hạn hoặc vi phạm điều kiện (Điều 68 khoản 4)",
          ],
          s2: "Quy trình trục xuất",
          p2: "Sau khi lệnh trục xuất cưỡng bức được ban hành, quy trình sau diễn ra.",
          steps: [
            "Lệnh trục xuất cưỡng bức được ban hành và thông báo cho người liên quan",
            "Giam giữ (보호): Đưa vào cơ sở giam giữ người nước ngoài",
            "Tùy chọn nộp đơn phản đối hoặc khởi kiện hành chính",
            "Đình chỉ giam giữ hoặc thực thi (hiếm, cần lý do thuyết phục)",
            "Thực thi trục xuất (lên máy bay và rời đi)",
            "Cấm tái nhập cảnh từ 1 năm đến vĩnh viễn sau khi xuất cảnh",
          ],
          s3: "Sunshine có thể hỗ trợ gì?",
          p3: "Văn phòng chúng tôi cung cấp hỗ trợ sau cho những người đối mặt với lệnh trục xuất cưỡng bức:",
          services: [
            "Xem xét căn cứ kháng cáo hành chính hoặc khởi kiện",
            "Nộp đơn đình chỉ giam giữ",
            "Hỗ trợ rút ngắn hoặc dỡ bỏ lệnh cấm tái nhập cảnh",
            "Tư vấn về các lựa chọn tái nhập cảnh hợp pháp sau khi bị trục xuất",
          ],
          cta: "Đặt lịch tư vấn ngay",
          back: "Quay lại các loại xử lý",
          faqTitle: "Câu hỏi thường gặp",
          faqs: [
            { q: "Tôi có thể kháng cáo lệnh trục xuất cưỡng bức không?", a: "Có. Bạn có thể nộp đơn khiếu nại lên Bộ trưởng Tư pháp (thông qua cơ quan xuất nhập cảnh) trong vòng 7 ngày kể từ ngày nhận lệnh trục xuất (Điều 60 khoản 1), hoặc khởi kiện hành chính để hủy bỏ. Nộp đơn đình chỉ thực thi trong quá trình kiện tụng có thể tạm dừng việc trục xuất." },
            { q: "Quy trình giam giữ (보호) là gì?", a: "Sau khi lệnh trục xuất được ban hành, người liên quan bị đưa vào cơ sở giam giữ người nước ngoài (보호소). Nếu không thể đưa về nước ngay, có thể bị giam giữ trong phạm vi 2 tháng; với sự chấp thuận của Ủy ban Giam giữ Người nước ngoài có thể gia hạn mỗi lần tối đa 3 tháng, nhưng tổng thời gian không quá 9 tháng (20 tháng trong các trường hợp ngoại lệ theo luật) (Điều 63). Đôi khi có thể được tại ngoại bảo lãnh hoặc tạm thời thả ra." },
            { q: "Có thể đình chỉ trục xuất (cưỡng chế xuất cảnh) không?", a: "Trong một số trường hợp có lý do nhân đạo (bệnh nặng, chăm sóc trẻ sơ sinh, v.v.) hoặc đang chờ kiện tụng hành chính, đình chỉ thực thi có thể được chấp thuận. Hỗ trợ từ chuyên gia là thiết yếu." },
          ],
          notice: "Trang này chỉ cung cấp thông tin pháp luật chung và không phải lời khuyên pháp lý. Liên hệ văn phòng chúng tôi để được tư vấn cụ thể.",
        },
      };
      const c = t[l] || t.ko;
      const ACCENT = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E9ECEF", bg: "#f8f9fb", warn: "#fff8e6", warnBorder: "#f59e0b" };
      return (
        <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: ACCENT.primary, marginBottom: 8 }}>{c.tag}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: ACCENT.navy, lineHeight: 1.25, marginBottom: 18 }}>{c.h1}</h1>
            <p style={{ fontSize: 17, color: ACCENT.muted, lineHeight: 1.75, marginBottom: 36, borderBottom: `1px solid ${ACCENT.border}`, paddingBottom: 32 }}>{c.lead}</p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s1}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p1}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>
              {c.items1.map((item, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{item}</li>)}
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s2}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p2}</p>
            <ol style={{ paddingLeft: 22, marginBottom: 32 }}>
              {c.steps.map((step, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{step}</li>)}
            </ol>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s3}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p3}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>
              {c.services.map((svc, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{svc}</li>)}
            </ul>

            <div style={{ background: ACCENT.primary, color: "#fff", borderRadius: 10, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 18, marginBottom: 40 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>선샤인행정사사무소</div>
                <div style={{ opacity: 0.9, fontSize: 15 }}>서울 중구 퇴계로 324, 3층 · +82-2-363-2251</div>
              </div>
              <a href={`/${locale}/contact`} style={{ background: "#fff", color: ACCENT.primary, padding: "11px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" as const }}>{c.cta}</a>
            </div>

            {/* FAQPage — 화면에 그리는 같은 c.faqs 배열에서 생성(1:1, I3b 2026-10-03) */}
            {c.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(c.faqs)) }} />}
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 18 }}>{c.faqTitle}</h2>
            {c.faqs.map((faq, i) => (
              <div key={i} style={{ borderTop: `1px solid ${ACCENT.border}`, padding: "18px 0" }}>
                <div style={{ fontWeight: 600, color: ACCENT.navy, marginBottom: 8, fontSize: 15 }}>{faq.q}</div>
                <div style={{ color: ACCENT.muted, lineHeight: 1.7, fontSize: 14 }}>{faq.a}</div>
              </div>
            ))}

            <div style={{ marginTop: 40, background: ACCENT.warn, border: `1px solid ${ACCENT.warnBorder}`, borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{c.notice}</div>

            <div style={{ marginTop: 32 }}>
              <a href={`/${locale}/dispositions`} style={{ color: ACCENT.primary, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>← {c.back}</a>
            </div>
          </div>
        </main>
      );
    },
  },

  "entry-ban": {
    meta: {
      ko: { title: "입국금지(입국규제) — 기간·사유·해제 신청 · Law in Korea", description: "한국 입국금지(입국금지) 처분의 기간 유형, 발부 사유, 해제 신청 방법, 가족에 대한 영향을 선샤인행정사사무소가 안내합니다." },
      en: { title: "Entry Ban (입국금지) in Korea — Duration, Grounds & How to Lift It · Law in Korea", description: "Understand Korea's entry ban system: ban duration categories, grounds for entry ban, how to apply to lift an entry ban, and whether family members are affected." },
      ja: { title: "入国禁止（입국금지）— 期間・事由・解除申請 · Law in Korea", description: "韓国の入国禁止処分の期間、発付事由、解除申請の方法、家族への影響について解説します。" },
      zh: { title: "韩国入境禁止期限与解除申请 — 无限期禁止入境怎么办 · Law in Korea", description: "了解韩国入境禁止处分的期限类型、发出事由、申请解除方法及对家属的影响。" },
      vi: { title: "Lệnh cấm nhập cảnh (입국금지) tại Hàn Quốc · Law in Korea", description: "Tìm hiểu hệ thống cấm nhập cảnh của Hàn Quốc: thời hạn, căn cứ cấm, cách xin dỡ bỏ lệnh cấm và liệu thành viên gia đình có bị ảnh hưởng không." },
    },
    render: (l, locale) => {
      const t = {
        ko: {
          tag: "입국금지",
          h1: "입국금지 — 기간 유형, 발부 사유, 해제 신청",
          lead: "입국금지(입국규제)는 법무부가 외국인의 대한민국 입국을 금지하는 행정 처분입니다. 강제퇴거 집행 후 자동 부과되는 경우와, 비자 심사 단계에서 독립적으로 적용되는 경우 모두 있습니다.",
          s1: "입국금지의 기간 및 사유",
          p1: "출입국관리법 제11조는 입국금지 대상을 열거합니다. 금지 기간은 위반 유형 및 심각성에 따라 달라집니다.",
          items1: [
            "단기(1~3년): 체류기간 초과, 단순 위반 후 자진 출국",
            "중기(3~5년): 불법취업, 중범죄 경력 등",
            "장기(5~10년): 마약·성범죄·폭력 조직 관련",
            "영구 금지: 국가 안보 위협, 심각한 반복 위반",
            "법 제11조 규정 사유: 정신질환자, 마약 중독자, 테러 관련자 등",
          ],
          s2: "입국금지 확인 및 해제 절차",
          p2: "입국금지 여부를 확인하고 해제를 신청하는 절차는 다음과 같습니다.",
          steps: [
            "입국금지 여부 확인: 재외공관(대사관·영사관) 또는 출입국 당국에 문의",
            "입국금지 해제 신청서 작성 및 소명 자료 준비",
            "재외공관 또는 출입국·외국인청에 신청서 제출",
            "법무부 심사 (통상 수주~수개월 소요)",
            "해제 결정 또는 기각 통보",
          ],
          s3: "선샤인행정사사무소가 할 수 있는 일",
          p3: "선샤인행정사사무소는 입국금지 해제를 원하는 외국인을 위해 다음과 같이 지원합니다:",
          services: [
            "입국금지 여부 및 금지 기간 확인 지원",
            "해제 신청을 위한 소명 자료 작성 및 번역",
            "재외공관·출입국 당국 제출 서류 준비 및 대리 신청",
            "해제 신청 기각 후 재신청 전략 수립",
          ],
          cta: "지금 상담 예약",
          back: "처분 유형 목록으로",
          faqTitle: "자주 묻는 질문",
          faqs: [
            { q: "입국금지(입국규제)를 조기에 해제받을 수 있나요?", a: "가능합니다. 인도주의적 사유(가족 방문, 치료 등), 장기간 금지 이후 사유 소멸, 소명 자료 충분 등의 경우 해제 신청이 인용될 수 있습니다. 다만 사안별 심사이므로 전문가 조력이 중요합니다." },
            { q: "내가 입국금지 명단에 있는지 어떻게 알 수 있나요?", a: "본인 확인은 재외공관(대사관·영사관)에 비자 신청을 시도하는 방법이 가장 일반적입니다. 국내에서는 출입국·외국인청에 문의할 수 있습니다." },
            { q: "입국금지가 가족 비자에도 영향을 주나요?", a: "입국금지는 원칙적으로 해당 개인에게만 적용됩니다. 다만 입국금지된 배우자의 가족 초청 자격이 제한될 수 있으며, 동반 가족의 체류 자격에 간접적 영향이 있을 수 있습니다." },
          ],
          notice: "※ 이 페이지는 일반적인 법령 정보 제공 목적이며 개별 사건에 대한 법률 조언이 아닙니다. 구체적인 상담은 선샤인행정사사무소에 문의하십시오.",
        },
        en: {
          tag: "Entry Ban",
          h1: "Entry Ban (입국금지) — Duration, Grounds & How to Lift It",
          lead: "An entry ban (입국금지) is an administrative measure prohibiting a foreign national from entering Korea. It may be automatically imposed after forced deportation, or independently applied at the visa screening stage based on grounds in the Immigration Control Act.",
          s1: "Entry Ban Duration and Grounds",
          p1: "Article 11 of the Immigration Control Act lists the grounds for entry ban. The ban duration depends on the type and severity of the violation.",
          items1: [
            "Short-term (1–3 years): Overstay, minor violations with voluntary departure",
            "Mid-term (3–5 years): Unauthorized employment, moderate criminal history",
            "Long-term (5–10 years): Drug offenses, sexual crimes, gang-related offenses",
            "Permanent ban: National security threat, serious repeated violations",
            "Statutory grounds (Art. 11): Mental illness, drug addiction, terrorism-related, etc.",
          ],
          s2: "Checking and Lifting an Entry Ban",
          p2: "The process for checking entry ban status and applying to lift it is as follows.",
          steps: [
            "Check entry ban status: Inquiry to Korean embassy/consulate or immigration authority",
            "Prepare entry ban lifting application and supporting documents",
            "Submit application to embassy/consulate or Immigration Office",
            "Ministry of Justice review (typically several weeks to months)",
            "Notification of approval or rejection",
          ],
          s3: "How Sunshine Can Help",
          p3: "Our office provides the following support for those seeking to lift an entry ban:",
          services: [
            "Checking entry ban status and ban duration",
            "Preparation and translation of supporting documents for the lifting application",
            "Document preparation and representation for embassy/immigration submissions",
            "Strategy for reapplication after rejection",
          ],
          cta: "Book a Consultation",
          back: "Back to Dispositions",
          faqTitle: "Frequently Asked Questions",
          faqs: [
            { q: "Can an entry ban (entry restriction) be lifted early?", a: "Yes. Applications may succeed on humanitarian grounds (family visit, medical treatment), after significant time has passed, or when supporting evidence is strong. Each case is individually reviewed — expert assistance is important." },
            { q: "How do I know if I am on the entry ban list?", a: "The most common way is to apply for a visa at a Korean embassy or consulate. Within Korea, you may contact your local Immigration Office to inquire." },
            { q: "Does an entry ban affect my family members' visas?", a: "An entry ban applies to the individual. However, a banned person may lose the ability to sponsor family visas, and this may indirectly affect accompanying family members' residency status." },
          ],
          notice: "This page provides general legal information only and does not constitute legal advice. Contact our office for a specific consultation.",
        },
        ja: {
          tag: "入国禁止",
          h1: "入国禁止（入国規制） — 期間・事由・解除申請",
          lead: "入国禁止（입국금지）は、法務部が外国人の韓国入国を禁止する行政処分です。強制退去執行後に自動的に付される場合と、ビザ審査段階で独立して適用される場合の両方があります。",
          s1: "入国禁止の期間と事由",
          p1: "出入国管理法第11条は入国禁止対象を列挙しています。禁止期間は違反の種類と深刻さによって異なります。",
          items1: [
            "短期（1〜3年）：在留期間超過、軽微な違反後の自進出国",
            "中期（3〜5年）：不法就労、中程度の犯罪歴等",
            "長期（5〜10年）：薬物・性犯罪・暴力団関連",
            "永久禁止：国家安保脅威、深刻な繰り返し違反",
            "法第11条規定事由：精神障害、麻薬中毒者、テロ関連者等",
          ],
          s2: "入国禁止確認・解除手続き",
          p2: "入国禁止の確認および解除申請の手続きは以下の通りです。",
          steps: [
            "入国禁止確認：在外公館（大使館・領事館）または出入国当局への照会",
            "入国禁止解除申請書の作成・疎明資料の準備",
            "在外公館または出入国・外国人庁への申請書提出",
            "法務部審査（通常数週間〜数か月）",
            "解除決定または棄却通知",
          ],
          s3: "サンシャインにできること",
          p3: "当事務所は入国禁止の解除を希望する外国人を以下のように支援します：",
          services: [
            "入国禁止の有無・期間の確認支援",
            "解除申請のための疎明資料作成・翻訳",
            "在外公館・出入国当局への提出書類準備・代理申請",
            "解除申請棄却後の再申請戦略の立案",
          ],
          cta: "今すぐ相談予約",
          back: "処分の種類一覧へ",
          faqTitle: "よくある質問",
          faqs: [
            { q: "入国禁止（入国規制）を早期に解除してもらえますか？", a: "可能です。人道的事由（家族訪問・治療等）、長期禁止後の事由消滅、十分な疎明資料がある場合に解除申請が認容されることがあります。事案ごとの審査となるため専門家の助けが重要です。" },
            { q: "自分が入国禁止リストにあるかどうか確認する方法は？", a: "在外公館（大使館・領事館）へのビザ申請が最も一般的な確認方法です。国内では出入国・外国人庁に照会することができます。" },
            { q: "入国禁止は家族のビザにも影響しますか？", a: "入国禁止は原則として本人にのみ適用されます。ただし入国禁止者が家族の初請資格を失う可能性があり、同伴家族の在留資格に間接的な影響が出る場合もあります。" },
          ],
          notice: "※ このページは一般的な法令情報の提供を目的としており、個別事案の法的助言ではありません。",
        },
        zh: {
          tag: "入境禁止",
          h1: "入境禁止（入境限制） — 期限、事由与解除申请",
          lead: "入境禁止（입국금지）是法务部禁止外国人入境韩国的行政处分。可能在强制出境执行后自动附加，也可能在签证审查阶段基于《出入境管理法》独立适用。",
          s1: "入境禁止的期限及事由",
          p1: "《出入境管理法》第11条列举了入境禁止对象。禁止期限因违规类型及严重程度而异。",
          items1: [
            "短期（1–3年）：超期滞留、轻微违规后自愿出境",
            "中期（3–5年）：非法就业、中等犯罪记录等",
            "长期（5–10年）：毒品·性犯罪·有组织犯罪相关",
            "永久禁止：威胁国家安全、严重反复违规",
            "法第11条规定事由：精神疾病、吸毒成瘾者、恐怖主义相关等",
          ],
          s2: "入境禁止确认及解除程序",
          p2: "确认入境禁止状态及申请解除的程序如下。",
          steps: [
            "确认入境禁止：向韩国大使馆/领事馆或出入境当局查询",
            "准备入境禁止解除申请书及说明材料",
            "向大使馆/领事馆或出入境·外国人厅提交申请",
            "法务部审查（通常需数周至数月）",
            "通知解除决定或驳回结果",
          ],
          s3: "Sunshine能提供的帮助",
          p3: "本事务所为寻求解除入境禁止的外国人提供以下支持：",
          services: [
            "确认入境禁止状态及禁止期限",
            "准备及翻译解除申请所需说明材料",
            "准备向大使馆/出入境当局提交的文件并代理申请",
            "申请被驳回后的再申请策略制定",
          ],
          cta: "立即预约咨询",
          back: "返回处分类型",
          faqTitle: "常见问题",
          faqs: [
            { q: "可以提前解除入境禁止（入境限制）吗？", a: "可以。在人道主义理由（探亲·就医等）、经过较长时间后事由消灭或证明材料充分的情况下，解除申请可能获批。每案单独审查，专业人士协助十分重要。" },
            { q: "如何知道自己是否在入境禁止名单上？", a: "最常见的方式是向韩国大使馆/领事馆申请签证时确认。在韩境内可向出入境·外国人厅查询。" },
            { q: "入境禁止会影响家属签证吗？", a: "入境禁止原则上仅适用于本人。但被禁止者可能失去家庭邀请资格，这可能对随行家属的居留资格产生间接影响。" },
          ],
          notice: "※ 本页面仅供一般法律信息参考，不构成针对个案的法律建议。",
        },
        vi: {
          tag: "Cấm nhập cảnh",
          h1: "Lệnh cấm nhập cảnh (입국금지) — Thời hạn, Căn cứ & Cách dỡ bỏ",
          lead: "Lệnh cấm nhập cảnh (입국금지) là biện pháp hành chính cấm người nước ngoài nhập cảnh vào Hàn Quốc. Nó có thể được áp dụng tự động sau khi trục xuất cưỡng bức, hoặc được áp dụng độc lập ở giai đoạn xem xét visa dựa trên căn cứ trong Luật Quản lý Xuất nhập cảnh.",
          s1: "Thời hạn và căn cứ cấm nhập cảnh",
          p1: "Điều 11 Luật Quản lý Xuất nhập cảnh liệt kê các căn cứ cấm nhập cảnh. Thời hạn cấm phụ thuộc vào loại và mức độ vi phạm.",
          items1: [
            "Ngắn hạn (1–3 năm): Ở quá hạn, vi phạm nhỏ với tự nguyện xuất cảnh",
            "Trung hạn (3–5 năm): Làm việc trái phép, có tiền án phạm tội vừa",
            "Dài hạn (5–10 năm): Tội phạm ma túy, tội phạm tình dục, liên quan băng đảng",
            "Cấm vĩnh viễn: Đe dọa an ninh quốc gia, vi phạm nghiêm trọng lặp đi lặp lại",
            "Căn cứ pháp lý (Điều 11): Bệnh tâm thần, nghiện ma túy, liên quan khủng bố, v.v.",
          ],
          s2: "Kiểm tra và dỡ bỏ lệnh cấm nhập cảnh",
          p2: "Quy trình kiểm tra tình trạng cấm nhập cảnh và nộp đơn xin dỡ bỏ như sau.",
          steps: [
            "Kiểm tra tình trạng cấm nhập cảnh: Hỏi tại đại sứ quán/lãnh sự quán Hàn Quốc hoặc cơ quan xuất nhập cảnh",
            "Chuẩn bị đơn xin dỡ bỏ cấm nhập cảnh và tài liệu hỗ trợ",
            "Nộp đơn tại đại sứ quán/lãnh sự quán hoặc Cơ quan Xuất nhập cảnh",
            "Bộ Tư pháp xem xét (thường mất vài tuần đến vài tháng)",
            "Thông báo chấp thuận hoặc từ chối",
          ],
          s3: "Sunshine có thể hỗ trợ gì?",
          p3: "Văn phòng chúng tôi cung cấp hỗ trợ sau cho những người muốn dỡ bỏ lệnh cấm nhập cảnh:",
          services: [
            "Kiểm tra tình trạng và thời hạn cấm nhập cảnh",
            "Chuẩn bị và dịch tài liệu hỗ trợ cho đơn xin dỡ bỏ",
            "Chuẩn bị tài liệu và đại diện nộp cho đại sứ quán/cơ quan xuất nhập cảnh",
            "Chiến lược tái nộp đơn sau khi bị từ chối",
          ],
          cta: "Đặt lịch tư vấn ngay",
          back: "Quay lại các loại xử lý",
          faqTitle: "Câu hỏi thường gặp",
          faqs: [
            { q: "Lệnh cấm nhập cảnh (hạn chế nhập cảnh) có thể được dỡ bỏ sớm không?", a: "Có. Đơn có thể thành công vì lý do nhân đạo (thăm gia đình, điều trị y tế), sau khi đã trải qua thời gian đáng kể, hoặc khi bằng chứng hỗ trợ đủ mạnh. Mỗi trường hợp được xem xét riêng — hỗ trợ từ chuyên gia rất quan trọng." },
            { q: "Làm thế nào để biết tôi có trong danh sách cấm nhập cảnh không?", a: "Cách phổ biến nhất là nộp đơn xin visa tại đại sứ quán hoặc lãnh sự quán Hàn Quốc. Trong Hàn Quốc, bạn có thể liên hệ Cơ quan Xuất nhập cảnh địa phương để hỏi." },
            { q: "Lệnh cấm nhập cảnh có ảnh hưởng đến visa của thành viên gia đình không?", a: "Lệnh cấm nhập cảnh áp dụng cho cá nhân. Tuy nhiên, người bị cấm có thể mất khả năng bảo lãnh visa gia đình, điều này có thể ảnh hưởng gián tiếp đến tư cách lưu trú của thành viên gia đình đi kèm." },
          ],
          notice: "Trang này chỉ cung cấp thông tin pháp luật chung và không phải lời khuyên pháp lý. Liên hệ văn phòng chúng tôi để được tư vấn cụ thể.",
        },
      };
      const c = t[l] || t.ko;
      const ACCENT = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E9ECEF", bg: "#f8f9fb", warn: "#fff8e6", warnBorder: "#f59e0b" };
      return (
        <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: ACCENT.primary, marginBottom: 8 }}>{c.tag}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: ACCENT.navy, lineHeight: 1.25, marginBottom: 18 }}>{c.h1}</h1>
            <p style={{ fontSize: 17, color: ACCENT.muted, lineHeight: 1.75, marginBottom: 36, borderBottom: `1px solid ${ACCENT.border}`, paddingBottom: 32 }}>{c.lead}</p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s1}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p1}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>
              {c.items1.map((item, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{item}</li>)}
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s2}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p2}</p>
            <ol style={{ paddingLeft: 22, marginBottom: 32 }}>
              {c.steps.map((step, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{step}</li>)}
            </ol>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s3}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p3}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>
              {c.services.map((svc, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{svc}</li>)}
            </ul>

            <div style={{ background: ACCENT.primary, color: "#fff", borderRadius: 10, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 18, marginBottom: 40 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>선샤인행정사사무소</div>
                <div style={{ opacity: 0.9, fontSize: 15 }}>서울 중구 퇴계로 324, 3층 · +82-2-363-2251</div>
              </div>
              <a href={`/${locale}/contact`} style={{ background: "#fff", color: ACCENT.primary, padding: "11px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" as const }}>{c.cta}</a>
            </div>

            {/* FAQPage — 화면에 그리는 같은 c.faqs 배열에서 생성(1:1, I3b 2026-10-03) */}
            {c.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(c.faqs)) }} />}
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 18 }}>{c.faqTitle}</h2>
            {c.faqs.map((faq, i) => (
              <div key={i} style={{ borderTop: `1px solid ${ACCENT.border}`, padding: "18px 0" }}>
                <div style={{ fontWeight: 600, color: ACCENT.navy, marginBottom: 8, fontSize: 15 }}>{faq.q}</div>
                <div style={{ color: ACCENT.muted, lineHeight: 1.7, fontSize: 14 }}>{faq.a}</div>
              </div>
            ))}

            <div style={{ marginTop: 40, background: ACCENT.warn, border: `1px solid ${ACCENT.warnBorder}`, borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{c.notice}</div>

            <div style={{ marginTop: 32 }}>
              <a href={`/${locale}/dispositions`} style={{ color: ACCENT.primary, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>← {c.back}</a>
            </div>
          </div>
        </main>
      );
    },
  },

  "visa-denial": {
    meta: {
      ko: { title: "사증발급거부 — 사유·이의신청·재신청 전략 · Law in Korea", description: "한국 비자 거부(사증발급거부) 사유, 이의신청 방법, 재신청 전략, 향후 비자 심사에 미치는 영향을 선샤인행정사사무소가 안내합니다." },
      en: { title: "Visa Denial (사증발급거부) in Korea — Grounds, Appeals & Reapplication · Law in Korea", description: "Understand why Korean visas get denied, how to appeal or reapply, and how denial history affects future applications — Sunshine Administrative Agency Office explains." },
      ja: { title: "査証発給拒否（사증발급거부）— 事由・異議申立て・再申請 · Law in Korea", description: "韓国ビザの拒否事由、異議申立て方法、再申請戦略、将来の審査への影響について解説します。" },
      zh: { title: "签证发放拒绝（사증발급거부）— 事由·申诉·再申请 · Law in Korea", description: "了解韩国签证被拒的常见原因、申诉方法、再申请策略及对未来申请的影响。" },
      vi: { title: "Từ chối cấp thị thực (사증발급거부) tại Hàn Quốc · Law in Korea", description: "Tìm hiểu lý do visa Hàn Quốc bị từ chối, cách kháng cáo hoặc tái nộp đơn, và lịch sử bị từ chối ảnh hưởng như thế nào đến đơn tương lai." },
    },
    render: (l, locale) => {
      const t = {
        ko: {
          tag: "사증발급거부",
          h1: "사증발급거부 — 거부 사유, 이의신청, 재신청 전략",
          lead: "비자 신청이 거부되면 그 사유를 정확히 파악하고 이의신청 또는 재신청 전략을 수립하는 것이 중요합니다. 거부 이력 자체가 향후 비자 심사에 영향을 줄 수 있습니다.",
          s1: "비자 거부의 주요 사유",
          p1: "사증발급거부는 재외공관(대사관·영사관) 또는 출입국 당국이 신청 요건을 충족하지 못했다고 판단할 때 이루어집니다.",
          items1: [
            "범죄 전과: 마약·성범죄·폭행 등 전과 이력",
            "위조 서류 제출: 이전 신청 또는 현재 신청의 허위 서류",
            "입국금지 이력: 재입국 금지 중이거나 금지 해제 미완료",
            "재정 능력 부족: 체류비 충당 능력 미충족",
            "체류 목적 불명확 또는 허위 진술",
            "이전 불법 체류·불법취업 이력",
          ],
          s2: "거부 후 대응 절차",
          p2: "비자가 거부된 경우 다음 절차를 검토하세요.",
          steps: [
            "거부 통지서 수령 및 거부 사유 확인",
            "이의신청 가능 여부 및 기한 확인 (비자 유형별 상이)",
            "이의신청서 및 소명 자료 준비",
            "재외공관 또는 법무부에 이의신청 또는 재신청",
            "심사 결과 대기 (통상 수주~수개월 소요)",
          ],
          s3: "선샤인행정사사무소가 할 수 있는 일",
          p3: "선샤인행정사사무소는 비자 거부에 대응하는 외국인을 위해 다음 서비스를 제공합니다:",
          services: [
            "비자 거부 사유 분석 및 대응 전략 수립",
            "이의신청서 작성 및 소명 자료 번역 지원",
            "재신청 전 서류 보완 및 전략적 준비",
            "입국금지·전과 이력이 있는 경우 복합 대응 지원",
          ],
          cta: "지금 상담 예약",
          back: "처분 유형 목록으로",
          faqTitle: "자주 묻는 질문",
          faqs: [
            { q: "비자 거부에 이의신청을 할 수 있나요?", a: "비자 유형과 거부 사유에 따라 이의신청이 가능한 경우가 있습니다. 다만 재외공관의 재량 심사이므로 이의신청 인용률은 높지 않으며, 충분한 소명 자료 준비가 관건입니다." },
            { q: "거부 후 얼마나 기다렸다가 재신청해야 하나요?", a: "거부 사유가 해소된 경우 즉시 재신청이 가능합니다. 그러나 같은 사유로 반복 거부될 경우 심사에서 불리하게 작용할 수 있으므로, 전문가와 전략을 수립한 후 재신청하는 것이 중요합니다." },
            { q: "비자 거부 이력이 향후 신청에 계속 남나요?", a: "거부 이력은 기록에 남으며 향후 비자 심사에서 참고됩니다. 다만 거부 사유가 해소되었음을 충분히 소명하면 불이익을 최소화할 수 있습니다." },
          ],
          notice: "※ 이 페이지는 일반적인 법령 정보 제공 목적이며 개별 사건에 대한 법률 조언이 아닙니다. 구체적인 상담은 선샤인행정사사무소에 문의하십시오.",
        },
        en: {
          tag: "Visa Denial",
          h1: "Visa Denial (사증발급거부) — Grounds, Appeals & Reapplication",
          lead: "When a Korean visa application is denied, understanding the exact reason and developing an appeal or reapplication strategy is critical. A denial history can itself affect future applications.",
          s1: "Common Grounds for Visa Denial",
          p1: "A visa denial (사증발급거부) occurs when the Korean embassy/consulate or immigration authority determines that the applicant does not meet the requirements.",
          items1: [
            "Criminal record: Drug offenses, sexual crimes, assault, etc.",
            "False documents: Forged or misleading documents in the current or prior applications",
            "Entry ban: Subject to an active or recently lifted entry ban",
            "Insufficient finances: Unable to demonstrate ability to fund the stay",
            "Unclear or false statement of purpose",
            "History of prior overstay or unauthorized employment",
          ],
          s2: "Steps After a Denial",
          p2: "If your visa is denied, consider the following steps.",
          steps: [
            "Receive denial notice and identify the reason for denial",
            "Check whether an appeal is possible and the applicable deadline",
            "Prepare an objection letter and supporting documents",
            "File an appeal or reapplication with the embassy or Ministry of Justice",
            "Await decision (typically several weeks to months)",
          ],
          s3: "How Sunshine Can Help",
          p3: "Our office provides the following support for those dealing with a visa denial:",
          services: [
            "Analysis of denial grounds and strategy development",
            "Writing the appeal letter and supporting document translation",
            "Pre-reapplication document strengthening and strategic preparation",
            "Complex case support for applicants with entry ban or criminal history",
          ],
          cta: "Book a Consultation",
          back: "Back to Dispositions",
          faqTitle: "Frequently Asked Questions",
          faqs: [
            { q: "Can I appeal a visa denial?", a: "Appeals are possible in some cases depending on visa type and grounds. Embassy decisions involve significant discretion, and success rates are not high, so thorough preparation of supporting evidence is essential." },
            { q: "How long should I wait before reapplying after a denial?", a: "If the grounds for denial have been resolved, reapplication is possible immediately. However, repeated denials on the same grounds can work against you — develop a strategy with an expert before reapplying." },
            { q: "Does a visa denial remain on my record permanently?", a: "Denial history is recorded and referenced in future screenings. However, thoroughly demonstrating that the grounds for denial have been resolved can minimize any disadvantage." },
          ],
          notice: "This page provides general legal information only and does not constitute legal advice. Contact our office for a specific consultation.",
        },
        ja: {
          tag: "査証発給拒否",
          h1: "査証発給拒否 — 拒否事由・異議申立て・再申請戦略",
          lead: "韓国ビザ申請が拒否された場合、正確な拒否事由を把握し、異議申立てまたは再申請戦略を立てることが重要です。拒否歴自体が将来のビザ審査に影響する場合があります。",
          s1: "ビザ拒否の主な事由",
          p1: "査証発給拒否は、在外公館（大使館・領事館）または出入国当局が申請要件を満たしていないと判断した場合に行われます。",
          items1: [
            "犯罪前科：薬物・性犯罪・暴行等の前科歴",
            "虚偽書類の提出：過去または現在の申請での偽造書類",
            "入国禁止歴：現在も入国禁止中または禁止解除未完了",
            "資力不足：滞在費充当能力の不足",
            "滞在目的の不明確または虚偽陳述",
            "過去の不法在留・不法就労歴",
          ],
          s2: "拒否後の対応手続き",
          p2: "ビザが拒否された場合、以下の手続きを検討してください。",
          steps: [
            "拒否通知書の受領・拒否事由の確認",
            "異議申立ての可否・期限確認（ビザ種別により異なる）",
            "異議申立書・疎明資料の準備",
            "在外公館または法務部への異議申立てまたは再申請",
            "審査結果を待つ（通常数週間〜数か月）",
          ],
          s3: "サンシャインにできること",
          p3: "当事務所はビザ拒否に対応する外国人を以下のように支援します：",
          services: [
            "ビザ拒否事由の分析と対応戦略の立案",
            "異議申立書の作成・疎明資料の翻訳支援",
            "再申請前の書類補完・戦略的準備",
            "入国禁止・前科歴がある場合の複合的対応支援",
          ],
          cta: "今すぐ相談予約",
          back: "処分の種類一覧へ",
          faqTitle: "よくある質問",
          faqs: [
            { q: "ビザ拒否に異議申立てはできますか？", a: "ビザ種別と拒否事由によっては異議申立てが可能な場合があります。ただし在外公館の裁量審査であるため認容率は高くなく、十分な疎明資料の準備が重要です。" },
            { q: "拒否後、どのくらい待ってから再申請すればよいですか？", a: "拒否事由が解消された場合は即座に再申請可能です。ただし同じ事由で繰り返し拒否されると不利に働くため、専門家と戦略を立てた上で再申請することが重要です。" },
            { q: "ビザ拒否歴は将来の申請に残りますか？", a: "拒否歴は記録に残り、将来のビザ審査で参照されます。ただし拒否事由が解消されたことを十分に疎明すれば不利益を最小化できます。" },
          ],
          notice: "※ このページは一般的な法令情報の提供を目的としており、個別事案の法的助言ではありません。",
        },
        zh: {
          tag: "签证发放拒绝",
          h1: "签证发放拒绝 — 拒绝事由、申诉与再申请策略",
          lead: "韩国签证申请被拒后，准确了解拒绝原因并制定申诉或再申请策略至关重要。拒绝记录本身也可能影响未来的签证审查。",
          s1: "签证被拒的主要原因",
          p1: "签证发放拒绝（사증발급거부）发生于韩国大使馆/领事馆或出入境当局认定申请人不符合要求时。",
          items1: [
            "犯罪记录：毒品·性犯罪·暴行等前科",
            "虚假文件：过去或当前申请中的伪造文件",
            "入境禁止记录：仍在禁止期或解除未完成",
            "资金不足：无法证明足够的在韩生活资金",
            "停留目的不明或虚假陈述",
            "曾有非法滞留·非法就业记录",
          ],
          s2: "拒绝后的应对程序",
          p2: "签证被拒后，请考虑以下步骤。",
          steps: [
            "收到拒绝通知并确认拒绝原因",
            "确认是否可以申诉及截止期限（因签证类型而异）",
            "准备异议申请书及说明材料",
            "向大使馆/领事馆或法务部提起申诉或再申请",
            "等待审查结果（通常需数周至数月）",
          ],
          s3: "Sunshine能提供的帮助",
          p3: "本事务所为应对签证拒绝的外国人提供以下服务：",
          services: [
            "分析拒绝原因并制定应对策略",
            "撰写异议申请书及翻译说明材料",
            "再申请前的材料补充和战略性准备",
            "有入境禁止·犯罪记录者的综合应对支持",
          ],
          cta: "立即预约咨询",
          back: "返回处分类型",
          faqTitle: "常见问题",
          faqs: [
            { q: "签证被拒可以申诉吗？", a: "根据签证类型和拒绝原因，部分情况下可以申诉。但大使馆决定有较大裁量空间，成功率不高，充分准备说明材料是关键。" },
            { q: "被拒后需要等多久再申请？", a: "若拒绝原因已消除，可立即再申请。但同一原因反复被拒会带来不利影响，建议与专业人士制定策略后再申请。" },
            { q: "签证拒绝记录会永久保留吗？", a: "拒绝记录会被保留并在未来签证审查中被参考。但充分证明拒绝原因已消除，可将不利影响降至最低。" },
          ],
          notice: "※ 本页面仅供一般法律信息参考，不构成针对个案的法律建议。",
        },
        vi: {
          tag: "Từ chối cấp thị thực",
          h1: "Từ chối cấp thị thực (사증발급거부) — Căn cứ, Kháng cáo & Tái nộp đơn",
          lead: "Khi đơn xin visa Hàn Quốc bị từ chối, việc hiểu chính xác lý do và phát triển chiến lược kháng cáo hoặc tái nộp đơn là rất quan trọng. Lịch sử bị từ chối có thể ảnh hưởng đến các đơn tương lai.",
          s1: "Các căn cứ phổ biến dẫn đến từ chối visa",
          p1: "Từ chối cấp thị thực (사증발급거부) xảy ra khi đại sứ quán/lãnh sự quán Hàn Quốc hoặc cơ quan xuất nhập cảnh xác định người nộp đơn không đáp ứng yêu cầu.",
          items1: [
            "Tiền án: Tội phạm ma túy, tội phạm tình dục, tấn công, v.v.",
            "Tài liệu giả mạo: Tài liệu giả mạo hoặc gây hiểu nhầm trong đơn hiện tại hoặc trước đây",
            "Lệnh cấm nhập cảnh: Đang chịu lệnh cấm nhập cảnh còn hiệu lực hoặc chưa được dỡ bỏ hoàn toàn",
            "Tài chính không đủ: Không thể chứng minh khả năng trang trải chi phí lưu trú",
            "Mục đích lưu trú không rõ ràng hoặc khai báo gian dối",
            "Lịch sử ở quá hạn hoặc làm việc trái phép trước đây",
          ],
          s2: "Các bước sau khi bị từ chối",
          p2: "Nếu visa của bạn bị từ chối, hãy cân nhắc các bước sau.",
          steps: [
            "Nhận thông báo từ chối và xác định lý do từ chối",
            "Kiểm tra liệu kháng cáo có khả thi và thời hạn áp dụng",
            "Chuẩn bị thư phản đối và tài liệu hỗ trợ",
            "Nộp kháng cáo hoặc tái nộp đơn tại đại sứ quán hoặc Bộ Tư pháp",
            "Chờ quyết định (thường mất vài tuần đến vài tháng)",
          ],
          s3: "Sunshine có thể hỗ trợ gì?",
          p3: "Văn phòng chúng tôi cung cấp hỗ trợ sau cho những người đang đối phó với từ chối visa:",
          services: [
            "Phân tích căn cứ từ chối và xây dựng chiến lược",
            "Viết thư kháng cáo và dịch tài liệu hỗ trợ",
            "Tăng cường tài liệu và chuẩn bị chiến lược trước khi tái nộp đơn",
            "Hỗ trợ trường hợp phức tạp cho người có lệnh cấm nhập cảnh hoặc tiền án",
          ],
          cta: "Đặt lịch tư vấn ngay",
          back: "Quay lại các loại xử lý",
          faqTitle: "Câu hỏi thường gặp",
          faqs: [
            { q: "Tôi có thể kháng cáo từ chối visa không?", a: "Kháng cáo có thể trong một số trường hợp tùy theo loại visa và căn cứ từ chối. Quyết định của đại sứ quán có nhiều quyền tùy ý, tỷ lệ thành công không cao nên chuẩn bị bằng chứng hỗ trợ kỹ lưỡng là điều cần thiết." },
            { q: "Tôi nên chờ bao lâu trước khi tái nộp đơn sau khi bị từ chối?", a: "Nếu căn cứ từ chối đã được giải quyết, tái nộp đơn ngay là có thể. Tuy nhiên, bị từ chối nhiều lần vì cùng lý do có thể gây bất lợi — hãy xây dựng chiến lược với chuyên gia trước khi tái nộp đơn." },
            { q: "Lịch sử từ chối visa có ở lại trong hồ sơ của tôi vĩnh viễn không?", a: "Lịch sử từ chối được ghi lại và tham chiếu trong các lần xem xét sau. Tuy nhiên, chứng minh đầy đủ rằng căn cứ từ chối đã được giải quyết có thể giảm thiểu bất kỳ bất lợi nào." },
          ],
          notice: "Trang này chỉ cung cấp thông tin pháp luật chung và không phải lời khuyên pháp lý. Liên hệ văn phòng chúng tôi để được tư vấn cụ thể.",
        },
      };
      const c = t[l] || t.ko;
      const ACCENT = { navy: "#001F3F", primary: "#0056B3", muted: "#475569", border: "#E9ECEF", bg: "#f8f9fb", warn: "#fff8e6", warnBorder: "#f59e0b" };
      return (
        <main style={{ background: ACCENT.bg, minHeight: "100vh" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: ACCENT.primary, marginBottom: 8 }}>{c.tag}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: ACCENT.navy, lineHeight: 1.25, marginBottom: 18 }}>{c.h1}</h1>
            <p style={{ fontSize: 17, color: ACCENT.muted, lineHeight: 1.75, marginBottom: 36, borderBottom: `1px solid ${ACCENT.border}`, paddingBottom: 32 }}>{c.lead}</p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s1}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p1}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>
              {c.items1.map((item, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{item}</li>)}
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s2}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p2}</p>
            <ol style={{ paddingLeft: 22, marginBottom: 32 }}>
              {c.steps.map((step, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{step}</li>)}
            </ol>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 14 }}>{c.s3}</h2>
            <p style={{ color: ACCENT.muted, lineHeight: 1.75, marginBottom: 14 }}>{c.p3}</p>
            <ul style={{ paddingLeft: 22, marginBottom: 32 }}>
              {c.services.map((svc, i) => <li key={i} style={{ color: ACCENT.muted, marginBottom: 8, lineHeight: 1.65 }}>{svc}</li>)}
            </ul>

            <div style={{ background: ACCENT.primary, color: "#fff", borderRadius: 10, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 18, marginBottom: 40 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>선샤인행정사사무소</div>
                <div style={{ opacity: 0.9, fontSize: 15 }}>서울 중구 퇴계로 324, 3층 · +82-2-363-2251</div>
              </div>
              <a href={`/${locale}/contact`} style={{ background: "#fff", color: ACCENT.primary, padding: "11px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" as const }}>{c.cta}</a>
            </div>

            {/* FAQPage — 화면에 그리는 같은 c.faqs 배열에서 생성(1:1, I3b 2026-10-03) */}
            {c.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(c.faqs)) }} />}
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT.navy, marginBottom: 18 }}>{c.faqTitle}</h2>
            {c.faqs.map((faq, i) => (
              <div key={i} style={{ borderTop: `1px solid ${ACCENT.border}`, padding: "18px 0" }}>
                <div style={{ fontWeight: 600, color: ACCENT.navy, marginBottom: 8, fontSize: 15 }}>{faq.q}</div>
                <div style={{ color: ACCENT.muted, lineHeight: 1.7, fontSize: 14 }}>{faq.a}</div>
              </div>
            ))}

            <div style={{ marginTop: 40, background: ACCENT.warn, border: `1px solid ${ACCENT.warnBorder}`, borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{c.notice}</div>

            <div style={{ marginTop: 32 }}>
              <a href={`/${locale}/dispositions`} style={{ color: ACCENT.primary, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>← {c.back}</a>
            </div>
          </div>
        </main>
      );
    },
  },
};

// '준비 중' 안내만 있는 슬러그 — 200 으로 두되 noindex, 메뉴·본문 링크에서는 내린다(LAW-V1 P0-4).
// 이 목록과 SLUG_CONTENT 에 없는 /dispositions/* 는 전부 404 다(예전에는 '준비 중' 소프트 404 였다).
const COMING_SOON_SLUGS: readonly string[] = ["detention"];

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = [...Object.keys(SLUG_CONTENT), ...COMING_SOON_SLUGS];
  return VALID_LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = VALID_LOCALES.includes(locale as L) ? (locale as L) : "ko";
  const content = SLUG_CONTENT[slug];
  if (content) {
    const m = content.meta[l];
    return { title: brandTitle(m.title), description: m.description, alternates: alternatesFor(l, `/dispositions/${slug}`) };
  }
  if (!COMING_SOON_SLUGS.includes(slug)) return {};
  return {
    title: brandTitle(LABELS[l].title + " · 선샤인행정사사무소"),
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!VALID_LOCALES.includes(locale as L)) notFound();
  const l = locale as L;

  const content = SLUG_CONTENT[slug];
  if (content) {
    const rendered = content.render(l, locale);
    if (!HUB_POSTS[slug]) return <>{rendered}</>;
    return (
      <>
        {appendToMain(
          rendered,
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 64px" }}>
            <HubBlogLinks hub={slug} locale={l} />
          </div>
        )}
      </>
    );
  }

  if (!COMING_SOON_SLUGS.includes(slug)) notFound();
  const c = LABELS[l];
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 24 }}>🔧</div>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>{c.title}</h1>
      <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>{c.msg}</p>
      <a href={`/${l}/dispositions`} style={{ display: "inline-block", background: "#1e4a8a", color: "#fff", padding: "12px 28px", borderRadius: 6, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{c.back}</a>
    </main>
  );
}
