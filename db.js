const dotenv = require('dotenv')
dotenv.config()
const uri = process.env.MONGOSTRING
const port = process.env.PORT

const app = require('./app')
app.listen(port)
console.log("we are here listenning to port #" + port)
