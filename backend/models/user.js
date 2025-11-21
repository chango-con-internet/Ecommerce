import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  telefono: { type: Number, required: true, maxlength: 12 },
  correo: { type: String, required: true },
  password: { type: String, required: true, minlength: 10 },
});

const User = mongoose.model("User", userSchema, "user");
export default User;
