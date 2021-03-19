const express = require('express')
const multer = require('multer')
const upload = multer()

const app = express()
const PORT = process.env.port || 8088

let data = {
    people: [
    {
        name: "burt lennister",
        age: 56,
        hobbies: ['reading', 'pollo']

    },
    {
        name: 'tobe nwige',
        age: 27,
        hobbies: ['writting', 'pressing flowers']
    },
    {
        name: 'miguel artwood',
        age: undefined,
        hobbies: ['music', 'mediation'],
    },
    {
        name: 'hieu ngyen',
        age: 33,
        hobbies: undefined
    },
    {
        name: undefined,
        age: undefined,
        hobbies: undefined
    }
]
}
app.get('/', (req, res)=>{
    res.render('page.ejs', data)
})


app.listen(PORT)