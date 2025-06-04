
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage}>
      <Languages className="h-4 w-4 mr-2" />
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};
