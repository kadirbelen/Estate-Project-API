const genericPost = async(req, res, model) => {
    try {
        const newModel = new model(req.body);
        await newModel.save();
        res.json(newModel);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const genericUpdate = async(req, res, model) => {
    try {
        const newModel = await model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(newModel);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const genericDelete = async(req, res) => {
    try {
        await model.findByIdAndRemove(req.params.id);
        res.json({ information: "ürün silindi" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { genericDelete, genericPost, genericUpdate };