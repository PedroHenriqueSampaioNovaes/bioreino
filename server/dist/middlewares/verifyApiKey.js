export function verifyApiKey(request, response, next) {
    const apiKey = request.headers['x-api-key'];
    if (apiKey !== process.env.API_KEY) {
        response.json({ message: 'Acesso negado. Chave de API inválida.' });
        return;
    }
    next();
}
