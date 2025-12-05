import Pedido from "../models/pedidos.js";

// Crear un pedido
export const crearPedido = async (req, res) => {
  try {
    const {
      userId,
      productos,
      direccion,
      ciudad,
      codigoPostal,
      metodoPago,
      total
    } = req.body;

    const nuevoPedido = new Pedido({
      userId,
      productos,
      direccion,
      ciudad,
      codigoPostal,
      metodoPago,
      total
    });

    await nuevoPedido.save();

    res.status(201).json({
      message: "Pedido creado correctamente",
      pedido: nuevoPedido
    });

  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ message: "Error al crear el pedido" });
  }
};

// Obtener todos los pedidos
export const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos" });
  }
};

// Obtener pedido por Id
export const obtenerPedidoId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);

    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.json(pedido);

  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pedido" });
  }
};
