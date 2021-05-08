const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      // host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: 'Gmail',
      auth: {
        // naturally, replace both with your real credentials or an application-specific password
        user: 'nidehazard10@gmail.com',
        pass: 'hazard17'
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);

    const options = () => {
      return {
        from: 'nidehazard10@gmail.com',
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