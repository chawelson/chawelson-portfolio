"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setStatus("sending");
    setMessage("");

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to send message.");
      setStatus("ok");
      setMessage("Message sent successfully.");
    } catch (error: any) {
      setStatus("error");
      setMessage(error?.message || "Could not send your message.");
    }
  }

  return (
    <form
      action={onSubmit}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4"
      id="contact"
    >
      <h3 className="text-2xl font-bold">Contact</h3>
      <input
        name="name"
        required
        placeholder="Name"
        className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-lime-300"
      />
      <input
        name="email"
        required
        type="email"
        placeholder="Email"
        className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-lime-300"
      />
      <input
        name="subject"
        required
        placeholder="Subject"
        className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-lime-300"
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Message"
        className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-lime-300"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="px-6 py-3 rounded-lg bg-lime-300 text-black font-semibold disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {message ? (
        <p className={status === "ok" ? "text-lime-300 text-sm" : "text-red-400 text-sm"}>{message}</p>
      ) : null}
    </form>
  );
}
