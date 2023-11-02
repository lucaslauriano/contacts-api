export const express = require('express');
const serverConnectDb = require('./src/config/dbConnection');
const serverErrorHandler = require('./src/middleware/errorHandler');

serverConnectDb();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/contacts', require('./src/routes/contactRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use(serverErrorHandler);

app.listen(port, () => {
  console.log(`server running in port ${port}`);
  console.log(`http://localhost:${port}`);
});
