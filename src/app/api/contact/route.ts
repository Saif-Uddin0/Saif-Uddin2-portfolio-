import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS?.replace(/"/g, ''),
      },
    });

    // ─── 1. USER CONFIRMATION EMAIL (Black & Purple) ──────────────────────────
    const userMailOptions = {
      from: `"Saif Uddin" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: `Got your message, ${name.split(' ')[0]} ✦`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Message Received</title>
        </head>
        <body style="margin:0;padding:0;background:#06040f;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;">

          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center" style="padding:48px 16px;">

                <!-- Card -->
                <table width="600" cellpadding="0" cellspacing="0" role="presentation"
                  style="max-width:600px;width:100%;background:#100720;border-radius:24px;border:1px solid rgba(168,85,247,0.18);overflow:hidden;">

                  <!-- Top bar -->
                  <tr>
                    <td style="height:3px;background:linear-gradient(90deg,transparent,#a855f7,#7c3aed,transparent);"></td>
                  </tr>

                  <!-- Header -->
                  <tr>
                    <td style="padding:44px 48px 0;">

                      <!-- Logo badge: table-cell centering (email-safe) -->
                      <table cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:28px;">
                        <tr>
                          <td width="48" height="48"
                            style="width:48px;height:48px;background:linear-gradient(135deg,#7c3aed,#a855f7);border-radius:14px;text-align:center;vertical-align:middle;font-size:22px;font-weight:800;color:#ffffff;font-family:'Segoe UI',sans-serif;">
                            S
                          </td>
                        </tr>
                      </table>

                      <h1 style="margin:0 0 12px;font-size:28px;font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.25;">
                        Your message is in<br/>
                        <span style="color:#c084fc;">${name.split(' ')[0]}.</span>
                      </h1>
                      <p style="margin:0;font-size:16px;color:#8b7caa;line-height:1.6;">
                        I've received your message and will respond within <strong style="color:#c084fc;">24–48 hours</strong>.
                      </p>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding:32px 48px 0;">
                      <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(168,85,247,0.2),transparent);"></div>
                    </td>
                  </tr>

                  <!-- Message preview -->
                  <tr>
                    <td style="padding:28px 48px;">
                      <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:0.18em;">Your message</p>
                      <div style="background:#1a0d2e;border:1px solid rgba(168,85,247,0.25);border-radius:16px;padding:22px 24px;">
                        <div style="font-size:36px;line-height:1;color:#7c3aed;font-family:Georgia,serif;margin-bottom:4px;">&ldquo;</div>
                        <p style="margin:0;font-size:15px;color:#e2d4f8;line-height:1.75;font-style:italic;">${message}</p>
                      </div>
                    </td>
                  </tr>

                  <!-- Body text -->
                  <tr>
                    <td style="padding:0 48px 32px;">
                      <p style="margin:0 0 6px;font-size:15px;color:#8b7caa;line-height:1.7;">
                        Regarding: <strong style="color:#c084fc;">"${subject || "General Inquiry"}"</strong>
                      </p>
                      <p style="margin:0;font-size:15px;color:#8b7caa;line-height:1.7;">
                        While you wait, explore my latest work at
                        <a href="https://saifuddin.dev" style="color:#a855f7;text-decoration:none;font-weight:600;border-bottom:1px solid rgba(168,85,247,0.3);">saifuddin.dev</a>.
                      </p>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding:0 48px;">
                      <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(168,85,247,0.15),transparent);"></div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:28px 48px 44px;">
                      <table cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td style="vertical-align:middle;padding-right:14px;">
                            <!-- Avatar: table-cell centering (email-safe) -->
                            <table cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td width="40" height="40"
                                  style="width:40px;height:40px;background:linear-gradient(135deg,#4c1d95,#7c3aed);border-radius:50%;text-align:center;vertical-align:middle;font-size:16px;font-weight:800;color:#ffffff;font-family:'Segoe UI',sans-serif;">
                                  S
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td style="vertical-align:middle;">
                            <p style="margin:0;font-size:15px;font-weight:700;color:#fff;">Saif Uddin</p>
                            <p style="margin:2px 0 0;font-size:13px;color:#6d5f8a;">MERN Stack Developer</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Bottom bar -->
                  <tr>
                    <td style="height:3px;background:linear-gradient(90deg,transparent,#7c3aed,#a855f7,transparent);"></td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>

        </body>
        </html>
      `,
    };

    // ─── 2. ADMIN NOTIFICATION EMAIL (Black & Purple) ─────────────────────────
    const adminMailOptions = {
      from: `"Saif Portfolio" <${process.env.SMTP_FROM}>`,
      to: "mahirr.846@gmail.com",
      subject: `✦ New Lead — ${name} via Portfolio`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>New Inquiry</title>
        </head>
        <body style="margin:0;padding:0;background:#06040f;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;">

          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center" style="padding:48px 16px;">

                <!-- Card -->
                <table width="600" cellpadding="0" cellspacing="0" role="presentation"
                  style="max-width:600px;width:100%;background:#100720;border-radius:24px;border:1px solid rgba(168,85,247,0.18);overflow:hidden;">

                  <!-- Top bar -->
                  <tr>
                    <td style="height:3px;background:linear-gradient(90deg,transparent,#a855f7,#7c3aed,transparent);"></td>
                  </tr>

                  <!-- Header -->
                  <tr>
                    <td style="padding:40px 48px 28px;">
                      <div style="display:inline-block;background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.25);border-radius:100px;padding:5px 14px;margin-bottom:20px;">
                        <span style="font-size:11px;font-weight:700;color:#c084fc;text-transform:uppercase;letter-spacing:0.15em;">✦ New Inquiry</span>
                      </div>
                      <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.02em;">
                        Someone wants to connect.
                      </h1>
                      <p style="margin:6px 0 0;font-size:14px;color:#6d5f8a;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding:0 48px;">
                      <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(168,85,247,0.2),transparent);"></div>
                    </td>
                  </tr>

                  <!-- Details -->
                  <tr>
                    <td style="padding:28px 48px 0;">
                      <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#6d28d9;text-transform:uppercase;letter-spacing:0.18em;">From</p>
                      <p style="margin:0 0 22px;font-size:17px;font-weight:600;color:#e9d5ff;">${name}</p>

                      <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#6d28d9;text-transform:uppercase;letter-spacing:0.18em;">Email</p>
                      <p style="margin:0 0 22px;font-size:15px;color:#a855f7;">${email}</p>

                      <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#6d28d9;text-transform:uppercase;letter-spacing:0.18em;">Subject</p>
                      <p style="margin:0 0 28px;font-size:15px;color:#bba4d5;">${subject || "No subject provided"}</p>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding:0 48px;">
                      <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(168,85,247,0.15),transparent);"></div>
                    </td>
                  </tr>

                  <!-- Message -->
                  <tr>
                    <td style="padding:28px 48px 36px;">
                      <p style="margin:0 0 14px;font-size:10px;font-weight:700;color:#6d28d9;text-transform:uppercase;letter-spacing:0.18em;">Message</p>
                      <div style="background:rgba(120,60,200,0.08);border:1px solid rgba(168,85,247,0.15);border-radius:16px;padding:22px 24px;">
                        <p style="margin:0;font-size:15px;color:#ffffff;line-height:1.75;white-space:pre-wrap;">${message}</p>
                      </div>
                    </td>
                  </tr>

                  <!-- Reply CTA -->
                  <tr>
                    <td style="padding:0 48px 40px;text-align:center;">
                      <a href="mailto:${email}?subject=Re: ${subject || 'Your Inquiry'}"
                        style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:12px;letter-spacing:0.03em;">
                        Reply to ${name.split(' ')[0]} →
                      </a>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:20px 48px;border-top:1px solid rgba(168,85,247,0.08);">
                      <p style="margin:0;font-size:11px;color:#3d3150;text-align:center;letter-spacing:0.05em;text-transform:uppercase;">
                        Sent via Saif Portfolio Contact Form &nbsp;·&nbsp; ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </td>
                  </tr>

                  <!-- Bottom bar -->
                  <tr>
                    <td style="height:3px;background:linear-gradient(90deg,transparent,#7c3aed,#a855f7,transparent);"></td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>

        </body>
        </html>
      `,
    };

    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    return NextResponse.json({ message: "Emails sent successfully!" }, { status: 200 });
  } catch (error: any) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: "Failed to send emails." }, { status: 500 });
  }
}
