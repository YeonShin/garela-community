require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { swaggerUi, swaggerDocs } = require('./swagger');
const usersRouter = require('./routes/users');

const app = express();
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/users', usersRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
