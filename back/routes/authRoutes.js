const { Router } = require("express");
const { check } = require("express-validator");
const { isValidEmail, isValidRole, authorizeRoles } = require("../helpers/dbValidators");
const { createUser, login, getAllUsers, deleteUser, updateUser, getUserById, getUserProfile, updateProfile, checking } = require("../controllers/authController");
const { validarCampos } = require("../middleware/validarCampos");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const { subirImagenProfile } = require("../helpers/subirImg");
const { uploadImage } = require("../controllers/imageController");
const router = Router()

router.post('/signup',[
    check('nombre', "El campo nombre es obligatorio").not().isEmpty(),
    check('pais', "El campo pais no puede ir vacio").not().isEmpty(),
    check('estado', "El campo estado no puede ir vacio").not().isEmpty(),
    check('ciudad', "El campo ciudad no puede ir vacio").not().isEmpty(),
    check('password', "La contraseña no es valida y debe tener  mas de 6 letras").isLength({min:6}),
    check('email', "El correo no es valido").isEmail(),
    check('email').custom(isValidEmail),
    
    check('role').custom( isValidRole),
    validarCampos
], createUser)  

router.post('/signin',[
    check('email', "El correo no es valido").isEmail(),
    check('password', "El campo contraseña no puede ir vacio").not().isEmpty(),
    validarCampos
], login)  

router.route("/me").get(isAuthenticated, getUserProfile);
router.route("/me/update").put(isAuthenticated, updateProfile);




router.get('/admin/users',
isAuthenticated,
authorizeRoles("ADMIN_ROLE"),
getAllUsers
)
router.get('/check',checking)
router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("ADMIN_ROLE"), getUserById)
  .put(isAuthenticated, authorizeRoles("ADMIN_ROLE"), updateUser)
  .delete(isAuthenticated, authorizeRoles("ADMIN_ROLE"), deleteUser);

// Rutas de Imagen de perfil
router.post('/users/me/profile-image', isAuthenticated, subirImagenProfile, uploadImage);

module.exports = router