"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/preload-env");
require("./db/connection");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const routes_1 = __importDefault(require("./routes"));
const errorHandling_1 = require("./middlewares/errorHandling");
const verifyApiKey_1 = require("./middlewares/verifyApiKey");
const app = (0, express_1.default)();
const PORT = 3333;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
app.get('/ping', (req, res) => {
    res.send('pong');
});
app.use((req, res, next) => {
    if (req.originalUrl === '/api/stripe/webhook') {
        next();
    }
    else {
        express_1.default.json()(req, res, next);
    }
});
app.use('/api', verifyApiKey_1.verifyApiKey);
// Creates a base API route for other routes
routes_1.default.forEach((route) => {
    app.use(`/api${route.baseRoute}`, route.router);
});
// Handle error api
app.use(errorHandling_1.errorHandling);
console.log('teste1', fs_1.default.readdirSync(__dirname, { withFileTypes: true }));
console.log('teste path1', path_1.default.resolve());
console.log('teste path2', path_1.default.resolve('./src/resources/mail/'));
console.log('teste path3', path_1.default.resolve('./src/resources/mail/auth'));
console.log('teste path4', path_1.default.resolve('./src/resources/mail/auth/forgot_password.html'));
console.log('teste2', fs_1.default.readdirSync(__dirname + '/resources', { withFileTypes: true }));
console.log('teste3', fs_1.default.readdirSync(__dirname + '/resources/mail', { withFileTypes: true }));
console.log('teste4', fs_1.default.readdirSync(__dirname + '/resources/mail/auth', { withFileTypes: true }));
app.listen(PORT, () => console.log(`Servidor rodando na porta http://localhost:${PORT}`));
