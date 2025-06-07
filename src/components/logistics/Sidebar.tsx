
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Calculator, 
  FileText, 
  Truck,
  BarChart3,
  Settings
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export const Sidebar = ({ activeModule, setActiveModule }: SidebarProps) => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [sidebarTitle, setSidebarTitle] = useState<string>('INSTALLIFY');
  const [sidebarSubtitle, setSidebarSubtitle] = useState<string>('Freight & Logistics');

  // Load logo and titles from settings
  useEffect(() => {
    const savedSettings = localStorage.getItem('logiscrm-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        if (parsed.logoUrl) {
          setLogoUrl(parsed.logoUrl);
        } else {
          // Use the uploaded logo as default
          setLogoUrl('/lovable-uploads/ff10179a-08ec-4473-a2c9-29d289b97252.png');
        }
        if (parsed.sidebarTitle) {
          setSidebarTitle(parsed.sidebarTitle);
        }
        if (parsed.sidebarSubtitle) {
          setSidebarSubtitle(parsed.sidebarSubtitle);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
        // Use the uploaded logo as fallback
        setLogoUrl('/lovable-uploads/ff10179a-08ec-4473-a2c9-29d289b97252.png');
      }
    } else {
      // Use the uploaded logo as default
      setLogoUrl('/lovable-uploads/ff10179a-08ec-4473-a2c9-29d289b97252.png');
    }
  }, []);

  const menuItems = [
    { id: "dashboard", label: t('sidebar.dashboard'), icon: LayoutDashboard },
    { id: "shipments", label: t('sidebar.shipments'), icon: Package },
    { id: "customers", label: t('sidebar.customers'), icon: Users },
    { id: "accounting", label: t('sidebar.accounting'), icon: Calculator },
    { id: "invoices", label: t('sidebar.invoices'), icon: FileText },
    { id: "cargo", label: t('sidebar.cargo'), icon: Truck },
    { id: "reports", label: t('sidebar.reports'), icon: BarChart3 },
    { id: "settings", label: t('sidebar.settings'), icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className={`p-6 border-b border-slate-800`}>
        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Company Logo" 
                className="w-full h-full object-contain"
              />
            ) : (
              <Truck className="h-6 w-6 text-white" />
            )}
          </div>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h2 className="text-xl font-bold">{sidebarTitle}</h2>
            <p className="text-slate-400 text-sm">{sidebarSubtitle}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={cn(
                    `w-full flex items-center px-4 py-3 rounded-lg transition-colors ${isRTL ? 'space-x-reverse space-x-3 text-right' : 'space-x-3 text-left'}`,
                    activeModule === item.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className={`p-4 border-t border-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="text-xs text-slate-400">
          <p>{t('sidebar.footer')}</p>
          <p className="text-green-400 mt-1">● {t('sidebar.status')}</p>
        </div>
      </div>
    </div>
  );
};
