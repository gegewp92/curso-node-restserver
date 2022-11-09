const { response } = require("express")




const esAdminRole = (req, res = response, next) => {

    //console.log(req.usuario); --> viene de validarJWT. usuario se creo en base al uid que venia en el jwt
    /*
        {
            _id: new ObjectId("633550ce5da1ea6d7647d99c"),
            nombre: 'test 1',
            correo: 'test1@rere.com',
            password: '$2a$10$nkl8uTcfSXooQDO56EbmSufBe.qXdwHRwyPQMFAZe5GydfzYQHdz6',
            rol: 'USER_ROLE',
            estado: true,
            google: false,
            __v: 0
        }
    */

    //verificamos el json web token 
    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere verificar el rol sin validar el token primero'
        });
    }


    const { rol, nombre } = req.usuario;

    //verificamos si tiene un rol de ADMIN
    if(rol !== 'ADMIN_ROLE'){
        return res.status(500).json({
            msg: `El usuario ${nombre} no es un ADMIN`
        });
    }

    next();
}



const tieneRole = ( ...roles ) => {  //roles -> 'ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'

    return (req, res = response, next) => {

        //verificamos el json web token 
        if(!req.usuario){
            return res.status(500).json({
                msg:'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if( !roles.includes(req.usuario.rol) )
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            })
            
        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRole
}