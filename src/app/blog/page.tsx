import { client } from "@/sanity/lib/client";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { BLOG_LIST_QUERY } from "@/sanity/lib/queries";

export default async function BlogPage() {
  const posts = await client.fetch(BLOG_LIST_QUERY);
  const hasPosts = Array.isArray(posts) && posts.length > 0;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SiteNav />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-20 text-center md:text-left">
            <h1 className="text-5xl font-black italic uppercase mb-4 tracking-tighter">Technical <br /> <span className="text-blue-500">Thinking.</span></h1>
            <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Bridging the gap between code and business.</p>
          </header>

          <div className="space-y-16">
            {hasPosts ? posts.map((post: any) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="group block border border-white/5 rounded-2xl p-6 hover:border-blue-500/40 transition-colors">
                <article>
                  <p className="text-blue-500 font-mono text-xs mb-2">
                    {post?.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
                  </p>
                  <h2 className="text-3xl font-bold group-hover:text-blue-400 transition-colors mb-4 leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-slate-400 text-lg line-clamp-2 leading-relaxed italic">
                    {post.excerpt || "No excerpt yet."}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    Read Article <span className="group-hover:translate-x-2 transition-transform">-&gt;</span>
                  </div>
                </article>
              </Link>
            )) : (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                <p className="text-slate-500 font-mono text-sm uppercase">/ No articles published yet</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
