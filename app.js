const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./config/db");

const userRoutes = require("./routes/authRoutes");
const otpRoutes = require("./routes/otpRoutes");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
db();


app.use("/auth", userRoutes);
app.use("/auth", otpRoutes);



app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
