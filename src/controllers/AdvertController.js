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
        const advert = await Advert.find({
            category: req.params.id,
        });
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