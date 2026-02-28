import { NextResponse } from "next/server";
import { sendEmail } from "../_lib/resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim();
    const to = process.env.CONTACT_TO_EMAIL || "chawelson@gmail.com";

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    await sendEmail({
      to,
      subject: "[Portfolio Subscribe] New subscriber",
      html: `<p><strong>Email:</strong> ${email}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to subscribe." }, { status: 500 });
  }
}
