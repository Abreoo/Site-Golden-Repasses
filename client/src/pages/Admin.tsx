import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CarPhotoUpload } from "@/components/CarPhotoUpload";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import {
  Plus,
  Trash2,
  Save,
  Image as ImageIcon,
  Car as CarIcon,
  DollarSign,
  History,
  Upload,
  User,
  MessageCircle
} from "lucide-react";

import { Link } from "wouter";

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
  description?: string | null;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

function Admin() {

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/cars");
        if (response.ok) {
          const data = await response.json();
          setCars(data);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleSave = () => {
    const saveAll = async () => {
      try {
        await Promise.all(
          cars.map((car) =>
            fetch(`/api/cars/${car.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                brand: car.brand,
                model: car.model,
                year: car.year,
                price: car.price,
                mileage: car.mileage,
                color: car.color,
                fuelType: car.fuelType,
                transmission: car.transmission,
                description: car.description ?? null,
                isAvailable: car.isAvailable,
              }),
            })
          )
        );
        alert("Estoque salvo no banco com sucesso!");
      } catch (error) {
        console.error("Error saving cars:", error);
        alert("Erro ao salvar estoque.");
      }
    };

    saveAll();

  };

  const addCar = () => {
    const create = async () => {
      try {
        const response = await fetch("/api/cars", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brand: "Nova Marca",
            model: "Novo Modelo",
            year: new Date().getFullYear(),
            price: "0",
            mileage: 0,
            color: "Preto",
            fuelType: "Flex",
            transmission: "Automático",
            description: null,
            isAvailable: true,
          }),
        });

        if (response.ok) {
          const created = await response.json();
          setCars((prev) => [created, ...prev]);
        } else {
          alert("Erro ao criar carro.");
        }
      } catch (error) {
        console.error("Error creating car:", error);
        alert("Erro ao criar carro.");
      }
    };

    create();

  };

  const removeCar = (id: string) => {
    const remove = async () => {
      try {
        const response = await fetch(`/api/cars/${id}`, { method: "DELETE" });
        if (response.ok || response.status === 204) {
          setCars((prev) => prev.filter((c) => c.id !== id));
        } else {
          alert("Erro ao deletar carro.");
        }
      } catch (error) {
        console.error("Error deleting car:", error);
        alert("Erro ao deletar carro.");
      }
    };

    remove();

  };

  const updateCar = (id: string, field: keyof Car, value: any) => {

    setCars(
      cars.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      )
    );

  };

  return (

    <div className="min-h-screen bg-background pt-24 pb-12">

      <div className="container mx-auto px-4">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">

          <div>

            <h1 className="text-4xl font-black text-white mb-2 uppercase">
              Painel do Estoque
            </h1>

            <p className="text-white/40">
              Gerencie os veículos do estoque
            </p>

          </div>

          <div className="flex gap-4">

            <Link href="/">
              <Button variant="outline">
                Voltar ao site
              </Button>
            </Link>

            <Button onClick={addCar}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar carro
            </Button>

            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>

          </div>

        </div>

        {loading ? (
          <div className="text-white/60">Carregando...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6">

            {cars.map((car) => (

              <Card key={car.id} className="bg-white/5 border-white/10">

                <CardContent className="p-8">

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                  {/* IMAGEM */}

                    <div>

                    <Label className="text-white/60 text-xs flex items-center gap-2 mb-2">

                      <Upload className="w-3 h-3" />
                      Fotos do Veículo

                    </Label>

                    <div className="space-y-4">
                      <CarPhotoUpload carId={car.id} onUploadComplete={() => {}} />
                      
                      <div className="text-xs text-white/40">
                        <p>• Arraste e solte ou clique para selecionar</p>
                        <p>• Máximo 10 fotos (5MB cada)</p>
                        <p>• Formatos: JPEG, PNG, WebP</p>
                      </div>
                    </div>

                  </div>

                  {/* IDENTIFICAÇÃO */}

                    <div>

                    <Label className="text-white/60 text-xs flex items-center gap-2 mb-2">

                      <CarIcon className="w-3 h-3" />
                      Veículo

                    </Label>

                    <Input
                      value={car.brand}
                      onChange={(e) =>
                        updateCar(car.id, "brand", e.target.value)
                      }
                      placeholder="Marca"
                      className="mb-3"
                    />

                    <Input
                      value={car.model}
                      onChange={(e) =>
                        updateCar(car.id, "model", e.target.value)
                      }
                      placeholder="Modelo"
                      className="mb-3"
                    />

                    <Input
                      type="number"
                      value={car.year}
                      onChange={(e) =>
                        updateCar(car.id, "year", parseInt(e.target.value))
                      }
                      placeholder="Ano"
                      className="mb-3"
                    />

                    <Input
                      value={car.color}
                      onChange={(e) =>
                        updateCar(car.id, "color", e.target.value)
                      }
                      placeholder="Cor"
                      className="mb-3"
                    />

                    <Input
                      value={car.fuelType}
                      onChange={(e) =>
                        updateCar(car.id, "fuelType", e.target.value)
                      }
                      placeholder="Combustível"
                      className="mb-3"
                    />

                    <Input
                      value={car.transmission}
                      onChange={(e) =>
                        updateCar(car.id, "transmission", e.target.value)
                      }
                      placeholder="Câmbio"
                    />

                  </div>

                  {/* PREÇOS */}

                    <div>

                    <Label className="text-white/60 text-xs flex items-center gap-2 mb-2">

                      <DollarSign className="w-3 h-3" />
                      Preços

                    </Label>

                    <Input
                      value={car.price}
                      onChange={(e) =>
                        updateCar(car.id, "price", e.target.value)
                      }
                      placeholder="Preço"
                      className="mb-3"
                    />

                    <Input
                      type="number"
                      value={car.mileage}
                      onChange={(e) =>
                        updateCar(car.id, "mileage", parseInt(e.target.value))
                      }
                      placeholder="Quilometragem"
                    />

                  </div>

                  {/* HISTÓRICO */}

                    <div>

                    <Label className="text-white/60 text-xs flex items-center gap-2 mb-2">

                      <History className="w-3 h-3" />
                      Procedência

                    </Label>

                    <Select
                      value={car.isAvailable ? "available" : "unavailable"}
                      onValueChange={(value) =>
                        updateCar(car.id, "isAvailable", value === "available")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Disponibilidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Disponível</SelectItem>
                        <SelectItem value="unavailable">Indisponível</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      value={car.description ?? ""}
                      onChange={(e) =>
                        updateCar(car.id, "description", e.target.value)
                      }
                      placeholder="Descrição"
                      className="mt-3"
                    />

                    <div className="mt-6">

                      <Button variant="destructive" onClick={() => removeCar(car.id)}>

                        <Trash2 className="w-4 h-4" />

                      </Button>

                    </div>

                  </div>

                  </div>

                </CardContent>

              </Card>

            ))}

          </div>
        )}

      </div>

    </div>

  );

}

export default Admin;