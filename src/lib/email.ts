import nodemailer from "nodemailer";

export async function sendInquiryNotification(inquiry: {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}) {
  // If SMTP isn't configured (e.g. local dev without credentials), skip
  // silently rather than throwing — the inquiry is still saved to the DB.
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn("[email] SMTP not configured — skipping notification email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const to = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
    to,
    replyTo: inquiry.email,
    subject: `New inquiry: ${inquiry.subject}`,
    text: `New contact form submission

Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone || "—"}
Subject: ${inquiry.subject}

Message:
${inquiry.message}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        <p><strong>Phone:</strong> ${inquiry.phone || "—"}</p>
        <p><strong>Subject:</strong> ${inquiry.subject}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background:#f5f6fd; padding:12px; border-radius:8px;">${inquiry.message}</p>
      </div>
    `,
  });
}
