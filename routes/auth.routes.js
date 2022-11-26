//Router = configuracion de las rutas
const { Router } = require('express');
const { check } = require('express-validator');

const { verificarCampos } = require('../middlewares/verificar-campos');

const { login, googleSignIn } = require('../controllers/auth.controller');


const router = Router();

router.post('/login', [
    check('correo','El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    verificarCampos
], login );


router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    verificarCampos
], googleSignIn );


module.exports = router;