const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const sampleJson = {
    items: [
        {timeSlot: "1PM-2PM", scheduled: true},
        { timeSlot: "4PM-6PM", scheduled: true },
        { timeSlot: "10PM-11PM", scheduled: false },
    ]
}

const ampJson = {
    "items": [
        {
            "fullname": "John Doe",
            "phonenumber": "212-555-1212",
            "cart_items": [
                {
                    "name": "Pluot",
                    "quantity": 5,
                    "price": "$1.00"
                },
                {
                    "name": "Apple",
                    "quantity": 1,
                    "price": "$3.25"
                }
            ],
            "address": {
                "addr1": "111 8th Ave",
                "city": "New York",
                "state": "NY",
                "zipcode": 10011
            }
        }
    ]
};
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("access-control-expose-headers", "AMP-Access-Control-Allow-Source-Origin, AMP-Redirect-To");
    res.header("amp-access-control-allow-source-origin", "amp@gmail.dev");
    next();
});
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/timeslot', (req, res) => res.json(sampleJson))
app.get('/increase', (req, res) => {
    sampleJson.items.push({timeSlot: "1AM-2AM", scheduled: false });
    res.json(sampleJson);
})
app.get('/amp', (req, res) => res.json(ampJson));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))