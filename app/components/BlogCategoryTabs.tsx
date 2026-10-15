"use client";

import Link from "next/link";
import { useState } from "react";
import { ACCENT } from "../lib/constants";

// 블로그 목록 분류 탭(QA1014-FIX L6, 맥7 2026-10-15) — 카드의 분류 글씨를 '전체/분류별' 필터로 쓴다.
// 서버 HTML 은 '전체'(모든 글)로 그려지므로 크롤러가 보는 목록·링크는 그대로다. 탭은 새 URL 을 만들지 않는다.

export type BlogCard = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  cover: string;
  coverAlt: string;
};

const ALL_LABEL: Record<string, string> = { ko: "전체", en: "All", zh: "全部", ja: "すべて", vi: "Tất cả" };

// 분류 원문은 "벌칙·벌금 · Penalties" 처럼 '언어 표기 · 영문 키' 형식이 섞여 있다(zh 는 같은 키에 표기가 둘).
// 영문 키로 묶고, 화면 이름은 그 묶음에서 가장 많이 쓰인 언어 표기. 화면 이름이 같은 묶음은 하나로 합친다.
// 예외: "PILLAR · 사범심사 가이드" 처럼 앞이 대문자 표식이면 뒤쪽이 이름이다.
function tabOf(category: string) {
  const i = category.lastIndexOf(" · ");
  if (i < 0) return { key: category, label: category };
  const head = category.slice(0, i), tail = category.slice(i + 3);
  if (/^[A-Z]+$/.test(head)) return { key: tail, label: tail };
  return { key: tail, label: head };
}

function buildTabs(posts: BlogCard[]) {
  const byKey = new Map<string, Map<string, number>>();
  for (const p of posts) {
    const { key, label } = tabOf(p.category);
    const m = byKey.get(key) ?? new Map<string, number>();
    m.set(label, (m.get(label) ?? 0) + 1);
    byKey.set(key, m);
  }
  const keyToLabel = new Map<string, string>();
  for (const [key, m] of byKey) keyToLabel.set(key, [...m.entries()].sort((a, b) => b[1] - a[1])[0][0]);
  const counts = new Map<string, number>();
  for (const p of posts) {
    const label = keyToLabel.get(tabOf(p.category).key)!;
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  const tabs = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([label, n]) => ({ label, n }));
  return { tabs, labelOf: (p: BlogCard) => keyToLabel.get(tabOf(p.category).key)! };
}

export default function BlogCategoryTabs({ locale, posts }: { locale: string; posts: BlogCard[] }) {
  const [active, setActive] = useState<string | null>(null);
  const { tabs, labelOf } = buildTabs(posts);
  const shown = active === null ? posts : posts.filter((p) => labelOf(p) === active);

  const tabStyle = (on: boolean) => ({
    border: `1px solid ${on ? ACCENT.primary : ACCENT.border}`,
    background: on ? ACCENT.primary : "#fff",
    color: on ? "#fff" : ACCENT.navy,
    borderRadius: 999,
    padding: "8px 14px",
    minHeight: 36,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
  });

  return (
    <>
      <div role="group" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
        <button type="button" aria-pressed={active === null} onClick={() => setActive(null)} style={tabStyle(active === null)}>
          {ALL_LABEL[locale] ?? ALL_LABEL.en} <span style={{ opacity: 0.75, fontWeight: 500 }}>{posts.length}</span>
        </button>
        {tabs.map((t) => (
          <button key={t.label} type="button" aria-pressed={active === t.label} onClick={() => setActive(t.label)} style={tabStyle(active === t.label)}>
            {t.label} <span style={{ opacity: 0.75, fontWeight: 500 }}>{t.n}</span>
          </button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 24,
        }}
      >
        {shown.map((p) => (
          <Link
            key={p.slug}
            href={`/${locale}/blog/${p.slug}`}
            style={{
              background: "#fff",
              border: `1px solid ${ACCENT.border}`,
              borderRadius: 8,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* 목록 카드 썸네일 = og:image 와 같은 파일(THUMBNAIL_STANDARD 1장 카드 렌더) */}
            <img
              src={p.cover.replace(/\.png(\?|$)/, "-card.png$1")}
              alt={p.coverAlt || p.title}
              width={800}
              height={450}
              loading="lazy"
              style={{ width: "100%", height: "auto", display: "block", aspectRatio: "16 / 9", objectFit: "cover" }}
            />
            <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: ACCENT.primary,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {p.category}
            </div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: ACCENT.navy,
                margin: 0,
                lineHeight: 1.35,
              }}
            >
              {p.title}
            </h2>
            <p style={{ fontSize: 14, color: ACCENT.textMute, lineHeight: 1.6, margin: 0, flex: 1 }}>
              {p.description}
            </p>
            <div
              style={{
                fontSize: 12,
                color: ACCENT.textMuteSoft,
                fontFamily: "var(--font-mono)",
                paddingTop: 12,
                borderTop: `1px solid ${ACCENT.border}`,
              }}
            >
              {p.date}
            </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
