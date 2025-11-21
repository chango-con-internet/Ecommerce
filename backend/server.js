import express from 'express';
import cors from 'cors';
import "./db/db.js";
import ProductosRouter from "./routes/productos.js";
import UserRouter from "./routes/user.js";
import LoginRouter from "./routes/login.js";
import PerfilRouter from "./routes/perfil.js";

const app = express();

// Habilitar CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.send('Bienvenido al curso de node express');
});

app.use("/api/productos", ProductosRouter);
app.use("/api/user", UserRouter);
app.use("/api/login", LoginRouter); 
app.use("/api/perfil", PerfilRouter)

app.listen(8081, () => console.log('Servidor corriendo en http://localhost:8081'));
