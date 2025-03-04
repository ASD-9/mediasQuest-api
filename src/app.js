const express = require("express");

const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/images", express.static("public/images"));

// Routes

module.exports = app;
