'use server';

import { cookies } from 'next/headers';

export default async function logout() {
  (await cookies()).delete('token');
  (await cookies()).delete('user_id');
}
