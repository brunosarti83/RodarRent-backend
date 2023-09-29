const { Vehicle } = require('../../db');
const CustomError = require('../../utils/customError');
const Sequelize = require('sequelize');

const getVehiclesHandler = async (query) => {
    try {
        let {
            id,
            domain, 
            limit, 
            offset,  
            orderBy, 
            direction, 
            brand,
            model,
            type, 
            transmission, 
            fuel, 
            pricePerDayMin, 
            pricePerDayMax,
            passengersMin,
            passengersMax 
        } = query 

        // setup where for database query ////////
        const where = { isActive: true }
        if (id) { where.id = id }
        if (domain) { where.domain = domain }
        if (type) { where.type = type }
        if (transmission) { where.transmission = transmission }
        if (brand) { where.brand = brand }
        if (model) { where.model = model }
        if (fuel) { where.fuel = fuel }
        if (pricePerDayMin && pricePerDayMax) {
            where.pricePerDay = {
                [Op.gte] : Number(pricePerDayMin),
                [Op.lte] : Number(pricePerDayMax)
            }
        } else if (pricePerDayMin) {
            where.pricePerDay = {
                [Op.gte] : Number(pricePerDayMin)
            }
        } else if (pricePerDayMax) {
            where.pricePerDay = {
                [Op.lte] : Number(pricePerDayMax)
            }
        }
        if (passengersMin && passengersMax) {
            where.passengers = {
                [Op.gte] : Number(passengersMin),
                [Op.lte] : Number(passengersMax)
            }
        } else if (passengersMin) {
            where.passengers = {
                [Op.gte] : Number(passengersMin)
            }
        } else if (passengersMax) {
            where.passengers = {
                [Op.lte] : Number(passengersMax)
            }
        }
        ////////////////

        // setup order for database query ////
        const order = [[(orderBy) ? orderBy : 'pricePerDay', (direction) ? direction : 'DESC']]
        ////////////////////

        // make query for Vehicles that match filter criteria
        const results = await Vehicle.findAll({
            where,
            order,
            attributes: ['id', 'domain', 'brand', 'model', 'type', 'passengers', 'transmission', 'fuel', 'pricePerDay', 'image', 'LocationId', 'isActive']
        })
        ///////////////////

        // set pagination variables //////////
        if (limit) { 
            limit = Number(limit) 
        } else {
            limit = results.length
        }
        
        if (offset) { 
            offset = Number(offset) 
        } else {
            offset = 0
        }

        const page = (offset < limit) ? 1 : Math.ceil((offset / limit)+0.01)
        const totalPages = Math.ceil(results.length/limit)
        const showFrom = (offset > results.length) ? 0 : offset
        const showTo = (showFrom + limit > results.length) ? results.length : (showFrom + limit)
        
        let nextString = '/vehicles?'
        let prevString = '/vehicles?'
        for (let prop in query) {
            if (nextString[nextString.length -1] !== '?') { nextString += '&' }
            if (prevString[prevString.length -1] !== '?') { prevString += '&' }
            if (prop === 'offset') {
                nextString += `offset=${showTo}`
                prevString += `offset=${showFrom-limit}`
            } else {
                nextString += `${prop}=${query[prop]}`
                prevString += `${prop}=${query[prop]}`
            }
        }

        const next = (page === totalPages) ? null : nextString
        const prev = (page === 1) ? null : prevString  
        ///////////////////////////////////////

        // available option filters
        const brands = Array.from(new Set(results.map(car => car.brand)));
        const models = Array.from(new Set(results.map(car => car.model)));
        const types = Array.from(new Set(results.map(car => car.type))); 
        const transmissions = Array.from(new Set(results.map(car => car.transmission)));
        const fuelTypes = Array.from(new Set(results.map(car => car.fuel)));
        const passengers = Array.from(new Set(results.map(car => car.passengers))).sort();
        /////////////////////////
        // images for each Model
        const images = results.reduce((accum, current) => {
            accum[current.model] = accum[current.model] ? Array.from(new Set([...accum[current.model], current.image])) : [current.image]
            return accum;
        }, {})

        // configure response /////////
        const response = {
            currentPage: page,
            totalPages,
            next,
            prev,
            resultsCount: results.length,
            results: results.slice(showFrom, showTo),
            availableFilterOptions: { brands, models, types, transmissions, fuelTypes, passengers },
            images
        }

        return response

    } catch (error) {
        throw new CustomError(error.message, 500)
    }
}

module.exports = getVehiclesHandler;