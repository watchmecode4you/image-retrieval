//importing express library
const express = require("express")
const app = express()

//allows us to use the request body 
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//initiating the server
const http = require("http")


// use the router file accross all the application
const router = require('./router')

app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'ejs')


app.use('/', router)

const server = http.createServer(app)

module.exports = server