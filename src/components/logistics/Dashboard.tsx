
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Ship, 
  Plane,
  Truck,
  AlertTriangle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Dashboard = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const stats = [
    {
      title: t('dashboard.activeShipments'),
      value: "1,247",
      change: "+12.5%",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: t('dashboard.totalCustomers'),
      value: "856",
      change: "+8.1%",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: t('dashboard.monthlyRevenue'),
      value: "$2.4M",
      change: "+15.3%",
      icon: DollarSign,
      color: "text-purple-600"
    },
    {
      title: t('dashboard.growthRate'),
      value: "23.4%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const recentShipments = [
    { id: "SH001", origin: "Shanghai", destination: "Los Angeles", status: "In Transit", mode: "Sea" },
    { id: "SH002", origin: "Dubai", destination: "Frankfurt", status: "Delivered", mode: "Air" },
    { id: "SH003", origin: "Mumbai", destination: "Rotterdam", status: "Loading", mode: "Sea" },
    { id: "SH004", origin: "Hong Kong", destination: "New York", status: "Customs", mode: "Air" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h2>
        <div className={`flex ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
          <Button variant="outline">{t('dashboard.exportReport')}</Button>
          <Button>{t('dashboard.newShipment')}</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">
                  {stat.change} {t('dashboard.fromLastMonth')}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Shipments */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.recentShipments')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentShipments.map((shipment) => (
                <div key={shipment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                    {shipment.mode === "Sea" ? (
                      <Ship className="h-5 w-5 text-blue-600" />
                    ) : shipment.mode === "Air" ? (
                      <Plane className="h-5 w-5 text-sky-600" />
                    ) : (
                      <Truck className="h-5 w-5 text-green-600" />
                    )}
                    <div>
                      <p className="font-medium">{shipment.id}</p>
                      <p className="text-sm text-gray-600">
                        {shipment.origin} → {shipment.destination}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    shipment.status === "Delivered" ? "bg-green-100 text-green-800" :
                    shipment.status === "In Transit" ? "bg-blue-100 text-blue-800" :
                    shipment.status === "Loading" ? "bg-yellow-100 text-yellow-800" :
                    "bg-orange-100 text-orange-800"
                  }`}>
                    {t(`status.${shipment.status.toLowerCase().replace(' ', '')}`)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.alertsNotifications')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800">{t('dashboard.shipmentDelayed')}</p>
                  <p className="text-sm text-red-600">{t('dashboard.delayReason')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">{t('dashboard.invoiceOverdue')}</p>
                  <p className="text-sm text-yellow-600">{t('dashboard.paymentPending')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">{t('dashboard.newCustomer')}</p>
                  <p className="text-sm text-blue-600">{t('dashboard.customerVerification')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
