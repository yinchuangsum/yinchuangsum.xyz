import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>https://yinchuangsum.xyz/blog/${post.id.replace(/\.(md|mdx)$/, "")}</link>
      <description><![CDATA[${post.data.description}]]></description>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
    </item>`,
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Yin Chuang Sum — Blog</title>
    <link>https://yinchuangsum.xyz/</link>
    <description>Writing about what I build. Deep dives on AI architecture, backend engineering, Vue ecosystems, and the tools that power modern SaaS.</description>
    <language>en</language>
    <managingEditor>hello@yinchuangsum.xyz (Yin Chuang Sum)</managingEditor>
    <webMaster>hello@yinchuangsum.xyz (Yin Chuang Sum)</webMaster>
    <atom:link href="https://yinchuangsum.xyz/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
