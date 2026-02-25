export default function SiteFooter() {
  return (
    <footer className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
      <p className="text-slate-500 text-sm font-mono">(c) 2026 Josh Chawelson - Senior Portfolio</p>
      <div className="flex gap-8 text-xs font-mono uppercase text-slate-500">
        <a href="mailto:chawelson@gmail.com" className="hover:text-white transition">Email</a>
        <a href="https://linkedin.com" className="hover:text-white transition" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </footer>
  );
}
