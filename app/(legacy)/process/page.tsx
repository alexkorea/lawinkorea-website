import { permanentRedirect } from "next/navigation";

export const metadata = {
  title: "절차 · Process",
  description: "선샤인행정사사무소의 5단계 사범심사 대응 절차.",
};

export default function ProcessPage() {
  // 로케일 없는 레거시 경로. /#process 앵커는 더 이상 없으므로 최종 200 URL 로 바로 보낸다.
  permanentRedirect("/ko/process");
}
