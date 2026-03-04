import { ArrowRight, BadgeCheck, Banknote, ShieldCheck, TrendingDown, ClipboardCheck, Info } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@/assets/images/hero-car.jpg";
import { mockCars } from "@/data/mock-cars";

export default function Home() {
  const featuredCars = mockCars.slice(0, 3);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
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
              Sem surpresas, apenas ótimos negócios.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/estoque">
                <a className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all text-center flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:shadow-[0_0_40px_rgba(250,204,21,0.5)]">
                  Ver Estoque Agora
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
              <a 
                href="#transparencia" 
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full font-semibold text-lg transition-all text-center"
              >
                Nossa Consultoria
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Trust Bar */}
      <section className="border-y border-white/10 bg-white/5 backdrop-blur-md py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            <div className="flex flex-col items-center text-center px-4">
              <span className="text-3xl font-heading font-bold text-white mb-2">100%</span>
              <span className="text-sm text-white/60 uppercase tracking-wider">Transparência</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="text-3xl font-heading font-bold text-white mb-2">FIPE</span>
              <span className="text-sm text-white/60 uppercase tracking-wider">Sempre Abaixo</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="text-3xl font-heading font-bold text-white mb-2">Consultoria</span>
              <span className="text-sm text-white/60 uppercase tracking-wider">Leilão/Sinistro</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="text-3xl font-heading font-bold text-white mb-2">Direto</span>
              <span className="text-sm text-white/60 uppercase tracking-wider">Preço de Repasse</span>
            </div>
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
              <p className="text-white/60 max-w-xl">
                Veículos com preço de repasse. Informamos o histórico completo de cada unidade.
              </p>
            </div>
            <Link href="/estoque">
              <a className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
                Ver todos
                <ArrowRight className="w-4 h-4" />
              </a>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <div key={car.id} className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition-all hover:border-primary/50">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Repasse
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-heading font-bold text-xl text-white">
                        {car.brand} {car.model}
                      </h3>
                      <p className="text-white/60 text-sm">{car.year} • {car.mileage.toLocaleString()} km</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Tabela FIPE</span>
                      <span className="text-white/40 line-through">{formatPrice(car.fipePrice)}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-white/80 font-medium">Preço de Repasse</span>
                      <span className="text-2xl font-heading font-bold text-primary">
                        {formatPrice(car.price)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50 mt-4 border-t border-white/5 pt-4">
                      <Info className="w-3 h-3 text-primary" />
                      <span>Consulte histórico de leilão/sinistro</span>
                    </div>
                  </div>

                  <button className="w-full bg-white/10 text-white py-3 rounded-lg font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Saber mais detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section id="transparencia" className="py-24 bg-black/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8 leading-tight">
                Compra consciente: <br/>
                <span className="text-primary">Nós consultamos por você</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Nossa missão é oferecer o menor preço do mercado com honestidade total. 
                Não escondemos nada: consultamos as bases de dados para verificar se o veículo tem 
                passagem por leilão, sinistro ou qualquer restrição, e repassamos essa informação 
                transparente para você decidir.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl h-fit">
                    <ClipboardCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Check-up Completo</h4>
                    <p className="text-white/50 text-sm">Verificamos histórico de leilões e sinistros em todas as unidades.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl h-fit">
                    <BadgeCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Informação Direta</h4>
                    <p className="text-white/50 text-sm">O status do veículo é informado antes mesmo da negociação começar.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-transparent rounded-3xl border border-white/10 p-8 flex flex-col justify-center text-center">
                <ShieldCheck className="w-24 h-24 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-heading font-bold text-white mb-4">Negócio de Oportunidade</h3>
                <p className="text-white/60">
                  Preços de repasse são excelentes para quem busca economia. 
                  Com a nossa consultoria, você aproveita o desconto sabendo exatamente o que está comprando.
                </p>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-500/10 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
