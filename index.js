import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// Definir el esquema
const imagenSchema = new mongoose.Schema({
  nombre: String,
  url: String,
});

// Crear el modelo
const Imagen = mongoose.model("Imagen", imagenSchema, "Nube-1");

// Ruta para obtener las imágenes
app.get("/api/images", async (req, res) => {
  try {
    const imagenes = await Imagen.find();
    res.json(imagenes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener imágenes" });
  }
});

// Ruta raíz
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
