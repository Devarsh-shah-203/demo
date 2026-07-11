const WelcomeEmailTemplate = ({ name }) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Welcome to Synergy Hospital</title>
        </head>
  
        <body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8; padding:40px 0;">
            <tr>
              <td align="center">
  
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; padding:40px; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
  
                  <tr>
                    <td align="center">
                      <h1 style="color:#0d6efd; margin-bottom:10px;">
                        Welcome to Synergy Hospital
                      </h1>
                    </td>
                  </tr>
  
                  <tr>
                    <td>
                      <p style="font-size:16px;">
                        Hello <strong>${name}</strong>,
                      </p>
  
                      <p style="font-size:16px; line-height:1.7;">
                        Thank you for registering with
                        <strong>Synergy Hospital</strong>.
                        Your account has been created successfully.
                      </p>
  
                      <p style="font-size:16px; line-height:1.7;">
                        You can now book appointments, manage your medical records,
                        and access our healthcare services anytime.
                      </p>
  
                      <p style="font-size:16px; line-height:1.7;">
                        If you need any assistance, our support team is always happy
                        to help.
                      </p>
  
                      <div style="text-align:center; margin:35px 0;">
                        <a
                          href="http://localhost:5173"
                          style="
                            background:#0d6efd;
                            color:#ffffff;
                            text-decoration:none;
                            padding:14px 28px;
                            border-radius:6px;
                            display:inline-block;
                            font-weight:bold;
                          "
                        >
                          Visit Website
                        </a>
                      </div>
  
                      <hr style="border:none; border-top:1px solid #e5e5e5;" />
  
                      <p style="color:#666; font-size:14px;">
                        Best Regards,<br />
                        <strong>Synergy Hospital Team</strong>
                      </p>
                    </td>
                  </tr>
  
                </table>
  
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  };
  
  export default WelcomeEmailTemplate;