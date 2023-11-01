const request = require('postman-request')
const forecast = (latitude, longitude, callback) => {
    const url =
        'http://api.weatherstack.com/current?access_key=ac981845c7c716e3dea79b99dad02bf4&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+ '&units=m';
    request({ url: url, json: true}, (error, response) => {
        if(error) {
            callback('Tidak dapat terkoneksi ke layanan', undefined)
        } else if(response.body.error) {
            callback('Tidak dapat menemukan lokasi',undefined)
        } else {
            callback(undefined, {
                info: 'Info Cuaca: ' +
                    response.body.current.weather_descriptions[0] + '. ' +
                    'Suhu saat ini adalah ' +
                    response.body.current.temperature + ' derajat. ' +
                    'Index UV adalah ' +
                    response.body.current.uv_index + ' nm. ' +
                    'Visibilitas ' + response.body.current.visibility +
                    ' kilometer',
                weatherIcon: response.body.current.weather_icons[0]
            })
        }
    })
}
module.exports = forecast