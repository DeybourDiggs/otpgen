const swaggerAutogen = require("swagger-autogen")({ openapi: "3.1.0" });

function swaggerAutogen(outputFile, endpointFiles, config) {
  outputFile = "./swagger.json";
  endpointFiles = ["./app.js"];
  config = {};
}

module.exports = swaggerAutogen;
