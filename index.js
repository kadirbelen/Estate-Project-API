const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./src/services/dbConnection");
const categoryRouter = require("./src/routes/CategoryRouter");
const advertHousingRouter = require("./src/routes/AdvertHousingRouter");
const advertWorkPlaceRouter = require("./src/routes/AdvertWorkPlaceRouter");
const advertLandRouter = require("./src/routes/AdvertLandRouter");
const advertRouter = require("./src/routes/AdvertRouter");
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
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// app.use("/", (req, res) => {
//     console.log(req);
// });

app.use("/user", userRouter);
app.use("/categories", categoryRouter);
app.use("/location", addressRouter);
app.use("/advertHousing", advertHousingRouter);
app.use("/advertWorkPlace", advertWorkPlaceRouter);
app.use("/advertLand", advertLandRouter);
app.use("/advert", advertRouter);
app.use("/features", featureRouter);
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