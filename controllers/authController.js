const admin = require("@/controllers/firebaseController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { user, token } = require("@/models");
const { generateToken, sendEmail } = require("@/controllers/tokenController");
const generateRandomCharacter = require("@/helpers/generateRandomCharacter");

const authRegisterUser = async (req, res) => {
  try {
    const { us_username, us_email, us_phone_number, us_password } = req.body;

    if (!us_username || !us_email || !us_phone_number || !us_password) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "All fields are required",
      });
    }

    const hashedPassword = await bcrypt.hash(us_password, 10);

    const newUser = await user.create({
      us_username,
      us_email,
      us_phone_number,
      us_password: hashedPassword,
      us_is_active: false,
      us_is_admin: false,
      us_created_at: new Date(),
      us_updated_at: new Date(),
    });

    // generate token
    const verificationToken = generateToken(
      newUser.us_id,
      newUser.us_email,
      newUser.us_username,
      newUser.us_is_admin,
      newUser.us_phone_number,
      "1h"
    );

    // send email
    await sendEmail(
      newUser.us_username,
      newUser.us_email,
      "Verification Email Address",
      "Please verify your email",
      `${process.env.BASE_URL}/auth/verify-email?token=${verificationToken}`,
      "Verify Email"
    );

    await token.create({
      tkn_value: verificationToken,
      tkn_type: "REGISTER_TOKEN",
      tkn_description: `Successfully created token for user ${newUser.us_email}`,
      tkn_us_id: newUser.us_id,
      tkn_expired_on: new Date(new Date().getTime() + 60 * 60 * 1000),
      tkn_is_active: true,
      tkn_created_at: new Date(),
      tkn_updated_at: new Date(),
    });

    delete newUser.dataValues.us_password;

    return res.status(201).json({
      status: "success",
      code: 201,
      message: "User successfully created",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

const authLogin = async (req, res) => {
  try {
    const { input, us_password, rememberMe } = req.body;

    const loginUser = await user.findOne({
      where: {
        [Op.or]: [{ us_email: input }, { us_username: input }],
      },
      attributes: [
        "us_id",
        "us_username",
        "us_email",
        "us_phone_number",
        "us_password",
        "us_is_active",
        "us_is_admin",
      ],
    });

    if (!loginUser) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "User not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      us_password,
      loginUser.us_password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Password is incorrect",
      });
    }

    if (!loginUser.us_is_active) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Please verify your email first",
        data: loginUser.us_email,
      });
    }

    const tokenDuration = rememberMe ? "7d" : "1h";
    const cookieExpiry = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000;

    const loginToken = generateToken(
      loginUser.us_id,
      loginUser.us_email,
      loginUser.us_username,
      loginUser.us_is_admin,
      loginUser.us_phone_number,
      tokenDuration
    );

    await token.create({
      tkn_value: loginToken,
      tkn_type: "LOGIN_TOKEN",
      tkn_description: `Successfully created token for user ${loginUser.us_email}`,
      tkn_us_id: loginUser.us_id,
      tkn_expired_on: new Date(new Date().getTime() + cookieExpiry),
      tkn_is_active: true,
      tkn_created_at: new Date(),
      tkn_updated_at: new Date(),
    });

    delete loginUser.dataValues.us_password;
    loginUser.dataValues.token = loginToken;

    return res.status(201).json({
      status: "success",
      code: 201,
      message: "Login success",
      data: loginUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

const authLogout = async (req, res) => {
  try {
    const tokens = req.cookies.Authentication;

    if (tokens) {
      const decodedToken = jwt.decode(tokens);

      if (decodedToken && decodedToken.us_id) {
        const { us_id } = decodedToken;

        const userToken = await token.findOne({
          where: { tkn_us_id: us_id },
        });

        if (userToken) {
          await userToken.update({ tkn_is_active: false });
        }
      }
    }

    res.clearCookie("Authentication");

    return res.json({
      status: "success",
      code: 200,
      message: "Logout successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

const sendEmailforgotPassword = async (req, res) => {
  try {
    const { us_email } = req.body;

    const userForgotPass = await user.findOne({
      where: { us_email },
      attributes: ["us_id", "us_email", "us_username"],
    });

    if (!userForgotPass) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "User not found",
      });
    }

    const forgotPasswordToken = generateToken(
      userForgotPass.us_id,
      userForgotPass.us_email,
      userForgotPass.us_username,
      userForgotPass.us_is_admin,
      userForgotPass.us_phone_number,
      "1h"
    );

    await token.create({
      tkn_value: forgotPasswordToken,
      tkn_type: "FORGOT_PASSWORD_TOKEN",
      tkn_description: `Successfully created token for user ${userForgotPass.us_email}`,
      tkn_us_id: userForgotPass.us_id,
      tkn_expired_on: new Date(new Date().getTime() + 60 * 60 * 1000),
      tkn_is_active: true,
      tkn_created_at: new Date(),
      tkn_updated_at: new Date(),
    });

    await sendEmail(
      userForgotPass.us_username,
      userForgotPass.us_email,
      "Forgot Password Rifqi Top Up",
      "Please click the button below to reset your password",
      `${process.env.FRONTEND_URL}/create-new-password?token=${forgotPasswordToken}`,
      "Reset Password"
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Email sent successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

const sendEmailVerification = async (req, res) => {
  try {
    const { us_email } = req.body;

    const userSendEmail = await user.findOne({
      where: { us_email },
      attributes: ["us_id", "us_email", "us_username"],
    });

    if (!userSendEmail) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "User not found",
      });
    }

    if (userSendEmail.us_is_active) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Email already verified",
      });
    }

    const verificationToken = generateToken(
      userSendEmail.us_id,
      userSendEmail.us_email,
      userSendEmail.us_username,
      userSendEmail.us_is_admin,
      userSendEmail.us_phone_number,
      "1h"
    );

    await token.create({
      tkn_value: verificationToken,
      tkn_type: "VERIFICATION_TOKEN",
      tkn_description: `Successfully created token for user ${user.us_email}`,
      tkn_us_id: userSendEmail.us_id,
      tkn_expired_on: new Date(new Date().getTime() + 60 * 60 * 1000),
      tkn_is_active: true,
      tkn_created_at: new Date(),
      tkn_updated_at: new Date(),
    });

    await sendEmail(
      userSendEmail.us_username,
      userSendEmail.us_email,
      "Verification Email Address",
      "Please verify your email",
      `${process.env.BASE_URL}/auth/verify-email?token=${verificationToken}`,
      "Verify Email"
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Email sent successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

const loginWithGoogle = async (req, res) => {
  const { idToken, rememberMe } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("decoded token", decodedToken);

    let userGoogle = await user.findOne({
      where: {
        us_email: decodedToken.email,
      },
    });

    if (!userGoogle) {
      userGoogle = await user.create({
        us_username: decodedToken.name,
        us_email: decodedToken.email,
        us_phone_number: "08xxxxxxxxxx",
        us_password: await bcrypt.hash(generateRandomCharacter(10), 10),
        us_is_active: true,
        us_is_admin: false,
        us_created_at: new Date(),
        us_updated_at: new Date(),
      });
    }

    let milliseconds = 24 * 60 * 60 * 1000;
    if (rememberMe) {
      milliseconds *= 30;
    }
    const expiresIn = new Date(Date.now() + milliseconds);

    const loginToken = generateToken(
      userGoogle.us_id,
      userGoogle.us_email,
      userGoogle.us_username,
      userGoogle.us_is_admin,
      userGoogle.us_phone_number,
      rememberMe ? "30d" : "1h"
    );

    await token.create({
      tkn_value: loginToken,
      tkn_type: "LOGIN_TOKEN",
      tkn_description: `Successfully created token for user ${userGoogle.us_email}`,
      tkn_us_id: userGoogle.us_id,
      tkn_expired_on: expiresIn,
      tkn_is_active: true,
      tkn_created_at: new Date(),
      tkn_updated_at: new Date(),
    });

    delete userGoogle.dataValues.us_password;
    userGoogle.dataValues.token = loginToken;

    return res.status(201).json({
      status: "success",
      code: 201,
      message: "Login success",
      data: userGoogle,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: "error",
      code: 400,
    });
  }
};

const updateResetPassword = async (req, res) => {
  const { us_password } = req.body;
  const { token } = req.query;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(400).json({
      message:
        "Token expired or invalid, please request a new link to reset password",
      status: "error",
      code: 400,
    });
  }

  const { us_id } = decoded;

  try {
    const hashedPassword = await bcrypt.hash(us_password, 10);

    await user.update({ us_password: hashedPassword }, { where: { us_id } });

    return res.status(200).json({
      message: "Password updated successfully",
      status: "success",
      code: 200,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: "error",
      code: 400,
    });
  }
};

module.exports = {
  authLogin,
  authLogout,
  authRegisterUser,
  loginWithGoogle,
  sendEmailforgotPassword,
  sendEmailVerification,
  updateResetPassword,
};
