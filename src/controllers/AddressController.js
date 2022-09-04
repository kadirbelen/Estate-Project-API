const City = require("../models/addressModels/City");
const District = require("../models/addressModels/District");
const Town = require("../models/addressModels/Town");
const genericController = require("./GenericController");

const getCity = async (req, res) => {
    await genericController.genericGet(res, City);
};

const getDistrictByCity = async (req, res) => {
    await genericController.genericGetByQuery(res, District, {
        city: req.params.cityId
    });
};

const getTownByDistrict = async (req, res) => {
    await genericController.genericGetByQuery(res, Town, {
        district: req.params.districtId
    });
};

module.exports = { getCity, getDistrictByCity, getTownByDistrict };
