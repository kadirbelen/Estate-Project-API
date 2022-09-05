const schedule = require("node-schedule");
const { deleteFile } = require("../services/googleDriveService");
const ImageTemporary = require("../models/ImageTemporary");

const rule = new schedule.RecurrenceRule();
rule.hour = 3;
rule.minute = 30;

const imageCompare = schedule.scheduleJob(rule, async() => {
    console.log("---------HOUR 03:30---------");
    const images = await ImageTemporary.find();
    if (images) {
        images.map(async(item) => {
            await deleteFile(item.remoteId);
        });
        await ImageTemporary.deleteMany({});
    } else {
        console.log("silinecek resim yok");
    }
    console.log("silinen resim adeti", images.length);
});

module.exports = imageCompare;