import express from "express";
import {loginuser} from "../controllers/login.js"

const router = express.Router();

// LA RUTA N
router.post("/",loginuser);


export default router;