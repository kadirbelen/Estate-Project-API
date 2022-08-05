const Advert = require("../models/Advert");
const genericController = require("./GenericController");

const advertPost = async(req, res) => {
    await genericController.genericPost(req, res, Advert);
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
        });
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