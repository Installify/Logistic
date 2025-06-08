import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    sidebar: {
      dashboard: "Dashboard",
      shipments: "Shipments",
      customers: "Customers",
      accounting: "Accounting",
      invoices: "Invoices",
      cargo: "Cargo",
      reports: "Reports",
      settings: "Settings",
      footer: "Copyright LogisCRM Solutions Ltd.",
      status: "Operational",
    },
    settings: {
      title: "Settings",
      save: "Save Changes",
      saveSuccess: "Settings Saved",
      saveSuccessMessage: "Your settings have been successfully saved.",
      general: "General",
      notifications: "Notifications",
      users: "Users",
      integrations: "Integrations",
      companyInfo: "Company Information",
      logo: "Company Logo",
      uploadLogo: "Upload Logo",
      companyName: "Company Name",
      address: "Address",
      phone: "Phone",
      email: "Email",
      website: "Website",
      systemPreferences: "System Preferences",
      timezone: "Timezone",
      currency: "Currency",
      dateFormat: "Date Format",
      emailNotifications: "Email Notifications",
      shipmentAlerts: "Shipment Alerts",
      invoiceReminders: "Invoice Reminders",
      systemUpdates: "System Updates",
      enabled: "Enabled",
      disabled: "Disabled",
      smsNotifications: "SMS Notifications",
      mobileAlerts: "Mobile Alerts",
      userAccounts: "User Accounts",
      addUser: "Add User",
      admin: "Admin",
      manager: "Manager",
      operator: "Operator",
      active: "Active",
      inactive: "Inactive",
      apiIntegrations: "API Integrations",
      configure: "Configure",
      lastSync: "Last Sync",
      configureIntegrationSettings: "Configure integration settings",
      testConnection: "Test Connection",
      saveConfiguration: "Save Configuration",
      smtpServer: "SMTP Server",
      enterSmtpServer: "Enter SMTP Server",
      port: "Port",
      encryption: "Encryption",
      username: "Username",
      enterEmail: "Enter Email",
      password: "Password",
      enterPassword: "Enter Password",
      apiEndpoint: "API Endpoint",
      enterApiEndpoint: "Enter API Endpoint",
      apiKey: "API Key",
      enterApiKey: "Enter API Key",
      region: "Region",
      selectRegion: "Select Region",
      shippingLines: "Shipping Lines",
      selectShippingLine: "Select Shipping Line",
      provider: "Provider",
      senderNumber: "Sender Number",
      enterSenderNumber: "Enter Sender Number",
      webhookUrl: "Webhook URL",
      enterWebhookUrl: "Enter Webhook URL",
      noConfigurationAvailable: "No configuration available for this integration.",
      logoUploadedSuccessfully: "Logo uploaded successfully",
      shipmentAlertsDescription: "Receive updates on shipment status changes",
      invoiceRemindersDescription: "Automated payment reminders",
      systemUpdatesDescription: "System maintenance and updates",
      mobileAlertsDescription: "Critical alerts via SMS",
      customerNotifications: "Customer Notifications",
      customerNotificationsDescription: "Send SMS updates to customers",
      emergencyAlerts: "Emergency Alerts",
      emergencyAlertsDescription: "System failures and emergencies",
      customsApiDescription: "Real-time customs clearance updates",
      shippingLinesApiDescription: "Container tracking and schedules",
      paymentGatewayDescription: "Online payment processing",
      smsServiceDescription: "SMS notifications and alerts",
      emailServiceDescription: "Email delivery service for notifications",
      sidebarTitle: "Sidebar Title",
      sidebarSubtitle: "Sidebar Subtitle"
    },
  },
  ar: {
    sidebar: {
      dashboard: "لوحة القيادة",
      shipments: "الشحنات",
      customers: "العملاء",
      accounting: "المحاسبة",
      invoices: "الفواتير",
      cargo: "بضائع",
      reports: "التقارير",
      settings: "إعدادات",
      footer: "حقوق الطبع والنشر محفوظة لشركة LogisCRM Solutions Ltd.",
      status: "التشغيلية",
    },
    settings: {
      title: "إعدادات",
      save: "حفظ التغييرات",
      saveSuccess: "تم حفظ الإعدادات",
      saveSuccessMessage: "تم حفظ الإعدادات بنجاح.",
      general: "عام",
      notifications: "إشعارات",
      users: "المستخدمون",
      integrations: "عمليات التكامل",
      companyInfo: "معلومات الشركة",
      logo: "شعار الشركة",
      uploadLogo: "تحميل الشعار",
      companyName: "اسم الشركة",
      address: "عنوان",
      phone: "هاتف",
      email: "بريد إلكتروني",
      website: "موقع إلكتروني",
      systemPreferences: "تفضيلات النظام",
      timezone: "و المنطقة الزمنية",
      currency: "عملة",
      dateFormat: "صيغة التاريخ",
      emailNotifications: "إشعارات البريد الإلكتروني",
      shipmentAlerts: "تنبيهات الشحن",
      invoiceReminders: "تذكير الفواتير",
      systemUpdates: "تحديثات النظام",
      enabled: "مفعل",
      disabled: "معطل",
      smsNotifications: "إشعارات الرسائل القصيرة",
      mobileAlerts: "تنبيهات الجوال",
      userAccounts: "حسابات المستخدمين",
      addUser: "إضافة مستخدم",
      admin: "مدير",
      manager: "مدير",
      operator: "مشغل",
      active: "نشط",
      inactive: "غير نشط",
      apiIntegrations: "عمليات تكامل API",
      configure: "تكوين",
      lastSync: "آخر مزامنة",
      configureIntegrationSettings: "تكوين إعدادات التكامل",
      testConnection: "اختبار الاتصال",
      saveConfiguration: "حفظ التكوين",
      smtpServer: "خادم SMTP",
      enterSmtpServer: "أدخل خادم SMTP",
      port: "منفذ",
      encryption: "تشفير",
      username: "اسم المستخدم",
      enterEmail: "أدخل البريد الإلكتروني",
      password: "كلمة المرور",
      enterPassword: "أدخل كلمة المرور",
      apiEndpoint: "نقطة نهاية API",
      enterApiEndpoint: "أدخل نقطة نهاية API",
      apiKey: "مفتاح API",
      enterApiKey: "أدخل مفتاح API",
      region: "منطقة",
      selectRegion: "اختر المنطقة",
      shippingLines: "خطوط الشحن",
      selectShippingLine: "اختر خط الشحن",
      provider: "مزود",
      senderNumber: "رقم المرسل",
      enterSenderNumber: "أدخل رقم المرسل",
      webhookUrl: "عنوان URL الخاص بـ Webhook",
      enterWebhookUrl: "أدخل عنوان URL الخاص بـ Webhook",
      noConfigurationAvailable: "لا يوجد تكوين متاح لهذا التكامل.",
      logoUploadedSuccessfully: "تم رفع الشعار بنجاح",
      shipmentAlertsDescription: "تلقي تحديثات حول تغييرات حالة الشحنة",
      invoiceRemindersDescription: "تذكيرات الدفع الآلية",
      systemUpdatesDescription: "صيانة وتحديثات النظام",
      mobileAlertsDescription: "التنبيهات الحرجة عبر الرسائل النصية",
      customerNotifications: "إشعارات SMS للعملاء",
      customerNotificationsDescription: "إرسال تحديثات SMS للعملاء",
      emergencyAlerts: "تنبيهات الطوارئ",
      emergencyAlertsDescription: "أعطال النظام والطوارئ",
      customsApiDescription: "تحديثات التخليص الجمركي في الوقت الفعلي",
      shippingLinesApiDescription: "تتبع الحاويات والجداول الزمنية",
      paymentGatewayDescription: "معالجة المدفوعات عبر الإنترنت",
      smsServiceDescription: "إشعارات وتنبيهات الرسائل النصية",
      emailServiceDescription: "خدمة تسليم البريد الإلكتروني للإشعارات",
      sidebarTitle: "عنوان الشريط الجانبي",
      sidebarSubtitle: "العنوان الفرعي للشريط الجانبي"
    },
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'en');

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        return key;
      }
    }
    return value || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
