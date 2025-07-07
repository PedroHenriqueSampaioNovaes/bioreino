import { cookies } from 'next/headers';

export default async function cacheTag(tag: string) {
  const id = (await cookies()).get('user_id')?.value;
  return `${tag}-${id}`;
}
