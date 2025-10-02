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
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
    },
});
exports.transporter = transporter;
transporter.use('compile', (0, nodemailer_express_handlebars_1.default)({
    viewEngine: {
        defaultLayout: undefined,
        partialsDir: node_path_1.default.resolve('./src/resources/mail/'),
        extname: '.html',
    },
    viewPath: node_path_1.default.resolve('./src/resources/mail/'),
    extName: '.html',
}));
