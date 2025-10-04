import Mailjet from "node-mailjet";

export async function POST(req: Request) {
  try {
    const { to, subject, message } = await req.json();

    if (!to || !subject || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const mailjet = Mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC!,
      process.env.MJ_APIKEY_PRIVATE!
    );

    const request = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "appreciateyanz@gmail.com",
              Name: "Appreciate Ya",
            },
            To: [
              {
                Email: to,
              },
            ],
            Subject: subject,
            TextPart: message,
            HTMLPart: `<div>${message}</div>`,
          },
        ],
      });

    console.log("Email sent:", request.body);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Error sending email:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
