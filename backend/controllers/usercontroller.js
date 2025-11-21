import user from "../models/user.js";
import bcrypt from "bcrypt";

export const registraruser=async(req,res)=>{
    try{
        const {userId,nombre,apellido,edad,telefono,correo,password}=req.body;
        if (!userId || !nombre || !apellido || !edad || !telefono || !correo || !password){
            return res.status(400).json({message:"Todos los campos son obligatorios"});
        }
        
        //validar
        const existeuser =await user.findOne({correo});
        if (existeuser){
            return res.status(400).json({message: "El Usuario ya se encuentra registrado"});
        }

        //Encriptrar Contraseña
        const saltRounds=10;
        const hashedPassword= await bcrypt.hash(password,saltRounds);

        //crear usuario
        const newuser = new user ({userId,nombre,apellido,edad,telefono,correo,password:hashedPassword});
        await newuser.save();
        res.status(201).json({message:"Usuario Registrado con exito"})

    } catch(error){
        res.status(500).json({message:"error al registrar usuario",error:error.message});

    };
    
}