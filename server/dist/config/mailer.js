"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = require("nodemailer");
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const node_path_1 = __importDefault(require("node:path"));
const transporter = (0, nodemailer_1.createTransport)({
    host: 'smtp.resend.com',
    secure: true,
    port: 465,
    auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY,
    },
});
exports.transporter = transporter;
// Determines the correct path based on the environment
const isProduction = process.env.NODE_ENV === 'production';
const resourcesPath = isProduction
    ? node_path_1.default.resolve('./resources/mail/')
    : node_path_1.default.resolve('./src/resources/mail/');
transporter.use('compile', (0, nodemailer_express_handlebars_1.default)({
    viewEngine: {
        defaultLayout: undefined,
        partialsDir: resourcesPath,
        extname: '.html',
    },
    viewPath: resourcesPath,
    extName: '.html',
}));
