import { Car, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-black/50 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="/">
              <a className="flex items-center gap-2 group inline-flex">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-lg leading-none text-white tracking-wider">
                    GOLDEN
                  </span>
                  <span className="font-heading font-medium text-[10px] leading-none text-primary tracking-[0.2em]">
                    REPASSES
                  </span>
                </div>
              </a>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Especialistas em veículos de repasse com qualidade garantida e preços imbatíveis, sempre abaixo da tabela FIPE.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-white mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li><Link href="/"><a className="text-white/60 hover:text-primary text-sm transition-colors">Início</a></Link></li>
              <li><Link href="/estoque"><a className="text-white/60 hover:text-primary text-sm transition-colors">Ver Estoque</a></Link></li>
              <li><Link href="/sobre"><a className="text-white/60 hover:text-primary text-sm transition-colors">Quem Somos</a></Link></li>
              <li><Link href="/contato"><a className="text-white/60 hover:text-primary text-sm transition-colors">Fale Conosco</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-white/60 text-sm">(51) 9759-8587</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-white/60 text-sm">contato@goldenrepasses.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-white/60 text-sm">Avenida das Roseiras<br/>Charqueadas - RS</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-white mb-6">Newsletter</h3>
            <p className="text-white/60 text-sm mb-4">
              Receba as melhores ofertas de repasse antes de todo mundo.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary text-white"
              />
              <button 
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Assinar
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Golden Repasses. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white/40 hover:text-primary transition-colors text-xs">Termos de Uso</a>
            <a href="#" className="text-white/40 hover:text-primary transition-colors text-xs">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
