const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const config = require('config')

const sendEmail = async (email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: config.get('EMAIL_HOST'),
      port: config.get('EMAIL_PORT'),
      secure: true,
      service: 'gmail',
      auth: {
        // naturally, replace both with your real credentials or an application-specific password
        user: config.get('EMAIL_USERNAME'),
        pass: config.get('EMAIL_PASSWORD'),
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);

    const options = () => {
      return {
        from: config.get('FROM_EMAIL'),
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (err, info) => {

      if (err) {
        console.log(err);
        return err;

      } else {
        console.log('Email sent to ' + info.envelope.to[0])
        return info;
      }
    });
  } catch (err) {
    return console.log({ msg: err.message });
  }
};

module.exports = sendEmail;