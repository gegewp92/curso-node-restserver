const path = require('path');  // metodo u objeto propio de node para crear las urls
const { v4: uuidv4 } = require('uuid'); //'1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


const subirArchivo = ( files, extensionesPermitidas = ['img', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => { //carpeta es opcional 

    return new Promise ( (resolve, reject) => {

        const { archivo } = files;  // 'archivo' -> nombre que viene desde el body en postman
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];


        //Valido que el archivo tenga una extension permitida
        if( !extensionesPermitidas.includes(extension) ){
            return reject( `La extension '${ extension }' no esta permitida. Verifique que sea: ${ extensionesPermitidas }` );
        }

        //Renombro los files para que sean unicos usando uuid
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp);  // el path donde quiero colocar el archivo. "/uploads"
        //console.log(uploadPath);  -> E:\Cursos\Projects\curso-node\07-restserver\uploads\1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed.jpg

        // Use the mv() method to place the file somewhere on your server
        archivo.mv( uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve ( nombreTemp );  //devuelvo lo que me interesa que es el nombre del archivo. El path como es local no interesa
    });

    } )

}


module.exports = {
    subirArchivo
}