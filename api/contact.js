import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, company } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // Honeypot check — if filled, it's spam
  if (company && company.trim() !== "") {
    return res.status(400).json({ error: 'Bot detected' });
  }

  try {
    // Send email via Gandi SMTP
    const transporter = nodemailer.createTransport({
      host: 'mail.gandi.net',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // e.g. louise@chubb.tech
        pass: process.env.SMTP_PASS  // your email password
      }
    });

    await transporter.sendMail({
      from: `"Chubb Tech Contact" <${process.env.SMTP_USER}>`,
      to: 'louise@chubb.tech',
      subject: 'New Contact Form Submission',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
