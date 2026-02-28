import { client } from "@/sanity/lib/client";
import BlogContent from "@/components/BlogContent";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import createImageUrlBuilder from "@sanity/image-url";
import { BLOG_POST_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

const builder = createImageUrlBuilder(client);

async function getPost(slug: string) {
  return await client.fetch(BLOG_POST_QUERY, { slug });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return <div className="text-white p-20">Post not found.</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SiteNav />
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-blue-500 font-mono text-xs mb-8 block hover:underline">
            &lt;- Back to Thinking
          </Link>

          <header className="mb-16">
            <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-slate-400 italic mb-8 border-l border-slate-800 pl-6">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-600 uppercase tracking-widest">
              <span>{post.authorName || "Josh Chawelson"}</span>
              <span>-</span>
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
          </header>

          {post.image && (
            <div className="mb-16 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
              <img
                src={builder.image(post.image).url()}
                className="w-full grayscale hover:grayscale-0 transition-all duration-1000"
                alt={post.title}
              />
            </div>
          )}

          <BlogContent value={post.content} />
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}
