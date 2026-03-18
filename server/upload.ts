import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';
import type { Multer } from 'multer';

// Configure upload directory
const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'cars');

// Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await ensureUploadDir();
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = randomUUID();
    const ext = path.extname(file.originalname);
    const filename = `${uniqueSuffix}${ext}`;
    cb(null, filename);
  }
});

// File filter to accept only images
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif'
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos de imagem são permitidos (JPEG, PNG, WebP, GIF)'));
  }
};

// Configure multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 10 // Maximum 10 files per request
  }
});

// Helper function to get file URL
export function getFileUrl(filename: string): string {
  return `/uploads/cars/${filename}`;
}

// Helper function to delete file
export async function deleteFile(filename: string): Promise<void> {
  try {
    const filePath = path.join(UPLOAD_DIR, filename);
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}

// Helper function to validate uploaded files
export function validateUploadedFiles(files: Express.Multer.File[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!files || files.length === 0) {
    errors.push('Nenhuma foto foi enviada');
    return { isValid: false, errors };
  }
  
  files.forEach((file, index) => {
    if (file.size > 5 * 1024 * 1024) {
      errors.push(`Arquivo ${index + 1} é muito grande (máximo 5MB)`);
    }
    
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif'
    ];
    
    if (!allowedMimes.includes(file.mimetype)) {
      errors.push(`Arquivo ${index + 1} não é um formato de imagem válido`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
