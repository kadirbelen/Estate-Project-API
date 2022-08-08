const Advert = require("../models/Advert");
const AdvertProperty = require("../models/AdvertProperty");
const genericController = require("./GenericController");

// const advertPost = async(req, res) => {
//     const advertProperty = await AdvertProperty(req.body.properties);
//     await genericController.genericPost({...req.body, properties: advertProperty._id },
//         res,
//         Advert
//     );
// };
const advertPost = async(req, res) => {
    try {
        const advertProperty = await AdvertProperty(req.body.properties);
        const advert = new Advert({...req.body, properties: advertProperty._id });
        await advertProperty.save();
        await advert.save();
        res.json(advert);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const advertUpdate = async(req, res) => {
    await genericController.genericUpdate(req, res, Advert);
};

const advertDelete = async(req, res) => {
    await genericController.genericDelete(req, res);
};

const advertGetByCategory = async(req, res) => {
    try {
        console.log("id:", req.params.id);
        // var pattern = `\^"${req.params.id}\"`;
        const advert = await Advert.find({
            categoryPath: { $regex: `\^${req.params.id}` },
        }).populate("properties");
        // /^req.params.id$/i
        // categoryPath: {
        //     $in: [/^62eba4ac842c6ee14394ecdf#62eba4c9842c6ee14394ece5/],
        // },
        res.json(advert);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    advertPost,
    advertUpdate,
    advertDelete,
    advertGetByCategory,
};