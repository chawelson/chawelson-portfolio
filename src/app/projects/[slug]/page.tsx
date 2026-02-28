import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY } from "@/sanity/lib/queries";

async function getProject(slug: string) {
  return await client.fetch(PROJECT_QUERY, { slug });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] text-white p-10">
        <p>Project not found.</p>
        <Link href="/" className="text-lime-300 underline">
          Back home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SiteNav />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/#work" className="text-lime-300 font-mono text-xs mb-8 block hover:underline">
            ← Back to Work
          </Link>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">{project.category}</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">{project.title}</h1>
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="mb-10 w-full rounded-2xl border border-white/10 object-cover"
            />
          ) : null}
          <p className="text-xl text-slate-300 leading-relaxed mb-8">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {(project.tech || []).map((item: string) => (
              <span key={item} className="px-3 py-1 rounded-full border border-white/15 text-slate-300">
                {item}
              </span>
            ))}
          </div>
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-6 py-3 rounded-lg bg-lime-300 text-black font-semibold"
            >
              Visit Project
            </a>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
