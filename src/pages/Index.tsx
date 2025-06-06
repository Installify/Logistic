
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/logistics/Sidebar";
import { Dashboard } from "@/components/logistics/Dashboard";
import { ShipmentModule } from "@/components/logistics/ShipmentModule";
import { CustomerModule } from "@/components/logistics/CustomerModule";
import { AccountingModule } from "@/components/logistics/AccountingModule";
import { InvoiceModule } from "@/components/logistics/InvoiceModule";
import { CargoModule } from "@/components/logistics/CargoModule";
import { ReportsModule } from "@/components/logistics/ReportsModule";
import { SettingsModule } from "@/components/logistics/SettingsModule";
import { Header } from "@/components/logistics/Header";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const { language } = useLanguage();

  // Set document direction based on language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard />;
      case "shipments":
        return <ShipmentModule />;
      case "customers":
        return <CustomerModule />;
      case "accounting":
        return <AccountingModule />;
      case "invoices":
        return <InvoiceModule />;
      case "cargo":
        return <CargoModule />;
      case "reports":
        return <ReportsModule />;
      case "settings":
        return <SettingsModule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
};

export default Index;
