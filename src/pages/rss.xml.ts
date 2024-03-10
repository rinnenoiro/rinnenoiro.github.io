import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from 'src/consts';
import { getCategoryUrl, getPostsCollection, getPostUrl } from 'src/lib/helpers';

export const GET: APIRoute = async (context) => {
  const posts = await getPostsCollection();
  if (!context.site) return new Response(null, { status: 404 });

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      link: getPostUrl(post),
      title: post.data.title,
      pubDate: post.data.published,
      description: post.data.description,
      categories: post.data.categories?.map((category) => getCategoryUrl(category)),
    })),
  });
};
