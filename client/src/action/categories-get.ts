'use server';

import { CATEGORIES_GET } from '@/common/api';
import { ICategory, ICategoryGet } from '@/common/@types/category';
import apiError from '@/common/apiError';

import FetchApi from '@/common/utils/FetchApi';

export default async function getCategories({ planId }: ICategoryGet = {}) {
  try {
    const { url } = CATEGORIES_GET({ planId });
    const data = await FetchApi.get<ICategory[]>(url, {
      cache: 'force-cache',
    });

    return { data, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
