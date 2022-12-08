const cors = require('cors');
const express = require('express');
const { dbConnection } = require('../database/config');
//const app = express()


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.authPath           = '/api/auth';
        this.buscarPath         = '/api/buscar';
        this.categoriasPath     = '/api/categorias';
        this.productosPath      = '/api/productos';
        this.usuariosPath       = '/api/usuarios';
        
        //Conectar a la DB
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
       
        //CORS - restringir acceso de otras paginas web a mi rest API. Caracteristica de seguridad, protege nuestro server.
        this.app.use(cors());

        //Configuracion necesaria para que la informacion de una peticion (POST, PUT, DELETE, ..) hacia el backend sea en formato JSON(o text, xml, ..)
        //Lectura y parseo del body
        this.app.use( express.json() ); //con esto cualquier info que venga la serializara en JSON

        //Directorio publico
        this.app.use( express.static('public') );

    }

    routes(){

        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.buscarPath, require('../routes/buscar.routes'));
        this.app.use(this.categoriasPath, require('../routes/categorias.routes')); //    '/api/categorias' mi nueva ruta para usar el Router
        this.app.use(this.productosPath, require('../routes/productos.routes')); //      '/api/productos' mi nueva ruta para usar el Router
        this.app.use(this.usuariosPath, require('../routes/usuarios.routes')); //        '/api/usuarios' mi nueva ruta para usar el Router
        
    }

    listen(){

        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
          })
    }

}


module.exports = Server;