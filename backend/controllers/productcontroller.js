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

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Productos.find();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

// Obtener producto por ID
export const obtenerProductoId = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Productos.findById(id);

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    console.error("Error al obtener el producto por ID", error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

// Actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const actualizado = await Productos.findByIdAndUpdate(id, req.body, { new: true });

    if (!actualizado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
      message: "Producto actualizado correctamente",
      producto: actualizado,
    });
  } catch (error) {
    console.error("Error al actualizar el producto", error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

// Eliminar producto
export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminado = await Productos.findByIdAndDelete(id);

    if (!eliminado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el producto", error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};
