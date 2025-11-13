import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// ✅ Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Servidor conectado correctamente con MongoDB Atlas y Cloudinary!"))
  .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));

// ✅ Definición del esquema de imágenes
const imagenSchema = new mongoose.Schema({
  nombre: String,
  url: String,
});
const Imagen = mongoose.model("Imagen", imagenSchema);

// ✅ Endpoint para obtener todas las imágenes
app.get("/api/images", async (req, res) => {
  try {
    const imagenes = await Imagen.find();
    res.json(imagenes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener imágenes" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
