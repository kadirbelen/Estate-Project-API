const genericController = require("./GenericController");
const Property = require("../models/Property");

const propertyPost = async(req, res) => {
    await genericController.genericPost(req, res, Property);
};

// const interiorUpdate = async(req, res) => {
//     await genericController.genericPost(req, res, Interior);
// };

module.exports = { propertyPost };