const { response } = require('express'); //Agrego esto para que visual studio detecte el res.status, .json, etc..
const { request } = require('express'); //Agrego esto para que visual studio detecte el req.status, .json, etc..

const bcrypjs = require('bcryptjs');
const Usuario = require('../models/usuario'); // La U mayuscula es para que me permita crear una instacia de mi modelo de usuario


const usuariosGet = async(req = request, res = response)=> {

    //const query = req.query;
    //const { q, nombre, apikey, id = 1} = req.query;  //seteo el id por default en 1 si no viene con la desestructuracion

    const { limite = 5, desde = 0 } = req.query;
    const query = {estado:true};

    // const usuarios = await Usuario.find(query)
    //     .skip(desde) // skip() especifica el numero desde el cual quiero ver a los usuarios.
    //     .limit(limite); //limit() especifica el numero de usuarios que la query regresa. Recibe un number. ¿Es necesario castearlo porque cuando viene el argumento y lo tomamos de la query, lo hace en string?

    // const total = await Usuario.countDocuments(query); //contador de usuarios con estado:true      

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(desde)
            .limit(limite)
    ]);

    res.json({
        total,
        usuarios
        // total,
        // usuarios
        //msg: 'get API - controller',
        // q,
        // nombre,
        // apikey,
        // id
    });
}

const usuariosPut = async(req = request, res = response)=> {

    const { id } = req.params; // el id ya viene configurado en express y lo parsea en una prop del obj req.params;
    const { _id, password, google, correo, ...resto } = req.body; //extraigo todo lo que NO necesito o quiero manipular. El _id lo extraigo en caso de que venga y se intente actualizar y reviente la app

    //Validacion del password contra base de datos
    if (password){ //si existe  se quiere actualizar la pass
        //Encryptar la password
        const salt = bcrypjs.genSaltSync(); 
        resto.password = bcrypjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto); //modelo de usuario

    res.json({
        msg: 'get PUT - controller',
        usuario
    });
}

const usuariosPost = async(req, res = response)=> {
    //middlewares personalidao -> verificar-campos.js

    //const { nombre, id } = req.body;
    //const body = req.body;
    const { nombre, correo, password, rol } = req.body; //Desestructuro lo que me interesa
    const usuario = new Usuario({nombre, correo, password, rol}); // todos los argumentos que recibamos del req.body se los voy a mandar a mi modelo Usuario. La ventaja es que si viene un campo que no esta definido en mi modelo no se va a grabar y mongoose lo ignora

    //Verificar si existe el email -> middleware personalizado -> helpers/db-validators.js

    //Encryptar la password
    const salt = bcrypjs.genSaltSync(); //genSaltSync() genera un hash(un numero de digitos aleatorios) que por default hace 10 vueltas. Para mayor seguridad se puede incrementar pero tardaria mas en generarse genSalt(100)
    usuario.password = bcrypjs.hashSync(password, salt);  //Al ser usuario un objeto puedo manipular su propiedad password.

    //Guardar usuario en DB    
    await usuario.save();

    res.json({      //Borrar password de manera global -> justo antes de llamar al modelo de usuario para imprimirlo en la respuesta hay un metodo .toJSON  en models/usuario.js
        usuario
        //msg: 'get POST - controller',
        // nombre,
        // id
    });
}

const usuariosDelete = async(req, res = response)=> {

    const { id } = req.params;

    //Borrar fisicamente el usuario. NO RECOMENDADO
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}); // recibe dos paramentros, el id y el estado que quiero actualizar

    res.json({
        msg: 'get DELETE - controller',
        usuario
    });
}

const usuariosPatch = (req, res = response)=> {
    res.json({
        msg: 'get PATCH - controller'
    });
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}