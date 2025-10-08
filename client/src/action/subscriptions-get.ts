'use server';

import { SUBSCRIPTIONS_GET } from '@/common/api';
import { ISubscription } from '@/common/@types/subscription';
import apiError from '@/common/apiError';

import FetchApi from '@/common/utils/FetchApi';

export default async function getSubscriptions() {
  try {
    const { url } = SUBSCRIPTIONS_GET();
    const data = await FetchApi.get<ISubscription[]>(url, {
      init: { cache: 'force-cache' },
    });

    return { data, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
