import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'node:path';
import { getDirnamePath } from '../utils/getDirnamePath.js';
const __dirname = getDirnamePath(import.meta.url);
const transporter = createTransport({
    host: 'smtp.resend.com',
    secure: true,
    port: 465,
    auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY,
    },
});
transporter.use('compile', hbs({
    viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve(__dirname, '../resources/mail/'),
        extname: '.html',
    },
    viewPath: path.resolve(__dirname, '../resources/mail/'),
    extName: '.html',
}));
export { transporter };
