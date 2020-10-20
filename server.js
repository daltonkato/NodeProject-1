const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ServerPort = 3000

app.listen(ServerPort, function(){
    console.log('Your node js server is running on PORT:',ServerPort)
})

app.get('/', (req, res) => {

    res.render('index.ejs')

});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true}))



const MongoClient = require('mongodb').MongoClient
const ServerDB = 'mongodb://localhost:27017'

MongoClient.connect(ServerDB, { useUnifiedTopology: true },
    (err, client) => {
    if (err) return console.log(err)

    console.log ('Connect to DB - OK')

    db = client.db('crud-nodejs')

})

app.get('/', (req, res) => {
    const cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })
    })

})

app.post('/show', (req, res) => {
    db.collection('data').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)
        
        console.log('Data was inserted sucessfully in DB')
        res.redirect('/show')
        db.collection('data').find().toArray((err, results) => {
            console.log(results)

        })    
    })
})
