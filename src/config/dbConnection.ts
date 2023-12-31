const mongoose = require('mongoose');

require('dotenv').config();
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Database connected! ');
    console.log('DB_PORT! ', connect.connection.port);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
