import { redirect } from "next/navigation";

export const metadata = {
  title: "절차 · Process",
  description: "VISION 행정사사무소의 5단계 사범심사 대응 절차.",
};

export default function ProcessPage() {
  redirect("/#process");
}
