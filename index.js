const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./src/services/dbConnection");
const categoryRouter = require("./src/routes/CategoryRouter");
const advertRouter = require("./src/routes/AdvertRouter");
const featureRouter = require("./src/routes/featureRouters/FeatureRouter");
const featureCategoryRouter = require("./src/routes/featureRouters/FeatureCategoryRouter");
const featureItemRouter = require("./src/routes/featureRouters/FeatureItemRouter");
const userRouter = require("./src/routes/UserRouter");
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
app.use("/adverts", advertRouter);
app.use("/features", featureRouter);
app.use("/featureCategoires", featureCategoryRouter);
app.use("/featureItems", featureItemRouter);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.PORT || 3000, function() {
    console.log(
        "Express server listening on port %d in %s mode",
        this.address().port,
        app.settings.env
    );
});
// app.listen(port, host, function() {
//     console.log(`Server running at http://${hostname}:${port}/`);
//     console.log(`Server running at http://${hostname}:${port}/doc`);
// });