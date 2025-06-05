import React, { createContext, useContext } from 'react';

// Define the structure of our translations
interface Translations {
  [key: string]: any;
}

// Define the context type
interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key, // Default translation returns the key
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Translation function
const translate = (
  translations: Translations,
  language: string,
  key: string,
  params: { [key: string]: string | number } = {}
): string => {
  let translation = translations[language]?.[key] || key;

  for (const paramKey in params) {
    const regex = new RegExp(`\\{${paramKey}\\}`, 'g');
    translation = translation.replace(regex, String(params[paramKey]));
  }

  return translation;
};

// Language provider component
interface LanguageProviderProps {
  children: React.ReactNode;
}

const translations = {
  en: {
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome to LogisCRM",
      overview: "At a glance",
      totalShipments: "Total Shipments",
      monthlyRevenue: "Monthly Revenue",
      customerSatisfaction: "Customer Satisfaction",
      shipmentStatus: "Shipment Status",
      inTransit: "In Transit",
      delivered: "Delivered",
      pending: "Pending",
      recentActivities: "Recent Activities",
      newShipment: "New Shipment Created",
      paymentReceived: "Payment Received",
      supportTicket: "New Support Ticket",
      viewAll: "View All"
    },
    shipments: {
      title: "Shipments",
      addShipment: "Add Shipment",
      shipmentList: "Shipment List",
      trackingNumber: "Tracking Number",
      customer: "Customer",
      origin: "Origin",
      destination: "Destination",
      status: "Status",
      actions: "Actions",
      viewDetails: "View Details",
      editShipment: "Edit Shipment",
      deleteShipment: "Delete Shipment",
      confirmDelete: "Are you sure you want to delete this shipment?",
      shipmentDeleted: "Shipment deleted successfully!",
      noShipments: "No shipments found."
    },
    customers: {
      title: "Customers",
      addCustomer: "Add Customer",
      customerList: "Customer List",
      name: "Name",
      email: "Email",
      phone: "Phone",
      address: "Address",
      actions: "Actions",
      viewDetails: "View Details",
      editCustomer: "Edit Customer",
      deleteCustomer: "Delete Customer",
      confirmDelete: "Are you sure you want to delete this customer?",
      customerDeleted: "Customer deleted successfully!",
      noCustomers: "No customers found."
    },
    accounting: {
      title: "Accounting",
      revenue: "Revenue",
      expenses: "Expenses",
      profit: "Profit",
      transactions: "Transactions",
      date: "Date",
      description: "Description",
      amount: "Amount",
      type: "Type",
      income: "Income",
      outcome: "Outcome",
      noTransactions: "No transactions found."
    },
    invoices: {
      title: "Invoices",
      createInvoice: "Create Invoice",
      invoiceList: "Invoice List",
      invoiceNumber: "Invoice Number",
      customerName: "Customer Name",
      issueDate: "Issue Date",
      dueDate: "Due Date",
      totalAmount: "Total Amount",
      status: "Status",
      paid: "Paid",
      unpaid: "Unpaid",
      overdue: "Overdue",
      actions: "Actions",
      viewInvoice: "View Invoice",
      editInvoice: "Edit Invoice",
      deleteInvoice: "Delete Invoice",
      confirmDelete: "Are you sure you want to delete this invoice?",
      invoiceDeleted: "Invoice deleted successfully!",
      noInvoices: "No invoices found."
    },
    cargo: {
      title: "Cargo",
      addCargo: "Add Cargo",
      cargoList: "Cargo List",
      cargoName: "Cargo Name",
      weight: "Weight",
      dimensions: "Dimensions",
      location: "Location",
      actions: "Actions",
      viewDetails: "View Details",
      editCargo: "Edit Cargo",
      deleteCargo: "Delete Cargo",
      confirmDelete: "Are you sure you want to delete this cargo?",
      cargoDeleted: "Cargo deleted successfully!",
      noCargo: "No cargo found."
    },
    reports: {
      title: "Reports",
      generateReport: "Generate Report",
      reportType: "Report Type",
      dateRange: "Date Range",
      salesReport: "Sales Report",
      shipmentReport: "Shipment Report",
      customerReport: "Customer Report",
      generate: "Generate",
      download: "Download",
      noReports: "No reports generated."
    },
    settings: {
      title: "Settings",
      save: "Save Changes",
      general: "General",
      notifications: "Notifications", 
      users: "Users",
      integrations: "Integrations",
      payments: "Payment Gateways",
      companyInfo: "Company Information",
      companyLogo: "Company Logo",
      uploadLogo: "Upload Logo",
      companyName: "Company Name",
      address: "Address",
      phone: "Phone",
      email: "Email",
      website: "Website",
      systemPreferences: "System Preferences",
      timezone: "Timezone",
      currency: "Currency",
      language: "Language",
      dateFormat: "Date Format",
      emailNotifications: "Email Notifications",
      smsNotifications: "SMS Notifications",
      shipmentAlerts: "Shipment Alerts",
      invoiceReminders: "Invoice Reminders", 
      systemUpdates: "System Updates",
      mobileAlerts: "Mobile Alerts",
      enabled: "Enabled",
      disabled: "Disabled",
      userAccounts: "User Accounts",
      addUser: "Add User",
      admin: "Admin",
      manager: "Manager",
      operator: "Operator",
      active: "Active",
      inactive: "Inactive",
      apiIntegrations: "API Integrations",
      paymentGateways: "Payment Gateways",
      connected: "Connected",
      disconnected: "Disconnected",
      configure: "Configure"
    }
  },
  ar: {
    dashboard: {
      title: "لوحة التحكم",
      welcome: "مرحبًا بك في LogisCRM",
      overview: "في لمحة",
      totalShipments: "إجمالي الشحنات",
      monthlyRevenue: "الإيرادات الشهرية",
      customerSatisfaction: "رضا العملاء",
      shipmentStatus: "حالة الشحن",
      inTransit: "في العبور",
      delivered: "تم التسليم",
      pending: "قيد الانتظار",
      recentActivities: "الأنشطة الأخيرة",
      newShipment: "تم إنشاء شحنة جديدة",
      paymentReceived: "تم استلام الدفعة",
      supportTicket: "تذكرة دعم جديدة",
      viewAll: "عرض الكل"
    },
    shipments: {
      title: "الشحنات",
      addShipment: "إضافة شحنة",
      shipmentList: "قائمة الشحنات",
      trackingNumber: "رقم التتبع",
      customer: "العميل",
      origin: "الأصل",
      destination: "الوجهة",
      status: "الحالة",
      actions: "الإجراءات",
      viewDetails: "عرض التفاصيل",
      editShipment: "تعديل الشحنة",
      deleteShipment: "حذف الشحنة",
      confirmDelete: "هل أنت متأكد أنك تريد حذف هذه الشحنة؟",
      shipmentDeleted: "تم حذف الشحنة بنجاح!",
      noShipments: "لم يتم العثور على أي شحنات."
    },
    customers: {
      title: "العملاء",
      addCustomer: "إضافة عميل",
      customerList: "قائمة العملاء",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      address: "العنوان",
      actions: "الإجراءات",
      viewDetails: "عرض التفاصيل",
      editCustomer: "تعديل العميل",
      deleteCustomer: "حذف العميل",
      confirmDelete: "هل أنت متأكد أنك تريد حذف هذا العميل؟",
      customerDeleted: "تم حذف العميل بنجاح!",
      noCustomers: "لم يتم العثور على أي عملاء."
    },
    accounting: {
      title: "المحاسبة",
      revenue: "الإيرادات",
      expenses: "المصروفات",
      profit: "الربح",
      transactions: "المعاملات",
      date: "التاريخ",
      description: "الوصف",
      amount: "المبلغ",
      type: "النوع",
      income: "الدخل",
      outcome: "النتيجة",
      noTransactions: "لم يتم العثور على أي معاملات."
    },
    invoices: {
      title: "الفواتير",
      createInvoice: "إنشاء فاتورة",
      invoiceList: "قائمة الفواتير",
      invoiceNumber: "رقم الفاتورة",
      customerName: "اسم العميل",
      issueDate: "تاريخ الإصدار",
      dueDate: "تاريخ الاستحقاق",
      totalAmount: "المبلغ الإجمالي",
      status: "الحالة",
      paid: "مدفوعة",
      unpaid: "غير مدفوعة",
      overdue: "متأخرة",
      actions: "الإجراءات",
      viewInvoice: "عرض الفاتورة",
      editInvoice: "تعديل الفاتورة",
      deleteInvoice: "حذف الفاتورة",
      confirmDelete: "هل أنت متأكد أنك تريد حذف هذه الفاتورة؟",
      invoiceDeleted: "تم حذف الفاتورة بنجاح!",
      noInvoices: "لم يتم العثور على أي فواتير."
    },
    cargo: {
      title: "الشحن",
      addCargo: "إضافة شحنة",
      cargoList: "قائمة الشحن",
      cargoName: "اسم الشحنة",
      weight: "الوزن",
      dimensions: "الأبعاد",
      location: "الموقع",
      actions: "الإجراءات",
      viewDetails: "عرض التفاصيل",
      editCargo: "تعديل الشحن",
      deleteCargo: "حذف الشحن",
      confirmDelete: "هل أنت متأكد أنك تريد حذف هذه الشحنة؟",
      cargoDeleted: "تم حذف الشحن بنجاح!",
      noCargo: "لم يتم العثور على أي شحن."
    },
    reports: {
      title: "التقارير",
      generateReport: "إنشاء تقرير",
      reportType: "نوع التقرير",
      dateRange: "النطاق الزمني",
      salesReport: "تقرير المبيعات",
      shipmentReport: "تقرير الشحن",
      customerReport: "تقرير العملاء",
      generate: "إنشاء",
      download: "تحميل",
      noReports: "لم يتم إنشاء أي تقارير."
    },
    settings: {
      title: "الإعدادات",
      save: "حفظ التغييرات",
      general: "عام",
      notifications: "الإشعارات",
      users: "المستخدمون",
      integrations: "التكاملات",
      payments: "بوابات الدفع",
      companyInfo: "معلومات الشركة",
      companyLogo: "شعار الشركة",
      uploadLogo: "رفع الشعار",
      companyName: "اسم الشركة",
      address: "العنوان",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      website: "الموقع الإلكتروني",
      systemPreferences: "تفضيلات النظام",
      timezone: "المنطقة الزمنية",
      currency: "العملة",
      language: "اللغة",
      dateFormat: "تنسيق التاريخ",
      emailNotifications: "إشعارات البريد الإلكتروني",
      smsNotifications: "إشعارات الرسائل النصية",
      shipmentAlerts: "تنبيهات الشحن",
      invoiceReminders: "تذكيرات الفواتير",
      systemUpdates: "تحديثات النظام",
      mobileAlerts: "التنبيهات المحمولة",
      enabled: "مفعل",
      disabled: "معطل",
      userAccounts: "حسابات المستخدمين",
      addUser: "إضافة مستخدم",
      admin: "مدير",
      manager: "مدير",
      operator: "مشغل",
      active: "نشط",
      inactive: "غير نشط",
      apiIntegrations: "تكاملات API",
      paymentGateways: "بوابات الدفع",
      connected: "متصل",
      disconnected: "غير متصل",
      configure: "تكوين"
    }
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = React.useState<string>(localStorage.getItem('language') || 'en');

  React.useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string, params?: { [key: string]: string | number }) =>
    translate(translations, language, key, params);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
