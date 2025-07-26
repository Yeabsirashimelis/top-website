import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'SendGrid', 'Mailgun', etc.
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPayoutEmail(to: string, name: string, amount: number, status: string) {
  const result = await transporter.sendMail({
    from: `"Top Tutor & Mentor" <${process.env.SMTP_EMAIL}>`,
    to,
    subject: `Your payout request has been ${status}`,
    html: `
      <p>Hi ${name},</p>
      <p>Your payout request for <strong>${amount} birr</strong> has been <strong>${status}</strong>.</p>
      <p>If approved, you’ll receive the payment soon.</p>
      <p>Thank you for referring students to our platform.</p>
    `,
  });

  return result;
}
