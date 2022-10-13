const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre el obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo el obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});


//Borrar password. Sobreescribo un metodo
UsuarioSchema.methods.toJSON = function(){ //Uso una funcion normal porque necesito usar mi objeto this y hacer referencia a mi instancia

    const { __v, password, ...usuario } = this.toObject(); //El operador ... unifica el resto de argumentos de mi this.toObject() en uno solo que sea usuario
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);