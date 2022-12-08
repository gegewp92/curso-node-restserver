//usualmente el nombre del archivo tiene el mismo nombre que la coleccion solo que en minuscula
const { Schema, model } = require('mongoose');


const CategoriaSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true,
    },
    usuario:{  // de mi Schema
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

//Borrar estado. Sobreescribo un metodo
CategoriaSchema.methods.toJSON = function(){ //Uso una funcion normal porque necesito usar mi objeto this y hacer referencia a mi instancia

    const { __v, estado, ...data } = this.toObject(); //El operador ... unifica el resto de argumentos de mi this.toObject() en uno solo que sea data
    return data;
}

module.exports = model('Categoria', CategoriaSchema);