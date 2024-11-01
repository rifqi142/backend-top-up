const fs = require("fs");
const { transpile } = require("postman2openapi");
require("dotenv").config();
const axios = require("axios");

(async () => {
  const response = await axios.get(
    `${process.env.POSTMAN_API_URL}?access_key=${process.env.POSTMAN_ACCESS_KEY}`
  );
  const openapi = transpile(response.data.collection);

  fs.writeFile(
    "./config/swagger-output.json",
    JSON.stringify(openapi, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("OpenAPI JSON file has been saved successfully.");
      }
    }
  );
})();
