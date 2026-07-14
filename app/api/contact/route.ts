import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^(\+?61|0)[2-478](?:[ -]?\d){8}$/.test(phone);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, location, classOption, message } = body;

    if (!name || !email || !phone || !message) {
      return Response.json(
        { error: "Name, email, phone, and message are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: "Invalid email format." }, { status: 400 });
    }

    if (!isValidPhone(phone)) {
      return Response.json(
        { error: "Invalid phone number format." },
        { status: 400 },
      );
    }

    // 1. Send enquiry to HCA
    await resend.emails.send({
      from: "HCA Website <train@hapkidocollege.com.au>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `New Free Trial Enquiry from ${name}`,
      text: `
New HCA Website Enquiry

Name: ${name}
Email: ${email}
Phone: ${phone}
Preferred Location: ${location || "Not provided"}
Class Option: ${classOption || "Not provided"}

Message:
${message}
      `,
    });

    // 2. Send confirmation email to user
    await resend.emails.send({
      from: "HCA Website <train@hapkidocollege.com.au>",
      to: email,
      subject: "We've Received Your HCA Enquiry",
      text: `
Hi ${name},

Thank you for contacting Hapkido College of Australia.

We've received your enquiry and a member of our team will contact you shortly.

We appreciate your interest in HCA and look forward to helping you begin your martial arts journey.

Kind Regards,
Hapkido College of Australia
      `,
    });

    return Response.json({
      success: true,
      message: "Enquiry sent successfully.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return Response.json({ error: "Failed to send enquiry." }, { status: 500 });
  }
}
