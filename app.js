const express = require('express')
const apiRouter = require('./routers/api.router');
const {
  handlePathErrors,
  handleCustomErrors,
  handlePSQLErrors
} = require('./errors');

const app = express();

app.use(express.json())
app.use('/api', apiRouter)

app.all('*', handlePathErrors)
app.use(handleCustomErrors)
app.use(handlePSQLErrors)



module.exports = app;