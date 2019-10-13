require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const ImageRecog = require('./imgrecog.js');
const IntentRecog = require('./intentrecog.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_DB_URL);

const HOSTED_DOMAIN = "http://0.0.0.0:3000";

const Location = mongoose.model('Location', new Schema({location: String, date: Date}));
const Speech = mongoose.model('Speech', new Schema({speech: String, date: Date}));
const Image = mongoose.model('Image', new Schema({image: String, date: Date, objects: [String]}));
const Person = mongoose.model('Person', new Schema({person: String, date: Date}));

let app = express();
let urlencodedParser = bodyParser.urlencoded({
    extended: false
});
let jsonParser = bodyParser.json();


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// index
app.get('/', (req, res) => {
    res.render('index');
});

// question
app.post('/question', urlencodedParser, async (req, res) => {
    let {question} = req.body;
    res.send(await IntentRecog.recognizeIntent(question));
});

app.post('/location', jsonParser, (req, res) => {
    let { location, date } = req.body;
    let model = new Location({ location, date });
    model.save();
    console.log(location,date);
    res.send('ok');
});

app.post('/speech', jsonParser, (req, res) => {
    let { speech, date } = req.body;
    let model = new Speech({ speech, date });
    model.save();
    console.log(speech,date);
    res.send('ok');
});

app.post('/image', jsonParser, (req, res) => {
    let { image, date } = req.body;
    let tags = ImageRecog.tagImage(image);
    let tagFinal = [];
    for(let tag in tags) {
        tagFinal.push(tags['name']);
    }

    let model = new Image({ image, date, objects: tagFinal });
    model.save();
    console.log(image,date);
    res.send('ok');
});

app.listen(3000, () => {
    console.log('app running on port 3000');
});