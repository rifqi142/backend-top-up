require("dotenv").config();
require("module-alias/register");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("@/config/swagger-output.json");

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const authRouter = require("@/routes/authRouter");
const categoryRouter = require("@/routes/categoryRouter");
const productRouter = require("@/routes/productRouter");
const orderRouter = require("@/routes/orderRouter");
const promotionRouter = require("@/routes/promotionRouter");
const adminRouter = require("@/routes/admin.route");

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to top-up app",
    status: "success",
  });
});

app.use(express.static("public"));

app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/promotion", promotionRouter);
app.use("/admin", adminRouter);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
