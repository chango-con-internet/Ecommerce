import { Router } from "express";
import { crearPedido, obtenerPedidos, obtenerPedidoId } from "../controllers/pedidos.js";

const router = Router();

router.post("/", crearPedido);
router.get("/", obtenerPedidos);
router.get("/:id", obtenerPedidoId);

export default router;
