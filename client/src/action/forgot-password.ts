'use server';

import { FORGOT_PASSWORD } from '@/common/api';
import apiError from '@/common/apiError';

interface IForgot {
  message: string;
}

export default async function forgotPassword({ email }: { email: string }) {
  try {
    const { url } = FORGOT_PASSWORD();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok)
      throw new Error(
        'Tivemos um problema ao tentar enviar o e-mail de redefinição de senha. Tente novamente mais tarde.'
      );

    const data = (await response.json()) as IForgot;

    return { data: data.message, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
