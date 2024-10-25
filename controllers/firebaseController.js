const admin = require("firebase-admin");
const serviceAccount = require("@/config/rifqi-top-up-firebase-adminsdk-cgb7j-f43c6f3616.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
