import { ArrowRight, BadgeCheck, Banknote, ShieldCheck, TrendingDown, ClipboardCheck, Info, MessageCircle, User, Settings, Image as ImageIcon, Tag, Hash } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@/assets/images/hero-car.jpg";
import { mockCars, sellers } from "@/data/mock-cars";
import { useState, useEffect } from "react";

export default function Home() {
  const [cars, setCars] = useState(mockCars);

  // Carrega do LocalStorage se existir
  useEffect(() => {
    const savedCars = localStorage.getItem('golden_repasses_inventory');
    if (savedCars) {
      setCars(JSON.parse(savedCars));
    }
  }, []);

  const featuredCars = cars.slice(0, 3);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getHistoryLabel = (history: string) => {
    switch(history) {
      case 'auction': return 'Passagem por Leilão';
      case 'accident': return 'Histórico de Sinistro';
      default: return 'Sem Restrições';
    }
  };

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
            {sellers.map((seller) => (
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
                  <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-primary/90 backdrop-blur-md text-primary-foreground px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl">
                      Repasse
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
                      <span className="text-white/30 text-xs font-bold uppercase tracking-wider mb-1">Tabela FIPE: {formatPrice(car.fipePrice)}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-heading font-black text-white">{formatPrice(car.price)}</span>
                        {car.fipePrice > car.price && (
                          <div className="bg-green-500/10 text-green-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                            -{Math.round(((car.fipePrice - car.price) / car.fipePrice) * 100)}%
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-2 text-xs font-bold p-3 rounded-2xl ${
                      car.history === 'clean' ? 'bg-green-500/5 text-green-400/70 border border-green-500/10' : 'bg-yellow-500/5 text-yellow-400/70 border border-yellow-500/10'
                    }`}>
                      <Info className="w-4 h-4" />
                      {getHistoryLabel(car.history)}
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/${sellers[0].phone}?text=Olá, tenho interesse no ${car.brand} ${car.model}`}
                    target="_blank"
                    className="w-full inline-flex justify-center items-center gap-3 bg-white text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Consultar Agora
                  </a>
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

