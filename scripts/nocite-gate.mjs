#!/usr/bin/env node
// NOCITE gate (보스 msg 3373·3377, 2026-10-17): 화면 텍스트·JSON-LD 에 "근거·확인일" 류 표시가 0건이어야 한다.
// + 보스 msg 3382·3386 (같은 날 영구): "1인 사무소" 류 사무소 규모 축소 표현, 작성 과정 메타문장("…기준으로/근거로 정리했습니다", "추측은 넣지 않았습니다"), "사회적 약자" 지칭 0건.
// 쓰임: node nocite-gate.mjs <dir|file ...>            빌드 산출물(.html/.htm/.rsc/.txt/.json/.body) 검사
//       node nocite-gate.mjs --urls <urls.txt> [--out x.json]   라이브 URL 검사(동시 12)
//       --allow <file>  예외 문구(한 줄 1개, 해당 문장이 포함된 매치만 면제)
// rc: 0 = 0건, 1 = 위반, 2 = 사용법/수집 오류
import fs from 'node:fs'; import path from 'node:path';

export const PATTERNS = [
  ['공식근거', /공식\s*근거/],
  ['근거·확인', /근거\s*[·・\/]\s*확인/],
  ['확인일:', /(최종\s*)?확인\s*일\s*[:：]|확인일\s*20\d\d|최종\s*(검토|확인)\s*일/],
  ['원문확인', /원문\s*(확인|대조|기준으로\s*작성)|현행\s*조문\s*(대조|과\s*대조|과\s*비교)/],
  ['국가법령정보센터', /국가\s*법령\s*정보\s*센터/],
  ['law.go.kr', /law\.go\.kr/i],
  ['KLIC-en', /(Korea|National)\s+Law\s+Information\s+Cent(er|re)/i],
  ['KLIC-zh/ja', /国家法令信息中心|國家法令信息中心|国家法令情報センター|法令信息中心|法令情報センター/],
  ['시행일괄호', /[(（]\s*(법|시행령|시행규칙|민법)?\s*20\d\d\s*[.\-]\s*\d{1,2}\s*[.\-]\s*\d{1,2}\.?\s*시행|시행\s*20\d\d\s*[.\-]\s*\d|（\s*20\d\d[.\d\s]*施行\s*）|\(\s*20\d\d[.\d\s]*施行\s*\)|\((in force|effective)\s+(from|as of|since)?\s*\w*\s*20\d\d/i],
  ['근거 법령 헤더', /^\s*(근거\s*법령|근거\s*법조문|법적\s*근거|공식\s*근거|관련\s*법령|참고\s*법령|근거)\s*(보기)?\s*[:：]?\s*$/m],
  ['근거:', /(^|[\s.。)])(근거|근거\s*법령|근거\s*법조문|관련\s*법령|참고\s*법령|출처|참고\s*자료|참고\s*기관\s*및\s*법령)\s*[:：]/m],
  ['근거 조문은', /근거\s*조문은\s*다음과\s*같습니다/],
  ['Legal basis', /legal\s+basis\s*[:：(（]|^\s*(legal\s+basis|official\s+basis|official\s+sources?|sources?|references?)\s*[:：]?\s*$|official\s+basis|\b(sources?|references)\s*:/im],
  ['Last verified', /last\s+(verified|checked|reviewed)|verified\s+on\b|checked\s+on\s+\w+\s+\d|as\s+verified/i],
  ['zh', /依据\s*[:：]|依據\s*[:：]|法律依据\s*[（(:：]|^\s*法律依[据據]\s*$|官方依据|核实日期|核實日期|核对原文|核對原文|来源\s*[:：]|出处\s*[:：]/m],
  ['ja', /確認日|原文確認|根拠法令\s*[（(:：]|^\s*(根拠法令|法的根拠|公式根拠)\s*$|根拠\s*[:：]|出典\s*[:：]|公式根拠/m],
  ['vi', /căn cứ pháp lý\s*[:：(]|^\s*căn cứ pháp lý\s*$|cơ sở pháp lý\s*[:：(]|ngày (xác minh|kiểm tra)|căn cứ\s*[:：]|nguồn\s*[:：]/imu],
  ['th', /ฐานทางกฎหมาย\s*[:：(]|^\s*ฐานทางกฎหมาย\s*$|วันที่ตรวจสอบ|แหล่งที่มา\s*[:：]/m],
  ['ru/mn/etc', /правов(ая|ое)\s+основ\w*\s*[:：(]|дата\s+проверки|хууль\s+зүйн\s+үндэслэл\s*[:：]|dasar\s+hukum\s*[:：]|base\s+legal\s*[:：]/i],
  // 보스 msg 3382·3386 (2026-10-17 영구): 사무소 규모 축소 표현·작성 과정 메타문장·'사회적 약자' 지칭 금지
  ['1인사무소', /1인\s*(행정사\s*)?사무소|1인\s*행정사|행정사\s*1인이\s*운영|혼자\s*운영하는\s*(행정사\s*)?사무소|one-person\s+(office|firm|practice)|solo\s+(practitioner|practice)|sole\s+practitioner|一人事务所|一人事務所|個人事務所|văn phòng một người/i],
  ['사회적약자', /사회적\s*약자|socially\s+(vulnerable|disadvantaged)|社会弱者|社会的弱者|弱势群体/i],
  ['메타:정리', /(매뉴얼|법령|조문|원문|시행령|시행규칙|고시|지침|규정|(?<![방편문수요용불])법)[」』\s]*(\([^)\n]{0,20}\))?[」』\s]*(의\s*)?(내용|에\s*적힌\s*내용|에\s*나온\s*내용)?\s*(을|를|만)?\s*(기준으로|근거로|바탕으로|토대로|만으로|으로|로)\s*(다시\s*|새로\s*)?(정리|작성|요약)(했|합|한\s*(글|것|내용))|에\s*적힌\s*내용만으로|(조문|법령|원문|매뉴얼|법\s*조문)\s*(순서)?\s*대로\s*(다시\s*)?[^.\n]{0,20}정리(했|합)|이\s*글(은|에서는|에서)[^.\n]{0,200}(근거로|바탕으로|토대로|만으로)\s*(정리|작성)|(기준표|공식\s*자료|공식\s*안내|통계)(를|을)\s*(근거로|바탕으로|기준으로)\s*(정리|작성)|(매뉴얼|법령|조문|원문|(?<![방편문수요용불])법)\s*(조문|원문)?\s*(기준으로|으로|로|을\s*바탕으로|를\s*바탕으로|을\s*근거로|를\s*근거로)\s[^.\n]{0,80}(을|를)\s*정리(했|합)/],
  ['메타:넣지않음', /넣지\s*않았습니다|추측(은|이나|을|이)\s*[^.\n]{0,30}(넣지|담지|쓰지|하지)\s*않|만을\s*근거로\s*(합니다|했습니다|작성|정리)|(표기|원문|문구|표현)\s*(를|을)?\s*그대로\s*옮긴|다루지\s*않으므로|매뉴얼은[^.\n]{0,40}다루지\s*않습니다/],
  ['메타:en', /\b(this|the)\s+(article|guide|page|post)\s+(is|was)\s+(based|compiled|written|prepared|drawn)\s+(solely\s+|only\s+|entirely\s+|strictly\s+)?(on|from)\b|\b(the\s+)?content\s+of\s+this\s+(article|guide|page|post)\s+is\s+based\s+on\b|\bthis\s+(article|guide|post|page)\b[^.\n]{0,200}\b(based\s+on|drawing\s+on|according\s+to)\s+(the\s+)?(text\s+of\s+the\s+)?[^.\n]{0,40}\b(act|manual|statute|law|regulations?|guidelines?|provisions?)\b|\b(we|i)\s+(did|have)\s+not\s+(include|add)(d)?\s+(any\s+)?(figures|numbers|speculation|guesses)|no\s+speculation|,\s*(per|checked\s+against|based\s+on|according\s+to)\s+(the\s+)?([A-Z][a-z]+\s+)?(\d{4}\s+)?(MOJ\s+|Ministry\s+of\s+Justice\s+)?manuals?\.|,\s*(article\s+)?by\s+article\.|\barticle[- ]by[- ]article\b/i],
  ['메타:zh', /(本文|这篇文章|本页|本指南)(将|主要)?\s*(依据|根据|基于|依照|依《|以《)\s*(?!实务|实际|您|具体)(?![^。\n]{0,60}为(中心|主|例|核心|重点))[^。\n]{0,80}(整理|梳理|撰写|编写|比较|为依据)|(依|依照)《[^。\n]{0,40}(整理|梳理)|(按|依|依照|根据)(条文|法条|法令原文)(顺序)?(整理|梳理|逐一|逐项)|(依据|根据|基于)[^。\n]{0,60}(法|规定|指南|手册|条文|原文)[^。\n]{0,40}(整理|梳理)|仅(依据|根据)[^。\n]{0,40}(整理|编写|撰写)|未(加入|包含)[^。\n]{0,20}(推测|猜测)/],
  ['메타:ja', /(本記事|この記事|このページ)は[^。\n]{0,80}(に基づ|をもと|を基に)[^。\n]{0,40}(整理|まとめ|作成)|(法|法令|規定|マニュアル|条文|原文|ガイド|指針|規則)[^。\n]{0,15}(に基づ(いて|き)|をもとに|を基に|に沿って)、?\s*(整理|まとめ)|(法|法令|条文|マニュアル|原文)(の条文)?で(整理|まとめ)|推測(は|を)[^。\n]{0,20}(含|入れ|加え)て(い)?ません/],
  ['메타:vi/th/ru', /bài viết này (được )?(dựa (trên|vào)|biên soạn (dựa|theo|từ)|tổng hợp (dựa|theo|từ|căn cứ))|(bài viết này|chúng tôi (tổng hợp|tóm tắt|biên soạn|trình bày))[^.\n]{0,160}(dựa trên|căn cứ vào|theo từng điều luật|theo thứ tự điều luật)|không (đưa|thêm) (vào )?(số liệu|suy đoán)|บทความนี้(อ้างอิง|อิงตาม|เรียบเรียงจาก|สรุปจาก)|(статья|материал)\s+(основан|подготовлен|составлен)/i],
  // NOCITE-ALL-4D(맥7 승인, 2026-10-17): en·vi·ru·th·ar 판 '법령 원문 기준으로 정리' 수식구 — 'A summary, based on the original text of the law, of …'·'Tổng hợp theo nguyên văn pháp luật'·'По оригинальному тексту закона'·'สรุปจากตัวบทกฎหมาย'·'ملخص من النص القانوني'
  ['메타:원문요약', /\bbased\s+on\s+(the\s+)?(official\s+guidance\s+and\s+(the\s+)?)?original\s+(legal\s+)?text\b|\b(organi[sz]ed|compiled|summari[sz]ed|written)\s+(based\s+on|from|according\s+to)\s+the\s+(statute|original|legal)\s+text\b|(tổng hợp|tóm tắt)\s+theo\s+nguyên văn|(theo|dựa trên)\s+(nguyên văn\s+(văn bản\s+)?(pháp luật|luật)|văn bản luật gốc|văn bản gốc của luật)|по\s+(оригинальн|исходн)[а-яё]*\s+текст[а-яё]*\s+(закон|законодательств)|на\s+основе\s+(оригинального\s+)?текст[а-яё]*\s+закон|(สรุป|เรียบเรียง)(จาก|ตาม)(ตัวบท|ต้นฉบับ)กฎหมาย|ตัวบทกฎหมายต้นฉบับ|ملخص\s+(من|وفق|بحسب|مستند\s+إلى)\s+(ال)?نص|(وفق|بحسب|استنادًا\s+إلى|استناداً\s+إلى|بناءً\s+على|مستند\s+إلى)\s+((النص|النصوص)\s+(القانوني|القانونية)\s+(الأصلي|الأصلية)|النص\s+الأصلي\s+للقانون)/iu],
];

function htmlToTexts(s) {
  const ld = [...s.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]).join('\n');
  let b = s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi, '');
  b = b.replace(/<(br|\/p|\/div|\/li|\/h\d|\/td|\/th|\/tr|\/dt|\/dd|\/summary|\/caption|p|div|li|h\d|td|th|tr|dt|dd|summary|section|article|table|ul|ol|aside|details|blockquote)\b[^>]*>/gi, '\n').replace(/<[^>]+>/g, '');
  const ent = t => t.replace(/&nbsp;/g, ' ').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&amp;/g, '&');
  const vis = ent(b).split('\n').map(l => l.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n');
  let ldt = ld; try { ldt = ent(ld).replace(/\\u002[fF]/g, '/').replace(/\\n/g, '\n'); ldt = ldt.replace(/"\s*,\s*"/g, '"\n"'); } catch {}
  return { vis, ld: ldt };
}
let ALLOW = [];
export function scanText(text, kind) {
  const hits = [];
  for (const [name, re] of PATTERNS) {
    const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
    for (const m of text.matchAll(g)) {
      const a = Math.max(0, m.index - 50), ctx = text.slice(a, m.index + m[0].length + 70).replace(/\n/g, ' ⏎ ');
      if (ALLOW.some(x => ctx.includes(x))) continue;
      hits.push({ rule: name, kind, ctx });
      if (m[0].length === 0) break;
    }
  }
  return hits;
}
export function scanHtml(s) { const { vis, ld } = htmlToTexts(s); return [...scanText(vis, 'vis'), ...scanText(ld, 'ld')]; }

function walk(p, out) {
  const st = fs.statSync(p);
  if (st.isDirectory()) { for (const f of fs.readdirSync(p)) { if (f === 'node_modules' || f === '.git' || f === 'cache') continue; walk(path.join(p, f), out); } }
  else if (/\.(html?|body)$/i.test(p)) out.push(p);
  return out;
}
async function main() {
  const a = process.argv.slice(2);
  const ai = a.indexOf('--allow'); if (ai >= 0) { ALLOW = fs.readFileSync(a[ai + 1], 'utf8').split('\n').map(x => x.trim()).filter(Boolean); a.splice(ai, 2); }
  const oi = a.indexOf('--out'); let out = null; if (oi >= 0) { out = a[oi + 1]; a.splice(oi, 2); }
  const res = [];
  if (a[0] === '--urls') {
    const urls = fs.readFileSync(a[1], 'utf8').split('\n').map(x => x.trim()).filter(Boolean);
    let i = 0, errs = 0;
    const worker = async () => { while (i < urls.length) { const u = urls[i++]; let s = null;
      for (let k = 0; k < 3 && s == null; k++) { try { const r = await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0 nocite-gate', 'cache-control': 'no-cache' }, redirect: 'manual' }); s = await r.text(); res.push({ url: u, status: r.status, hits: scanHtml(s) }); } catch (e) { if (k === 2) { errs++; res.push({ url: u, err: String(e) }); s = ''; } } } } };
    await Promise.all(Array.from({ length: 12 }, worker));
  } else {
    if (!a.length) { console.error('usage: nocite-gate.mjs <dir|file...> | --urls file'); process.exit(2); }
    const files = a.flatMap(p => walk(p, []));
    for (const f of files) { const h = scanHtml(fs.readFileSync(f, 'utf8')); res.push({ url: f, hits: h }); }
  }
  const bad = res.filter(r => r.hits && r.hits.length), errs = res.filter(r => r.err);
  const total = bad.reduce((n, r) => n + r.hits.length, 0);
  if (out) fs.writeFileSync(out, JSON.stringify(res, null, 0));
  for (const r of bad.slice(0, 40)) for (const h of r.hits.slice(0, 3)) console.log(`  ✗ [${h.rule}/${h.kind}] ${r.url}\n      …${h.ctx}…`);
  console.log(`[nocite-gate] scanned=${res.length} pages_with_hits=${bad.length} hits=${total} errors=${errs.length}`);
  process.exit(errs.length ? 2 : (total ? 1 : 0));
}
if (import.meta.url === `file://${process.argv[1]}`) main();
