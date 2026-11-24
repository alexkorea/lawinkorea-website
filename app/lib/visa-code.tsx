// CODEWRAP-1124(lawinkorea): f4visa F4WRAP-1124 lib/visa-code.tsx 이식.
// F4WRAP-1124: 체류자격 코드(F-4·F-4-42·H-2·F-5-6R 등)가 하이픈 뒤에서 줄이 갈라지지 않게
// 코드만 <span class="vc">(white-space:nowrap, globals.css)으로 감싼다. 글자는 하나도 바꾸지 않는다
// (U+2011 치환 금지 — 검색엔진·복사 텍스트가 달라진다). title·meta·JSON-LD 는 이 함수를 거치지 않는다.
// 사이트가 word-break:keep-all 이라 '동반(F-3)'처럼 한글에 붙은 코드는 하이픈 뒤가 유일한 줄바꿈 자리가 된다.
import { Children, Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react"

// 앞뒤가 영숫자·하이픈이 아닌 [A-H]-숫자(-숫자)(R) — 한글 조사(F-4는)는 경계로 친다.
export const VISA_CODE_RE = /(?<![A-Za-z0-9-])[A-H]-\d{1,2}(?:-\d{1,2})?(?:-?R)?(?![A-Za-z0-9-])/g

const SKIP_TAGS = new Set(["script", "style", "title", "textarea", "option", "svg", "code", "pre"])

/** 문자열 → 코드만 span 으로 감싼 노드. 코드가 없으면 문자열을 그대로 돌려준다. */
export function vc(text: string): ReactNode {
  VISA_CODE_RE.lastIndex = 0
  if (!VISA_CODE_RE.test(text)) return text
  VISA_CODE_RE.lastIndex = 0
  const parts: ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = VISA_CODE_RE.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push(
      <span key={k++} className="vc">
        {m[0]}
      </span>,
    )
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  // 바깥 .vcw(인라인, 스타일 없음)로 글자 덩어리를 하나로 묶는다. 부모가 flex·grid 면 예전 글자 한 덩어리(익명 flex 아이템)가
  // 글자·스팬 여러 아이템으로 쪼개져 gap 이 끼고 배치가 깨진다(F4WRAP-1124 1차 배포 5d69a66d 회귀 — 메뉴·브레드크럼).
  return <span className="vcw">{parts.map((p, i) => (typeof p === "string" ? <Fragment key={`t${i}`}>{p}</Fragment> : p))}</span>
}

/** React 트리의 글자 자식만 바꾼다(속성 alt·title·aria-label·href 는 그대로). 컴포넌트 요소는 children 만 내려간다. */
export function wrapCodes(node: ReactNode): ReactNode {
  if (typeof node === "string") return vc(node)
  if (Array.isArray(node)) return Children.map(node, (c) => wrapCodes(c as ReactNode))
  if (!isValidElement(node)) return node
  const el = node as ReactElement<{ children?: ReactNode; className?: string; dangerouslySetInnerHTML?: unknown }>
  const p = el.props
  if (typeof el.type === "string") {
    if (SKIP_TAGS.has(el.type)) return el
    if (el.type === "span" && (p.className === "vc" || p.className === "vcw")) return el
  }
  if (p.dangerouslySetInnerHTML || p.children === undefined || p.children === null) return el
  if (typeof p.children === "function") return el
  return cloneElement(el, undefined, wrapCodes(p.children))
}

/** 서버·클라이언트 어디서나 쓰는 감싸개. <CodeWrap>…</CodeWrap> */
export function CodeWrap({ children }: { children?: ReactNode }) {
  return <>{wrapCodes(children)}</>
}

/** HTML 문자열(블로그 본문) — 태그 밖 글자만 바꾼다. script·style·code·pre·title·textarea 안은 그대로. */
export function wrapCodesHtml(html: string): string {
  let skip: string | null = null
  return html.replace(/(<[^>]*>)|([^<]+)/g, (all, tag: string | undefined, text: string | undefined) => {
    if (tag) {
      const m = /^<(\/?)([a-zA-Z][a-zA-Z0-9-]*)/.exec(tag)
      if (m) {
        const name = m[2].toLowerCase()
        if (!m[1] && SKIP_TAGS.has(name) && !tag.endsWith("/>")) skip = skip ?? name
        else if (m[1] && skip === name) skip = null
      }
      return tag
    }
    if (skip || !text) return all
    VISA_CODE_RE.lastIndex = 0
    if (!VISA_CODE_RE.test(text)) return text
    VISA_CODE_RE.lastIndex = 0
    return `<span class="vcw">${text.replace(VISA_CODE_RE, (c) => `<span class="vc">${c}</span>`)}</span>`
  })
}

/** 페이지 기본 내보내기 감싸개 — 페이지가 그린 트리(페이지 파일 안 JSX 글자)를 wrapCodes 에 통과시킨다.
 *  서버 컴포넌트 페이지만(훅 없음). 페이지 안의 <Header/> 같은 컴포넌트는 각자 CodeWrap 을 쓴다. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function codeWrapPage<P>(Page: (props: P) => ReactNode | Promise<ReactNode>) {
  return async function CodeWrappedPage(props: P) {
    return wrapCodes(await Page(props))
  }
}

/** CODEWRAP-1124(lawinkorea): 공통 컴포넌트 감싸개 — 컴포넌트가 그린 트리를 wrapCodes 에 통과시킨다.
 *  동기 컴포넌트만(서버·클라이언트 모두). 훅은 안쪽 함수가 같은 순서로 부르므로 그대로 동작한다. */
export function withCodeWrap<P>(Comp: (props: P) => ReactNode) {
  function CodeWrapped(props: P) {
    return wrapCodes(Comp(props))
  }
  return CodeWrapped
}
