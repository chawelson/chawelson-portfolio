// src/app/contact/page.tsx
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SiteNav />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        
        
        {/* Left Side: Professional Hook */}
        <div className="space-y-8">
          <h1 className="text-6xl font-black italic tracking-tighter uppercase">Let's build <br /> something <span className="text-blue-500">Global.</span></h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-md">
            Currently accepting senior roles and strategic partnerships for 2026. 
            Focused on <span className="text-white">UK, SA, and East African</span> markets.
          </p>
          
          <div className="space-y-4 pt-10">
            <div className="group flex items-center gap-4 text-slate-400">
              <span className="w-12 h-[1px] bg-slate-800 group-hover:w-20 group-hover:bg-blue-500 transition-all"></span>
              <a href="mailto:chawelson@gmail.com" className="font-mono text-sm hover:text-white">chawelson@gmail.com </a>
            </div>
            <div className="group flex items-center gap-4 text-slate-400">
              <span className="w-12 h-[1px] bg-slate-800 group-hover:w-20 group-hover:bg-blue-500 transition-all"></span>
              <span className="font-mono text-sm">+254 795 845 376 </span>
            </div>
          </div>
        </div>

        {/* Right Side: Simple Contact Form */}
        <form className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-slate-500">Name</label>
              <input type="text" className="w-full bg-transparent border-b border-slate-800 py-3 focus:border-blue-500 outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-slate-500">Email</label>
              <input type="email" className="w-full bg-transparent border-b border-slate-800 py-3 focus:border-blue-500 outline-none transition" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-slate-500">Project Type</label>
            <select className="w-full bg-transparent border-b border-slate-800 py-3 focus:border-blue-500 outline-none transition text-slate-400">
              <option>Senior Full-Stack Dev Role</option>
              <option>Web Platform Scalability</option>
              <option>AI Integration Project</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-slate-500">Message</label>
            <textarea rows={4} className="w-full bg-transparent border-b border-slate-800 py-3 focus:border-blue-500 outline-none transition resize-none"></textarea>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 font-bold uppercase tracking-widest text-sm transition-all rounded-lg">
            Send Message
          </button>
        </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
