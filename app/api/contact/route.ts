import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    return NextResponse.json({ error: "Email not configured." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Gurdwara Website" <${user}>`,
    to: "gurudwarananaksar3060@gmail.com",
    replyTo: email,
    subject: `New message from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px">
        <h2 style="color:#0B1D3A">New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap">${message}</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
