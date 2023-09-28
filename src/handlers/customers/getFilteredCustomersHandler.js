const { Customer } = require('../../db');
const { Op } = require('sequelize');
const CustomError = require('../../utils/customError');

const getFilteredCustomers = async (data) => {
  const {name,lastName,city,country,email, orderVar, orderMode,page=1,pageSize=10} = data
  let filterCriteria = {};
  let orderArray = ['lastName','ASC']
  const offset = (page-1)*pageSize
    
    if (name)  filterCriteria.name = {[Op.like]: `%${name}%`};
    if (lastName)  filterCriteria.lastName = {[Op.like]: `%${lastName}%`};
    if (city) filterCriteria.city = city
    if (country) filterCriteria.country = country
    if (email) filterCriteria.email = email
    if (orderVar) orderArray[0] = orderVar
    if (orderMode) orderArray[1] = orderMode
  
    try {
    const customers = await Customer.findAndCountAll({
      where: filterCriteria,
      order: [[orderArray[0], orderArray[1]]],
      offset,
      limit: pageSize
    });
    if(customers.rows.length===0) throw new CustomError('No customers match that criteria',404)
    const totalPages = Math.ceil(customers.count / pageSize);
    
    const pagination = {
      currentPage: page,
      pageSize: pageSize,
      totalItems: customers.count,
      totalPages: totalPages,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };

    return { data: customers.rows, pagination };
  } catch (error) {
    throw new CustomError(error.message,500);
  }
};

module.exports = getFilteredCustomers;
