const { connect } = require('mongoose');
require('dotenv').config();
const { ChalkAdvanced } = require('chalk-advanced');

connect(process.env.MONGOURI, {
  keepAlive: true,
}).then(() => console.log(`${ChalkAdvanced.white('Database')} ${ChalkAdvanced.gray('>')} ${ChalkAdvanced.green('Successfully loaded database')}`));
