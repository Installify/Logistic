
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Plus, 
  Send, 
  Download, 
  Search,
  Eye,
  Edit,
  Clock
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Currency conversion rates (in real app, this would come from an API)
const currencyRates = {
  "USD - US Dollar": { symbol: "$", rate: 1 },
  "EUR - Euro": { symbol: "€", rate: 0.85 },
  "GBP - British Pound": { symbol: "£", rate: 0.73 },
  "AED - UAE Dirham": { symbol: "د.إ", rate: 3.67 },
  "SAR - Saudi Riyal": { symbol: "ر.س", rate: 3.75 }
};

export const InvoiceModule = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const [currentCurrency, setCurrentCurrency] = useState("USD - US Dollar");

  // Base invoice data in USD
  const baseInvoices = [
    {
      id: "INV-2024-001",
      customer: "Global Trade Co.",
      baseAmount: 45000,
      status: "Paid",
      issueDate: "2024-01-05",
      dueDate: "2024-01-20",
      shipmentRef: "SH001",
      items: ["Sea Freight", "Documentation", "Insurance"]
    },
    {
      id: "INV-2024-002",
      customer: "Euro Logistics",
      baseAmount: 78000,
      status: "Pending",
      issueDate: "2024-01-08",
      dueDate: "2024-01-23",
      shipmentRef: "SH002",
      items: ["Air Freight", "Customs Clearance", "Handling"]
    },
    {
      id: "INV-2024-003",
      customer: "Ocean Freight Ltd",
      baseAmount: 32000,
      status: "Overdue",
      issueDate: "2023-12-20",
      dueDate: "2024-01-04",
      shipmentRef: "SH003",
      items: ["Sea Freight", "Port Charges", "THC"]
    }
  ];

  // Load currency from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('logiscrm-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        if (parsed.currency) {
          setCurrentCurrency(parsed.currency);
        }
      } catch (error) {
        console.error('Error loading currency settings:', error);
      }
    }
  }, []);

  // Listen for currency changes from settings
  useEffect(() => {
    const handleCurrencyChange = (event: CustomEvent) => {
      setCurrentCurrency(event.detail.currency);
    };

    window.addEventListener('currencyChanged', handleCurrencyChange as EventListener);
    return () => {
      window.removeEventListener('currencyChanged', handleCurrencyChange as EventListener);
    };
  }, []);

  // Convert amount to current currency
  const convertAmount = (baseAmount: number) => {
    const currency = currencyRates[currentCurrency] || currencyRates["USD - US Dollar"];
    const convertedAmount = baseAmount * currency.rate;
    return `${currency.symbol}${convertedAmount.toLocaleString()}`;
  };

  // Convert invoices with current currency
  const invoices = baseInvoices.map(invoice => ({
    ...invoice,
    amount: convertAmount(invoice.baseAmount)
  }));

  // Convert statistics
  const totalInvoicesAmount = 155000; // Sum of base amounts
  const pendingAmount = 110000; // Sum of pending amounts in base currency
  const overdueAmount = 32000; // Sum of overdue amounts in base currency

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Overdue": return "bg-red-100 text-red-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid": return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case "Pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "Overdue": return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      default: return <div className="w-2 h-2 bg-gray-500 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">{t('invoices.title')}</h2>
        <div className={`flex ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
          <div className="text-sm text-gray-600">
            {t('invoices.currency')}: {currentCurrency}
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {t('invoices.bulkExport')}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t('invoices.create')}
          </Button>
        </div>
      </div>

      {/* Invoice Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('invoices.totalInvoices')}</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-blue-600 mt-1">{t('invoices.thisMonth')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('invoices.pendingAmount')}</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{convertAmount(pendingAmount)}</div>
            <p className="text-xs text-yellow-600 mt-1">12 {t('invoices.all')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('invoices.overdueAmount')}</CardTitle>
            <div className="w-4 h-4 bg-red-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{convertAmount(overdueAmount)}</div>
            <p className="text-xs text-red-600 mt-1">5 {t('invoices.all')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('invoices.collectionRate')}</CardTitle>
            <div className="w-4 h-4 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-green-600 mt-1">{t('invoices.onTimePayments')}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">{t('invoices.all')}</TabsTrigger>
            <TabsTrigger value="pending">{t('invoices.pending')}</TabsTrigger>
            <TabsTrigger value="overdue">{t('invoices.overdue')}</TabsTrigger>
            <TabsTrigger value="paid">{t('invoices.paid')}</TabsTrigger>
          </TabsList>
          
          <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
            <div className="relative">
              <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 ${isRTL ? 'right-3' : 'left-3'}`} />
              <Input
                placeholder={t('invoices.search')}
                className={`w-64 ${isRTL ? 'pr-10' : 'pl-10'}`}
              />
            </div>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <FileText className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-bold text-lg">{invoice.id}</p>
                        <p className="text-sm text-gray-600">{invoice.customer}</p>
                      </div>
                    </div>
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                      {getStatusIcon(invoice.status)}
                      <Badge className={getStatusColor(invoice.status)}>
                        {t(`status.${invoice.status.toLowerCase()}`)}
                      </Badge>
                    </div>
                  </div>
                  <div className={isRTL ? 'text-left' : 'text-right'}>
                    <p className="font-semibold text-xl">{invoice.amount}</p>
                    <p className="text-sm text-gray-600">Due: {invoice.dueDate}</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t('invoices.issueDate')}</p>
                    <p className="text-sm">{invoice.issueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t('invoices.shipmentReference')}</p>
                    <p className="text-sm">{invoice.shipmentRef}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t('invoices.services')}</p>
                    <p className="text-sm">{invoice.items.join(", ")}</p>
                  </div>
                </div>
                
                <div className={`mt-4 flex ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    {t('invoices.view')}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    {t('invoices.edit')}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="h-4 w-4 mr-1" />
                    {t('invoices.send')}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    {t('invoices.pdf')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
