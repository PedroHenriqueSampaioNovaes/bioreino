import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

import path from 'node:path';

const transporter = createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});

transporter.use(
  'compile',
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./src/resources/mail/'),
      extname: '.html',
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
  })
);

export { transporter };
