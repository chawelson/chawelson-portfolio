// src/app/page.tsx
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

// Fetching all content types for your specific sections
const DATA_QUERY = defineQuery(`{
  "projects": *[_type == "project"] | order(_createdAt desc) {
    _id, title, client, achievement, techStack, "imageUrl": image.asset->url
  },
  "experience": *[_type == "experience"] | order(period desc) {
    _id, role, company, period, details
  }
}`);

export default async function Page() {
  const { projects, experience } = await client.fetch(DATA_QUERY);

  return (
    <div className="bg-[#050505] text-white selection:bg-blue-500/30 min-h-screen">
      <SiteNav />

      {/* 2. HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <h2 className="text-blue-500 font-mono text-sm mb-4 uppercase tracking-[0.3em]">Senior Full-Stack Engineer</h2>
          <h1 className="text-7xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter">
            JOSH <br /> CHAWELSON
          </h1>
          <p className="text-2xl text-slate-400 leading-relaxed font-light">
            Architecting scalable web solutions for 15+ years across <span className="text-white">Kenya, South Africa, and the UK.</span> 
          </p>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-16">
          <h2 className="text-4xl font-bold">Bridging technical excellence with business impact. </h2>
          <div className="space-y-6 text-lg text-slate-400">
            <p>I combine deep technical skills with proven business acumen, having managed client relationships worth <span className="text-white">R1,350,000+ annually.</span></p>
            <p>From <span className="text-white">DialaCoke</span> to the <span className="text-white">BiP Discover Hub</span>, I specialize in systems that impact millions of users. </p>
          </div>
        </div>
      </section>

      {/* 4. EXPERIENCE SECTION (Accordion Style) */}
      <section id="experience" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-12 italic">/ Professional_Timeline</h3>
        <div className="space-y-4">
          {experience?.map((job: any) => (
            <details key={job._id} className="group border-b border-white/10 pb-4">
              <summary className="flex justify-between items-center cursor-pointer list-none py-6">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                  <span className="text-2xl font-bold group-open:text-blue-500 transition">{job.company}</span>
                  <span className="text-slate-500 uppercase text-xs tracking-widest">{job.role}</span>
                </div>
                <span className="font-mono text-slate-400">{job.period}</span>
              </summary>
              <div className="text-slate-400 pl-0 md:pl-4 pb-6 leading-relaxed max-w-3xl">
                {job.details}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 5. WORK / PROJECTS SECTION */}
      <section id="work" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-5xl font-black italic">FEATURED <br /> WORK</h2>
          <div className="text-slate-500 text-sm font-mono">({projects?.length || 0}) Projects_Loaded</div>
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
          {projects?.map((project: any) => (
            <div key={project._id} className="group flex flex-col gap-6">
              <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-white/5 relative group-hover:border-blue-500/50 transition-all">
                {project.imageUrl && (
                  <img src={project.imageUrl} alt={project.title} className="object-cover w-full h-full grayscale hover:grayscale-0 transition duration-700" />
                )}
              </div>
              <div className="space-y-2">
                <span className="text-blue-500 font-mono text-[10px] uppercase tracking-widest">{project.client}</span>
                <h3 className="text-3xl font-bold">{project.title}</h3>
                <p className="text-slate-400 line-clamp-2 italic">Achievement: {project.achievement}</p>
                <div className="flex gap-2 pt-4">
                  {project.techStack?.map((t: string) => (
                    <span key={t} className="px-2 py-1 bg-white/5 rounded text-[10px] uppercase font-mono text-slate-500">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CLIENTS SECTION */}
      <section id="clients" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 overflow-hidden">
        <h3 className="text-center text-slate-600 text-xs font-mono uppercase tracking-[0.5em] mb-12">International Partners</h3>
        <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:opacity-100 transition-opacity">
           <span className="text-2xl font-bold">COCA-COLA</span>
           <span className="text-2xl font-bold">MTN</span>
           <span className="text-2xl font-bold">BI-P</span>
           <span className="text-2xl font-bold">SACHEN</span>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="py-32 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center">
          <div className="text-6xl md:text-8xl font-black opacity-20 italic">"</div>
          <div className="space-y-8">
             <p className="text-3xl md:text-5xl font-light leading-tight italic">
               "Josh combines deep technical skills with proven business acumen... delivering scalable web solutions." 
             </p>
             <div>
               <p className="font-bold text-xl uppercase tracking-widest">Enterprise Clients</p>
               <p className="text-blue-200">South Africa & UK Markets</p>
             </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}


