import { ArrowRight, BadgeCheck, Banknote, ShieldCheck, TrendingDown, ClipboardCheck, Info, MessageCircle, User, Settings, Image as ImageIcon, Tag, Hash } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@/assets/images/hero-car.jpg";
import { useState, useEffect } from "react";

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

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        if (response.ok) {
          const data = await response.json();
          setCars(data);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const featuredCars = cars.slice(0, 3);

  const formatPrice = (value: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseFloat(value));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando carros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Luxury Car" 
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 z-10 relative mt-20 text-center md:text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <TrendingDown className="w-4 h-4" />
              <span>Oportunidades Reais Abaixo da FIPE</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-heading font-extrabold text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">GOLDEN</span> <br/>
              REPASSES
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Especialistas em veículos de repasse com transparência total. 
              Onde o preço de revenda encontra a segurança que você precisa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300 justify-center md:justify-start">
              <Link href="/estoque">
                <a className="bg-primary text-primary-foreground px-10 py-5 rounded-full font-bold text-lg hover:bg-primary/90 transition-all text-center flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:scale-105 active:scale-95">
                  Ver Estoque
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sellers Section */}
      <section className="py-20 bg-black/40 border-y border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-heading font-bold text-white mb-2">Nossos Consultores</h2>
          <p className="text-white/40 text-sm mb-12">Fale diretamente com nossa equipe via WhatsApp</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
            {[
              { id: '1', name: 'João Silva', phone: '5511999998888' },
              { id: '2', name: 'Maria Santos', phone: '5511999998888' },
              { id: '3', name: 'Pedro Costa', phone: '5511999998888' },
              { id: '4', name: 'Ana Oliveira', phone: '5511999998888' }
            ].map((seller) => (
              <a 
                key={seller.id}
                href={`https://wa.me/${seller.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center hover:bg-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <MessageCircle className="w-12 h-12 text-primary" />
                </div>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-heading font-bold text-white text-lg mb-1">{seller.name}</h4>
                <span className="text-primary text-xs font-medium tracking-widest uppercase">Consultor</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4">
                Estoque em <span className="text-primary">Destaque</span>
              </h2>
              <p className="text-white/40 text-lg">Oportunidades reais com transparência garantida.</p>
            </div>
            <Link href="/admin">
              <a className="flex items-center gap-2 bg-white/5 text-white/60 hover:text-white px-4 py-2 rounded-xl text-sm transition-all border border-white/10">
                <Settings className="w-4 h-4" />
                Painel de Controle
              </a>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredCars.map((car) => (
              <div key={car.id} className="group relative rounded-[2rem] border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition-all duration-500 hover:border-primary/50 flex flex-col h-full">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src="https://via.placeholder.com/400x250/4CAF50/ffffff?text={car.brand}+{car.model}" alt={car.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-primary/90 backdrop-blur-md text-primary-foreground px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl">
                      Disponível
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <div className="mb-6">
                    <h3 className="font-heading font-black text-2xl text-white mb-1 group-hover:text-primary transition-colors">{car.brand} {car.model}</h3>
                    <p className="text-white/40 font-medium">{car.year} • {car.mileage.toLocaleString()} km</p>
                  </div>

                  <div className="space-y-4 mb-8 mt-auto">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-heading font-black text-white">{formatPrice(car.price)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs font-bold p-3 rounded-2xl bg-green-500/5 text-green-400/70 border border-green-500/10">
                      <Info className="w-4 h-4" />
                      Disponível para venda
                    </div>
                  </div>

                  <Link href={`/car/${car.id}`}>
                    <a className="w-full inline-flex justify-center items-center gap-3 bg-white text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-95">
                      <ImageIcon className="w-5 h-5" />
                      Ver Detalhes e Fotos
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white/5 relative">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-8">
            Nossa <span className="text-primary underline decoration-primary/20 underline-offset-8">Missão</span>
          </h2>
          <p className="text-xl text-white/60 leading-relaxed mb-12">
            Não somos apenas uma loja de carros. Somos o seu atalho para o melhor preço do mercado, 
            entregando a verdade absoluta sobre cada veículo. Sinistro, leilão ou procedência impecável: 
            você saberá de tudo antes de fechar o negócio.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-white font-bold mb-2">Segurança</h4>
              <p className="text-white/40 text-sm">Consultas completas em todas as bases.</p>
            </div>
            <div className="p-6">
              <Banknote className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-white font-bold mb-2">Economia</h4>
              <p className="text-white/40 text-sm">Valores reais abaixo da tabela FIPE.</p>
            </div>
            <div className="p-6">
              <ClipboardCheck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-white font-bold mb-2">Rapidez</h4>
              <p className="text-white/40 text-sm">Negociação direta e sem burocracia.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

