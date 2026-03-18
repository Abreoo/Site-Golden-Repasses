import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Star, Image as ImageIcon, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface CarPhoto {
  id: string;
  carId: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  isMain: boolean;
  createdAt: string;
}

interface CarPhotoManagerProps {
  carId: string;
  onPhotoChange?: () => void;
  canManage?: boolean;
}

export function CarPhotoManager({ carId, onPhotoChange, canManage = false }: CarPhotoManagerProps) {
  const [photos, setPhotos] = useState<CarPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<CarPhoto | null>(null);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`/api/cars/${carId}/photos`);
      if (response.ok) {
        const data = await response.json();
        setPhotos(data);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast.error('Erro ao carregar fotos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [carId]);

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta foto?')) {
      return;
    }

    try {
      const response = await fetch(`/api/photos/${photoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Foto excluída com sucesso');
        setPhotos(prev => prev.filter(photo => photo.id !== photoId));
        onPhotoChange?.();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Erro ao excluir foto');
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast.error('Erro ao excluir foto');
    }
  };

  const handleSetMainPhoto = async (photoId: string) => {
    try {
      const response = await fetch(`/api/photos/${photoId}/main`, {
        method: 'PUT',
      });

      if (response.ok) {
        toast.success('Foto principal definida com sucesso');
        setPhotos(prev => 
          prev.map(photo => ({
            ...photo,
            isMain: photo.id === photoId
          }))
        );
        onPhotoChange?.();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Erro ao definir foto principal');
      }
    } catch (error) {
      console.error('Error setting main photo:', error);
      toast.error('Erro ao definir foto principal');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando fotos...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Fotos do Carro ({photos.length})</span>
          {photos.length > 0 && (
            <Badge variant="secondary">
              {photos.filter(p => p.isMain).length > 0 ? 'Com foto principal' : 'Sem foto principal'}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {photos.length === 0 ? (
          <div className="text-center py-8">
            <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Nenhuma foto cadastrada</p>
            <p className="text-sm text-gray-400 mt-1">
              Adicione fotos usando o formulário acima
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border">
                  <img
                    src={photo.url}
                    alt={photo.originalName}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-2">
                  {photo.isMain && (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      <Star className="w-3 h-3 mr-1" />
                      Principal
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{photo.originalName}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <img
                          src={photo.url}
                          alt={photo.originalName}
                          className="w-full max-h-96 object-contain"
                        />
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Tamanho:</span> {formatFileSize(photo.size)}
                          </div>
                          <div>
                            <span className="font-medium">Tipo:</span> {photo.mimeType}
                          </div>
                          <div>
                            <span className="font-medium">Data:</span> {new Date(photo.createdAt).toLocaleDateString('pt-BR')}
                          </div>
                          <div>
                            <span className="font-medium">Status:</span> {photo.isMain ? 'Foto Principal' : 'Foto Secundária'}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {canManage && !photo.isMain && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleSetMainPhoto(photo.id)}
                      title="Definir como foto principal"
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                  )}

                  {canManage && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeletePhoto(photo.id)}
                      title="Excluir foto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Photo info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs truncate">{photo.originalName}</p>
                  <p className="text-white/80 text-xs">{formatFileSize(photo.size)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
