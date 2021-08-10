const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const path = require('path')
const Route = require('./routes/index')
const db = require('./config/mongodb')
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')



db.connect()

app.use(express.static(path.join(__dirname,'public')))


app.use(cookieParser('Tjahgadhzdh'))

/* Template Handlebars */
app.engine('hbs',exphbs({
    extname: '.hbs'
}))
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'resources/views'))

/* setup parse */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Route */
Route(app)

console.log(process.env.port)

app.listen(process.env.PORT || 3000,()=> console.log(`thành công`))