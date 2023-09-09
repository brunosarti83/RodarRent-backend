const { Vehicle, Booking } = require('../../db');
const { Op } = require('sequelize');
const CustomError = require('../../utils/customError');


const getAvailableVehiclesHandler = async (query) => {
    try {
        let { 
            limit, 
            offset, 
            startDate, 
            finishDate, 
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

        let busyCars = []

        if (startDate && finishDate) {
            // validate dates
            if (!startDate || !finishDate) {
                throw new CustomError('startDate and finishDate are required query parameters', 400)
            }
    
            const regexPatternForDates = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
            if (!regexPatternForDates.test(startDate) || !regexPatternForDates.test(finishDate)) {
                throw new CustomError('startDate and finishDate must be in the format AAAA-MM-DD', 400)
            }
            /////////////

            // make query for Bookings intersecting the desired period defined by startDate and finishDate ///
            const busy = await Booking.findAll({
                where: {
                    stateBooking: {
                        [Op.ne]: 'canceled'
                    },
                    startDate: {
                        [Op.lte]: new Date(finishDate)
                    },
                    finishDate: {
                        [Op.gte]: new Date(startDate)
                    }
                },
                attributes: ['VehicleId'],
            })
            /////////////////////////////
            busyCars = busy.map(item => item.VehicleId).filter(item => item !== null)
        }

        // setup where for database query ////////
        const where = {
            isActive: true
        }
        if (busyCars.length) { where.domain = { [Op.notIn]: busyCars } }
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

        // make query for Vehicles that match filter criteria and are not in busyCars array
        const availableVehicles = await Vehicle.findAll({
            where,
            order,
            attributes: ['id', 'domain', 'brand', 'model', 'type', 'passengers', 'transmission', 'fuel', 'pricePerDay', 'image']
        })
        ///////////////////
        
        // filter results so that's there is only one Vehicle of each (model => transmission => fuel => price) combination ////
        const oneOfEachType = []
        availableVehicles.forEach(availableCar => {
            const { domain, brand, model, type, passengers, transmission, fuel, pricePerDay, image } = availableCar
            const alreadyIn = oneOfEachType.filter(car => { 
                return (car.brand === brand && car.model === model && car.transmission === transmission && car.fuel === fuel && car.pricePerDay === pricePerDay)
            })
            if (!alreadyIn.length) {
                oneOfEachType.push(availableCar)
            }
        })
        const results = oneOfEachType;
        ////////////////////////

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
        
        let nextString = '/available?'
        let prevString = '/available?'
        for (let prop in query) {
            if (nextString.at(-1) !== '?') { nextString += '&' }
            if (prevString.at(-1) !== '?') { prevString += '&' }
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
        const transmissions = Array.from(new Set(results.map(car => car.transmission)));
        const fuelTypes = Array.from(new Set(results.map(car => car.fuel)));
        const passengers = Array.from(new Set(results.map(car => car.passengers)));
        /////////////////////////

        // configure response /////////
        const response = {
            currentPage: page,
            totalPages,
            next,
            prev,
            resultsCount: results.length,
            results: results.slice(showFrom, showTo),
            availableFilterOptions: { brands, models, transmissions, fuelTypes, passengers }
        }

        return response

    } catch (error) {
        throw new CustomError(error.message, 500)
    }
}

module.exports = getAvailableVehiclesHandler;