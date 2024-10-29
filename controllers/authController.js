const admin = require("@/controllers/firebaseController");
const bcrypt = require("bcrypt");

const { Op } = require("sequelize");
const { user, token } = require("@/models");
const { generateToken, sendEmail } = require("@/controllers/tokenController");

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
      "1h"
    );

    console.log("Verification Token :" + verificationToken);

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
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

const authLogin = async (req, res) => {
  try {
    const { input, us_password } = req.body;

    const loginUser = await user.findOne({
      where: {
        [Op.or]: [
          { us_email: input },
          { us_username: input },
          { us_phone_number: input },
        ],
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

    const loginToken = generateToken(
      loginUser.us_id,
      loginUser.us_email,
      loginUser.us_username,
      "1h"
    );

    await token.create({
      tkn_value: loginToken,
      tkn_type: "LOGIN_TOKEN",
      tkn_description: `Successfully created token for user ${loginUser.us_email}`,
      tkn_us_id: loginUser.us_id,
      tkn_expired_on: new Date(new Date().getTime() + 60 * 60 * 1000),
      tkn_is_active: true,
      tkn_created_at: new Date(),
      tkn_updated_at: new Date(),
    });

    delete loginUser.dataValues.us_password;
    loginUser.dataValues.token = loginToken;

    const option = {
      httpOnly: false,
      expires: new Date(new Date().getTime() + 60 * 60 * 1000),
    };

    return res.cookie("user", loginUser, option).json({
      status: "success",
      code: 200,
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
    if (req.cookies.user) {
      const { us_id } = req.cookies.user;
      await token.update(
        { tkn_is_active: false },
        { where: { tkn_us_id: us_id } }
      );
    }
    return res.clearCookie("user").json({
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
      forgotPasswordToken,
      `${process.env.FRONTEND_URL}/auth/reset-password/${forgotPasswordToken}`,
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

    const user = await user.findOne({
      where: { us_email },
      attributes: ["us_id", "us_email", "us_username"],
    });

    if (!user) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "User not found",
      });
    }

    const verificationToken = generateToken(
      user.us_id,
      user.us_email,
      user.us_username,
      "1h"
    );

    await token.create({
      tkn_value: verificationToken,
      tkn_type: "VERIFICATION_TOKEN",
      tkn_description: `Successfully created token for user ${user.us_email}`,
      tkn_us_id: user.us_id,
      tkn_expired_on: new Date(new Date().getTime() + 60 * 60 * 1000),
      tkn_is_active: true,
      tkn_created_at: new Date(),
      tkn_updated_at: new Date(),
    });

    await sendEmail(
      user.us_username,
      user.us_email,
      "Verification Email Address",
      "Please verify your email",
      "Verify Email",
      verificationToken,
      `${process.env.BASE_URL}/auth/verify-email/${verificationToken}`
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

const loginWithGoogleIn = async (req, res) => {
  const { idToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    res.status(200).json({
      message: "Login with google success",
      status: "success",
      code: 200,
      data: {
        uid,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: "error",
      code: 400,
    });
  }
};

const updatePassword = async (req, res) => {
  const { us_password } = req.body;
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { us_id } = decoded;

  try {
    const hashedPassword = await bcrypt.hash(us_password, 10);
    await user.update({ us_password: hashedPassword }, { where: { us_id } });
    res.status(200).json({
      message: "Password updated successfully",
      status: "success",
      code: 200,
    });
  } catch (error) {
    res.status(400).json({
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
  loginWithGoogleIn,
  sendEmailforgotPassword,
  sendEmailVerification,
  updatePassword,
};
