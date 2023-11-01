const request = require('postman-request')

// const mediastack =

const mediastack = (callback) => {
    const url = 'http://api.mediastack.com/v1/news?access_key=ec2c7609a057940f8b7a2695c1ee3e77'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Tidak dapat terkoneksi ke layanan', undefined)
        } else {
            callback(undefined, {
            title : response.body.data[0].title,
            image : response.body.data[0].image,
            description : response.body.data[0].description
            })
        }
    })
}
module.exports = mediastack