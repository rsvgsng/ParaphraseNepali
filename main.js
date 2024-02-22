const express = require('express');
const app = express();
require('isomorphic-fetch')
app.use(express.json());
require('cors')
app.use(require('cors')())
app.use(express.urlencoded({ extended: true }));
const languageCodes = [
    "tr",
    "sk",
    "sl",
    "pt-BR",
    "sa"
];
app.post('/ParaphaseEnglish', async (req, res) => {
    let query = req.body.q;
    let randomLanguageCode = languageCodes[Math.floor(Math.random() * languageCodes.length)]
    let clientQuery = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${randomLanguageCode}&dt=t&q=${query}`)
    let data = await clientQuery.json()
    let translatedData = (data[0][0][0])
    let clientQuery2 = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${randomLanguageCode}&tl=en&dt=t&q=${translatedData}`)
    let data2 = await clientQuery2.json()

    res.json({
        message: 'Hello from the server!',
        randomLanguageCode: randomLanguageCode,
        query: data2[0][0][0]
    })
})

app.post('/ParaphaseNepali', async (req, res) => {
    try {
        let query = req.body.q;
        let lan = 'de'
        let clientQuery = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ne&tl=${lan}&dt=t&q=${query}`)
        let data = await clientQuery.json()
        let p = []
        let translatedData = data[0].map((item) => {
            p.push(item[0])
        })
        translatedData = (p.join(''))
        let clientQuery2 = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${lan}&tl=ne&dt=t&q=${translatedData}`)
        let data2 = await clientQuery2.json()
        let x = []
        data2[0].map((item) => {
            x.push(item[0])
        })
        res.json({
            status: 200,
            res: x.join(''),
        }).status(200)
    } catch (error) {
        res.json({
            status: 500,
            message: 'Internal Server Error'
        }).status(500)
    }

})
// serve static files
app.use(express.static('public'))

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})