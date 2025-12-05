import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true, unique: true }, // correo único
    password: { type: String, required: true }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;
