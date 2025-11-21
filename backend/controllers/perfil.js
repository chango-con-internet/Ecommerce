import User from "../models/user.js";

// Obtener perfil del usuario en la base de datos

export const obtenerperfil = async(req,res)=>{
    try{
        const {email} = req.body
        if (!email){
            return res.status(400).json({message:"Correo Es Requerido"});
        } 
        
        //traer el correo desde la base de datos
    
    const usuario = await User.findOne({correo:email}).select('-passwords'); 
    if (!usuario){
        return res.status(400).json({message:"Usuario No Encontrado"});
    }
    res.status(200).json({
        usuario:{
            userId:usuario.userId,
            nombre:usuario.nombre,
            apellido:usuario.apellido,
            edad:usuario.edad,
            telefono:usuario.telefono,
            correo:usuario.correo,
            passwords:usuario.passwords
        }
    })

    } catch (error){
        res.status(500).json({message:"Error Al Obtener el perfl",error:error(message)})
    }
}