const { google } = require("googleapis");
const fs = require("fs");
let stream = require("stream");

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

async function uploadFile(fileObject) {
    try {
        var folderId = "1hFKDwve9yGDUgmLaByVun_kaSzJmi8S9";
        var bufferStream = new stream.PassThrough();
        bufferStream.end(fileObject.buffer);
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
        console.log(error.message);
    }
}

async function deleteFile(req, res) {
    try {
        const response = await drive.files.delete({
            fileId: req.params.remoteId,
        });
    } catch (error) {
        console.log(error.message);
    }
}

async function publicUrl(req, res) {
    try {
        const { file } = req;
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
        console.log(error.message);
    }
}
module.exports = { publicUrl, deleteFile };