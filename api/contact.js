import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const verifyCaptcha = async (token) => {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });
  
    const data = await res.json();
    return data.success;
  };
  const isHuman = await verifyCaptcha(req.body.recaptchaToken);
if (!isHuman) {
  return res.status(400).json({ error: "Failed CAPTCHA verification." });
}


  try {
    // Send email via Resend
    await resend.emails.send({
      from: "Chubb Tech <louise@chubb.tech>",
      to: "louise@chubb.tech",
      subject: "New Contact Form Submission",
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br>${message}</p>`
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
