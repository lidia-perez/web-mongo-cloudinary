import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error en la conexión:", err));

const Imagen = mongoose.model("Imagen", new mongoose.Schema({
  nombre: String,
  url: String
}));

app.get("/imagenes", async (req, res) => {
  const imgs = await Imagen.find();
  res.json(imgs);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Servidor en puerto ${port}'));
