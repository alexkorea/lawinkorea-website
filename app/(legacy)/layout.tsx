import HtmlShell from "../components/HtmlShell";

// 로케일 없는 레거시 경로(/, /blog, /cases, /process) — 전부 /ko 로 보내는 한국어 판이다.
export default function LegacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <HtmlShell lang="ko">{children}</HtmlShell>;
}
