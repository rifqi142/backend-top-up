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

const authRouter = require("@/routes/auth.route");
const categoryRouter = require("@/routes/category.route");
const productRouter = require("@/routes/product.route");
const orderRouter = require("@/routes/order.route");
const promotionRouter = require("@/routes/promotion.route");
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
