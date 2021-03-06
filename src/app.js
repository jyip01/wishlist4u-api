const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const listsRouter = require("./lists/lists-router");
const wishesRouter = require("./wishes/wishes-router");
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");

const app = express();

const morganOption = NODE_ENV === "production" 
  ? "tiny" 
  : "common";

app.use(morgan(morganOption));
app.use(cors({
  origin: 'https://wishlist4u-client.vercel.app'
}));
app.use(helmet());

app.use("/api/lists", listsRouter);
app.use("/api/wishes", wishesRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
