const { google } = require("googleapis");
const fs = require("fs");
let stream = require("stream");
var Jimp = require("jimp");

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
});
//text yazısı
// var sizeOf = require("image-size");
// async function textOverlay(fileObject) {
//     const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
//     const image = await Jimp.read(fileObject.buffer);
//     var dimensions = sizeOf(fileObject.buffer);
//     const file = image.print(
//         font,
//         dimensions.width / 4,
//         dimensions.height / 2,
//         "RENTIZ"
//     );
//     console.log("size", dimensions.width, dimensions.height);
//     let bufferImage;
//     file.getBuffer(fileObject.mimetype, (err, buffer) => {
//         bufferImage = buffer;
//     });
//     return bufferImage;
// }

//resimlerin üzerine logo ekleme
async function waterMark(fileObject) {
    let watermark = await Jimp.read("uploads\\rentiz.png");
    watermark = watermark.resize(100, 100);
    const image = await Jimp.read(fileObject.buffer);
    image.composite(watermark, 0, 0, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 0.5,
    });
    let bufferImage;
    image.getBuffer(fileObject.mimetype, (err, buffer) => {
        bufferImage = buffer;
    });
    return bufferImage;
}

async function uploadFile(fileObject) {
    try {
        const buffer = await waterMark(fileObject);
        var folderId = "1hFKDwve9yGDUgmLaByVun_kaSzJmi8S9";
        var bufferStream = new stream.PassThrough();
        bufferStream.end(buffer);
        var mimeType = fileObject.mimetype;
        var fileName = Date.now() + "-" + fileObject.originalname;
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: mimeType,
                parents: [folderId],
            },
            media: {
                mimeType: mimeType,
                body: bufferStream,
            },
        });
        return response.data;
    } catch (error) {
        console.log("deneme");
        console.log(error);
    }
}

async function deleteFile(fileId, res) {
    try {
        const response = await drive.files.delete({
            fileId: fileId,
        });
    } catch (error) {
        console.log(error.message);
    }
}

async function publicUrl(req, res) {
    try {
        const { file } = req;
        console.log("file", file);
        const data = await uploadFile(file);
        await drive.permissions.create({
            fileId: data.id,
            requestBody: {
                role: "reader",
                type: "anyone",
            },
        });
        const result = await drive.files.get({
            fileId: data.id,
            fields: "webViewLink,webContentLink",
        });
        const imageUrl = await result.data.webContentLink.split(
            "&export=download"
        )[0];

        // await textOverlay(imageUrl);
        // console.log("url", imageUrl);

        const response = { remoteId: data.id, url: imageUrl, name: data.name };
        return response;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { publicUrl, deleteFile };