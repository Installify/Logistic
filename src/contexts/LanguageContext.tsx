
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'header.title': 'LogisCRM',
    'header.search': 'Search shipments, customers...',
    'header.profile': 'Profile',
    
    // Sidebar
    'sidebar.title': 'LogisCRM',
    'sidebar.subtitle': 'Freight & Logistics',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.shipments': 'Shipments',
    'sidebar.customers': 'Customers',
    'sidebar.accounting': 'Accounting',
    'sidebar.invoices': 'E-Invoicing',
    'sidebar.cargo': 'Cargo & Dimensions',
    'sidebar.reports': 'Reports',
    'sidebar.settings': 'Settings',
    'sidebar.footer': 'Integrated Accounting System',
    'sidebar.status': 'All modules connected',
    
    // Shipment Module
    'shipments.title': 'Shipment Management',
    'shipments.new': 'New Shipment',
    'shipments.all': 'All Shipments',
    'shipments.sea': 'Sea Freight',
    'shipments.air': 'Air Freight',
    'shipments.land': 'Land Transport',
    'shipments.search': 'Search shipments...',
    'shipments.filter': 'Filter',
    'shipments.route': 'Route',
    'shipments.customer': 'Customer',
    'shipments.cargo': 'Cargo',
    'shipments.track': 'Track',
    'shipments.documents': 'Documents',
    'shipments.invoice': 'Invoice',
    'shipments.eta': 'ETA',
    
    // Customer Module
    'customers.title': 'Customer Management',
    'customers.add': 'Add Customer',
    'customers.search': 'Search customers...',
    'customers.filter': 'Filter',
    'customers.export': 'Export',
    'customers.totalShipments': 'Total Shipments',
    'customers.totalValue': 'Total Value',
    'customers.lastShipment': 'Last shipment',
    'customers.viewDetails': 'View Details',
    'customers.newQuote': 'New Quote',
    
    // Status
    'status.active': 'Active',
    'status.pending': 'Pending',
    'status.delivered': 'Delivered',
    'status.inTransit': 'In Transit',
    'status.loading': 'Loading',
    'status.customs': 'Customs',
  },
  ar: {
    // Header
    'header.title': 'نظام اللوجستيات',
    'header.search': 'البحث في الشحنات والعملاء...',
    'header.profile': 'الملف الشخصي',
    
    // Sidebar
    'sidebar.title': 'نظام اللوجستيات',
    'sidebar.subtitle': 'الشحن واللوجستيات',
    'sidebar.dashboard': 'لوحة التحكم',
    'sidebar.shipments': 'الشحنات',
    'sidebar.customers': 'العملاء',
    'sidebar.accounting': 'المحاسبة',
    'sidebar.invoices': 'الفوترة الإلكترونية',
    'sidebar.cargo': 'البضائع والأبعاد',
    'sidebar.reports': 'التقارير',
    'sidebar.settings': 'الإعدادات',
    'sidebar.footer': 'نظام محاسبة متكامل',
    'sidebar.status': 'جميع الوحدات متصلة',
    
    // Shipment Module
    'shipments.title': 'إدارة الشحنات',
    'shipments.new': 'شحنة جديدة',
    'shipments.all': 'جميع الشحنات',
    'shipments.sea': 'الشحن البحري',
    'shipments.air': 'الشحن الجوي',
    'shipments.land': 'النقل البري',
    'shipments.search': 'البحث في الشحنات...',
    'shipments.filter': 'تصفية',
    'shipments.route': 'المسار',
    'shipments.customer': 'العميل',
    'shipments.cargo': 'البضائع',
    'shipments.track': 'تتبع',
    'shipments.documents': 'المستندات',
    'shipments.invoice': 'الفاتورة',
    'shipments.eta': 'الوصول المتوقع',
    
    // Customer Module
    'customers.title': 'إدارة العملاء',
    'customers.add': 'إضافة عميل',
    'customers.search': 'البحث في العملاء...',
    'customers.filter': 'تصفية',
    'customers.export': 'تصدير',
    'customers.totalShipments': 'إجمالي الشحنات',
    'customers.totalValue': 'القيمة الإجمالية',
    'customers.lastShipment': 'آخر شحنة',
    'customers.viewDetails': 'عرض التفاصيل',
    'customers.newQuote': 'عرض سعر جديد',
    
    // Status
    'status.active': 'نشط',
    'status.pending': 'في الانتظار',
    'status.delivered': 'تم التوصيل',
    'status.inTransit': 'في الطريق',
    'status.loading': 'قيد التحميل',
    'status.customs': 'الجمارك',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
