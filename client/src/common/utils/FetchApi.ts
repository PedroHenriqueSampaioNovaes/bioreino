const apiKey = process.env.API_KEY;

type FetchOptions = Omit<RequestInit, 'method' | 'headers' | 'body'> & {
  token?: string;
  body?: unknown;
};

export default class FetchApi {
  static async get<T>(url: string, options: Omit<FetchOptions, 'body'> = {}) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        Authorization: options.token ? `Bearer ${options.token}` : '',
      } as HeadersInit,
      ...options,
    });

    return await FetchApi.extractData<T>(response);
  }

  static async post<T>(url: string, options: FetchOptions = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        Authorization: options.token ? `Bearer ${options.token}` : '',
      } as HeadersInit,
      body: options.body ? JSON.stringify(options.body) : null,
    });

    return await FetchApi.extractData<T>(response);
  }

  static async patch<T>(url: string, options: FetchOptions = {}) {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        Authorization: options.token ? `Bearer ${options.token}` : '',
      } as HeadersInit,
      body: options.body ? JSON.stringify(options.body) : null,
    });

    return await FetchApi.extractData<T>(response);
  }

  private static async extractData<T>(response: Response) {
    let content;

    try {
      content = await response.json();
    } catch {
      if (!response.ok) {
        throw new Error(
          `Ocorreu um erro inesperado com o servidor. Tente novamente mais tarde.`,
        );
      }

      return null;
    }

    if (!response.ok) {
      throw new Error(content?.message);
    }

    return content as T;
  }
}
