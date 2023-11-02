const express = require('express');
const connectDb = require('./src/config/dbConnection');
const errorHandler = require('./src/middleware/errorHandler');

connectDb();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/contacts', require('./src/routes/contactRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running in port ${port}`);
  console.log(`http://localhost:${port}`);
});
export {};
