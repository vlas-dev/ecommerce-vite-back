const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validarCampos");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const { crearProducto, mostrarProductos, mostrarProducto, filtrarProducto, editarProducto, eliminarProducto, subirArchivo } = require("../controllers/productController");
const { authorizeRoles } = require("../helpers/dbValidators");
const router = Router()

router.post('/crear',
isAuthenticated,
authorizeRoles("ADMIN_ROLE"),
subirArchivo,
validarCampos,
crearProducto)

router.get('/',
mostrarProductos)

router.get('/get/:slug',
filtrarProducto)

router.get('/:id',
mostrarProducto)


router.put('/:id',
isAuthenticated,
authorizeRoles("ADMIN_ROLE"),
subirArchivo,
validarCampos,
editarProducto)

router.delete('/:id',
isAuthenticated,
authorizeRoles("ADMIN_ROLE"),
validarCampos,
eliminarProducto)

module.exports = router