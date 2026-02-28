import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SiteNav />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">Let&apos;s Talk</h1>
          <p className="text-slate-300 mb-10">
            Use this form to reach me directly. Messages are sent to <strong>chawelson@gmail.com</strong> when email
            delivery variables are configured.
          </p>
          <ContactForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
