"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function ProjectsShowcase({ projects }: { projects: any[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    projects.forEach((p) => p?.category && set.add(p.category));
    return Array.from(set);
  }, [projects]);

  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/10">
      <p className="text-center text-lime-300 font-semibold tracking-wide mb-2">My Portfolio</p>
      <h2 className="text-center text-5xl md:text-6xl font-black mb-8">
        Recent <span className="text-lime-300">Projects</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
              active === cat
                ? "bg-lime-300 text-black border-lime-300"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-lime-300 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project: any) => (
          <article
            key={project._id}
            className="group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] shadow-md hover:shadow-lime-300/5 hover:border-white/25 transition-all duration-300"
          >
            {project.imageUrl ? (
              <div className="overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-56 object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
            ) : null}
            <div className="p-6 flex flex-col gap-1">
              <p className="inline-block text-xs font-medium tracking-wide px-3 py-1 rounded-full bg-lime-300/10 text-lime-300 mb-2 w-fit">
                {project.category}
              </p>
              <h3 className="text-xl font-bold leading-snug mb-2">{project.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {(project.tech || []).slice(0, 4).map((t: string) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 text-sm text-lime-300 font-semibold hover:text-lime-200 hover:gap-2.5 transition-all duration-200"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
