const { response } = require('express'); //Agrego esto para que visual studio detecte el res.status, .json, etc..
const { request } = require('express'); //Agrego esto para que visual studio detecte el req.status, .json, etc..

const { Producto } = require('../models');

//obtenerProducto - paginado - total de productos - populate
const obtenerProductos = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado:true }

    //const categoriass = await Categoria.find(query);
    
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')  // 2 parametro: la referencia y lo que me interesa mostrar
            .skip(desde)
            .limit(limite)
    ]);

    res.status(200).json({
        msg:'ProductosGet OK!',
        total,
        productos
    });
}

//obtenerProducto - populate - me devuelve el objeto
const obtenerProducto = async(req = request, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findById( id );

    //middleware personalizado -> helpers/db-validators.js    :  existeCategoriaPorId
    // if(!categoria){   
    //     return res.status(400).json({
    //         msg: `No se encontro esa categoria por el id: ${ id }`
    //     })
    // }

    res.status(200).json({
        producto
    })
}

//crearProducto
const crearProducto = async (req = request, res = response) => {

    const { estado, usuario, ...body } = req.body;

    //Verifico que no exista ese producto
    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if(productoDB){
        return res.status(400).json({
            msg: `El producto: ${ productoDB.nombre }, ya existe`
        })
    }

    // Generar la data que quiero guardar en la BD como esta en mi modelo.  El 'estado' es algo que el frontend podria enviar o no, por eso tengo que evitar recibirlo. Por eso genero yo la data y excluyo el estado
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id    // req.usuario lo tengo desde el middleware validarJWT

    }

    const producto = new Producto ( data );
    
    //Guardo en la DB
    await producto.save();

    res.status(201).json({
        msg:'crearProducto OK!',
        producto
    });

}

//actualizarProducto
const actualizarProducto = async(req = request, res = response) => {

    const { id } = req.params;
    const { usuario, estado, nombre, categoria, ...body } = req.body;

    //const producto = await Producto.findById( id );  --> middleware personalizado(existeProductoPorId), ya esta validado por eso no es necesario

    data = {
        ...body,
        nombre: nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = await Producto.findByIdAndUpdate(id, data, { new:true });

    res.json({
        msg: 'Producto actualizado!',
        producto
    })
}

//borrarProducto - estado:false
const borrarProducto = async(req = request, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, { estado:false }, { new: true });

    res.json({
        msg: 'Producto borrado (estado:false)',
        producto
    })

}


module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}