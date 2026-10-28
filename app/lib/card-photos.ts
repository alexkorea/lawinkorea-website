// EYE1027-FIX(맥7 2026-10-28) — 홈 '주요 업무 분야' 13장·/ko/offenses 사건 유형 9장 카드 사진.
// Pexels 무료 사진, 원본에서 16:9 크롭 후 480·960 webp(업스케일 없음). 22장 모두 서로 다른 사진이고
// 사이트 기존 이미지(og 포함)·investkorea 사진과 dHash 대조해 겹치지 않는다(~/work/eye1027-fix/law/out/_check.json).
// 같은 주제라도 홈과 /ko/offenses 는 다른 사진을 쓴다 — 한 장을 두 곳에 돌려쓰지 말 것.
export type CardPhoto = { file: string; alt: string };

export const HOME_CARD_PHOTOS: Record<string, CardPhoto> = {
  "/ko/offenses/dui": { file: "dui-breathalyzer-31154441", alt: "경찰관이 운전자에게 음주 측정을 하는 모습" },
  "/ko/offenses/assault": { file: "assault-dispute-7640479", alt: "두 사람이 언성을 높여 다투는 모습" },
  "/ko/offenses/drugs": { file: "drugs-pills-syringe-9941494", alt: "알약과 주사기, 말아 둔 지폐" },
  "/ko/offenses/sexual-offense": { file: "sexual-offense-stop-10545016", alt: "손바닥을 들어 거부 의사를 표시하는 여성" },
  "/ko/offenses/property-crime": { file: "property-cash-grab-35221827", alt: "책상 위 지폐를 움켜쥐는 손" },
  "/ko/offenses/voice-phishing": { file: "voice-phishing-alert-7821766", alt: "휴대전화에 뜬 금융 사기 의심 문자" },
  "/ko/offenses/unauthorized-employment": { file: "employment-site-5667685", alt: "공사 현장에서 일하는 작업자들" },
  "/ko/offenses/overstay": { file: "overstay-calendar-9810172", alt: "날짜에 핀을 꽂고 기한을 표시한 달력" },
  "/ko/offenses/false-documents": { file: "false-doc-signature-48148", alt: "서류에 서명하는 손" },
  "/ko/dispositions/departure-order": { file: "departure-board-12717154", alt: "공항 출발 안내판 앞의 여행객들" },
  "/ko/dispositions/deportation-order": { file: "deportation-airport-19901515", alt: "공항 활주로를 걷는 제복 차림 요원들" },
  "/ko/dispositions/visa-denial": { file: "visa-denial-no-4271935", alt: "종이 조각으로 쓴 NO 글자" },
  "/ko/dispositions/entry-ban": { file: "entry-ban-locked-gate-951409", alt: "쇠사슬로 잠긴 출입문과 통행 금지 표지" },
};

export const OFFENSES_CARD_PHOTOS: Record<string, CardPhoto> = {
  "/ko/offenses/dui": { file: "dui-checkpoint-18421307", alt: "야간 음주운전 단속 현장" },
  "/ko/offenses/assault": { file: "assault-fist-2258250", alt: "움켜쥔 주먹" },
  "/ko/offenses/drugs": { file: "drugs-syringe-4541337", alt: "주사기와 알약, 흰 가루" },
  "/ko/offenses/sexual-offense": { file: "sexual-offense-hand-5853491", alt: "손을 내밀어 막는 여성" },
  "/ko/offenses/property-crime": { file: "property-handcuffs-6266301", alt: "수갑을 찬 손에 쥔 지폐 뭉치" },
  "/ko/offenses/voice-phishing": { file: "voice-phishing-call-7544758", alt: "걱정스러운 표정으로 전화를 받는 노인" },
  "/ko/offenses/unauthorized-employment": { file: "employment-warehouse-4483556", alt: "물류창고 지게차 옆의 작업자들" },
  "/ko/offenses/overstay": { file: "overstay-date-mark-11773871", alt: "달력 날짜에 동그라미를 치는 손" },
  "/ko/offenses/false-documents": { file: "false-doc-signing-30268251", alt: "책상에서 서류에 서명하는 사람" },
};

// EYE1027-FIX-2(맥7 2026-10-28) — 외국어 홈(en/ja/zh/vi) '주요 업무' 카드는 ko 홈과 같은 사진을 쓴다(같은 페이지의 다른 언어판은 동일 사진 허용).
// 대체 텍스트만 로캘별. 키는 HOME_CARD_PHOTOS 와 같은 /ko/... 경로.
export const HOME_CARD_ALT: Record<"en" | "ja" | "zh" | "vi", Record<string, string>> = {
  en: {
    "/ko/offenses/dui": "A police officer giving a driver a breathalyzer test",
    "/ko/offenses/assault": "Two people arguing with raised voices",
    "/ko/offenses/drugs": "Pills, a syringe and a rolled-up banknote",
    "/ko/offenses/sexual-offense": "A woman raising her palm to say no",
    "/ko/offenses/property-crime": "A hand grabbing banknotes on a desk",
    "/ko/offenses/voice-phishing": "A suspected financial scam message on a mobile phone",
    "/ko/offenses/unauthorized-employment": "Workers on a construction site",
    "/ko/offenses/overstay": "A calendar with a pin marking a deadline",
    "/ko/offenses/false-documents": "A hand signing a document",
    "/ko/dispositions/departure-order": "Travelers in front of an airport departures board",
    "/ko/dispositions/deportation-order": "Uniformed officers walking on an airport tarmac",
    "/ko/dispositions/entry-ban": "A gate locked with a chain and a no-entry sign",
  },
  ja: {
    "/ko/offenses/dui": "警察官が運転者に飲酒検査を行う様子",
    "/ko/offenses/assault": "二人が声を荒げて言い争う様子",
    "/ko/offenses/drugs": "錠剤と注射器、丸めた紙幣",
    "/ko/offenses/sexual-offense": "手のひらを上げて拒否の意思を示す女性",
    "/ko/offenses/property-crime": "机の上の紙幣をつかむ手",
    "/ko/offenses/voice-phishing": "携帯電話に表示された金融詐欺の疑いがあるメッセージ",
    "/ko/offenses/unauthorized-employment": "工事現場で働く作業員たち",
    "/ko/offenses/overstay": "日付にピンを刺して期限を示したカレンダー",
    "/ko/offenses/false-documents": "書類に署名する手",
    "/ko/dispositions/departure-order": "空港の出発案内板の前にいる旅行者たち",
    "/ko/dispositions/deportation-order": "空港の滑走路を歩く制服姿の職員たち",
    "/ko/dispositions/entry-ban": "鎖で施錠された門と通行禁止の標識",
  },
  zh: {
    "/ko/offenses/dui": "警察对驾驶人进行酒精检测",
    "/ko/offenses/assault": "两人大声争吵",
    "/ko/offenses/drugs": "药片、注射器和卷起的纸币",
    "/ko/offenses/sexual-offense": "举起手掌表示拒绝的女性",
    "/ko/offenses/property-crime": "抓起桌上纸币的手",
    "/ko/offenses/voice-phishing": "手机上显示的疑似金融诈骗短信",
    "/ko/offenses/unauthorized-employment": "在施工现场工作的工人",
    "/ko/offenses/overstay": "用图钉标出期限的日历",
    "/ko/offenses/false-documents": "在文件上签名的手",
    "/ko/dispositions/departure-order": "机场出发显示屏前的旅客",
    "/ko/dispositions/deportation-order": "在机场跑道上行走的制服人员",
    "/ko/dispositions/entry-ban": "用铁链锁住的大门和禁止通行标志",
  },
  vi: {
    "/ko/offenses/dui": "Cảnh sát kiểm tra nồng độ cồn của người lái xe",
    "/ko/offenses/assault": "Hai người lớn tiếng cãi nhau",
    "/ko/offenses/drugs": "Thuốc viên, ống tiêm và tờ tiền cuộn",
    "/ko/offenses/sexual-offense": "Người phụ nữ giơ lòng bàn tay thể hiện sự từ chối",
    "/ko/offenses/property-crime": "Bàn tay chộp lấy tiền trên bàn",
    "/ko/offenses/voice-phishing": "Tin nhắn nghi lừa đảo tài chính trên điện thoại",
    "/ko/offenses/unauthorized-employment": "Công nhân làm việc tại công trường",
    "/ko/offenses/overstay": "Tờ lịch có ghim đánh dấu hạn chót",
    "/ko/offenses/false-documents": "Bàn tay ký vào giấy tờ",
    "/ko/dispositions/departure-order": "Hành khách trước bảng giờ khởi hành ở sân bay",
    "/ko/dispositions/deportation-order": "Nhân viên mặc đồng phục đi trên đường băng sân bay",
    "/ko/dispositions/entry-ban": "Cổng khóa bằng xích và biển cấm đi qua",
  },
};
