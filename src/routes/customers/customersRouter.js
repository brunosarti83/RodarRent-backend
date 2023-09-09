const { Router } = require('express');
const passport = require('passport')

const {
  attemptLogin,
  createCustomer,
  bulkCreateCustomers,
  getAllCustomers,
  getFilteredCustomers,
  updateCustomer,
  getCustomerById,
  deleteCustomerById,
} = require('../../controllers/customers');

const {
  createCustomerValidation,
  getCustomerByIdValidation,
  deleteCustomerByIdValidation,
} = require('../../middlewares/customers');

const { isLoggedIn,loginSuccess, loginFailure, googleCallback, google, logout } = require('../../controllers/customers/googleOauth20');

const router = Router();

router.post("/customers/bulk", bulkCreateCustomers);
router.post("/customers", createCustomerValidation, createCustomer);
router.get("/customers", getAllCustomers);
router.get("/customers/filter", getFilteredCustomers);
router.get("/customers/:id", getCustomerByIdValidation, getCustomerById);
router.post("/customers/login", attemptLogin);
router.put("/customers", createCustomerValidation, updateCustomer);
router.delete("/customers/:id",deleteCustomerByIdValidation,deleteCustomerById);

//para google oauth20:

router.get("/auth/success",isLoggedIn, loginSuccess)
router.get("/auth/failure", loginFailure)
router.get("/google/callback",googleCallback)
router.get("/auth/google",google)
router.get("/logout",logout)

module.exports = router;
