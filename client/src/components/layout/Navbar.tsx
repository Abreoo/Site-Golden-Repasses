import { Car } from "lucide-react";
import { Link } from "wouter";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Car className="w-8 h-8 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl leading-none text-white tracking-wider">
                GOLDEN
              </span>
              <span className="font-heading font-medium text-xs leading-none text-primary tracking-[0.2em]">
                REPASSES
              </span>
            </div>
          </a>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/"><a className="text-sm font-medium text-white/70 hover:text-primary transition-colors">Início</a></Link>
          <Link href="/estoque"><a className="text-sm font-medium text-white/70 hover:text-primary transition-colors">Estoque</a></Link>
          <Link href="/sobre"><a className="text-sm font-medium text-white/70 hover:text-primary transition-colors">Sobre Nós</a></Link>
          <Link href="/contato"><a className="text-sm font-medium text-white/70 hover:text-primary transition-colors">Contato</a></Link>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://wa.me/5511999999999" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)]"
          >
            Falar com Consultor
          </a>
        </div>
      </div>
    </nav>
  );
}
