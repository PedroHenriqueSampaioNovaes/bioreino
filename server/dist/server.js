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
const app = (0, express_1.default)();
const PORT = 3333;
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
// Creates a base API route for other routes
routes_1.default.forEach((route) => {
    app.use(`/api${route.baseRoute}`, route.router);
});
// Handle error api
app.use(errorHandling_1.errorHandling);
app.listen(PORT, () => console.log(`Servidor rodando na porta http://localhost:${PORT}`));
