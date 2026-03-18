import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface CarPhotoUploadProps {
  carId: string;
  onUploadComplete?: (photos: any[]) => void;
  maxFiles?: number;
}

export function CarPhotoUpload({ carId, onUploadComplete, maxFiles = 10 }: CarPhotoUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file count
    if (selectedFiles.length + files.length > maxFiles) {
      toast.error(`Máximo de ${maxFiles} fotos permitido`);
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      const isValidType = validTypes.includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB

      if (!isValidType) {
        toast.error(`${file.name} não é um formato válido`);
        return false;
      }
      if (!isValidSize) {
        toast.error(`${file.name} é muito grande (máximo 5MB)`);
        return false;
      }
      return true;
    });

    setSelectedFiles(prev => [...prev, ...validFiles]);
    
    // Create previews
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      const newPreviews = prev.filter((_, i) => i !== index);
      // Revoke the blob URL to prevent memory leaks
      if (prev[index]) {
        URL.revokeObjectURL(prev[index]);
      }
      return newPreviews;
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Selecione pelo menos uma foto');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('photos', file);
      });

      const xhr = new XMLHttpRequest();
      
      // Track progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setUploadProgress(progress);
        }
      });

      return new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 201) {
            const response = JSON.parse(xhr.responseText);
            toast.success('Fotos enviadas com sucesso!');
            setSelectedFiles([]);
            setPreviews([]);
            setUploadProgress(0);
            onUploadComplete?.(response);
            resolve(response);
          } else {
            const error = JSON.parse(xhr.responseText);
            toast.error(error.error || 'Erro ao enviar fotos');
            reject(error);
          }
          setUploading(false);
        };

        xhr.onerror = () => {
          toast.error('Erro de conexão ao enviar fotos');
          setUploading(false);
          setUploadProgress(0);
          reject(new Error('Network error'));
        };

        xhr.open('POST', `/api/cars/${carId}/photos`);
        xhr.send(formData);
      });
    } catch (error) {
      console.error('Upload error:', error);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="photos" className="text-base font-medium">
              Fotos do Carro
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Selecione até {maxFiles} fotos (máximo 5MB cada)
            </p>
          </div>

          {/* File Input */}
          <div className="flex items-center gap-2">
            <Input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="photo-upload"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || selectedFiles.length >= maxFiles}
            >
              <Upload className="w-4 h-4 mr-2" />
              Selecionar Fotos
            </Button>
            <span className="text-sm text-muted-foreground">
              {selectedFiles.length} / {maxFiles} fotos
            </span>
          </div>

          {/* Previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden border">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(index)}
                    disabled={uploading}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {selectedFiles[index]?.name}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Enviando fotos...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          {/* Upload Button */}
          {selectedFiles.length > 0 && (
            <Button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="w-full"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar {selectedFiles.length} foto{selectedFiles.length > 1 ? 's' : ''}
                </>
              )}
            </Button>
          )}

          {/* Empty State */}
          {previews.length === 0 && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Nenhuma foto selecionada</p>
              <p className="text-sm text-gray-400 mt-1">
                Clique em "Selecionar Fotos" para começar
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
