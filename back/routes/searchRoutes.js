const { Router } = require("express");
const { check } = require("express-validator");
const { busquedaProducto } = require("../controllers/busquedaController");


const router = Router()

router.post('/',
busquedaProducto)







module.exports = router