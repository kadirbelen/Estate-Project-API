const { google } = require("googleapis");
const Jimp = require("jimp");
const stream = require("stream");
const sharp = require("sharp");

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

//filigran ekleme
async function waterMark(fileObject, buffer) {
    let watermark = await Jimp.read("uploads\\rentiz.png");
    watermark = watermark.resize(200, 200);
    const image = await Jimp.read(buffer);
    image.composite(watermark, 0, 0, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 0.5,
    });
    let bufferImage;
    image.getBuffer(fileObject.mimetype, (err, imageBuffer) => {
        bufferImage = imageBuffer;
    });
    return bufferImage;
}

//image kalite düşürme
async function qualityOptions(fileObject) {
    const buffer = await sharp(fileObject.buffer)
        .jpeg({ quality: 50, mozjpeg: true })
        .toBuffer();
    return buffer;
}

async function uploadFile(fileObject) {
    try {
        const { buffer } = await qualityOptions(fileObject);
        const imageFiligran = await waterMark(fileObject, buffer);
        const folderId = "1hFKDwve9yGDUgmLaByVun_kaSzJmi8S9";
        const bufferStream = new stream.PassThrough();
        bufferStream.end(imageFiligran);
        const mimeType = fileObject.mimetype;
        const fileName = Date.now() + fileObject.originalname; //date format
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                mimeType,
                parents: [folderId],
            },
            media: {
                mimeType,
                body: bufferStream,
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

async function deleteFile(fileId) {
    try {
        await drive.files.delete({
            fileId,
        });
    } catch (error) {
        console.log(error.message);
    }
}

async function publicUrl(req) {
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

        const response = { remoteId: data.id, url: imageUrl, name: data.name };
        return response;
    } catch (error) {
        return error;
    }
}

module.exports = { publicUrl, deleteFile };


// text yazısı
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

// resimlerin üzerine logo ekleme

/*
sharp(input)
  .toBuffer()
  .then(data => { ... })
  .catch(err => { ... });
  */