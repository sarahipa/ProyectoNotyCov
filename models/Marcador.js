
const { Schema, model} = require('mongoose');



const MarcadorSchema = Schema({


    marcador: {
        type: String,
        required: true,
        unique: true
     }
    


});

module.exports = model('Marcador', MarcadorSchema)