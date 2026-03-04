import { ArrowRight, BadgeCheck, Banknote, ShieldCheck, TrendingDown } from "lucide-react";
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
              <span>Preços abaixo da Tabela FIPE</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
              O seu próximo carro com <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">desconto real</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
              A Golden Repasses conecta você às melhores oportunidades do mercado automotivo. 
              Veículos periciados, documentação em dia e preços que você não encontra em concessionárias.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/estoque">
                <a className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all text-center flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:shadow-[0_0_40px_rgba(250,204,21,0.5)]">
                  Ver Estoque Completo
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
              <a 
                href="#como-funciona" 
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full font-semibold text-lg transition-all text-center"
              >
                Como Funciona
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
              <span className="text-3xl font-heading font-bold text-white mb-2">+500</span>
              <span className="text-sm text-white/60 uppercase tracking-wider">Carros Vendidos</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="text-3xl font-heading font-bold text-white mb-2">100%</span>
              <span className="text-sm text-white/60 uppercase tracking-wider">Veículos Periciados</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="text-3xl font-heading font-bold text-white mb-2">Até 30%</span>
              <span className="text-sm text-white/60 uppercase tracking-wider">Abaixo da FIPE</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="text-3xl font-heading font-bold text-white mb-2">24h</span>
              <span className="text-sm text-white/60 uppercase tracking-wider">Aprovação de Crédito</span>
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
                Destaques da Semana
              </h2>
              <p className="text-white/60 max-w-xl">
                Nossas melhores oportunidades selecionadas a dedo para você.
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
                    Oportunidade
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
                      <span className="text-white/80 font-medium">Nosso Preço</span>
                      <span className="text-2xl font-heading font-bold text-primary">
                        {formatPrice(car.price)}
                      </span>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-xs px-2 py-1 rounded w-fit inline-block mt-2">
                      Economia de {formatPrice(car.fipePrice - car.price)}
                    </div>
                  </div>

                  <button className="w-full bg-white/10 text-white py-3 rounded-lg font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Tenho Interesse
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/estoque">
              <a className="inline-flex items-center gap-2 text-primary font-medium">
                Ver todo o estoque
                <ArrowRight className="w-4 h-4" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="como-funciona" className="py-24 bg-black/40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Por que comprar com a Golden?
            </h2>
            <p className="text-white/60 text-lg">
              Trabalhamos com transparência e segurança para garantir que você faça o melhor negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background border border-white/10 p-8 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors" />
              <BadgeCheck className="w-12 h-12 text-primary mb-6" />
              <h3 className="font-heading font-bold text-xl text-white mb-4">Qualidade Garantida</h3>
              <p className="text-white/60 leading-relaxed">
                Todos os nossos veículos passam por uma rigorosa perícia cautelar. Garantimos a procedência e o estado de conservação de cada carro.
              </p>
            </div>

            <div className="bg-background border border-white/10 p-8 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors" />
              <Banknote className="w-12 h-12 text-primary mb-6" />
              <h3 className="font-heading font-bold text-xl text-white mb-4">Preço Imbatível</h3>
              <p className="text-white/60 leading-relaxed">
                Trabalhamos com margens reduzidas focando no volume de vendas. Por isso, conseguimos ofertar veículos muito abaixo da tabela FIPE.
              </p>
            </div>

            <div className="bg-background border border-white/10 p-8 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors" />
              <ShieldCheck className="w-12 h-12 text-primary mb-6" />
              <h3 className="font-heading font-bold text-xl text-white mb-4">Compra Segura</h3>
              <p className="text-white/60 leading-relaxed">
                Auxiliamos em todo o processo de documentação e transferência. Parceria com os maiores bancos para oferecer as melhores taxas de financiamento.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
