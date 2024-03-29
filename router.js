const express = require("express")
const router = express.Router()
const certificateController = require("./controllers/certificateController")

// get routes
router.get('/', (req, res, next) => { res.render('homepage')})
router.get('/filter-certificates', (req, res, next) => { res.render('filter')})
router.get('/add-certificates', (req, res, next) => { res.render('add')})
router.get('/certificate-details/:id', certificateController.showCertificateDetails)
router.get('/delete/:id', certificateController.deleteCertificate)


// post routes
router.post('/filter', certificateController.showCertificates)
router.post('/add', certificateController.addCertificate)


module.exports = router;