const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const sampleJson = {
    items: [
        { timeslot: "1PM-2PM", scheduled: false },
        { timeslot: "4PM-6PM", scheduled: false },
        { timeslot: "10PM-11PM", scheduled: false },
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

app.get('/clear', (req, res) => {
    sampleJson.items = []
    res.send('cleared')
});

app.post('/addTimeslot', function (req, res) {
    const newTime = req.body.timeslot;
    const newTimeslot = {timeslot: newTime, scheduled: false}
    sampleJson.items.push(newTimeslot);
    res.json({ requestBody: req.body })
});

app.post('/updateTimeslot', function (req, res) {
    const bookedTime = req.body.timeslot;
    sampleJson.items.forEach(item => {
        if (item.timeslot === bookedTime) {
            item.scheduled = true;
        }
    })
    res.json({ok: true})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))