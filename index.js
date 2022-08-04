const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./src/services/dbConnection");
const categoryRouter = require("./src/routes/CategoryRouter");
const advertRouter = require("./src/routes/AdvertRouter");
const port = 3000;
const hostname = "127.0.0.1";

app.use(bodyParser.json());

app.use("/categories", categoryRouter);
app.use("/adverts", advertRouter);

app.listen(port, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});