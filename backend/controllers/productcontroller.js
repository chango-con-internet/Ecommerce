// backend/controllers/productcontroller.js
import Productos from "../models/productos.js";

// Crear producto
export const crearProducto = async (req, res) => {
  try {
    const { productId, nombre, descripcion, precio, imagen } = req.body;
    const newProduct = new Productos({
      productId,
      nombre,
      descripcion,
      precio,
      imagen,
    });
    await newProduct.save();
    res.status(201).json({ message: "Producto guardado con éxito" });
  } catch (error) {
    console.error("Error al guardar el producto", error);
    res.status(400).json({ message: "Error al ingresar el producto" });
  }
};

// Obtener productos
export const obtenerProducto = async (req, res) => {
  try {
    const productos = await Productos.find();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};
