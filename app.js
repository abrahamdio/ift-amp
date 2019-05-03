const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const sampleJson = {
    items: [
        {a: 123}
    ]
}
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
    sampleJson.items.push({ b: 123 });
    res.json(sampleJson);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))