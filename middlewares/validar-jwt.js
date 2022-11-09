const jwt = require('jsonwebtoken');
const { request, response } = require('express');

const Usuario = require('../models/usuario');


const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token') //metodo -> devuelve el header especificado

    if (!token) {

        return res.status(401).json({  // 401 -> Unauthtorized. return termina
            msg:'No existe token en la peticion'
        });
    }


    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);  // verify() recibe el token y private key (variable de ambiente .env)
        //const payload =  { uid: '633550ce5da1ea6d7647d99c', iat: 1667114823, exp: 1667129223 }

        //req.uid = uid;   // solo me interesa el uid para luego poder procesarlo en los controladores (ej: usuariosDelete)

        const usuario = await Usuario.findById( uid );

        //Verificar si existe el uid del usuario que quiere borrar
        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no valido - no existe el usuario'
            });
        }

        //Verificar si el uid tiene estado: true
        if( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado:false'
            });
        }

        req.usuario = usuario;  // con esto puedo manipular el usuario en otros controlodores/middlewares

        next();

    } catch (error) {

        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validarJWT
}