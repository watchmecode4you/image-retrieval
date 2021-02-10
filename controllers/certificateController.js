const Certificate = require("../models/Certificate")

exports.showCertificates = async function (req, res, next){
    let certificate = new Certificate(req.body)
    await certificate.getCertificates()
    .then((certificates) => {   
        //console.log(certificates)
        res.render('certificates', {certs: certificates})
    })
    .catch((error) => {
        // displaying the error on the screen
        res.render('404', {error : error})
    })

}

exports.addCertificate = async function (req, res, next){
    console.log(req.body)
    let certificate = new Certificate(req.body)
    await certificate.addCertificate()
    .then((successMessage) => {
        //console.log(certs)
        res.render('notification', {message: successMessage})
    })
    .catch((errorMessage) => {
        // displaying the error on the screen
        res.render('notification', {message: errorMessage})
    })
}

exports.showCertificateDetails = async function (req, res, next){
    const certificate = new Certificate(req.body, req.params.id)
    await certificate.getDetails()
    .then((certificateDetails) => {
        res.render('details', {certificateDetails, certificateDetails})
        //res.json(certificateDetails)
    })
    .catch((error) => {
        res.render('404', {error: error})
        //res.json(error)
    })
}

exports.deleteCertificate = function(req, res, next){
    res.json(`Attempting to delete the post with id equla to ${req.params.id}`)
}