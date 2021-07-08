const express= require('express');

const { bdConnection } = require('./db/config');
require ('dotenv').config();
const cors = require('cors');
const path =  require('path');
//const  path = requiere('path');

//crear el servidor/ aplicacionde expres
const app = express();

//Base de Datos
bdConnection();
//CORS
app.use(cors());

//directorio publico
app.use(express.static('public') );



//Lectura y parseo del body
app.use(express.json() );


//Rutas
app.use( '/api/auth', require('./routes/auth') );

//manejar las demas rutas
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'public/index.html' ));
});


app.listen(process.env.PORT, () => { 
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);


});