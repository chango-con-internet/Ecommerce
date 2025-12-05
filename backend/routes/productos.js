import { Router } from "express";
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoId,
  actualizarProducto,
  eliminarProducto
} from "../controllers/productcontroller.js";


const router = Router();

router.post("/", crearProducto);
router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoId);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;
