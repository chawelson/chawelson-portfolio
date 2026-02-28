"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setStatus("sending");
    setMessage("");
    const email = String(formData.get("email") || "");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Subscription failed.");
      setStatus("ok");
      setMessage("Subscribed successfully.");
    } catch (error: any) {
      setStatus("error");
      setMessage(error?.message || "Could not subscribe.");
    }
  }

  return (
    <form action={onSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
      <h3 className="text-2xl font-bold">Subscribe</h3>
      <input
        name="email"
        required
        type="email"
        placeholder="Email address"
        className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-lime-300"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="px-6 py-3 rounded-lg border border-white/20 hover:border-lime-300 hover:text-lime-300 transition disabled:opacity-60"
      >
        {status === "sending" ? "Subscribing..." : "Subscribe"}
      </button>
      {message ? (
        <p className={status === "ok" ? "text-lime-300 text-sm" : "text-red-400 text-sm"}>{message}</p>
      ) : null}
    </form>
  );
}
