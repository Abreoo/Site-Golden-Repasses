import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import CarDetail from "@/pages/CarDetailPage";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Switch, Route } from "wouter";

function App() {
  return (
    <TooltipProvider>
      <Navbar />

      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/car/:id" component={CarDetail} />
          <Route path="/estoque" component={Home} />
          <Route path="/sobre" component={Home} />
          <Route path="/contato" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </main>

      <Footer />
    </TooltipProvider>
  );
}

export default App;