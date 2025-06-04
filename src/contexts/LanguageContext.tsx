
import React, { createContext, useContext, useState, useEffect } from 'react';

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
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.exportReport': 'Export Report',
    'dashboard.newShipment': 'New Shipment',
    'dashboard.activeShipments': 'Active Shipments',
    'dashboard.totalCustomers': 'Total Customers',
    'dashboard.monthlyRevenue': 'Monthly Revenue',
    'dashboard.growthRate': 'Growth Rate',
    'dashboard.fromLastMonth': 'from last month',
    'dashboard.recentShipments': 'Recent Shipments',
    'dashboard.alertsNotifications': 'Alerts & Notifications',
    'dashboard.shipmentDelayed': 'Shipment SH005 Delayed',
    'dashboard.delayReason': 'Expected delay: 2 days due to port congestion',
    'dashboard.invoiceOverdue': 'Invoice #INV-2024-001 Overdue',
    'dashboard.paymentPending': 'Payment pending for 15 days',
    'dashboard.newCustomer': 'New Customer Registration',
    'dashboard.customerVerification': 'ABC Logistics requires document verification',
    
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
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.exportReport': 'تصدير التقرير',
    'dashboard.newShipment': 'شحنة جديدة',
    'dashboard.activeShipments': 'الشحنات النشطة',
    'dashboard.totalCustomers': 'إجمالي العملاء',
    'dashboard.monthlyRevenue': 'الإيرادات الشهرية',
    'dashboard.growthRate': 'معدل النمو',
    'dashboard.fromLastMonth': 'من الشهر الماضي',
    'dashboard.recentShipments': 'الشحنات الأخيرة',
    'dashboard.alertsNotifications': 'التنبيهات والإشعارات',
    'dashboard.shipmentDelayed': 'تأخير الشحنة SH005',
    'dashboard.delayReason': 'التأخير المتوقع: يومان بسبب ازدحام الميناء',
    'dashboard.invoiceOverdue': 'الفاتورة #INV-2024-001 متأخرة',
    'dashboard.paymentPending': 'الدفع معلق لمدة 15 يوماً',
    'dashboard.newCustomer': 'تسجيل عميل جديد',
    'dashboard.customerVerification': 'ABC Logistics تتطلب التحقق من المستندات',
    
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

  useEffect(() => {
    const html = document.documentElement;
    if (language === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.classList.add('rtl');
      html.classList.remove('ltr');
    } else {
      html.setAttribute('dir', 'ltr');
      html.classList.add('ltr');
      html.classList.remove('rtl');
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
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
