const { Role, Usuario, Categoria, Producto } = require('../models');
// const Role = require('../models/role');
// const Usuario = require('../models/usuario');

// Validamos el rol contra una base de datos
const esRoleValido = async(rol = '') => { //con custom hacemos una verificacion personalizada. Custom recibe como argumento el valor del body que quiero evaluar. En este caso el rol le asignamos un valor por defecto (vacio) en caso de que no venga para que no afecte la verificacion personalizada
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);  // este es un error personalizado que va a atrapar el custom(). NO rompe la aplicacion
    }
}

//Verificar si existe el email
const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`Ese email ${correo} ya esta registrado en la BD`);  // este es un error personalizado que va a atrapar el custom(). NO rompe la aplicacion
    }
}

//Verificar si existe usuario por ID
const existeUsuarioPorId = async(id) => {
    
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`No existe el id: ${id}`);  // este es un error personalizado que va a atrapar el custom(). NO rompe la aplicacion
    }
}


/**
 *  Validacion de Categorias contra DB
 */


//Verificar si existe la categoria por el ID
const existeCategoriaPorId = async(id) => {

    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`No existe la categoria con el id: ${id}`);  // este es un error personalizado que va a atrapar el custom(). NO rompe la aplicacion
    }
}



/**
 *  Validacion de Productos contra DB
 */


//Verificar si existe la categoria por el ID
const existeProductoPorId = async(id) => {

    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`No existe el producto con el id: ${id}`);  // este es un error personalizado que va a atrapar el custom(). NO rompe la aplicacion
    }
}



/**
 *  Validar colecciones permitidas para actualizar
 */
const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );

    if(!incluida){
        throw new Error (`Esa coleccion ${ coleccion } no esta permitida. Las colecciones permitidas son: ${ colecciones }`);
    }

    return true;  //regreso un true por el custom de mi route
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}