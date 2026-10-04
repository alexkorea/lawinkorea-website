import { permanentRedirect } from "next/navigation";

export const metadata = {
  title: "사례 · Cases",
  description: "음주운전·형사사건·마약·불법취업·보이스피싱 등 외국인 출입국사범심사 8가지 대응 영역.",
};

export default function CasesPage() {
  // 로케일 없는 레거시 경로. 예전에는 홈 앵커(/#cases)로 보냈으나 그 앵커는 더 이상 없고
  // /<locale>/cases 전용 페이지가 생겨서, 리다이렉트 체인 없이 최종 200 URL 로 바로 보낸다.
  permanentRedirect("/ko/cases");
}
