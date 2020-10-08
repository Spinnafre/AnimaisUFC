import * as nodemailer from "nodemailer";
import { port, host, user, pass,service } from "../config/Nodemail/mail.json";
import { resolve } from "path";
const hbs = require("nodemailer-express-handlebars");

const transport = nodemailer.createTransport({
  service,
  auth: { user, pass },
});

transport.use(
  "compile",
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: resolve("./src/resources/mail/"),
    },
    // Onde fica os templates de email
    viewPath: resolve("./src/resources/mail"),
    extName: ".html",
  })
);

export default transport;
