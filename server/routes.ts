import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { upload, getFileUrl, validateUploadedFiles, deleteFile } from "./upload";
import { insertCarSchema, insertCarPhotoSchema } from "@shared/schema";
import type { Multer } from "multer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Car routes
  app.get("/api/cars", async (req, res) => {
    try {
      const cars = await storage.getAllCars();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar carros" });
    }
  });

  app.get("/api/cars/:id", async (req, res) => {
    try {
      const car = await storage.getCar(req.params.id);
      if (!car) {
        return res.status(404).json({ error: "Carro não encontrado" });
      }
      res.json(car);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar carro" });
    }
  });

  app.post("/api/cars", async (req, res) => {
    try {
      const carData = insertCarSchema.parse(req.body);
      const car = await storage.createCar(carData);
      res.status(201).json(car);
    } catch (error) {
      res.status(400).json({ error: "Dados inválidos" });
    }
  });

  app.put("/api/cars/:id", async (req, res) => {
    try {
      const carData = insertCarSchema.partial().parse(req.body);
      const car = await storage.updateCar(req.params.id, carData);
      if (!car) {
        return res.status(404).json({ error: "Carro não encontrado" });
      }
      res.json(car);
    } catch (error) {
      res.status(400).json({ error: "Dados inválidos" });
    }
  });

  app.delete("/api/cars/:id", async (req, res) => {
    try {
      const success = await storage.deleteCar(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Carro não encontrado" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar carro" });
    }
  });

  // Car photos routes
  app.get("/api/cars/:id/photos", async (req, res) => {
    try {
      const photos = await storage.getCarPhotos(req.params.id);
      res.json(photos);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar fotos" });
    }
  });

  app.post("/api/cars/:id/photos", upload.array('photos', 10), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      const validation = validateUploadedFiles(files);
      
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.errors });
      }

      const car = await storage.getCar(req.params.id);
      if (!car) {
        return res.status(404).json({ error: "Carro não encontrado" });
      }

      const uploadedPhotos = [];
      
      for (const file of files) {
        const photoData = insertCarPhotoSchema.parse({
          carId: req.params.id,
          filename: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          url: getFileUrl(file.filename),
          isMain: files.length === 1 // Se só uma foto, ela é a principal
        });

        const photo = await storage.createCarPhoto(photoData);
        uploadedPhotos.push(photo);
      }

      res.status(201).json(uploadedPhotos);
    } catch (error) {
      res.status(400).json({ error: "Erro ao fazer upload das fotos" });
    }
  });

  app.delete("/api/photos/:id", async (req, res) => {
    try {
      const photo = await storage.getCarPhoto(req.params.id);
      if (!photo) {
        return res.status(404).json({ error: "Foto não encontrada" });
      }

      // Delete file from filesystem
      await deleteFile(photo.filename);
      
      // Delete from database
      const success = await storage.deleteCarPhoto(req.params.id);
      
      if (!success) {
        return res.status(404).json({ error: "Foto não encontrada" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar foto" });
    }
  });

  app.put("/api/photos/:id/main", async (req, res) => {
    try {
      const photo = await storage.getCarPhoto(req.params.id);
      if (!photo) {
        return res.status(404).json({ error: "Foto não encontrada" });
      }

      const success = await storage.setMainPhoto(photo.carId, req.params.id);
      
      if (!success) {
        return res.status(400).json({ error: "Erro ao definir foto principal" });
      }

      res.json({ message: "Foto principal definida com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao definir foto principal" });
    }
  });

  return httpServer;
}
