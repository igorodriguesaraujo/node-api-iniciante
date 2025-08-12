import 'dotenv/config'
import { resend } from '../lib/resend';

export async function sendVerificationEmail(payload: any) {
  const { data, error } = await resend.emails.send({
    from: "Acme <noreply@linkyou.me>",
    to: [payload.email],
    subject: "validação por E-mail",
    html: `
      <div>
        <strong>Seja bem vindo! Para validar sua conta clique no botão abaixo:</strong>
        <a href="https://node-api-iniciante.onrender.com/api/v1/auth/verify-email?token=${payload.id}">Validar conta</a>    
      </div>`,
  });

  if (error) {
    console.log('Error sending email:', error);
    return;
  }

  console.log(data);
}