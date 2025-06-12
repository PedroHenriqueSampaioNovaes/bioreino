'use server';

import { CATEGORIES_GET } from '@/common/api';
import { ICategory, ICategoryGet } from '@/common/@types/category';
import apiError from '@/common/apiError';

export default async function getCategories({ planId }: ICategoryGet = {}) {
  try {
    const { url } = CATEGORIES_GET({ planId });
    const response = await fetch(url, { cache: 'force-cache' });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { data: data as ICategory[], error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
