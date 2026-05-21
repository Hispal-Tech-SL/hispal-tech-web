import LeadForm from "@/components/LeadForm";
import { useEffect } from "react";

const Contacto = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      {/* Simple Header with just the Logo for the landing page */}
      <header className="w-full py-6 flex justify-center border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-3">
          <img
            src="/logoHispalTech.png"
            alt="Hispal Tech Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-3xl font-bold text-primary">
            Hispal Tech
          </span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-12">
        <LeadForm />
      </main>
    </div>
  );
};

export default Contacto;
