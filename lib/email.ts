interface EmailParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailParams) {
  try {
    // Using the Abacus.AI email service
    const response = await fetch('https://api.abacus.ai/v0/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Email sending failed:', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

export function generateContactNotificationEmail(data: {
  name: string
  email: string
  message: string
  timestamp: Date
}) {
  return {
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .info-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #3b82f6; }
    .label { font-weight: bold; color: #1e40af; }
    .message-box { background: white; padding: 20px; border-radius: 8px; margin-top: 15px; border: 1px solid #e5e7eb; }
    .footer { text-align: center; margin-top: 20px; padding: 20px; color: #6b7280; font-size: 14px; }
    .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">🎯 New Lead Alert!</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">You have a new contact form submission</p>
    </div>
    
    <div class="content">
      <div class="info-box">
        <p style="margin: 0 0 10px 0;"><span class="label">Name:</span> ${data.name}</p>
        <p style="margin: 0 0 10px 0;"><span class="label">Email:</span> <a href="mailto:${data.email}" style="color: #3b82f6;">${data.email}</a></p>
        <p style="margin: 0;"><span class="label">Date:</span> ${data.timestamp.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
      </div>
      
      <div class="message-box">
        <p class="label" style="margin: 0 0 10px 0;">Message:</p>
        <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
      </div>
      
      <div style="text-align: center;">
        <a href="https://ericfletcher.xyz/admin/dashboard" class="button">
          View in CRM Dashboard
        </a>
      </div>
    </div>
    
    <div class="footer">
      <p style="margin: 0;">This email was sent from your Eric Fletcher Portfolio contact form</p>
      <p style="margin: 5px 0 0 0;">Powered by Abacus.AI</p>
    </div>
  </div>
</body>
</html>
    `,
  }
}
