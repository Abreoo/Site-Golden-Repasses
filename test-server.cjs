const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Configurar upload
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas'));
    }
  }
});

// Criar pasta uploads se não existir
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'dist', 'public')));
app.use('/uploads', express.static('uploads'));

// Middleware para JSON
app.use(express.json());

// API para carros
app.get('/api/cars', (req, res) => {
  res.json([
    {
      id: '1',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2022,
      price: '120000.00',
      mileage: 15000,
      color: 'Prata',
      fuelType: 'Flex',
      transmission: 'Automático',
      description: 'Toyota Corolla 2022 em excelente estado',
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      brand: 'Honda',
      model: 'Civic',
      year: 2021,
      price: '95000.00',
      mileage: 25000,
      color: 'Preto',
      fuelType: 'Flex',
      transmission: 'Automático',
      description: 'Honda Civic 2021 completo',
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
});

app.get('/api/cars/:id', (req, res) => {
  const carId = req.params.id;
  const cars = [
    {
      id: '1',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2022,
      price: '120000.00',
      mileage: 15000,
      color: 'Prata',
      fuelType: 'Flex',
      transmission: 'Automático',
      description: 'Toyota Corolla 2022 em excelente estado',
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  const car = cars.find(c => c.id === carId);
  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ error: 'Carro não encontrado' });
  }
});

// API de fotos
app.get('/api/cars/:id/photos', (req, res) => {
  // Simular fotos existentes
  const mockPhotos = [
    {
      id: '1',
      carId: req.params.id,
      filename: 'car1-photo1.jpg',
      originalName: 'foto-frente.jpg',
      mimeType: 'image/jpeg',
      size: 1024000,
      url: 'https://via.placeholder.com/400x300/4CAF50/ffffff?text=Carro+Foto+1',
      isMain: true,
      createdAt: new Date().toISOString()
    }
  ];
  res.json(mockPhotos);
});

app.post('/api/cars/:id/photos', upload.array('photos', 10), (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'Nenhuma foto enviada' });
    }

    const uploadedPhotos = files.map((file, index) => ({
      id: `photo-${Date.now()}-${index}`,
      carId: req.params.id,
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`,
      isMain: index === 0, // Primeira foto é a principal
      createdAt: new Date().toISOString()
    }));

    res.status(201).json(uploadedPhotos);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Erro no upload' });
  }
});

app.delete('/api/photos/:id', (req, res) => {
  // Simular deleção
  res.status(204).send();
});

app.put('/api/photos/:id/main', (req, res) => {
  // Simular definição de foto principal
  res.json({ message: 'Foto principal definida com sucesso' });
});

// API de teste
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando!', timestamp: new Date() });
});

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'public', 'index.html'));
});

// Rota de teste de upload
app.get('/test-upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-upload.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Servidor com UPLOAD rodando em:`);
  console.log(`   ➜ http://localhost:${PORT}`);
  console.log(`   ➜ http://127.0.0.1:${PORT}`);
  console.log(`   ➜ http://0.0.0.0:${PORT}`);
  console.log(`\n✅ Upload de fotos ativado!`);
  console.log(`📁 Fotos salvas em: ./uploads/\n`);
});
