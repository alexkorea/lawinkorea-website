import { redirect } from "next/navigation";

export const metadata = {
  title: "사례 · Cases",
  description: "음주운전·형사사건·마약·불법취업·보이스피싱 등 외국인 출입국사범심사 8가지 대응 영역.",
};

export default function CasesPage() {
  redirect("/#cases");
}
