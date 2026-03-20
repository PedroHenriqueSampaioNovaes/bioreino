import { transporter } from '../../config/mailer.js';
import { ApiError } from '../../utils/ApiError.js';
export async function sendMail(mailOptions, successMessage) {
    try {
        if (mailOptions.to)
            await transporter.sendMail(mailOptions);
        return successMessage || 'E-mail enviado com sucesso!';
    }
    catch (err) {
        console.error(err);
        throw new ApiError('Tivemos um problema ao tentar enviar o e-mail de redefinição de senha. Tente novamente mais tarde.', 400);
    }
}
