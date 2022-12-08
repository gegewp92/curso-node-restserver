const { Schema, model } = require('mongoose');


const ProductoSchema = new Schema({
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
    usuario:{  // de mi Schema que crea el Producto
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion:{ type: String },   //breve descripcion del producto
    disponible:{ type: Boolean, default: true }  // ejemplo: disponible true/false por temporada
})

//Borrar estado. Sobreescribo un metodo
ProductoSchema.methods.toJSON = function(){ //Uso una funcion normal porque necesito usar mi objeto this y hacer referencia a mi instancia

    const { __v, estado, ...data } = this.toObject(); //El operador ... unifica el resto de argumentos de mi this.toObject() en uno solo que sea data
    return data;
}

module.exports = model('Producto', ProductoSchema);