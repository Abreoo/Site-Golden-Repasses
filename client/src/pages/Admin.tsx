import { useState, useEffect } from "react";
import { mockCars, Car } from "@/data/mock-cars";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

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
  History
} from "lucide-react";

import { Link } from "wouter";

function Admin() {

  const [cars, setCars] = useState<Car[]>(mockCars);

  useEffect(() => {
    const savedCars = localStorage.getItem("golden_repasses_inventory");

    if (savedCars) {
      setCars(JSON.parse(savedCars));
    }

  }, []);

  const handleSave = () => {

    localStorage.setItem(
      "golden_repasses_inventory",
      JSON.stringify(cars)
    );

    alert("Estoque salvo com sucesso!");

  };

  const addCar = () => {

    const newCar: Car = {
      id: Date.now().toString(),
      brand: "Nova Marca",
      model: "Novo Modelo",
      year: new Date().getFullYear(),
      price: 0,
      fipePrice: 0,
      mileage: 0,
      image:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80",
      transmission: "Automático",
      fuel: "Flex",
      status: "available",
      history: "clean"
    };

    setCars([newCar, ...cars]);

  };

  const removeCar = (id: string) => {

    setCars(cars.filter((c) => c.id !== id));

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

        <div className="grid grid-cols-1 gap-6">

          {cars.map((car) => (

            <Card key={car.id} className="bg-white/5 border-white/10">

              <CardContent className="p-8">

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                  {/* IMAGEM */}

                  <div>

                    <Label className="text-white/60 text-xs flex items-center gap-2 mb-2">

                      <ImageIcon className="w-3 h-3" />
                      Imagem

                    </Label>

                    <img
                      src={car.image}
                      className="rounded-xl mb-3"
                    />

                    <Input
                      value={car.image}
                      onChange={(e) =>
                        updateCar(car.id, "image", e.target.value)
                      }
                    />

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
                    />

                  </div>

                  {/* PREÇOS */}

                  <div>

                    <Label className="text-white/60 text-xs flex items-center gap-2 mb-2">

                      <DollarSign className="w-3 h-3" />
                      Preços

                    </Label>

                    <Input
                      type="number"
                      value={car.fipePrice}
                      onChange={(e) =>
                        updateCar(car.id, "fipePrice", parseFloat(e.target.value))
                      }
                      placeholder="FIPE"
                      className="mb-3"
                    />

                    <Input
                      type="number"
                      value={car.price}
                      onChange={(e) =>
                        updateCar(car.id, "price", parseFloat(e.target.value))
                      }
                      placeholder="Repasse"
                    />

                  </div>

                  {/* HISTÓRICO */}

                  <div>

                    <Label className="text-white/60 text-xs flex items-center gap-2 mb-2">

                      <History className="w-3 h-3" />
                      Procedência

                    </Label>

                    <Select
                      value={car.history}
                      onValueChange={(value) =>
                        updateCar(car.id, "history", value)
                      }
                    >

                      <SelectTrigger>

                        <SelectValue placeholder="Histórico" />

                      </SelectTrigger>

                      <SelectContent>

                        <SelectItem value="clean">
                          Sem restrições
                        </SelectItem>

                        <SelectItem value="auction">
                          Leilão
                        </SelectItem>

                        <SelectItem value="accident">
                          Sinistro
                        </SelectItem>

                      </SelectContent>

                    </Select>

                    <div className="mt-6">

                      <Button
                        variant="destructive"
                        onClick={() => removeCar(car.id)}
                      >

                        <Trash2 className="w-4 h-4" />

                      </Button>

                    </div>

                  </div>

                </div>

              </CardContent>

            </Card>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Admin;