import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

import path from 'node:path';

const transporter = createTransport({
  host: 'smtp.resend.com',
  secure: true,
  port: 465,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY,
  },
});

// Determines the correct path based on the environment
const isProduction = process.env.NODE_ENV === 'production';
const resourcesPath = isProduction
  ? path.resolve('./dist/resources/mail/')
  : path.resolve('./src/resources/mail/');

console.log('Resources path:', resourcesPath);

transporter.use(
  'compile',
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: resourcesPath,
      extname: '.html',
    },
    viewPath: resourcesPath,
    extName: '.html',
  })
);

export { transporter };
