const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./src/services/dbConnection");
const categoryRouter = require("./src/routes/CategoryRouter");
const advertRouter = require("./src/routes/AdvertRouter");
const imageRouter = require("./src/routes/ImageRouter");
const featureRouter = require("./src/routes/FeatureRouter");
const userRouter = require("./src/routes/UserRouter");
const addressRouter = require("./src/routes/AddressRouter");
const swaggerUi = require("swagger-ui-express");
var cors = require("cors");
const swaggerFile = require("./static/openapi.json");
require("dotenv/config");

app.use(
    cors({
        origin: "*",
    })
);
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/categories", categoryRouter);
app.use("/location", addressRouter);
app.use("/advert", advertRouter);
app.use("/image", imageRouter);
app.use("/features", featureRouter);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.PORT || 3000, function() {
    console.log(
        "Express server listening on port %d in %s mode",
        this.address().port,
        app.settings.env
    );
});