import user from "../models/user.js";
import bcrypt from "bcrypt";

export const registraruser = async (req, res) => {
    try {
        const { nombre, apellido, edad, telefono, correo, password } = req.body;

        if (!nombre || !apellido || !edad || !telefono || !correo || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Validar si ya existe
        const existeuser = await user.findOne({ correo });
        if (existeuser) {
            return res.status(400).json({ message: "El Usuario ya se encuentra registrado" });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario SIN userId
        const newuser = new user({
            nombre,
            apellido,
            edad,
            telefono,
            correo,
            password: hashedPassword
        });

        await newuser.save();

        res.status(201).json({ message: "Usuario Registrado con exito" });

    } catch (error) {
    console.error("🔥 ERROR BACKEND REGISTER:", error); // <-- agrega esto
    res.status(500).json({
        message: "error al registrar usuario",
        error: error.message
    });
}
};
