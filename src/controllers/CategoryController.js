const Category = require("../models/Category");

const categoryPost = async(req, res) => {
    try {
        /**
         * 1-CategoryName ve parent bilgisi gelir
         * 2-parent almamızın sebebi hiyerarşi için(id)
         */
        const category = new Category({
            categoryName: req.body.categoryName,
            parent: req.body.parent, //parent id(hangi kategorinin alt kategorisi)
        });
        res.json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const categoryUpdate = async(req, res) => {
    try {
        /**
         * 1-CategoryName ve parent bilgisi gelir
         * 2-parent almamızın sebebi hiyerarşi için(id)
         */
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getSubCategory = async(req, res) => {
    try {
        /**
         * 1-Category_id gelir ve o category bulunur
         * 2-o category altındaki yapılar getirilir
         */
        const parent = await Category.findOne({ _id: req.params.id });
        const tree = await parent.getChildrenTree({
            options: { lean: false },
        });
        // var array = [];
        // tree.map((item) => {
        //     array.push({ id: item._id, categoryName: item.categoryName });
        // });

        res.json(tree);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { categoryPost, getSubCategory, categoryUpdate };