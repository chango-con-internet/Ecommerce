import User from "../models/user.js";

// Obtener perfil del usuario en la base de datos
export const obtenerperfil = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: "Correo es requerido" });
        }
        
        // Traer el usuario desde la base de datos
        // ✅ Corregido: era '-passwords' ahora es '-password'
        const usuario = await User.findOne({ correo: email }).select('-password');
        
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        // ✅ Devolver todos los datos del usuario
        res.status(200).json({
            usuario: {
                userId: usuario._id,        // O usuario.userId según tu modelo
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                edad: usuario.edad,
                telefono: usuario.telefono,
                correo: usuario.correo
                // ✅ No incluir password por seguridad (ya lo excluimos con select)
            }
        });

    } catch (error) {
        // ✅ Corregido: era error(message) ahora es error.message
        res.status(500).json({ 
            message: "Error al obtener el perfil", 
            error: error.message 
        });
    }
};

export const actualizarPerfil = async (req, res) => {
    try {
        const { emailOriginal, datos } = req.body;

        if (!emailOriginal) {
            return res.status(400).json({ message: "Correo original es requerido" });
        }

        const usuarioActualizado = await User.findOneAndUpdate(
            { correo: emailOriginal },
            datos,
            { new: true }
        ).select("-password");

        if (!usuarioActualizado) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({
            message: "Perfil actualizado correctamente",
            usuario: usuarioActualizado
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar perfil",
            error: error.message
        });
    }
};

export const eliminarCuenta = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Correo es requerido" });
        }

        const eliminado = await User.findOneAndDelete({ correo: email });

        if (!eliminado) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({
            message: "Cuenta eliminada correctamente"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la cuenta",
            error: error.message
        });
    }
};
