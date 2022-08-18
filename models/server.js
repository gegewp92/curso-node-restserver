const cors = require('cors');
const express = require('express')
//const app = express()


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Rutas de mi app

        this.routes();
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

        this.app.use(this.usuariosPath, require('../routes/usuarios.routes')); //    '/api/usuarios' mi nueva ruta para usar el Router

    }

    listen(){

        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
          })
    }

}


module.exports = Server;