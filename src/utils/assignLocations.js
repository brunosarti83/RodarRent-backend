const axios = require('axios')

const assignLocations = async () => {

    const locationsResponse = await axios.get('http://localhost:3001/locations')
    const locations = locationsResponse.data
    
   
    const vehiclesResponse = await axios.get('http://localhost:3001/vehicles')
    const vehicles = vehiclesResponse.data.results
    
    const locationIds = locations.map(loc => loc.id)
    const puts = vehicles.map(veh => {
        return axios.put('http://localhost:3001/vehicles', {...veh, LocationId: locationIds[Math.floor(Math.random()*locationIds.length)]})
    }) 
    await Promise.all(puts)
    console.log('...done')
}

assignLocations()