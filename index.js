const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./src/services/db-connection");
require("./src/utils/compare-image");
const categoryRouter = require("./src/routes/category");
const advertRouter = require("./src/routes/advert");
const imageRouter = require("./src/routes/image");
const featureRouter = require("./src/routes/feature");
const userRouter = require("./src/routes/user");
const addressRouter = require("./src/routes/address");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("./src/middlewares/error-handler");
var cors = require("cors");
const swaggerFile = require("./static/openapi.json");
require("dotenv/config");

app.use(
    cors({
        origin: "*",
    })
);
app.use(bodyParser.json());

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/locations", addressRouter);
app.use("/adverts", advertRouter);
app.use("/images", imageRouter);
app.use("/features", featureRouter);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorHandler);

app.listen(process.env.PORT || 3000, function () {
    console.log(
        "Express server listening on port %d in %s mode",
        this.address().port,
        app.settings.env
    );
});
