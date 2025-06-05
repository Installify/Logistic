
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  FileText,
  Plus,
  Download
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const AccountingModule = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const financialOverview = {
    totalRevenue: "$2,847,500",
    monthlyGrowth: "+18.2%",
    outstandingInvoices: "$127,800",
    cashFlow: "+$45,200"
  };

  const recentTransactions = [
    {
      id: "TXN001",
      customer: "Global Trade Co.",
      amount: "$45,000",
      type: "Invoice Payment",
      status: "Completed",
      date: "2024-01-10",
      reference: "INV-2024-001"
    },
    {
      id: "TXN002", 
      customer: "Euro Logistics",
      amount: "$78,000",
      type: "Freight Payment",
      status: "Pending",
      date: "2024-01-09",
      reference: "SH002"
    },
    {
      id: "TXN003",
      customer: "Ocean Freight Ltd",
      amount: "$32,000",
      type: "Customs Fees",
      status: "Completed",
      date: "2024-01-08",
      reference: "CF-2024-003"
    }
  ];

  const accounts = [
    { name: "Operating Account", balance: "$847,200", type: "Current" },
    { name: "Freight Reserve", balance: "$234,500", type: "Savings" },
    { name: "Tax Escrow", balance: "$78,900", type: "Escrow" },
    { name: "Equipment Fund", balance: "$156,300", type: "Capital" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">{t('accounting.title')}</h2>
        <div className={`flex ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {t('accounting.exportReports')}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t('accounting.newTransaction')}
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('accounting.totalRevenue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialOverview.totalRevenue}</div>
            <p className="text-xs text-green-600 mt-1">{financialOverview.monthlyGrowth} {t('dashboard.fromLastMonth')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('accounting.outstandingInvoices')}</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialOverview.outstandingInvoices}</div>
            <p className="text-xs text-orange-600 mt-1">12 {t('accounting.pendingPayments')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('accounting.cashFlow')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialOverview.cashFlow}</div>
            <p className="text-xs text-blue-600 mt-1">{t('accounting.positiveThisMonth')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('accounting.paymentProcessing')}</CardTitle>
            <CreditCard className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-purple-600 mt-1">{t('accounting.successRate')}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="transactions">{t('accounting.recentTransactions')}</TabsTrigger>
          <TabsTrigger value="accounts">{t('accounting.chartOfAccounts')}</TabsTrigger>
          <TabsTrigger value="reports">{t('accounting.financialReports')}</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>{t('accounting.recentTransactions')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className={`flex items-center justify-between p-4 border rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.customer}</p>
                        <p className="text-sm text-gray-600">{transaction.type} • {transaction.reference}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className={isRTL ? 'text-left' : 'text-right'}>
                      <p className="font-semibold text-lg">{transaction.amount}</p>
                      <Badge className={transaction.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {t(`status.${transaction.status.toLowerCase()}`)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts">
          <Card>
            <CardHeader>
              <CardTitle>{t('accounting.chartOfAccounts')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accounts.map((account, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-gray-600">{account.type}</p>
                      </div>
                      <p className="font-semibold text-lg">{account.balance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('accounting.profitLoss')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>{t('accounting.totalRevenue')}</span>
                    <span className="font-semibold">$2,847,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('accounting.operatingExpenses')}</span>
                    <span className="font-semibold">$1,945,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('accounting.ebitda')}</span>
                    <span className="font-semibold">$902,300</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-medium">{t('accounting.netProfit')}</span>
                    <span className="font-bold text-green-600">$678,450</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('accounting.balanceSheet')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>{t('accounting.totalAssets')}</span>
                    <span className="font-semibold">$4,234,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('accounting.totalLiabilities')}</span>
                    <span className="font-semibold">$1,567,200</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-medium">{t('accounting.equity')}</span>
                    <span className="font-bold text-blue-600">$2,667,300</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
