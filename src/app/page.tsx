import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import ContactForm from "@/components/ContactForm";
import SubscribeForm from "@/components/SubscribeForm";
import { client } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

type HomeData = {
  hero?: any;
  about?: any;
  experience?: any[];
  services?: any[];
  projects?: any[];
  testimonials?: any[];
  companies?: any[];
  recentPosts?: any[];
};

function formatDate(input?: string) {
  if (!input) return "";
  return new Date(input).toLocaleDateString();
}

export default async function HomePage() {
  const data = (await client.fetch(HOME_QUERY)) as HomeData;
  const hero = data?.hero ?? {};
  const about = data?.about ?? {};
  const experience = data?.experience ?? [];
  const services = data?.services ?? [];
  const projects = data?.projects ?? [];
  const testimonials = data?.testimonials ?? [];
  const companies = data?.companies ?? [];
  const recentPosts = data?.recentPosts ?? [];

  const skills = Array.from(
    new Set(
      projects
        .flatMap((project: any) => (Array.isArray(project?.tech) ? project.tech : []))
        .filter(Boolean)
    )
  ).slice(0, 14);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-lime-300/30">
      <SiteNav />

      <main>
        <section id="home" className="pt-36 pb-20 px-6 max-w-7xl mx-auto">
          <p className="text-xl text-slate-400 mb-4">{hero.greeting || "Hello, I'm"}</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-4">
            <span>{hero.firstName || "Josh"} </span>
            <span className="text-lime-300">{hero.lastName || "Chawelson"}</span>
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-lime-300 mb-6">
            {hero.title || "Senior Full Stack Developer"}
          </h2>
          <p className="max-w-3xl text-slate-300 text-xl leading-relaxed mb-10">
            {hero.description ||
              "I build scalable digital products and high-impact web platforms."}
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href={hero?.ctaPrimary?.link || "#contact"}
              className="px-7 py-4 rounded-xl bg-lime-300 text-black font-bold hover:bg-lime-200 transition"
            >
              {hero?.ctaPrimary?.text || "Hire Me"}
            </a>
            {hero?.cvUrl ? (
              <a
                href={hero.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-4 rounded-xl border border-white/20 font-bold hover:border-lime-300 hover:text-lime-300 transition"
              >
                {hero?.ctaSecondary?.text || "Download CV"}
              </a>
            ) : (
              <span className="px-7 py-4 rounded-xl border border-white/10 text-slate-500 font-bold">
                CV not uploaded yet
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(hero?.stats || []).slice(0, 3).map((stat: any, idx: number) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-4xl font-black text-lime-300">{stat?.value || "-"}</p>
                <p className="text-slate-400">{stat?.label || ""}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
          <p className="text-lime-300 uppercase tracking-[0.2em] text-xs mb-3">
            {about?.sectionLabel || "About"}
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
            {about?.headline || "Professional Problem Solutions"}
          </h2>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p>{about?.paragraph1 || "Update this from Sanity About section."}</p>
              <p>{about?.paragraph2 || ""}</p>
              <a
                href={about?.ctaLink || "#services"}
                className="inline-block mt-2 text-lime-300 font-semibold hover:text-lime-200"
              >
                {about?.ctaText || "Learn More"}
              </a>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {(about?.highlights || []).slice(0, 4).map((item: any, idx: number) => (
                <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-white font-semibold mb-1">{item?.title || "Highlight"}</p>
                  <p className="text-slate-400 text-sm">{item?.description || ""}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
          <p className="text-center text-slate-400 uppercase text-sm tracking-[0.15em] mb-3">
            A problem is an opportunity to do your best.
          </p>
          <h2 className="text-center text-5xl md:text-6xl font-black tracking-tight mb-8">
            Skills & Experience
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {experience.map((job: any) => (
              <article key={job._id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-lime-300 text-sm mb-1">{job.period}</p>
                <h3 className="text-3xl font-bold mb-1">{job.role}</h3>
                <p className="text-slate-300 mb-4">{job.company}</p>
                <p className="text-slate-400 mb-4">{job.description}</p>
                <ul className="list-disc ml-5 text-slate-300 space-y-1">
                  {(job.achievements || []).slice(0, 4).map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
          <h2 className="text-4xl font-black mb-8">Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service: any) => (
              <article key={service._id} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-slate-400 mb-3">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {(service.features || []).slice(0, 4).map((feature: string, idx: number) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded bg-black/40 border border-white/10">
                      {feature}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
          <h2 className="text-5xl font-black mb-10">Featured Work</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project: any) => (
              <article key={project._id} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover" />
                ) : null}
                <div className="p-6">
                  <p className="text-lime-300 text-xs uppercase tracking-widest mb-2">{project.category}</p>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-slate-400 mb-4">{project.description}</p>
                  <Link href={`/projects/${project.slug}`} className="text-lime-300 font-semibold hover:text-lime-200">
                    Read project details →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="testimonials" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
          <h2 className="text-4xl font-black mb-8">Testimonials</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((item: any) => (
              <article key={item._id} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="text-slate-200 mb-4">"{item.quote}"</p>
                <p className="font-semibold">{item.name}</p>
                <p className="text-slate-400 text-sm">{item.role}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
          <h2 className="text-4xl font-black mb-8">Clients</h2>
          <div className="flex flex-wrap gap-3">
            {companies.map((company: any) => (
              <a
                key={company._id}
                href={company.website || "#"}
                target={company.website ? "_blank" : undefined}
                rel={company.website ? "noreferrer" : undefined}
                className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-lime-300 transition"
              >
                {company.name}
              </a>
            ))}
          </div>
        </section>

        <section id="blog" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-4xl font-black">Blog</h2>
            <Link href="/blog" className="text-lime-300 hover:text-lime-200">
              View all
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {recentPosts.map((post: any) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-lime-300 transition"
              >
                <p className="text-xs text-slate-500 mb-1">{formatDate(post.publishedAt)}</p>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-slate-400 line-clamp-3">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
          <div className="grid lg:grid-cols-2 gap-6">
            <ContactForm />
            <SubscribeForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
