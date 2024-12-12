const admin = require("@/controllers/firebase.controller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { user, token } = require("@/models");
const { generateToken, sendEmail } = require("@/controllers/token.controller");
const generateRandomCharacter = require("@/helpers/generateRandomCharacter");

const authRegisterUser = async (req, res) => {
  try {
    const { us_username, us_email, us_phone_number, us_password } = req.body;

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
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal server error",
      error: error.message,
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
        message: "Login Failed",
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
        message: "Login Failed",
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

    const tokenDurationInDays = rememberMe ? 30 : 7;
    const cookieExpiry = tokenDurationInDays * 24 * 60 * 60 * 1000;

    const loginToken = generateToken(
      loginUser.us_id,
      loginUser.us_email,
      loginUser.us_username,
      loginUser.us_is_admin,
      loginUser.us_phone_number,
      tokenDurationInDays + "d"
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
    loginUser.dataValues.rememberMe = tokenDurationInDays;

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Login success",
      data: loginUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
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

    res.clearCookie("Authentication-User-Rifqi-Topup");

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
    res.status(500).json({
      status: "error",
      code: 500,
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
      return res.status(500).json({
        status: "error",
        code: 500,
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
    res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

const loginWithGoogle = async (req, res) => {
  const { idToken, rememberMe } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

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
        us_created_at: new Date(),
        us_updated_at: new Date(),
      });
    }

    const tokenDuration = rememberMe ? 30 : 7;
    const cookieExpiry = rememberMe
      ? 30 * 24 * 60 * 60 * 1000
      : 7 * 24 * 60 * 60 * 1000;

    const loginToken = generateToken(
      userGoogle.us_id,
      userGoogle.us_email,
      userGoogle.us_username,
      userGoogle.us_is_admin,
      userGoogle.us_phone_number,
      tokenDuration + "d"
    );

    await token.create({
      tkn_value: loginToken,
      tkn_type: "LOGIN_TOKEN",
      tkn_description: `Successfully created token for user ${userGoogle.us_email}`,
      tkn_us_id: userGoogle.us_id,
      tkn_expired_on: cookieExpiry,
      tkn_is_active: true,
      tkn_created_at: new Date(),
      tkn_updated_at: new Date(),
    });

    delete userGoogle.dataValues.us_password;
    userGoogle.dataValues.token = loginToken;
    userGoogle.dataValues.rememberMe = tokenDuration;

    return res.status(200).json({
      status: "success",
      code: 200,
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
