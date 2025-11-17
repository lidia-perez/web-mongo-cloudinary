import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

// Conexión a Mongo
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "BD-Nube-Lidia" })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error Mongo:", err));

// Esquema
const Imagen = mongoose.model(
  "Nube-1",
  new mongoose.Schema({
    nombre: String,
    url: String,
  }),
  "Nube-1"
);

// Ruta API
app.get("/api/images", async (req, res) => {
  try {
    const imgs = await Imagen.find({});
    res.json(imgs);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener imágenes" });
  }
});

app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});