const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.disable("x-powered-by");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/images", express.static("public/images"));

// Routes
app.use("/types", routes.typesRouter);
app.use("/roles", routes.rolesRouter);
app.use("/status", routes.statusRouter);
app.use("/creators", routes.creatorsRouter);
app.use("/medias", routes.mediasRouter);

module.exports = app;
