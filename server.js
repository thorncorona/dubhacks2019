const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(
    "mongodb://dubhacks2019:kRELOvNfcpUBOT9XSDT7INB97ujHYLdlZSZHodJfpBvpw9u2QlxkvXm54a64VtYQleAM3nOzpSVgr0nqQyP15w%3D%3D@dubhacks2019.documents.azure.com:10255/?ssl=true");

const HOSTED_DOMAIN = "http://localhost:3000";

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
app.post('/question', urlencodedParser, (req, res) => {
    let {question} = req.body;
    res.send('no response for ' + question);
});

app.post('/location', jsonParser, (req, res) => {
    let { location, date } = req.body;
    let lModel = new Location({ location, date });
    lModel.save();
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
    let model = new Image({ image, date });
    model.save();
    console.log(image,date);
    res.send('ok');
});

app.listen(3000, () => {
    console.log('app running on port 3000');
});