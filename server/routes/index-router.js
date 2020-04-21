const express = require("express");

const app = express();

app.use(require("./login-router"));
app.use(require("./user-router"));
app.use(require("./categories-routes"));
app.use(require("./products-routes"));
app.use(require("./uploads-routes"));
app.use(require("./images-routes"));

module.exports = app;