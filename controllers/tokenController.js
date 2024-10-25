const jwt = require("jsonwebtoken");
const { user } = require("@/models");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const nodeMailer = require("nodemailer");
const exp = require("constants");

const columns = {
  id: "us_id",
  email: "us_email",
  active: "us_is_active",
};

const generateToken = (id, email, name, expiresIn) => {
  const token = jwt.sign(
    {
      [columns.id]: id,
      [columns.email]: email,
      name: name,
      [columns.active]: true,
    },
    process.env.JWT_SECRET,
    {
      expiresIn,
    }
  );
  return token;
};

const verifyToken = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userToken = await user.findOne({
      where: {
        [columns.id]: decoded[columns.id],
        [columns.email]: decoded[columns.email],
      },
    });
    if (!userToken) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Token is not valid",
      });
    }
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Token is valid",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Token is not valid",
      status: "error",
      code: 401,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await user.findOne({
      where: {
        [columns.id]: decoded[columns.id],
        [columns.email]: decoded[columns.email],
      },
    });

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Token is not valid",
      });
    }

    if (user.us_active) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Email already verified",
      });
    }

    await user.update(
      {
        us_active: true,
      },
      {
        where: {
          [columns.id]: decoded[columns.id],
          [columns.email]: decoded[columns.email],
        },
      }
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Email verified",
    });
  } catch (error) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Token is not valid",
    });
  }
};

const sendEmail = async (
  username,
  email,
  subject,
  title,
  token,
  link,
  label
) => {
  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, "../views/templates/emailVerification.hbs"),
    "utf-8"
  );

  const template = handlebars.compile(emailTemplateSource);

  const htmlToSend = template({
    logoUrl: `https://res.cloudinary.com/dqbdwqxsk/image/upload/v1729842908/Black_Blue_White_Y2K_Diamond_Pixel_Logo_e6epnm.png`,
    username: username,
    subject: subject,
    title: title,
    verificationLink: `${link}?token=${token}`,
    linkLabel: label,
  });

  const transporter = nodeMailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Rifqi Top Up" - ${process.env.MAIL_USERNAME}`,
    to: email,
    subject: subject,
    html: htmlToSend,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  generateToken,
  verifyToken,
  verifyEmail,
  sendEmail,
};
