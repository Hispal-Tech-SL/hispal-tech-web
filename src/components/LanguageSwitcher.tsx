import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = ({ isScrolled = true }: { isScrolled?: boolean }) => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ] as const;

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`flex items-center gap-1.5 text-xs font-medium border rounded-md px-2.5 py-1.5 cursor-pointer transition-colors ${
          isScrolled 
            ? "text-muted-foreground hover:text-primary border-border hover:border-hispaltech-blue/50 hover:bg-hispaltech-blue/5 bg-transparent" 
            : "text-white/80 hover:text-white border-white/30 hover:border-white/80 hover:bg-white/10 bg-transparent"
        }`}>
          <Globe className="h-3.5 w-3.5" />
          <span>{currentLanguage?.code.toUpperCase()}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as "es" | "en")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
            {language === lang.code && (
              <span className="ml-auto text-hispaltech-blue">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
