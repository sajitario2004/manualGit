const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { marked } = require('marked');
const hljs = require('highlight.js');

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');
}

function asciiSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

// Custom code and heading renderer with highlight.js
const renderer = {
  heading(item) {
    const slug = slugify(item.text);
    const ascii = asciiSlug(item.text);
    const anchorAscii = ascii !== slug ? `<a id="${ascii}" class="anchor-target"></a>` : '';
    return `<h${item.depth} id="${slug}">${anchorAscii}${item.text}</h${item.depth}>\n`;
  },
  code({ text, lang }) {
    const validLang = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
    let highlighted;
    try {
      highlighted = hljs.highlight(text, { language: validLang, ignoreIllegals: true }).value;
    } catch (e) {
      highlighted = text;
    }
    return `<div class="code-wrapper"><div class="code-header"><span class="code-dot dot-1"></span><span class="code-dot dot-2"></span><span class="code-dot dot-3"></span><span class="code-lang">${validLang.toUpperCase()}</span></div><pre><code class="hljs language-${validLang}">${highlighted}</code></pre></div>`;
  }
};

marked.use({ renderer });

function transformCallouts(md) {
  const iconMap = {
    NOTE: '<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>',
    TIP: '<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.677.957.245.474.375 1.056.375 1.736v.5a1 1 0 0 0 1 1h1.5a1 1 0 0 0 1-1v-.5c0-.68.13-1.262.375-1.736.207-.401.454-.693.677-.957l.214-.253c.56-.679.984-1.32.984-2.304 0-2.06-1.637-3.75-4-3.75ZM6 13.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm1 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5Z"/></svg>',
    IMPORTANT: '<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h3a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h5.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25ZM8 3.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 3.5ZM8 9.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75Z"/></svg>',
    WARNING: '<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM8 11.75a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75Z"/></svg>',
    CAUTION: '<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M7.177 3.073 9.573.677A.25.25 0 0 1 10 .854v4.792a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM1.854 1.146a.5.5 0 1 0-.708.708l13 13a.5.5 0 0 0 .708-.708l-2.073-2.073A1.75 1.75 0 0 0 14 10.75v-5.5A1.75 1.75 0 0 0 12.25 3.5H5.854l-4-2.354Z"/></svg>'
  };

  return md.replace(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n((?:^>.*$\n?)+)/gm, (match, type, content) => {
    const cleanContent = content.split('\n').map(l => l.replace(/^>\s?/, '')).join('\n');
    const icon = iconMap[type] || '';
    return `<div class="callout callout-${type.toLowerCase()}">
      <div class="callout-header">
        <span class="callout-icon">${icon}</span>
        <span class="callout-title">${type}</span>
      </div>
      <div class="callout-content">\n\n${cleanContent}\n\n</div>
    </div>\n`;
  });
}

function getCss(accentColor, accentLight, bgCoverGrad, osBadge) {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  @page {
    size: A4;
    margin: 22mm 18mm 22mm 18mm;
    @bottom-right {
      content: counter(page);
      font-family: 'Inter', sans-serif;
      font-size: 9pt;
      color: #8c959f;
    }
    @bottom-left {
      content: "${osBadge} — Manual de GitHub de Novato a Avanzado";
      font-family: 'Inter', sans-serif;
      font-size: 8.5pt;
      color: #8c959f;
    }
  }

  @page:first {
    margin: 0;
    @bottom-right { content: normal; }
    @bottom-left { content: normal; }
  }

  * { box-sizing: border-box; }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    color: #1f2328;
    background-color: #ffffff;
    line-height: 1.65;
    font-size: 10pt;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  a {
    color: #0969da;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .back-to-index {
    text-align: right;
    margin: 8px 0 22px 0;
    font-size: 8pt;
    break-after: avoid;
    page-break-after: avoid;
  }

  .back-to-index a {
    color: #57606a;
    background: #f6f8fa;
    border: 1px solid #d0d7de;
    padding: 3px 10px;
    border-radius: 6px;
    font-weight: 500;
    display: inline-block;
  }

  .back-to-index a:hover {
    color: #0969da;
    background: #eaeef2;
    border-color: #0969da;
    text-decoration: none;
  }

  .anchor-target {
    position: relative;
    top: -15px;
    visibility: hidden;
  }

  /* COVER PAGE */
  .cover-page {
    height: 100vh;
    min-height: 297mm;
    background: ${bgCoverGrad};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 70px 60px;
    color: #ffffff;
    page-break-after: always;
    break-after: page;
  }

  .cover-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .os-pill {
    background: ${accentColor};
    color: #ffffff;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 11pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: inline-block;
  }

  .version-tag {
    color: #8b949e;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10pt;
  }

  .cover-center {
    margin: auto 0;
  }

  .cover-title {
    font-size: 38pt;
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -1px;
    margin: 0 0 16px 0;
    color: #ffffff;
  }

  .cover-title span {
    color: ${accentLight};
  }

  .cover-subtitle {
    font-size: 16pt;
    font-weight: 400;
    color: #c9d1d9;
    max-width: 650px;
    line-height: 1.4;
    margin: 0 0 25px 0;
  }

  .cover-features {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .feature-chip {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 9.5pt;
    color: #f0f6fc;
  }

  .cover-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 24px;
  }

  .author-info {
    font-size: 9.5pt;
    color: #8b949e;
  }

  .author-info strong {
    color: #f0f6fc;
    display: block;
    font-size: 11pt;
    margin-bottom: 2px;
  }

  .doc-meta {
    text-align: right;
    font-size: 9pt;
    color: #8b949e;
  }

  /* DOCUMENT CONTENT */
  .document-body {
    padding: 0;
  }

  h1 {
    font-size: 20pt;
    font-weight: 700;
    color: #0f172a;
    border-bottom: 2px solid ${accentColor};
    padding-bottom: 8px;
    margin-top: 36px;
    margin-bottom: 18px;
    letter-spacing: -0.5px;
    page-break-before: always;
    break-before: page;
  }

  h1:first-of-type {
    page-break-before: avoid;
    break-before: avoid;
    margin-top: 0;
  }

  h2 {
    font-size: 14pt;
    font-weight: 600;
    color: #1e293b;
    border-left: 4px solid ${accentColor};
    padding-left: 10px;
    margin-top: 26px;
    margin-bottom: 12px;
    page-break-after: avoid;
    break-after: avoid;
  }

  h3 {
    font-size: 11.5pt;
    font-weight: 600;
    color: #334155;
    margin-top: 20px;
    margin-bottom: 8px;
    page-break-after: avoid;
    break-after: avoid;
  }

  h4 {
    font-size: 10.5pt;
    font-weight: 600;
    color: #475569;
    margin-top: 14px;
    margin-bottom: 6px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    text-align: justify;
  }

  strong {
    font-weight: 600;
    color: #0f172a;
  }

  ul, ol {
    margin-top: 0;
    margin-bottom: 14px;
    padding-left: 24px;
  }

  li {
    margin-bottom: 5px;
  }

  /* CODE BLOCKS */
  .code-wrapper {
    margin: 14px 0 16px 0;
    border-radius: 8px;
    background: #0d1117;
    border: 1px solid #30363d;
    overflow: hidden;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .code-header {
    background: #161b22;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #21262d;
  }

  .code-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
  }
  .dot-1 { background: #ff5f56; }
  .dot-2 { background: #ffbd2e; }
  .dot-3 { background: #27c93f; }

  .code-lang {
    margin-left: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 7.5pt;
    color: #8b949e;
    font-weight: 600;
  }

  pre {
    margin: 0;
    padding: 12px 14px;
    background: transparent;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }

  code {
    font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 8.5pt;
    line-height: 1.5;
  }

  p code, li code, td code {
    background: #f1f5f9;
    color: #0f172a;
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid #e2e8f0;
    font-size: 8.5pt;
  }

  /* SYNTAX HIGHLIGHTING (GITHUB DARK STYLE) */
  .hljs { color: #c9d1d9; background: transparent; }
  .hljs-keyword { color: #ff7b72; font-weight: 500; }
  .hljs-built_in { color: #ffa657; }
  .hljs-type { color: #79c0ff; }
  .hljs-literal { color: #79c0ff; }
  .hljs-number { color: #79c0ff; }
  .hljs-string { color: #a5d6ff; }
  .hljs-comment { color: #8b949e; font-style: italic; }
  .hljs-variable { color: #ffa657; }
  .hljs-title { color: #d2a8ff; font-weight: 600; }
  .hljs-params { color: #c9d1d9; }
  .hljs-meta { color: #79c0ff; }

  /* CALLOUTS */
  .callout {
    margin: 16px 0;
    border-radius: 8px;
    padding: 12px 16px;
    border-left: 4px solid;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .callout-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
    font-weight: 700;
    font-size: 9pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .callout-content p {
    margin-bottom: 6px;
  }
  .callout-content p:last-child {
    margin-bottom: 0;
  }

  .callout-note {
    background: #f0f7ff;
    border-left-color: #0969da;
    color: #1a4971;
  }
  .callout-note .callout-header { color: #0969da; }

  .callout-tip {
    background: #f0fff4;
    border-left-color: #1a7f37;
    color: #1b5e20;
  }
  .callout-tip .callout-header { color: #1a7f37; }

  .callout-important {
    background: #fbf5ff;
    border-left-color: #8250df;
    color: #552d9a;
  }
  .callout-important .callout-header { color: #8250df; }

  .callout-warning {
    background: #fffbeb;
    border-left-color: #9a6700;
    color: #744210;
  }
  .callout-warning .callout-header { color: #9a6700; }

  .callout-caution {
    background: #fff5f5;
    border-left-color: #cf222e;
    color: #82171e;
  }
  .callout-caution .callout-header { color: #cf222e; }

  /* TABLES */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 9pt;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  th, td {
    padding: 8px 12px;
    border: 1px solid #e2e8f0;
    text-align: left;
  }

  th {
    background-color: #f8fafc;
    font-weight: 600;
    color: #0f172a;
    border-bottom: 2px solid #cbd5e1;
  }

  tr:nth-child(even) {
    background-color: #fbfcfd;
  }

  /* HORIZONTAL RULE */
  hr {
    border: 0;
    height: 1px;
    background: #e2e8f0;
    margin: 24px 0;
  }

  /* BLOCKQUOTES */
  blockquote {
    border-left: 3px solid #cbd5e1;
    margin: 12px 0;
    padding-left: 14px;
    color: #64748b;
    font-style: italic;
  }
  `;
}

function buildHtmlDoc({ title, subtitle, osBadge, accentColor, accentLight, bgCoverGrad, mdContent }) {
  const transformedMd = transformCallouts(mdContent);
  const bodyHtml = marked.parse(transformedMd);
  const css = getCss(accentColor, accentLight, bgCoverGrad, osBadge);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${title} - ${osBadge}</title>
  <style>${css}</style>
</head>
<body>
  <div class="cover-page">
    <div class="cover-top">
      <span class="os-pill">${osBadge}</span>
      <span class="version-tag">Git 2.45+ • GitHub CLI 2.50+ • 2026</span>
    </div>
    <div class="cover-center">
      <h1 class="cover-title">${title}</h1>
      <p class="cover-subtitle">${subtitle}</p>
      <div class="cover-features">
        <span class="feature-chip">CLI & Web Workflows</span>
        <span class="feature-chip">SSH & GPG Signing</span>
        <span class="feature-chip">GitHub Actions CI/CD</span>
        <span class="feature-chip">Issues & Projects v2</span>
        <span class="feature-chip">Security & Dependabot</span>
        <span class="feature-chip">Packages & Releases</span>
        <span class="feature-chip">API & Scripting</span>
      </div>
    </div>
    <div class="cover-footer">
      <div class="author-info">
        <strong>Manual Oficial de Referencia y Práctica</strong>
        Guía de Novato a Avanzado • Ecosistema Completo de GitHub
      </div>
      <div class="doc-meta">
        Edición Técnica Profesional<br>
        Generado en formato Alta Resolución PDF
      </div>
    </div>
  </div>

  <div class="document-body">
    ${bodyHtml}
  </div>
</body>
</html>`;
}

function compileManual({ mdPath, pdfPath, osBadge, accentColor, accentLight, bgCoverGrad, title, subtitle }) {
  console.log(`\nCompiling ${mdPath}...`);
  const mdContent = fs.readFileSync(mdPath, 'utf8');
  const htmlContent = buildHtmlDoc({
    title,
    subtitle,
    osBadge,
    accentColor,
    accentLight,
    bgCoverGrad,
    mdContent
  });

  const tempHtmlPath = mdPath.replace('.md', '.temp.html');
  fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');

  function getChromeBin() {
    if (process.env.CHROME_BIN) return process.env.CHROME_BIN;
    if (process.platform === 'darwin') {
      return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    } else if (process.platform === 'win32') {
      return 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    }
    return 'google-chrome';
  }

  console.log(`Generating PDF: ${pdfPath}`);
  const chromeBin = getChromeBin();
  const cmd = `"${chromeBin}" --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer --print-to-pdf="${pdfPath}" "${tempHtmlPath}"`;
  
  execSync(cmd, { stdio: 'pipe' });
  fs.unlinkSync(tempHtmlPath);

  const stats = fs.statSync(pdfPath);
  console.log(`✓ PDF Generated successfully (${(stats.size / 1024).toFixed(1)} KB)`);
}

module.exports = { compileManual };
