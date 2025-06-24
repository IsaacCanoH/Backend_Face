const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuración de Multer para guardar imagen como 'reference.jpg'
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, 'reference.jpg')
});

// cc

const upload = multer({ storage });

// Ruta para subir imagen
app.post('/upload', upload.single('photo'), (req, res) => {
  res.json({ message: 'Foto recibida correctamente' });
});

// Ruta para obtener imagen previa (si existe)
app.get('/photo', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', 'reference.jpg');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: 'No hay foto previa' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
