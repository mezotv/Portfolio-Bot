const { connect } = require("mongoose");
require("dotenv").config();
const { ChalkAdvanced } = require("chalk-advanced");

async function loadDB() {
  connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log(`${ChalkAdvanced.white("Database")} ${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green("Successfully loaded database")}`));
}
module.exports = { loadDB };
