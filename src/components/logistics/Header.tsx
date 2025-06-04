
import { Bell, Search, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Header = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
          <h1 className="text-2xl font-bold text-gray-900">{t('header.title')}</h1>
          <div className="relative">
            <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 ${isRTL ? 'right-3' : 'left-3'}`} />
            <Input
              placeholder={t('header.search')}
              className={`w-64 ${isRTL ? 'pr-10' : 'pl-10'}`}
            />
          </div>
        </div>
        
        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
          <LanguageSwitcher />
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <User className="h-4 w-4" />
            <span className={isRTL ? 'mr-2' : 'ml-2'}>{t('header.profile')}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
