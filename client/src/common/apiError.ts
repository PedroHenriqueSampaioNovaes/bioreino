export default function apiError(error: unknown): {
  data: null;
  error: string;
  ok: false;
} {
  if (error instanceof Error) {
    return { data: null, error: error.message, ok: false };
  }
  return { data: null, error: 'Erro genérico', ok: false };
}
