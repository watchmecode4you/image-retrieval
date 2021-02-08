const Certificate = require("../models/Certificate")

exports.showCertificates = async function (req, res, next){
    let certificate = new Certificate(req.body)
    /* let mycertificates =  */await certificate.getCertificates()
    .then((certs) => {   
        //console.log(certs)
        res.render('certificates', { certs: certs })
        //console.log(certs)
    })
    .catch((error) =>{
        // displaying the error on the screen
        res.render('404', {error : error})
    })

}


exports.addCertificate = async function (req, res, next){
    console.log(req.body)
    let certificate = new Certificate(req.body)
    await certificate.addCertificate()
    .then((successMessage)=>{
        res.render('notification',{message: successMessage})
    })
    .catch((errorMessage) => {
        res.render('notification', {message: errorMessage})
    })
}