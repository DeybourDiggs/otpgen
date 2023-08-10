const mongoose = require("mongoose");


function db() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((r) => {
      console.log("Database Connected");
    })
    .catch((err) => console.log(err));
}

module.exports = db;
