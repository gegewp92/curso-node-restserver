const { response } = require('express'); //Agrego esto para que visual studio detecte el res.status, .json, etc..
const { request } = require('express'); //Agrego esto para que visual studio detecte el req.status, .json, etc..

const usuariosGet = (req = request, res = response)=> {

    //const query = req.query;
    const { q, nombre, apikey, id = 1} = req.query;  //seteo el id por default en 1 si no viene con la desestructuracion

    res.json({
        msg: 'get API - controller',
        q,
        nombre,
        apikey,
        id
    });
}

const usuariosPut = (req = request, res = response)=> {

    const id = req.params.id; // el id ya viene configurado en express y lo parsea en una prop del obj req.params;

    res.json({
        msg: 'get PUT - controller',
        id 
    });
}

const usuariosPost = (req, res = response)=> {

    //const body = req.body;
    const { nombre, id } = req.body;

    res.json({
        msg: 'get POST - controller',
        nombre,
        id
    });
}

const usuariosDelete = (req, res = response)=> {
    res.json({
        msg: 'get DELETE - controller'
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