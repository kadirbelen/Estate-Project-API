const cardSchema = async(list) => {
    const cardList = list
        .populate(["address.city", "address.town", "address.district"])
        .select({
            images: { $slice: ["$images", 1] },
            title: 1,
            price: 1,
            address: 1,
            squareMeters: 1,
            type: 1,
            favoriteCount: 1,
            createdAt: 1,
        });
    const data = await cardList.exec();
    return data;
};

module.exports = cardSchema;