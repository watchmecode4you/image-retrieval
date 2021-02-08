const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv')
dotenv.config()
const mongo_uri = process.env.MONGO_STRING
const mongo_database = process.env.MONGO_DATABASE
const mongo_collection = process.env.MONGO_COLLECTION


//storing the data in the req.body in a variable
let Certificate = function (certObj) {
    this.certObj = certObj
}

Certificate.prototype.getCertificates = function () {
    let certObject = this.certObj
    return new Promise((resolve, reject) => {
        try {
            // instantiating the Mongo Client instance 
            const client = new MongoClient(mongo_uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            client.connect(async err => { //connecting the mongo instance
                if (err) {
                    reject(err)
                } else {
                    //grabbing the certificate collection
                    const certificatesCollection = client.db(mongo_database).collection(mongo_collection);
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

Certificate.prototype.addCertificate = function () {

    let certificateToAdd = {
        topic: this.certObj.topic,
        source: this.certObj.source,
        name: this.certObj.name,
        image_url: this.certObj.image_url
    }

    let errorMessage = "Something went wrong and we could not add your certificate. Please try again"
    let successMessage = "Certificate was successfully added"

    return new Promise((resolve, reject) => {
        try {
            const client = new MongoClient(mongo_uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            client.connect((err) => {
                if(err){
                    reject(errorMessage)
                }else{
                    const certiticatesCollection = client.db(mongo_database).collection(mongo_collection)
                    const result = certificatesCollection.insertOne(certificateToAdd)
                    console.log(`Inserted a new certificaet with the following id: ${result.insertedId}`)
                    resolve(successMessage)
                }
            })
        } catch {
            console.log(error)
            reject(errorMessage)
        }
    })

}

module.exports = Certificate