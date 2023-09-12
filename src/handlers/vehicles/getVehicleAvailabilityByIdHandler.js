const { Vehicle, Booking } = require('../../db');
const { Op } = require('sequelize');
const CustomError = require('../../utils/customError');
const getAvailableVehiclesHandler = require('./getAvailableVehiclesHandler');

const getVehicleAvailabilityByIdHandler = async ({ id, startDate, finishDate }) => {
    try {
        // validate params
        if (!id || !startDate || !finishDate) { throw CustomError(
            'Missing data. Params must be /VehicleId/startDate(YYY-MM-DD)/finishDate(YYY-MM-DD)', 400
            ) }
        const regexPatternForDates = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
        if (!regexPatternForDates.test(startDate) || !regexPatternForDates.test(finishDate)) {
            throw new CustomError('startDate and finishDate must be in the format AAAA-MM-DD', 400)
        }
        //////////////////////////

        // validate Vehicle
        const vehicle = await Vehicle.findByPk(id)
        if (!vehicle) { throw new CustomError(`There's no vehicle matching id: ${id}`, 404) }
        if (!vehicle.isActive) { throw new CustomError(`Vehicle ${id} has been deleted`) }
        ///////////////////////////

        // make query for Bookings intersecting the desired period defined by startDate and finishDate ///
        const thisVehicleMatchingBookings = await Booking.findAll({
            where: {
                stateBooking: {
                    [Op.ne]: 'canceled'
                },
                startDate: {
                    [Op.lte]: new Date(finishDate)
                },
                finishDate: {
                    [Op.gte]: new Date(startDate)
                },
                VehicleId: id,
            },
            attributes: ['id', 'startDate', 'finishDate','stateBooking', 'VehicleId'],
        })
        /////////////////////////////

        if (!thisVehicleMatchingBookings.length) { 
            return { state: 'Available', 
            from: startDate, 
            to: finishDate }
        }

        // if car not available look for identicall available option
        const suggestedOption = await getAvailableVehiclesHandler({
            brand: vehicle.brand,
            model: vehicle.model,
            startDate,
            finishDate,
            order: 'year',
            direction: 'DESC',
        })
        //////////////////////

        return {
            state: 'Not Available - Rented',
            matchingReservations: thisVehicleMatchingBookings,
            suggestedReplacement: suggestedOption.results.length ? suggestedOption.results.at(0).id : 'No vehicles of the same brand/model available on required dates',
        }

    } catch (error) {
        throw CustomError(error.message, 500)
    }
}

module.exports = getVehicleAvailabilityByIdHandler;