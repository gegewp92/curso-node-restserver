const { validationResult } = require('express-validator');


const verificarCampos = (req, res, next) => {

    //Aca se genera el error del check().isEmail() si existe durante la verificacion, en el middleware
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors) //devuelvo los errors que encontro el express-validator
    }

    next(); //next() pasara al siguiente middleware o controlador si no hay errores
}



module.exports = {
    verificarCampos
}