import { useLanguage } from "@/contexts/LanguageContext";
import es from "@/locales/es.json";
import en from "@/locales/en.json";

/** All the texts of the Hispal GYM page, typed from the Spanish file (both files share the same shape). */
export type GymCopy = typeof es.hispalgymPage;

export function useGymCopy(): GymCopy {
  const { language } = useLanguage();
  return (language === "en" ? en.hispalgymPage : es.hispalgymPage) as GymCopy;
}

/** Public files of the page (screenshots of the demo app, licensed stock footage). */
export const GYM_MEDIA = "/hispalgym/media";
export const appShot = (name: string) => `${GYM_MEDIA}/app/${name}.webp`;
