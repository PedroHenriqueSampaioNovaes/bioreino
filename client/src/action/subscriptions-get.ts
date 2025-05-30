'use server';

import { SUBSCRIPTIONS_GET } from "@/common/api";
import { ISubscription } from "@/common/@types/subscription";
import apiError from "@/common/apiError";

export default async function getSubscriptions() {
  try {
    const { url } = SUBSCRIPTIONS_GET();
    const response = await fetch(url, { cache: 'force-cache' });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { data: data as ISubscription[], error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
