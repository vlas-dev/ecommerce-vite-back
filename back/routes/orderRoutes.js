const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validarCampos");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const { authorizeRoles } = require("../helpers/dbValidators");
const { createOrder, getOrders, getOrder, editOrder, deleteOrder } = require("../controllers/orderController");
const router = Router()

router.post('/crear',
isAuthenticated,
validarCampos,
createOrder)

router.get('/',
isAuthenticated,
validarCampos,
getOrders)

router.get('/:id',
isAuthenticated,
validarCampos,
getOrder)

router.put('/:id',
isAuthenticated,
validarCampos,
editOrder)

router.delete('/:id',
isAuthenticated,
validarCampos,
deleteOrder)



module.exports = router;