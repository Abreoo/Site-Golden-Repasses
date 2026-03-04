import { ArrowRight, BadgeCheck, Banknote, ShieldCheck, TrendingDown, ClipboardCheck, Info, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@/assets/images/hero-car.jpg";
import { mockCars, sellers } from "@/data/mock-cars";

export default function Home() {
  const featuredCars = mockCars.slice(0, 3);

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

        <div className="container mx-auto px-4 z-10 relative mt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              <TrendingDown className="w-4 h-4" />
              <span>Oportunidades Reais Abaixo da FIPE</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
              Transparência total em <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">veículos de repasse</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
              Na Golden Repasses, você compra com preço de revenda. Consultamos e informamos 
              detalhadamente se o veículo possui histórico de leilão ou sinistro. 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/estoque">
                <a className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all text-center flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                  Ver Estoque Agora
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sellers Section */}
      <section className="py-16 bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-white mb-8 text-center">Fale com nossos Consultores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {sellers.map((seller) => (
              <a 
                key={seller.id}
                href={`https://wa.me/${seller.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:border-primary/50 transition-all group"
              >
                <img src={seller.image} alt={seller.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                <div>
                  <h4 className="font-bold text-white">{seller.name}</h4>
                  <div className="flex items-center gap-1 text-primary text-sm">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Oportunidades do Dia
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <div key={car.id} className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition-all hover:border-primary/50">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                    Repasse
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-white mb-4">{car.brand} {car.model}</h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">FIPE: {formatPrice(car.fipePrice)}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-2xl font-heading font-bold text-primary">{formatPrice(car.price)}</span>
                    </div>
                    <div className={`text-xs p-2 rounded mt-2 ${car.history === 'clean' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                      {getHistoryLabel(car.history)}
                    </div>
                  </div>
                  <a 
                    href={`https://wa.me/${sellers[0].phone}?text=Olá, tenho interesse no ${car.brand} ${car.model}`}
                    target="_blank"
                    className="w-full inline-flex justify-center items-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chamar no WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructions Section for the user */}
      <section className="py-24 bg-primary/5 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-background p-12 rounded-3xl border border-primary/20">
            <h2 className="text-3xl font-heading font-bold text-white mb-6">Como Gerenciar o Site</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-primary font-bold mb-4">Adicionar Carros e Preços</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Para adicionar novos carros, você só precisa editar o arquivo <code className="text-primary">client/src/data/mock-cars.ts</code>. 
                  Lá você define:<br/>
                  • Marca e Modelo<br/>
                  • Preço de Venda e Preço FIPE<br/>
                  • Histórico (Leilão, Sinistro ou Limpo)<br/>
                  • Link da imagem (pode usar links da internet)
                </p>
              </div>
              <div>
                <h3 className="text-primary font-bold mb-4">Configurar Vendedores</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  No mesmo arquivo <code className="text-primary">mock-cars.ts</code>, existe a lista <code className="text-primary">sellers</code>. 
                  Basta colocar o nome e o número de WhatsApp (com DDD e sem espaços) dos seus 3 vendedores para que os botões funcionem automaticamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
