import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, subject, message } = await request.json();

    if (!to || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing 'to', 'subject', or 'message'." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const data = await resend.emails.send({
      from: "Appreciate Ya <appreciateya@resend.dev>",
      to,
      subject,
      html: message,
    });

    if (data.error) {
      throw new Error(data.error.message);
    }

    return new Response(
      JSON.stringify({ message: "Email sent successfully via Resend" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Error sending email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
