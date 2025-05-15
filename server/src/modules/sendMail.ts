import { SendMailOptions } from 'nodemailer';
import { transporter } from '../config/mailer';

import { ApiError } from '../utils/ApiError';

interface CustomSendMailOptions extends SendMailOptions {
  template?: string;
  context?: { [key: string]: any };
}

export async function sendMail(
  mailOptions: CustomSendMailOptions,
  successMessage?: string
) {
  try {
    if (mailOptions.to) await transporter.sendMail(mailOptions);

    return successMessage || 'E-mail enviado com sucesso!';
  } catch {
    throw new ApiError('Ocorreu um erro ao tentar enviar o e-mail.', 400);
  }
}
