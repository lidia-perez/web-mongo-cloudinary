import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Servidor conectado correctamente con MongoDB Atlas y Cloudinary!"))
  .catch((err) => console.error("Error de conexión:", err));

// Esquema del documento
const imageSchema = new mongoose.Schema({
  nombre: String,
  url: String
}, { collection: 'Nube-1' }); // 👈 Esto fuerza a usar tu colección real

const Image = mongoose.model('Image', imageSchema);


// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor conectado correctamente con MongoDB Atlas y Cloudinary!");
});
//
// Ruta para obtener imágenes
app.get("/api/images", async (req, res) => {
  try {
    const imagenes = await Imagen.find();
    res.json(imagenes);
  } catch (err) {
    console.error("Error al obtener imágenes:", err);
    res.status(500).json({ error: "Error al obtener imágenes" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
