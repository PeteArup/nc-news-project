const express = require('express')
const apiRouter = require('./routers/api.router');
const {
  handlePathErrors,
  handleCustomErrors,
  handlePSQLErrors,
  handle500Errors
} = require('./errors');

const app = express();

app.use(express.json())
app.use('/api', apiRouter)

app.all('*', handlePathErrors)
app.use(handleCustomErrors)
app.use(handlePSQLErrors)
app.use(handle500Errors)


module.exports = app;