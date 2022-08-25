const paginate = async(array, req) => {
    try {
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 12;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const pageList = array.slice((page - 1) * pageSize, page * pageSize);
        return { pageList, page, pageSize };
    } catch (error) {
        return { error };
    }
};

module.exports = paginate;