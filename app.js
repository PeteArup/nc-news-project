const express = require("express");
const apiRouter = require("./routers/api.router");
const {
  handlePathErrors,
  handleCustomErrors,
  handlePSQLErrors,
  handle500Errors,
} = require("./errors");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", apiRouter);

app.all("*", handlePathErrors);
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handle500Errors);

module.exports = app;
