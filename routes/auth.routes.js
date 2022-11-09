//Router = configuracion de las rutas
const { Router } = require('express');
const { check } = require('express-validator');

const { verificarCampos } = require('../middlewares/verificar-campos');

const { login } = require('../controllers/auth.controller');


const router = Router();

router.post('/login', [
    check('correo','El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    verificarCampos
], login );


module.exports = router;