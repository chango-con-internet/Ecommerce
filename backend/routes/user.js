import express from "express";
import { registraruser} from "../controllers/usercontroller.js";

const router=express.Router();

//Registrar User
router.post("/register",registraruser);

export default router;