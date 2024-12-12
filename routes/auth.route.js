const express = require("express");
const router = express.Router();
const {
  authLogin,
  authLogout,
  authRegisterUser,
  loginWithGoogle,
  sendEmailforgotPassword,
  sendEmailVerification,
  updateResetPassword,
} = require("@/controllers/auth.controller");

const { verifyEmail } = require("@/controllers/token.controller");

const {
  registerBodyValidation,
  registerCheckDuplicate,
  loginBodyValidation,
} = require("@/validations/auth.validation");

router.post(
  "/register",
  registerBodyValidation,
  registerCheckDuplicate,
  authRegisterUser
);
router.post("/login", loginBodyValidation, authLogin);
router.post("/logout", authLogout);
router.post("/forgot-password", sendEmailforgotPassword);
router.put("/update-reset-password", updateResetPassword);
router.post("/send-email-verification", sendEmailVerification);
router.get("/verify-email", verifyEmail);

router.post("/google-login", loginWithGoogle);

module.exports = router;
