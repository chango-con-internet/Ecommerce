import express from 'express';
import cors from 'cors';
import "./db/db.js";

// Rutas
import ProductosRouter from "./routes/productos.js";
import UserRouter from "./routes/user.js";
import LoginRouter from "./routes/login.js";
import PerfilRouter from "./routes/perfil.js";
import recuperarPassword from "./routes/recuperar.js";
import PedidosRouter from "./routes/pedidos.js";
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta base
app.get('/', (req, res) => {
  res.send('Bienvenido al curso de node express');
});

// Rutas API
app.use("/api/productos", ProductosRouter);
app.use("/api/user", UserRouter);
app.use("/api/login", LoginRouter);
app.use("/api/perfil", PerfilRouter);
app.use("/api/recuperar", recuperarPassword);
app.use("/api/pedidos", PedidosRouter);
// Servidor
app.listen(8081, () => console.log('Servidor corriendo en http://localhost:8081'));
