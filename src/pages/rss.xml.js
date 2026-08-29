import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@/data/site";

export const prerender = true;

export async function GET(context) {
  const articles = await getCollection(
    "articles",
    // A feed needs a real pubDate — entries still waiting on a verified
    // date are left out rather than backdated to "now".
    ({ data }) => !data.draft && Boolean(data.date),
  );
  const sorted = articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: SITE.name,
    description: "A ministry blog on life, faith, family, ministry, and technology.",
    site: context.site ?? SITE.url,
    items: sorted.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.excerpt,
      link: `/articles/${entry.id}`,
      categories: entry.data.category ? [entry.data.category] : [],
    })),
    customData: `<language>en-us</language>`,
  });
}
