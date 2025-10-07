import { SendMailOptions } from 'nodemailer';
import { transporter } from '../../config/mailer';

import { ApiError } from '../../utils/ApiError';

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
  } catch (err) {
    console.error(err);
    throw new ApiError(
      'Tivemos um problema ao tentar enviar o e-mail de redefinição de senha. Tente novamente mais tarde.',
      400
    );
  }
}
