const { faker } = require('@faker-js/faker');
const axios = require('axios')

const carTypes = [
    {
        brand: 'Hyundai',
        model: 'Tucson',
        type: 'SUV',
        passengers: 7,
        pricePerDay: 180.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694021989/xzyg9ivez32dcevybezu.webp',
        transmission: 'automatic',
        fuel: 'gas'
    },
    {
        brand: 'Mercedes Benz',
        model: 'ML 350',
        type: 'SUV',
        passengers: 8,
        pricePerDay: 210.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694022209/eyr1dsckfgczssg5p6ic.webp',
        transmission: 'automatic',
        fuel: 'gas'
    },
    {
        brand: 'Mercedes Benz',
        model: 'A-Class',
        type: 'sedan',
        passengers: 4,
        pricePerDay: 205.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694022469/q3ujn0o4hty1xguovsmj.webp',
        transmission: 'automatic',
        fuel: 'gas'
    },
    {
        brand: 'Toyota',
        model: 'Hilux',
        type: 'pickup',
        passengers: 4,
        pricePerDay: 180.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694022581/e1vuucwfidjzce5msnfz.webp',
        transmission: 'manual',
        fuel: 'diesel'
    },
    {
        brand: 'Chevrolet',
        model: 'Camaro',
        type: 'sport',
        passengers: 2,
        pricePerDay: 240.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694022671/eszsbq2iedatkbexiytr.webp',
        transmission: 'manual',
        fuel: 'gas'
    },
    {
        brand: 'Jeep',
        model: 'Grand Cherokee',
        type: 'SUV',
        passengers: 6,
        pricePerDay: 205.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694022864/u9vbnf66yjetsmeqkr3t.webp',
        transmission: 'automatic',
        fuel: 'diesel'
    },
    {
        brand: 'Chevrolet',
        model: 'Prisma',
        type: 'compact',
        passengers: 4,
        pricePerDay: 142.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694022961/jydus2voxms8gcwjfoef.webp',
        transmission: 'manual',
        fuel: 'gas'
    },
    {
        brand: 'Volkswagen',
        model: 'Gol',
        type: 'compact',
        passengers: 4,
        pricePerDay: 155.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694023059/w0tkgqwbj0dpffgg7wox.webp',
        transmission: 'manual',
        fuel: 'diesel'
    },
    {
        brand: 'Honda',
        model: 'Civic',
        type: 'sedan',
        passengers: 4,
        pricePerDay: 160.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694023131/j9nvzrxexzgsf7glyogn.webp',
        transmission: 'automatic',
        fuel: 'gas'
    },
    {
        brand: 'Volkswagen',
        model: 'Polo',
        type: 'compact',
        passengers: 4,
        pricePerDay: 158.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694023227/mk3itvpt513xictubqle.webp',
        transmission: 'automatic',
        fuel: 'diesel'
    },
    {
        brand: 'Tesla',
        model: 'Model S',
        type: 'sedan',
        passengers: 4,
        pricePerDay: 260.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694023292/ukx5aeeuofusjgtqhv2q.webp',
        transmission: 'automatic',
        fuel: 'electric'
    },
    {
        brand: 'Fiat',
        model: 'Argo',
        type: 'compact',
        passengers: 4,
        pricePerDay: 136.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694023351/uxac2kby1uplmqjjtz14.webp',
        transmission: 'manual',
        fuel: 'gas'
    },
    {
        brand: 'Mercedes Benz',
        model: 'S 550',
        type: 'sedan',
        passengers: 4,
        pricePerDay: 194.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694023457/oquxeq3xshvchi7xbrcp.webp',
        transmission: 'automatic',
        fuel: 'gas'
    },
    {
        brand: 'Ford',
        model: 'Ka',
        type: 'compact',
        passengers: 4,
        pricePerDay: 130.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694023524/aylflnhvdh6wdyxb5lpa.webp',
        transmission: 'manual',
        fuel: 'gas'
    },
    {
        brand: 'Audi',
        model: 'A7',
        type: 'sedan',
        passengers: 4,
        pricePerDay: 212.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694023585/mjjohf5x89gjx1e5vedp.webp',
        transmission: 'automatic',
        fuel: 'diesel'
    },
    {
        brand: 'Ford',
        model: 'Mustang',
        type: 'sport',
        passengers: 4,
        pricePerDay: 238.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694024117/xk0b24dciavdjzakwoqq.webp',
        transmission: 'manual',
        fuel: 'gas'
    },
    {
        brand: 'Mercedes Benz',
        model: 'C-Class',
        type: 'sedan',
        passengers: 4,
        pricePerDay: 198.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694024177/gz7jmxuz9kln1mhhvdgj.webp',
        transmission: 'automatic',
        fuel: 'gas'
    },
    {
        brand: 'Volkswagen',
        model: 'Passat',
        type: 'sedan',
        passengers: 4,
        pricePerDay: 170.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694024239/mndcicyj71vvc61kjyxw.webp',
        transmission: 'manual',
        fuel: 'diesel'
    },
    {
        brand: 'Audi',
        model: 'A6',
        type: 'sedan',
        passengers: 4,
        pricePerDay: 175.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694024355/auqky1x4fj6niflcyslh.webp',
        transmission: 'automatic',
        fuel: 'diesel'
    },
    {
        brand: 'Nissan',
        model: 'Kicks',
        type: 'compact',
        passengers: 4,
        pricePerDay: 152.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694024464/fihzmzje6qgfmy1z2czp.webp',
        transmission: 'automatic',
        fuel: 'gas'
    },
    {
        brand: 'Toyota',
        model: 'Yaris',
        type: 'compact',
        passengers: 4,
        pricePerDay: 140.00,
        image: 'https://res.cloudinary.com/daiztctac/image/upload/v1694024785/r73c34vu2zmo3otkjsgt.webp',
        transmission: 'manual',
        fuel: 'gas'
    },
]

const years = [2021, 2022, 2023] 
const transmissions = ['manual', 'automatic']
const fuels = ['gas', 'diesel']


const loadCars = async (nCars) => {

    const response = await axios.get('http://localhost:3001/locations')
    const locationIds = response.data.map(loc => loc.id)

    const load = []
    while (load.length < nCars) {
        const carTypeIndex = Math.floor(Math.random()*carTypes.length)
        const newCar = { ...carTypes[carTypeIndex] }
        newCar.domain = faker.vehicle.vrm()
        newCar.year = years[Math.floor(Math.random()*years.length)]
        newCar.LocationId = locationIds[Math.floor(Math.random()*locationIds.length)]
        //newCar.transmission = transmissions[Math.floor(Math.random()*transmissions.length)]
        // if (newCar.brand === 'Tesla') {
        //     newCar.fuel = 'electric'
        // } else if (newCar.model === 'Camaro' || newCar.model === 'Mustang') {
        //     newCar.fuel = 'gas'
        // } else {
        //     newCar.fuel = fuels[Math.floor(Math.random()*fuels.length)]
        // }
        //newCar.availability = true
        load.push(newCar)
    }
    const { data } = await axios.post('http://localhost:3001/vehicles', load)
    if (data.length) {
        console.log(data[0])
    }
}
// execution of load(nCars)
loadCars(80)
////////////

//module.exports = loadCars;