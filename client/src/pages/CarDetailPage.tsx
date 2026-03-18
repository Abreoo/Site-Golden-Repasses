import React, { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CarPhotoUpload } from '@/components/CarPhotoUpload';
import { CarPhotoManager } from '@/components/CarPhotoManager';
import { ArrowLeft, Calendar, Fuel, Gauge, Settings, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  mileage: number;
  color: string;
  fuelType: string;
  transmission: string;
  description?: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CarDetailPage() {
  const params = useParams();
  const carId = params.id as string;
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCar = async () => {
    try {
      const response = await fetch(`/api/cars/${carId}`);
      if (response.ok) {
        const data = await response.json();
        setCar(data);
      } else {
        toast.error('Carro não encontrado');
      }
    } catch (error) {
      console.error('Error fetching car:', error);
      toast.error('Erro ao carregar carro');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (carId) {
      fetchCar();
    }
  }, [carId]);

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseFloat(price));
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('pt-BR').format(mileage) + ' km';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Carro não encontrado</h1>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {car.brand} {car.model}
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              {car.year} • {car.color}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">
              {formatPrice(car.price)}
            </div>
            <Badge variant={car.isAvailable ? "default" : "secondary"}>
              {car.isAvailable ? 'Disponível' : 'Indisponível'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Car Details */}
          <Card>
            <CardHeader>
              <CardTitle>Informações do Veículo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Ano</p>
                    <p className="font-medium">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Gauge className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Quilometragem</p>
                    <p className="font-medium">{formatMileage(car.mileage)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Fuel className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Combustível</p>
                    <p className="font-medium">{car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Settings className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Câmbio</p>
                    <p className="font-medium">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Preço</p>
                    <p className="font-medium">{formatPrice(car.price)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-gray-300" />
                  <div>
                    <p className="text-sm text-gray-500">Cor</p>
                    <p className="font-medium">{car.color}</p>
                  </div>
                </div>
              </div>
              
              {car.description && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h3 className="font-medium mb-2">Descrição</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">{car.description}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Photos Section */}
          <div className="space-y-6">
            <CarPhotoManager 
              carId={carId} 
              onPhotoChange={() => {
                // Refresh car data if needed
                fetchCar();
              }} 
            />
            
            <Separator />
            
            <CarPhotoUpload 
              carId={carId} 
              onUploadComplete={() => {
                toast.success('Fotos adicionadas com sucesso!');
                // Refresh photos
                fetchCar();
              }} 
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">ID do Veículo</p>
                <p className="font-mono text-sm">{car.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Data de Cadastro</p>
                <p className="font-medium">
                  {new Date(car.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Última Atualização</p>
                <p className="font-medium">
                  {new Date(car.updatedAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                Editar Informações
              </Button>
              <Button className="w-full" variant="outline">
                Gerenciar Fotos
              </Button>
              <Button className="w-full" variant="outline">
                Compartilhar Anúncio
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
