const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv')
dotenv.config()
const uri = process.env.MONGOSTRING


//storing the data in the req.body in a variable
let Certificate = function (certObj) {
    this.certObj = certObj
}

Certificate.prototype.getCertificates = function () {
    let certObject = this.certObj
    return new Promise((resolve, reject) => {
        try {
            // instantiating the Mongo Client instance 
            const client = new MongoClient(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            client.connect(async err => { //connecting the mongo instance
                if (err) {
                    reject(err)
                } else {
                    //grabbing the certificate collection
                    const certificatesCollection = client.db("certificates-db").collection("certificates");
                    //console.log(certObject.source)
                    let cursor = await certificatesCollection
                        .find({
                            topic: {
                                $eq: certObject.topic
                            },
                            source: {
                                $eq: certObject.source
                            }
                        })
                    //retreivign all the certificates from the mongo db databse and storing them in array
                    //console.log(cursor)
                    const certs = await cursor.toArray();
                    resolve(certs)
                    //console.log(certs)
                }
            })
        } catch {
            reject(error)
        } finally {
            //client.close()
        }
    })
}


module.exports = Certificate