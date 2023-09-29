const axios = require('axios');

const generateBookings = async (number) => {
    let i = 0

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
        
        // search for Vehicles available on locations and dates
        const searchResponse = await axios(`http://localhost:3001/available/?startDate=${startDate}&finishDate=${finishDate}&pickUpLocationId=${pickUpLocationId}&returnLocationId=${returnLocationId}`)
        const searchResults = searchResponse.data.results
        const vehicle = searchResults[Math.floor(Math.random()*searchResults.length)]
        
        const booking = {
            VehicleId: vehicle.id,
            CustomerId,
            startDate,
            finishDate,
            pricePerDay: vehicle.pricePerDay,
            pickUpLocationId,
            returnLocationId,
        }
        const bookingResponse = await axios.post(`http://localhost:3001/bookings`, booking) 
        const bookingData = bookingResponse.data

        let possibleStates
        if (new Date(finishDate) < Date.now()) { 
            possibleStates = ['completed', 'canceled']
        } else if (new Date(startDate) < Date.now()) {
            possibleStates = ['canceled', 'confirmed']
        } else {
            possibleStates = ['canceled', 'pending', 'confirmed']
        }
        bookingData.stateBooking = possibleStates[Math.floor(Math.random()*possibleStates.length)]
        const changeBookingState = await axios.put(`http://localhost:3001/bookings/${bookingData.id}`, bookingData)
      
        i++
    }
    console.log('done')
}

generateBookings(50)