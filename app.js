const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const sampleJson = {
    items: [
        { timeSlot: "1PM-2PM", scheduled: false },
        { timeSlot: "4PM-6PM", scheduled: false },
        { timeSlot: "10PM-11PM", scheduled: false },
    ]
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("access-control-expose-headers", "AMP-Access-Control-Allow-Source-Origin, AMP-Redirect-To");
    res.header("amp-access-control-allow-source-origin", "amp@gmail.dev");
    next();
});

app.use(express.json())
app.use(express.urlencoded());

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/timeslot', (req, res) => res.json(sampleJson))
app.get('/increase', (req, res) => {
    sampleJson.items.push({timeSlot: "1AM-2AM", scheduled: false });
    res.json(sampleJson);
})
app.get('/amp', (req, res) => res.json(ampJson));
app.post('/addTimeslot', function (req, res) {
    const newTime = req.body.timeslot;
    const newTimeslot = {timeslot: newTime, scheduled: false}
    sampleJson.items.push(newTimeslot);
    res.json({ requestBody: req.body })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))