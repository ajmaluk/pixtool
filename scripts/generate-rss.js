import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { posts } from '../src/data/posts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = process.env.VITE_SITE_URL || 'https://www.pixtool.in';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const RSS_PATH = path.join(PUBLIC_DIR, 'rss.xml');
const ATOM_PATH = path.join(PUBLIC_DIR, 'atom.xml');

const XML_MAP = { '&': '&#38;', '<': '&#60;', '>': '&#62;', '"': '&#34;', "'": '&#39;' };
const escapeXml = (unsafe) => {
  if (!unsafe) return '';
  return String(unsafe).replace(/[&<>"']/g, c => XML_MAP[c] || c);
};

const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

function generateRSS() {
  const now = new Date().toUTCString();
  const lastBuildDate = posts.length > 0 
    ? new Date(Math.max(...posts.map(p => new Date(p.date)))).toUTCString()
    : now;

  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>PixTool Blog - Free Online Tools, AI &#38; Productivity Insights</title>
    <link>${SITE_URL}/blog</link>
    <description>Expert guides, tutorials, and insights on free online tools, AI productivity, PDF management, image editing, and browser-based privacy.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${lastBuildDate}</pubDate>
    <generator>PixTool RSS Generator</generator>
    <managingEditor>support@pixtool.in (PixTool Team)</managingEditor>
    <webMaster>support@pixtool.in (PixTool Team)</webMaster>
    <image>
      <url>${SITE_URL}/logo.webp</url>
      <title>PixTool Blog</title>
      <link>${SITE_URL}/blog</link>
      <width>512</width>
      <height>512</height>
    </image>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <atom:link href="${SITE_URL}/atom.xml" rel="alternate" type="application/atom+xml" />`;

  posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach(post => {
      const postUrl = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const excerpt = stripHtml(post.excerpt || '');
      const content = stripHtml(post.content || excerpt);
      const categories = post.tags || [post.category].filter(Boolean);
      
      rss += `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(post.author || 'PixTool Team')}</dc:creator>
      <description>${escapeXml(excerpt || content.substring(0, 300))}</description>
      <content:encoded><![CDATA[
        <article>
          <h1>${escapeXml(post.title)}</h1>
          <p><strong>By ${escapeXml(post.author || 'PixTool Team')}</strong> | ${pubDate}</p>
          ${post.imageWebp ? `<img src="${SITE_URL}${post.imageWebp}" alt="${escapeXml(post.title)}" />` : ''}
          <div>${post.content || excerpt}</div>
        </article>
      ]]></content:encoded>`;
      
      categories.forEach(cat => {
        rss += `
      <category>${escapeXml(cat)}</category>`;
      });
      
      if (post.imageWebp) {
        rss += `
      <enclosure url="${SITE_URL}${post.imageWebp}" type="image/webp" />`;
      }
      
      rss += `
    </item>`;
    });

  rss += `
  </channel>
</rss>`;

  fs.writeFileSync(RSS_PATH, rss);
  console.log(`RSS feed generated at: ${RSS_PATH}`);

  let atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>PixTool Blog - Free Online Tools, AI &#38; Productivity Insights</title>
  <link href="${SITE_URL}/blog" />
  <link href="${SITE_URL}/atom.xml" rel="self" />
  <updated>${new Date().toISOString()}</updated>
  <id>${SITE_URL}/blog</id>
  <author>
    <name>PixTool Team</name>
    <email>support@pixtool.in</email>
  </author>
  <logo>${SITE_URL}/logo.webp</logo>`;

  posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach(post => {
      const postUrl = `${SITE_URL}/blog/${post.slug}`;
      const updated = post.updated || post.date;
      
      atom += `
  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${postUrl}" />
    <id>${postUrl}</id>
    <updated>${new Date(updated).toISOString()}</updated>
    <published>${new Date(post.date).toISOString()}</published>
    <summary>${escapeXml(stripHtml(post.excerpt || ''))}</summary>
    <author>
      <name>${escapeXml(post.author || 'PixTool Team')}</name>
    </author>`;
      
      (post.tags || [post.category].filter(Boolean)).forEach(tag => {
        atom += `
    <category term="${escapeXml(tag)}" />`;
      });
      
      atom += `
  </entry>`;
    });

  atom += `
</feed>`;

  fs.writeFileSync(ATOM_PATH, atom);
  console.log(`Atom feed generated at: ${ATOM_PATH}`);
}

try {
  generateRSS();
} catch (error) {
  console.error('Error generating RSS feed:', error);
  process.exit(1);
}
