require('dotenv').config();
const request = require('request-promise');

const LUIS_QUERY_URL = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/8edb37d0-1eeb-46d1-9466-2c7d1e5495b5?staging=true&verbose=true&timezoneOffset=-360&subscription-key=99d8170159f34a34a96f5fb1444f3189&q="

async function recognizeIntent(text) {
    return await request(LUIS_QUERY_URL + encodeURIComponent(text));
}

module.exports = {
    recognizeIntent
};