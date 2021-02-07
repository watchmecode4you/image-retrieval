const express = require("express")
const router = express.Router()
const certificateController = require("./controllers/certificateController")

// get routes
router.get('/', (req, res, next) => { res.render('homepage') })

// post routes
router.post('/show-certificates', certificateController.showCertificates)

module.exports = router;