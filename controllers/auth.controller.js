const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');



const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
        
        // Verificar que exista el correo
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msj: 'Usuario / Password incorrecto - correo'
            });
        }

        // Verificar si el usuario esta activo en la BD -> estado: true
        if(!usuario.estado){
            return res.status(400).json({
                msj: 'Usuario / Password incorrecto - estado: false'
            });
        }

        // Verificar que la pass coincida con la pass de la DB
        const validPassword = bcryptjs.compareSync( password, usuario.password );  //compareSync() compara ambas contraseñas y devuelve un boolean
        if(!validPassword){
            return res.status(400).json({
                msj: 'Usuario / Password incorrecto - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hubo un error. Contactar al admin'
        })
    }

}



module.exports = {
    login
}