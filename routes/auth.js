const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken, crearMarcador, mostrar} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//crear un nuevo usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty( ),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    validarCampos
] ,crearUsuario);


//login de usuario
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    validarCampos
] ,loginUsuario);

//validar y revalidar token
router.get('/renew', validarJWT, revalidarToken);


//crear marcador 
router.post ('/niw', crearMarcador, validarCampos )

//mostrar marcador   OJO QUITASTE EL
router.get ('/obter', mostrar, validarCampos )

module.exports = router;