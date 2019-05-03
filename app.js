const express = require('express')
const app = express()
const port = 3000

const sampleJson = {
    items: [
        {a: 123}
    ]
}
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/timeslot', (req, res) => res.json(sampleJson))
app.get('/increase', (req, res) => {
    sampleJson.items.push({ b: 123 });
    res.json(sampleJson);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))