const { connect } = require("mongoose");
require("dotenv").config();
const { ChalkAdvanced } = require("chalk-advanced");

module.exports = () => {
  connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log(`${ChalkAdvanced.white("Database")} ${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green("Successfully loaded database")}`));
}

