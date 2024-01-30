
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./router/routes");
const port =  3001;


app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(port);


module.exports = app;