require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
app.use(express.static('public'));

const client = new MongoClient(process.env.MONGODB_URI);

async function getImages() {
  await client.connect();
  const db = client.db("BD-Nube-Lidia");
  const collection = db.collection("nube1");
  return await collection.find({}).toArray();
}

app.get('/images', async (req, res) => {
  try {
    const images = await getImages();
    res.json(images);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
