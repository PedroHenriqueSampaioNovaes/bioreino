'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function logout() {
  (await cookies()).delete('token');
  (await cookies()).delete('user_id');
  redirect('/login');
}
