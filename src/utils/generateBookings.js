const axios = require('axios');

const generateBookings = async (number) => {
    let i = 0
    // get all vehicles
    const vehiclesResponse = await axios.get('http://localhost:3001/vehicles')
    const vehicles = vehiclesResponse.data.results
    // get all locations
    const allLocations = await axios.get(`http://localhost:3001/locations`)
    const locationIds = allLocations.data.map(loc => loc.id)
    // get all customers
    const allCustomers = await axios.get(`http://localhost:3001/customers`)
    const customerIds = allCustomers.data.data.map(cust => cust.id)
    // define possible years
    const years = ['2022', '2023', '2024']

    while (i < number) {
        // choose random startDate and duration
        let day = Math.ceil(Math.random()*28).toString()
        if (day.length < 2) {day = '0' + day}
        let month = Math.ceil(Math.random()*12).toString()
        if (month.length < 2) {month = '0' + month}
        const year = years[Math.floor(Math.random()*years.length)].toString()
        const startDate = `${year}-${month}-${day}`
        const duration = Math.ceil(Math.random()*15)
        const newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + duration);
        const finishDate = newDate.toISOString().split('T')[0]; // "YYYY-MM-DD" format
        // choose random customer, locations
        const CustomerId = customerIds[Math.floor(Math.random()*customerIds.length)]
        const pickUpLocationId = locationIds[Math.floor(Math.random()*locationIds.length)]
        const returnLocationId = locationIds[Math.floor(Math.random()*locationIds.length)]
        // choose a vehicle 'on' that pickUpLocation
        const vehiclesAtLocation = vehicles.filter(veh => veh.LocationId === pickUpLocationId)
        const vehicle = vehiclesAtLocation[Math.floor(Math.random()*vehiclesAtLocation.length)]
        // check for that vehicle availability on dates
        const confirmationResponse = await axios(`http://localhost:3001/available/${vehicle.id}/${startDate}/${finishDate}`)
        const confirmation = confirmationResponse.data
    
        let possibleStates
        if (new Date(finishDate) < Date.now()) { 
            possibleStates = ['completed', 'canceled']
        } else if (new Date(startDate) < Date.now()) {
            possibleStates = ['canceled', 'confirmed']
        } else {
            possibleStates = ['canceled', 'pending', 'confirmed']
        }
        if (confirmation.state === 'Available') {
            const booking = {
                VehicleId: vehicle.id,
                CustomerId,
                startDate,
                finishDate,
                pricePerDay: vehicle.pricePerDay,
                pickUpLocationId,
                returnLocationId,
                stateBooking: possibleStates[Math.floor(Math.random()*possibleStates.length)]
            }
            const bookingResponse = await axios.post(`http://localhost:3001/bookings`, booking)
            //console.log(bookingResponse.data)
        } //else {
            //console.log(confirmation.state)
        //}
        i++
    }
    console.log('done')
}

generateBookings(50)