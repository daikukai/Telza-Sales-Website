export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, website, service, problem } = data;

    // Read from Netlify Environment Variables
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "RESEND_API_KEY not configured" }),
      };
    }

    // Send formatted HTML lead notification to daikukaibindah@gmail.com
    const emailPayload = {
      from: "Telza Diagnostic <onboarding@resend.dev>",
      to: ["daikukaibindah@gmail.com"],
      reply_to: email,
      subject: `⚡ New Pipeline Diagnostic Request: ${name} (${website})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 12px; background-color: #ffffff;">
          <div style="padding-bottom: 16px; border-bottom: 2px solid #2563eb; margin-bottom: 20px;">
            <h2 style="color: #09090b; margin: 0 0 6px 0; font-size: 20px;">⚡ New Pipeline Diagnostic Request</h2>
            <p style="color: #71717a; margin: 0; font-size: 13px;">Received from telzasales.com</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #71717a; width: 140px; font-weight: 600;">Full Name:</td>
              <td style="padding: 10px 0; color: #09090b; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #71717a; font-weight: 600;">Work Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #71717a; font-weight: 600;">Company Website:</td>
              <td style="padding: 10px 0;"><a href="${website.startsWith('http') ? website : 'https://' + website}" target="_blank" style="color: #2563eb; text-decoration: none;">${website}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #71717a; font-weight: 600;">Primary Focus:</td>
              <td style="padding: 10px 0; color: #09090b;">${service}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 16px; background-color: #f4f4f5; border-radius: 8px;">
            <p style="margin: 0 0 6px 0; font-weight: 600; color: #09090b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Reported Bottleneck:</p>
            <p style="margin: 0; color: #27272a; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${problem}</p>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e4e4e7; font-size: 12px; color: #a1a1aa; text-align: center;">
            Telza Sales Turnkey Revenue Engine • Lead Delivery
          </div>
        </div>
      `,
    };

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "TelzaSales-Serverless",
      },
      body: JSON.stringify(emailPayload),
    });

    const resendData = await resendResponse.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, resend: resendData }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message }),
    };
  }
}
