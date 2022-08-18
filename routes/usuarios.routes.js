//Router = configuracion de las rutas
const { Router } = require('express') ;

const router = Router();

//Importo mis funciones
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');


//GET
router.get('/', usuariosGet ); // Llamo a la funcion por referencia, no la ejecuto -> usuariosGet()
//para los argumentos con el ? express automaticamente detecta que son opcionales y los parsea (query params)
// http://localhost:8080/api/usuarios? q=hola&nombre=Gabriel&apikey=131231&id=5

//PUT
router.put('/:id', usuariosPut); //Le agrego un parametro a mi path '/api/usuarios/id'

//POST
router.post('/', usuariosPost);

//DELETE
router.delete('/', usuariosDelete);

//PATCH
router.patch('/', usuariosPatch);



module.exports = router;