const express = require("express");
const routes = require("./routes");

const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/images", express.static("public/images"));

// Routes
app.use("/types", routes.typesRouter);
app.use("/roles", routes.rolesRouter);

module.exports = app;
