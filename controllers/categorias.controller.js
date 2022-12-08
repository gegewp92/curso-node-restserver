const { response } = require('express'); //Agrego esto para que visual studio detecte el res.status, .json, etc..
const { request } = require('express'); //Agrego esto para que visual studio detecte el req.status, .json, etc..
const { Categoria } = require('../models');

//obtenerCategorias - paginado - total de categorias - populate
const obtenerCategorias = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado:true }

    //const categoriass = await Categoria.find(query);
    
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')  // 2 parametro: la referencia y lo que me interesa mostrar
            .skip(desde)
            .limit(limite)
    ]);

    res.status(200).json({
        msg:'CategoriasGet OK!',
        total,
        categorias
    });

}

//obtenerCategoria - populate - me devuelve el objeto
const obtenerCategoria = async(req = request, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById( id );

    //middleware personalizado -> helpers/db-validators.js    :  existeCategoriaPorId
    // if(!categoria){   
    //     return res.status(400).json({
    //         msg: `No se encontro esa categoria por el id: ${ id }`
    //     })
    // }

    res.status(200).json({
        categoria
    })
}


const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase(); // mayuscula para hacer facilitar el filtro en una busqueda

    //Verifico que no exista esa categoria
    const categoriaDB = await Categoria.findOne({ nombre });

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria: ${ categoriaDB.nombre }, ya existe`
        })
    }

    // Generar la data que quiero guardar en la BD como esta en mi modelo.  El 'estado' es algo que el frontend podria enviar o no, por eso tengo que evitar recibirlo. Por eso genero yo la data y excluyo el estado
    const data = {
        nombre,
        usuario: req.usuario._id    // req.usuario lo tengo desde el middleware validarJWT
    }

    const categoria = new Categoria ( data );
    
    //Guardo en la DB
    await categoria.save();

    res.status(201).json({
        msg:'crearCategoria OK!',
        categoria
    });

}

//actualizarCategoria
const actualizarCategoria = async(req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body; // extraigo el usuario y el estado (de mi modelo de Categoria, que puede llegar a venir desde el front y hay que evitarlo), y el resto lo guardo en mi objeto data
    //console.log(data)  --> { nombre: 'OTRO' }

    // Modifico la data que quiero actualizar( No estoy cambiando la const solo modifico una propiedad de mi objeto data)
    data.nombre  = data.nombre.toUpperCase();  //capitalizo el nombre que se envia desde el front
    data.usuario = req.usuario._id;  // modifico el id del usuario que hizo la actualizacion  (reminder: el req.usuario._id viene de mi validarJWT ->  req.usuario = usuario;)
    

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });  // { new: true } tambien se actualiza en la res

    res.json( categoria );

}

//borrarCategoria - estado:false
const borrarCategoria = async(req = request, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado:false })

    res.json({
        categoria
    })

}


module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}