import express from "express";
import { crearProducto, obtenerProducto } from "../controllers/productcontroller.js";

const router = express.Router();

router.post("/", crearProducto);
router.get("/", obtenerProducto);

export default router;
