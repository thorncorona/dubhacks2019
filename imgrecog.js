require('dotenv').config();

const ComputerVisionClient = require('azure-cognitiveservices-computervision');
const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
const path = require('path');
const fs = require('fs');

const credentials = new CognitiveServicesCredentials(process.env.MS_AZURE_CS_CV_KEY);
const endpoint = process.env.MS_AZURE_CS_CV_ENDPOINT;

let client = new ComputerVisionClient(credentials, endpoint);

const Buffer = require('buffer');
const Duplex = require('stream').Duplex;

function bufferToStream(buffer) {
    let stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

function b64toStream(base64) {
    return bufferToStream(Buffer.from(base64, "base64"));
}

console.log(path.join(__dirname, 'street.jpg'));
let fileStream = fs.createReadStream(path.join(__dirname, 'street.jpg'));

async function tagImage(b64) {
    let res = await client.analyzeImageInStream(b64toStream(b64), {
        visualFeatures: ['Categories', 'Tags', 'Description']
    });
    return res.tags;
}

module.exports = {
    tagImage
};
