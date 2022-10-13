//Router = configuracion de las rutas
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

//Importo mis funciones
const { verificarCampos } = require('../middlewares/verificar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');

//GET
router.get('/', usuariosGet ); // Llamo a la funcion por referencia, no la ejecuto -> usuariosGet()
//para los argumentos con el ? express automaticamente detecta que son opcionales y los parsea (query params)
// http://localhost:8080/api/usuarios? q=hola&nombre=Gabriel&apikey=131231&id=5

//PUT
router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    verificarCampos
], usuariosPut); //Le agrego un parametro a mi path '/api/usuarios/id'

//POST
router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste), // middleware personalizado
    check('password','El password debe contener mas de 6 caracteres').isLength({min: 6}),
    //check('rol','El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),

    // Validamos el rol contra una base de datos
    check('rol').custom(esRoleValido),  //con custom hacemos una verificacion personalizada. Custom recibe como argumento el valor del body que quiero evaluar. En este caso el rol le asignamos un valor por defecto (vacio) en caso de que no venga para que no afecte la verificacion personalizada
    verificarCampos  //middleware personalizado, SIEMPRE ejecutar al final porque es la que va a revisar cada uno de los checks
], usuariosPost);

//DELETE
router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    verificarCampos
], usuariosDelete);

//PATCH
router.patch('/', usuariosPatch);



module.exports = router;