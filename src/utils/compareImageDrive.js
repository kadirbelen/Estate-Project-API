const schedule = require("node-schedule");
const ImageTemporary = require("../models/ImageTemporary");
const deleteFile = require("../services/googleDriveService").deleteFile;

const rule = new schedule.RecurrenceRule();
rule.hour = 03;
rule.minute = 30;

const imageCompare = schedule.scheduleJob(rule, async function() {
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