import express from "express";
import { 
    obtenerperfil,
    actualizarPerfil,
    eliminarCuenta
} from "../controllers/perfil.js";

const router = express.Router();

router.post('/obtener', obtenerperfil);
router.put('/actualizar', actualizarPerfil);
router.delete('/eliminar', eliminarCuenta);

export default router;
