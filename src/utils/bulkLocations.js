const axios = require('axios');

const locations = [
    {
        alias: "AEROPUERTO MENDOZA",
        address: "Calle Falsa 123",
        city: "Mendoza",
        country: "Argentina",
        zipCode: "12312"
    }, 
    {
        alias: "CENTRO MENDOZA",
        address: "Av Siempreviva 3214",
        city: "Mendoza",
        country: "Argentina",
        zipCode: "3521"
    },
    {
        alias: "AEROPARQUE",
        address: "Costanera Rafael Obligado s/n",
        city: "Bs As",
        country: "Argentina",
        zipCode: "1412"
    },
    {
        alias: "CASA CENTRAL",
        address: "Tacuarí 125",
        city: "Bs As",
        country: "Argentina",
        zipCode: "1425"
    }
]

locations.forEach(async (loc) => {
    const { data } = await axios.post('http://localhost:3001/locations', loc)
    console.log(data)
})

//console.log('...done')
