const express = require("express");
const router = express.Router();
const {
  authLogin,
  authLogout,
  authRegisterUser,
  loginWithGoogleIn,
  sendEmailforgotPassword,
  sendEmailVerification,
  updatePassword,
} = require("@/controllers/authController");

const {
  authBodyValidation,
  authCheckDuplicate,
} = require("@/validations/authValidation");

router.post(
  "/register",
  authBodyValidation,
  authCheckDuplicate,
  authRegisterUser
);
router.post("/login", authLogin);
router.post("/logout", authLogout);
router.post("/forgot-password", sendEmailforgotPassword);
router.put("/update-password", updatePassword);
router.post("/send-email-verification", sendEmailVerification);

router.post("/login/google", loginWithGoogleIn);

router.post;
module.exports = router;
