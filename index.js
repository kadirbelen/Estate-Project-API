const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./src/services/dbConnection");
const categoryRouter = require("./src/routes/CategoryRouter");
const advertRouter = require("./src/routes/AdvertRouter");
const propertyRouter = require("./src/routes/propertyRouters.js/PropertyRouter");
const propertyCategoryRouter = require("./src/routes/propertyRouters.js/PropertyCategoryRouter");
const propertyItemRouter = require("./src/routes/propertyRouters.js/PropertyItemRouter");
const userRouter = require("./src/routes/UserRouter");

const port = 3000;
const hostname = "127.0.0.1";

app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/categories", categoryRouter);
app.use("/adverts", advertRouter);
app.use("/properties", propertyRouter);
app.use("/propertyCategoires", propertyCategoryRouter);
app.use("/propertyItems", propertyItemRouter);

app.listen(port, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});