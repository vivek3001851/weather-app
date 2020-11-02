const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidmszMDAxODUxIiwiYSI6ImNrZm02cGJwbjAwY3MyeG1xazNib3lrdG0ifQ.BUmv6WnkVg66CCR0OYbQwQ&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            console.log(address)
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

{
    
}

geocode('gaya',(error,data)=>{
    if(error) {
        return error
    }
})
module.exports = geocode