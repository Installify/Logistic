
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  currency: string;
  setCurrency: (currency: string) => void;
  convertCurrency: (amount: number, fromCurrency: string, toCurrency: string) => number;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple currency conversion rates (in a real app, you'd fetch these from an API)
const currencyRates: { [key: string]: number } = {
  'USD': 1,
  'EUR': 0.85,
  'GBP': 0.73,
  'AED': 3.67,
  'SAR': 3.75,
  'QAR': 3.64,
  'KWD': 0.30,
  'JPY': 110.0,
  'CNY': 6.45
};

const translations = {
  en: {
    // Sidebar translations
    'sidebar.title': 'INSTALLIFY',
    'sidebar.subtitle': 'Freight & Logistics',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.shipments': 'Shipments',
    'sidebar.customers': 'Customers',
    'sidebar.accounting': 'Accounting',
    'sidebar.invoices': 'Invoices',
    'sidebar.cargo': 'Cargo',
    'sidebar.reports': 'Reports',
    'sidebar.settings': 'Settings',
    'sidebar.footer': 'Version 2.1.0',
    'sidebar.status': 'Online',

    // Header translations
    'header.title': 'INSTALLIFY Logistics',
    'header.search': 'Search...',
    'header.profile': 'Profile',

    // Dashboard translations
    'dashboard.title': 'Dashboard Overview',
    'dashboard.exportReport': 'Export Report',
    'dashboard.newShipment': 'New Shipment',
    'dashboard.activeShipments': 'Active Shipments',
    'dashboard.totalCustomers': 'Total Customers',
    'dashboard.monthlyRevenue': 'Monthly Revenue',
    'dashboard.growthRate': 'Growth Rate',
    'dashboard.fromLastMonth': 'from last month',
    'dashboard.recentShipments': 'Recent Shipments',
    'dashboard.alertsNotifications': 'Alerts & Notifications',
    'dashboard.shipmentDelayed': 'Shipment SH003 delayed',
    'dashboard.delayReason': 'Weather conditions at origin port',
    'dashboard.invoiceOverdue': 'Invoice #INV-2024-001 overdue',
    'dashboard.paymentPending': 'Payment pending for 5 days',
    'dashboard.newCustomer': 'New customer registration',
    'dashboard.customerVerification': 'Requires verification and approval',

    // Shipments Module
    'shipments.title': 'Shipment Management',
    'shipments.subtitle': 'Track and manage all your shipments',

    // Customers Module
    'customers.title': 'Customer Management',
    'customers.subtitle': 'Manage your client relationships',
    'customers.addCustomer': 'Add Customer',
    'customers.searchCustomers': 'Search customers...',
    'customers.filterCustomers': 'Filter',
    'customers.exportCustomers': 'Export',
    'customers.totalShipments': 'Total Shipments',
    'customers.totalValue': 'Total Value',
    'customers.lastShipment': 'Last Shipment',
    'customers.viewDetails': 'View Details',
    'customers.createQuote': 'Create Quote',

    // Accounting Module
    'accounting.title': 'Accounting & Finance',
    'accounting.subtitle': 'Financial management and reporting',

    // Invoice translations
    'invoices.title': 'Invoice Management',
    'invoices.subtitle': 'Create and manage invoices',
    'invoices.create': 'Create Invoice',
    'invoices.bulkExport': 'Bulk Export',
    'invoices.totalInvoices': 'Total Invoices',
    'invoices.pendingAmount': 'Pending Amount',
    'invoices.overdueAmount': 'Overdue Amount',
    'invoices.collectionRate': 'Collection Rate',
    'invoices.thisMonth': 'This month',
    'invoices.onTimePayments': 'On-time payments',
    'invoices.all': 'All',
    'invoices.pending': 'Pending',
    'invoices.overdue': 'Overdue',
    'invoices.paid': 'Paid',
    'invoices.search': 'Search invoices...',
    'invoices.view': 'View',
    'invoices.edit': 'Edit',
    'invoices.send': 'Send',
    'invoices.pdf': 'PDF',
    'invoices.issueDate': 'Issue Date',
    'invoices.shipmentReference': 'Shipment Reference',
    'invoices.services': 'Services',

    // Cargo Module
    'cargo.title': 'Cargo Management',
    'cargo.subtitle': 'Track cargo and container operations',

    // Reports Module
    'reports.title': 'Reports & Analytics',
    'reports.subtitle': 'Business intelligence and insights',

    // Settings translations
    'settings.title': 'System Settings',
    'settings.subtitle': 'Configure system preferences',
    'settings.save': 'Save Changes',
    'settings.general': 'General',
    'settings.notifications': 'Notifications',
    'settings.users': 'User Management',
    'settings.integrations': 'Integrations',
    'settings.companyInfo': 'Company Information',
    'settings.logo': 'Company Logo',
    'settings.uploadLogo': 'Upload Logo',
    'settings.companyName': 'Company Name',
    'settings.sidebarTitle': 'Sidebar Title',
    'settings.sidebarSubtitle': 'Sidebar Subtitle',
    'settings.address': 'Address',
    'settings.phone': 'Phone',
    'settings.email': 'Email',
    'settings.website': 'Website',
    'settings.systemPreferences': 'System Preferences',
    'settings.timezone': 'Timezone',
    'settings.currency': 'Currency',
    'settings.dateFormat': 'Date Format',
    'settings.saveSuccess': 'Settings Saved',
    'settings.saveSuccessMessage': 'Your settings have been saved successfully.',

    // Settings additional translations
    'settings.emailNotifications': 'Email Notifications',
    'settings.smsNotifications': 'SMS Notifications',
    'settings.shipmentAlerts': 'Shipment Alerts',
    'settings.invoiceReminders': 'Invoice Reminders',
    'settings.systemUpdates': 'System Updates',
    'settings.mobileAlerts': 'Mobile Alerts',
    'settings.enabled': 'Enabled',
    'settings.disabled': 'Disabled',
    'settings.userAccounts': 'User Accounts',
    'settings.addUser': 'Add User',
    'settings.admin': 'Admin',
    'settings.manager': 'Manager',
    'settings.operator': 'Operator',
    'settings.active': 'Active',
    'settings.inactive': 'Inactive',
    'settings.apiIntegrations': 'API Integrations',
    'settings.connected': 'Connected',
    'settings.disconnected': 'Disconnected',
    'settings.configure': 'Configure',
    'settings.lastSync': 'Last Sync',
    'settings.testConnection': 'Test Connection',
    'settings.saveConfiguration': 'Save Configuration',
    'settings.configureIntegrationSettings': 'Configure the integration settings below',
    'settings.smtpServer': 'SMTP Server',
    'settings.enterSmtpServer': 'Enter SMTP server',
    'settings.port': 'Port',
    'settings.encryption': 'Encryption',
    'settings.username': 'Username',
    'settings.enterEmail': 'Enter email address',
    'settings.password': 'Password',
    'settings.enterPassword': 'Enter password',
    'settings.apiEndpoint': 'API Endpoint',
    'settings.enterApiEndpoint': 'Enter API endpoint',
    'settings.apiKey': 'API Key',
    'settings.enterApiKey': 'Enter API key',
    'settings.region': 'Region',
    'settings.selectRegion': 'Select region',
    'settings.shippingLines': 'Shipping Lines',
    'settings.selectShippingLine': 'Select shipping line',
    'settings.provider': 'Provider',
    'settings.senderNumber': 'Sender Number',
    'settings.enterSenderNumber': 'Enter sender number',
    'settings.webhookUrl': 'Webhook URL',
    'settings.enterWebhookUrl': 'Enter webhook URL',
    'settings.noConfigurationAvailable': 'No configuration options available for this integration.',

    // Status translations
    'status.paid': 'Paid',
    'status.pending': 'Pending',
    'status.overdue': 'Overdue',
    'status.draft': 'Draft',
    'status.intransit': 'In Transit',
    'status.delivered': 'Delivered',
    'status.loading': 'Loading',
    'status.customs': 'Customs',
    'status.active': 'Active',
  },
  ar: {
    // Arabic translations
    'sidebar.title': 'إنستاليفاي',
    'sidebar.subtitle': 'الشحن والخدمات اللوجستية',
    'sidebar.dashboard': 'لوحة القيادة',
    'sidebar.shipments': 'الشحنات',
    'sidebar.customers': 'العملاء',
    'sidebar.accounting': 'المحاسبة',
    'sidebar.invoices': 'الفواتير',
    'sidebar.cargo': 'البضائع',
    'sidebar.reports': 'التقارير',
    'sidebar.settings': 'الإعدادات',
    'sidebar.footer': 'الإصدار 2.1.0',
    'sidebar.status': 'متصل',

    // Header translations in Arabic
    'header.title': 'إنستاليفاي اللوجستيات',
    'header.search': 'البحث...',
    'header.profile': 'الملف الشخصي',

    // Dashboard translations in Arabic
    'dashboard.title': 'نظرة عامة على لوحة القيادة',
    'dashboard.exportReport': 'تصدير التقرير',
    'dashboard.newShipment': 'شحنة جديدة',
    'dashboard.activeShipments': 'الشحنات النشطة',
    'dashboard.totalCustomers': 'إجمالي العملاء',
    'dashboard.monthlyRevenue': 'الإيرادات الشهرية',
    'dashboard.growthRate': 'معدل النمو',
    'dashboard.fromLastMonth': 'من الشهر الماضي',
    'dashboard.recentShipments': 'الشحنات الأخيرة',
    'dashboard.alertsNotifications': 'التنبيهات والإشعارات',
    'dashboard.shipmentDelayed': 'تأخر الشحنة SH003',
    'dashboard.delayReason': 'الأحوال الجوية في ميناء المنشأ',
    'dashboard.invoiceOverdue': 'الفاتورة #INV-2024-001 متأخرة',
    'dashboard.paymentPending': 'الدفع معلق لمدة 5 أيام',
    'dashboard.newCustomer': 'تسجيل عميل جديد',
    'dashboard.customerVerification': 'يتطلب التحقق والموافقة',

    // Module titles in Arabic
    'shipments.title': 'إدارة الشحنات',
    'shipments.subtitle': 'تتبع وإدارة جميع شحناتك',

    'customers.title': 'إدارة العملاء',
    'customers.subtitle': 'إدارة علاقاتك مع العملاء',
    'customers.addCustomer': 'إضافة عميل',
    'customers.searchCustomers': 'البحث في العملاء...',
    'customers.filterCustomers': 'تصفية',
    'customers.exportCustomers': 'تصدير',
    'customers.totalShipments': 'إجمالي الشحنات',
    'customers.totalValue': 'إجمالي القيمة',
    'customers.lastShipment': 'آخر شحنة',
    'customers.viewDetails': 'عرض التفاصيل',
    'customers.createQuote': 'إنشاء عرض سعر',

    'accounting.title': 'المحاسبة والمالية',
    'accounting.subtitle': 'الإدارة المالية والتقارير',

    'invoices.title': 'إدارة الفواتير',
    'invoices.subtitle': 'إنشاء وإدارة الفواتير',
    'invoices.create': 'إنشاء فاتورة',
    'invoices.bulkExport': 'تصدير مجمع',
    'invoices.totalInvoices': 'إجمالي الفواتير',
    'invoices.pendingAmount': 'المبلغ المعلق',
    'invoices.overdueAmount': 'المبلغ المتأخر',
    'invoices.collectionRate': 'معدل التحصيل',
    'invoices.thisMonth': 'هذا الشهر',
    'invoices.onTimePayments': 'المدفوعات في الوقت المحدد',
    'invoices.all': 'الكل',
    'invoices.pending': 'معلق',
    'invoices.overdue': 'متأخر',
    'invoices.paid': 'مدفوع',
    'invoices.search': 'البحث في الفواتير...',
    'invoices.view': 'عرض',
    'invoices.edit': 'تعديل',
    'invoices.send': 'إرسال',
    'invoices.pdf': 'PDF',
    'invoices.issueDate': 'تاريخ الإصدار',
    'invoices.shipmentReference': 'مرجع الشحنة',
    'invoices.services': 'الخدمات',

    'cargo.title': 'إدارة البضائع',
    'cargo.subtitle': 'تتبع عمليات البضائع والحاويات',

    'reports.title': 'التقارير والتحليلات',
    'reports.subtitle': 'ذكاء الأعمال والرؤى',

    'settings.title': 'إعدادات النظام',
    'settings.subtitle': 'تكوين تفضيلات النظام',
    'settings.save': 'حفظ التغييرات',
    'settings.general': 'عام',
    'settings.notifications': 'الإشعارات',
    'settings.users': 'إدارة المستخدمين',
    'settings.integrations': 'التكاملات',
    'settings.companyInfo': 'معلومات الشركة',
    'settings.logo': 'شعار الشركة',
    'settings.uploadLogo': 'رفع الشعار',
    'settings.companyName': 'اسم الشركة',
    'settings.sidebarTitle': 'عنوان الشريط الجانبي',
    'settings.sidebarSubtitle': 'العنوان الفرعي للشريط الجانبي',
    'settings.address': 'العنوان',
    'settings.phone': 'الهاتف',
    'settings.email': 'البريد الإلكتروني',
    'settings.website': 'الموقع الإلكتروني',
    'settings.systemPreferences': 'تفضيلات النظام',
    'settings.timezone': 'المنطقة الزمنية',
    'settings.currency': 'العملة',
    'settings.dateFormat': 'تنسيق التاريخ',
    'settings.saveSuccess': 'تم حفظ الإعدادات',
    'settings.saveSuccessMessage': 'تم حفظ إعداداتك بنجاح.',

    // Additional Arabic translations
    'settings.emailNotifications': 'إشعارات البريد الإلكتروني',
    'settings.smsNotifications': 'إشعارات الرسائل النصية',
    'settings.shipmentAlerts': 'تنبيهات الشحنات',
    'settings.invoiceReminders': 'تذكيرات الفواتير',
    'settings.systemUpdates': 'تحديثات النظام',
    'settings.mobileAlerts': 'التنبيهات المحمولة',
    'settings.enabled': 'مفعل',
    'settings.disabled': 'معطل',
    'settings.userAccounts': 'حسابات المستخدمين',
    'settings.addUser': 'إضافة مستخدم',
    'settings.admin': 'مشرف',
    'settings.manager': 'مدير',
    'settings.operator': 'مشغل',
    'settings.active': 'نشط',
    'settings.inactive': 'غير نشط',
    'settings.apiIntegrations': 'تكاملات API',
    'settings.connected': 'متصل',
    'settings.disconnected': 'غير متصل',
    'settings.configure': 'تكوين',
    'settings.lastSync': 'آخر مزامنة',
    'settings.testConnection': 'اختبار الاتصال',
    'settings.saveConfiguration': 'حفظ التكوين',
    'settings.configureIntegrationSettings': 'قم بتكوين إعدادات التكامل أدناه',
    'settings.smtpServer': 'خادم SMTP',
    'settings.enterSmtpServer': 'أدخل خادم SMTP',
    'settings.port': 'المنفذ',
    'settings.encryption': 'التشفير',
    'settings.username': 'اسم المستخدم',
    'settings.enterEmail': 'أدخل عنوان البريد الإلكتروني',
    'settings.password': 'كلمة المرور',
    'settings.enterPassword': 'أدخل كلمة المرور',
    'settings.apiEndpoint': 'نقطة نهاية API',
    'settings.enterApiEndpoint': 'أدخل نقطة نهاية API',
    'settings.apiKey': 'مفتاح API',
    'settings.enterApiKey': 'أدخل مفتاح API',
    'settings.region': 'المنطقة',
    'settings.selectRegion': 'اختر المنطقة',
    'settings.shippingLines': 'خطوط الشحن',
    'settings.selectShippingLine': 'اختر خط الشحن',
    'settings.provider': 'المزود',
    'settings.senderNumber': 'رقم المرسل',
    'settings.enterSenderNumber': 'أدخل رقم المرسل',
    'settings.webhookUrl': 'رابط Webhook',
    'settings.enterWebhookUrl': 'أدخل رابط Webhook',
    'settings.noConfigurationAvailable': 'لا توجد خيارات تكوين متاحة لهذا التكامل.',

    'status.paid': 'مدفوع',
    'status.pending': 'معلق',
    'status.overdue': 'متأخر',
    'status.draft': 'مسودة',
    'status.intransit': 'في الطريق',
    'status.delivered': 'تم التسليم',
    'status.loading': 'جاري التحميل',
    'status.customs': 'الجمارك',
    'status.active': 'نشط',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');

  // Load saved settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('logiscrm-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        if (parsed.currency) {
          setCurrency(parsed.currency.split(' - ')[0]); // Extract currency code
        }
      } catch (error) {
        console.error('Error loading currency from settings:', error);
      }
    }
  }, []);

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key] || key;
  };

  const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
    if (fromCurrency === toCurrency) return amount;
    
    // Convert to USD first, then to target currency
    const usdAmount = amount / currencyRates[fromCurrency];
    return Math.round(usdAmount * currencyRates[toCurrency] * 100) / 100;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      currency, 
      setCurrency, 
      convertCurrency 
    }}>
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
