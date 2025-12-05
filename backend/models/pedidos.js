import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    userId: { type: String, required: true },

    productos: [
        {
            productId: { type: String, required: true },
            nombre: { type: String, required: true },
            precio: { type: Number, required: true },
            cantidad: { type: Number, required: true }
        }
    ],

    direccion: { type: String, required: true },
    ciudad: { type: String, required: true },
    codigoPostal: { type: String, required: true },
    metodoPago: { type: String, required: true },

    total: { type: Number, required: true },

    fecha: { type: Date, default: Date.now }
});

const Pedido = mongoose.model("Pedido", pedidoSchema, "pedidos");

export default Pedido;
