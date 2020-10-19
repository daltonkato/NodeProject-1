const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const server = 'mongodb://localhost:27017'
const database = 'myDatabase'


mongoose.connect(`${server}/${database}`,
   { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
   console.log("Successfully connect to MongoDB.")
})
   .catch(err => {
      console.error("Connection error", err)
      process.exit()
   })

app.listen(3000, function() {

    console.log('server running on port 3000')

})

app.get('/', (req, res) => {

    res.render('index.ejs')

})

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true}))


app.post('/show', (req,res ) => {

    console.log('req.body')

})
