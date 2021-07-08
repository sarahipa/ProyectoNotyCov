const { response } = require("express");
const Usuario = require('../models/Usuario');
const Marcador = require('../models/Marcador');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");


 const crearUsuario =  async(req, res = response) => {
    
    const { email, name, password} = req.body;
    try{
    //verificart el email
    const usuario = await Usuario.findOne({email});
    if (usuario){
        return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe en ese email'
        });
    }
    //crear el usuario con el modelo 
    const dbUser = new Usuario(req.body);
    //hashear la contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync( password, salt);
    //generrar el JWT
    const token = await generarJWT( dbUser.id, name );
    //Crear el usuaro de BD
    await dbUser.save();
    //Generar respuesta exitosa
    return res.status(201).json({
        ok: true,
        uid: dbUser.id,
        name,
        email,
        token

    });

    }catch(error){
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }

}

const loginUsuario = async (req, res = response)=> {

    const { email, password} = req.body;

    try{

        const dbUser = await Usuario.findOne({email});

        if( !dbUser ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        //confirmar si el password hace match
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if( !validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El passwor no es valido'
            });
        }

        //generar el jwt
        const token = await generarJWT( dbUser.id, dbUser.name );

        //respueta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token

        });



    }catch (error) {
        console-log(error); 
        
        return res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }

}

const revalidarToken = async(req, res = response)=> {

   const {uid} = req;

   //leer la base de datos 
   const dbUser = await Usuario.findById(uid);



   const token = await generarJWT( uid, dbUser.name );


    return res.json({
        ok: true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token
        
    });

}


const crearMarcador = async(req, res = response)=> {

    const {marcador}= req.body;
    console.log(marcador)

    try {
         const marcadorr = await Marcador.findOne({marcador});
    if (marcadorr) {
        return res.status(400).json({
            ok:false,
            msg: 'ellllll marcador ya existe'
        }) 
    };
      const dbmarca = new Marcador(req.body);

      await dbmarca.save();

      return res.status(201).json({
        ok: true,
    });

    } catch (error) {
        return res.json({
       ok:true,
       msg: 'jhjk'
  
    });
    }
}

const mostrar = async(req, res = response)=> {

   // const {marcador} = req.body;
  // console.log(marcador)
   // //leer la base de datos 
   // const dbmarca = await Marcador.findOne(marcador);
    //const marca = await generarJWT( marcador, dbmarca.marcador );
   //  return res.json({
     //   marcado: dbmarca.marcador
   //  });

   /*  */
   try {

    const marcador = await Marcador.find();  
 //  res.json(marcador);

     const newMarcador = [];

     marcador.forEach((m) => {
        newMarcador.push(JSON.parse(m.marcador));
    });
     res.json(newMarcador);

     
   } catch (error) {
       console.log(error);
       res.status(500).send('hubo un error')
       
   }

}

module.exports={

    crearUsuario,
    loginUsuario,
    revalidarToken,
   crearMarcador,
   mostrar

}