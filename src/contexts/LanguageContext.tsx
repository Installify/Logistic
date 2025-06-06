
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.shipments': 'Shipments',
    'nav.customers': 'Customers',
    'nav.cargo': 'Cargo',
    'nav.invoices': 'Invoices',
    'nav.accounting': 'Accounting',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.totalShipments': 'Total Shipments',
    'dashboard.activeShipments': 'Active Shipments',
    'dashboard.totalRevenue': 'Total Revenue',
    'dashboard.pendingInvoices': 'Pending Invoices',
    'dashboard.recentShipments': 'Recent Shipments',
    'dashboard.viewAll': 'View All',

    // Settings
    'settings.title': 'Settings',
    'settings.general': 'General',
    'settings.notifications': 'Notifications',
    'settings.users': 'Users',
    'settings.integrations': 'Integrations',
    'settings.save': 'Save Changes',
    'settings.companyInfo': 'Company Information',
    'settings.companyName': 'Company Name',
    'settings.address': 'Address',
    'settings.phone': 'Phone',
    'settings.email': 'Email',
    'settings.website': 'Website',
    'settings.logo': 'Logo',
    'settings.uploadLogo': 'Upload Logo',
    'settings.systemPreferences': 'System Preferences',
    'settings.timezone': 'Timezone',
    'settings.currency': 'Currency',
    'settings.dateFormat': 'Date Format',
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
    'settings.configure': 'Configure',
    'settings.connected': 'Connected',
    'settings.disconnected': 'Disconnected',
    'settings.lastSync': 'Last Sync',
    'settings.configureIntegrationSettings': 'Configure integration settings for this service.',
    'settings.testConnection': 'Test Connection',
    'settings.saveConfiguration': 'Save Configuration',
    'settings.smtpServer': 'SMTP Server',
    'settings.enterSmtpServer': 'Enter SMTP server address',
    'settings.port': 'Port',
    'settings.encryption': 'Encryption',
    'settings.username': 'Username',
    'settings.enterEmail': 'Enter email address',
    'settings.password': 'Password',
    'settings.enterPassword': 'Enter password',
    'settings.apiEndpoint': 'API Endpoint',
    'settings.enterApiEndpoint': 'Enter API endpoint URL',
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
    'settings.noConfigurationAvailable': 'No configuration available for this integration.',
    'settings.saveSuccess': 'Settings Saved',
    'settings.saveSuccessMessage': 'Your settings have been saved successfully.',

    // Invoices
    'invoices.title': 'Invoices',
    'invoices.create': 'Create Invoice',
    'invoices.bulkExport': 'Bulk Export',
    'invoices.totalInvoices': 'Total Invoices',
    'invoices.pendingAmount': 'Pending Amount',
    'invoices.overdueAmount': 'Overdue Amount',
    'invoices.collectionRate': 'Collection Rate',
    'invoices.thisMonth': 'This Month',
    'invoices.onTimePayments': 'On-time Payments',
    'invoices.all': 'All',
    'invoices.pending': 'Pending',
    'invoices.overdue': 'Overdue',
    'invoices.paid': 'Paid',
    'invoices.search': 'Search invoices...',
    'invoices.issueDate': 'Issue Date',
    'invoices.shipmentReference': 'Shipment Reference',
    'invoices.services': 'Services',
    'invoices.view': 'View',
    'invoices.edit': 'Edit',
    'invoices.send': 'Send',
    'invoices.pdf': 'PDF',
    'invoices.currency': 'Currency',

    // Status
    'status.paid': 'Paid',
    'status.pending': 'Pending',
    'status.overdue': 'Overdue',
    'status.draft': 'Draft'
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.shipments': 'الشحنات',
    'nav.customers': 'العملاء',
    'nav.cargo': 'البضائع',
    'nav.invoices': 'الفواتير',
    'nav.accounting': 'المحاسبة',
    'nav.reports': 'التقارير',
    'nav.settings': 'الإعدادات',

    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.totalShipments': 'إجمالي الشحنات',
    'dashboard.activeShipments': 'الشحنات النشطة',
    'dashboard.totalRevenue': 'إجمالي الإيرادات',
    'dashboard.pendingInvoices': 'الفواتير المعلقة',
    'dashboard.recentShipments': 'الشحنات الأخيرة',
    'dashboard.viewAll': 'عرض الكل',

    // Settings
    'settings.title': 'الإعدادات',
    'settings.general': 'عام',
    'settings.notifications': 'الإشعارات',
    'settings.users': 'المستخدمون',
    'settings.integrations': 'التكاملات',
    'settings.save': 'حفظ التغييرات',
    'settings.companyInfo': 'معلومات الشركة',
    'settings.companyName': 'اسم الشركة',
    'settings.address': 'العنوان',
    'settings.phone': 'الهاتف',
    'settings.email': 'البريد الإلكتروني',
    'settings.website': 'الموقع الإلكتروني',
    'settings.logo': 'الشعار',
    'settings.uploadLogo': 'رفع الشعار',
    'settings.systemPreferences': 'تفضيلات النظام',
    'settings.timezone': 'المنطقة الزمنية',
    'settings.currency': 'العملة',
    'settings.dateFormat': 'تنسيق التاريخ',
    'settings.emailNotifications': 'إشعارات البريد الإلكتروني',
    'settings.smsNotifications': 'إشعارات الرسائل النصية',
    'settings.shipmentAlerts': 'تنبيهات الشحن',
    'settings.invoiceReminders': 'تذكيرات الفواتير',
    'settings.systemUpdates': 'تحديثات النظام',
    'settings.mobileAlerts': 'التنبيهات المحمولة',
    'settings.enabled': 'مفعل',
    'settings.disabled': 'معطل',
    'settings.userAccounts': 'حسابات المستخدمين',
    'settings.addUser': 'إضافة مستخدم',
    'settings.admin': 'مدير',
    'settings.manager': 'مدير فرع',
    'settings.operator': 'مشغل',
    'settings.active': 'نشط',
    'settings.inactive': 'غير نشط',
    'settings.apiIntegrations': 'تكاملات API',
    'settings.configure': 'تكوين',
    'settings.connected': 'متصل',
    'settings.disconnected': 'غير متصل',
    'settings.lastSync': 'آخر مزامنة',
    'settings.configureIntegrationSettings': 'تكوين إعدادات التكامل لهذه الخدمة.',
    'settings.testConnection': 'اختبار الاتصال',
    'settings.saveConfiguration': 'حفظ التكوين',
    'settings.smtpServer': 'خادم SMTP',
    'settings.enterSmtpServer': 'أدخل عنوان خادم SMTP',
    'settings.port': 'المنفذ',
    'settings.encryption': 'التشفير',
    'settings.username': 'اسم المستخدم',
    'settings.enterEmail': 'أدخل عنوان البريد الإلكتروني',
    'settings.password': 'كلمة المرور',
    'settings.enterPassword': 'أدخل كلمة المرور',
    'settings.apiEndpoint': 'نقطة نهاية API',
    'settings.enterApiEndpoint': 'أدخل رابط نقطة نهاية API',
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
    'settings.noConfigurationAvailable': 'لا يوجد تكوين متاح لهذا التكامل.',
    'settings.saveSuccess': 'تم حفظ الإعدادات',
    'settings.saveSuccessMessage': 'تم حفظ إعداداتك بنجاح.',

    // Invoices
    'invoices.title': 'الفواتير',
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
    'invoices.issueDate': 'تاريخ الإصدار',
    'invoices.shipmentReference': 'مرجع الشحنة',
    'invoices.services': 'الخدمات',
    'invoices.view': 'عرض',
    'invoices.edit': 'تعديل',
    'invoices.send': 'إرسال',
    'invoices.pdf': 'PDF',
    'invoices.currency': 'العملة',

    // Status
    'status.paid': 'مدفوع',
    'status.pending': 'معلق',
    'status.overdue': 'متأخر',
    'status.draft': 'مسودة'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Apply RTL class to body for Arabic
    if (language === 'ar') {
      document.body.classList.add('rtl');
      document.documentElement.dir = 'rtl';
    } else {
      document.body.classList.remove('rtl');
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

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
