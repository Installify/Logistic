
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package,
  Plus,
  Download,
  Calendar,
  FileText
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ReportsModule = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const reportCategories = [
    {
      title: t('reports.shipmentReports'),
      icon: Package,
      reports: [
        { name: t('reports.monthlyShipments'), lastGenerated: "2024-01-10" },
        { name: t('reports.onTimeDelivery'), lastGenerated: "2024-01-08" },
        { name: t('reports.shipmentVolume'), lastGenerated: "2024-01-05" }
      ]
    },
    {
      title: t('reports.financialReports'),
      icon: TrendingUp,
      reports: [
        { name: t('reports.revenueAnalysis'), lastGenerated: "2024-01-10" },
        { name: "Profit & Loss", lastGenerated: "2024-01-08" },
        { name: "Cash Flow Analysis", lastGenerated: "2024-01-05" }
      ]
    },
    {
      title: t('reports.customerReports'),
      icon: Users,
      reports: [
        { name: t('reports.customerAnalysis'), lastGenerated: "2024-01-10" },
        { name: t('reports.customerSatisfaction'), lastGenerated: "2024-01-08" },
        { name: "Customer Growth", lastGenerated: "2024-01-05" }
      ]
    },
    {
      title: t('reports.operationalReports'),
      icon: BarChart3,
      reports: [
        { name: t('reports.performanceMetrics'), lastGenerated: "2024-01-10" },
        { name: t('reports.averageTransitTime'), lastGenerated: "2024-01-08" },
        { name: "Resource Utilization", lastGenerated: "2024-01-05" }
      ]
    }
  ];

  const keyMetrics = [
    {
      title: t('reports.onTimeDelivery'),
      value: "94.2%",
      change: "+2.1%",
      period: t('reports.thisYear'),
      color: "text-green-600"
    },
    {
      title: t('reports.shipmentVolume'),
      value: "2,847",
      change: "+18.3%",
      period: t('reports.lastMonth'),
      color: "text-blue-600"
    },
    {
      title: t('reports.averageTransitTime'),
      value: "12.5",
      change: "-1.2",
      period: t('reports.days'),
      color: "text-purple-600"
    },
    {
      title: t('reports.customerSatisfaction'),
      value: "4.8/5",
      change: "+0.3",
      period: t('reports.thisYear'),
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">{t('reports.title')}</h2>
        <div className={`flex ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {t('reports.export')}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t('reports.generate')}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <BarChart3 className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs mt-1 ${metric.color}`}>
                {metric.change} {metric.period}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList>
          <TabsTrigger value="categories">Report Categories</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <Icon className="h-6 w-6 text-blue-600" />
                      <span>{category.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.reports.map((report, reportIndex) => (
                      <div key={reportIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                          <FileText className="h-4 w-4 text-gray-600" />
                          <div>
                            <p className="font-medium">{report.name}</p>
                            <p className="text-sm text-gray-600">Last: {report.lastGenerated}</p>
                          </div>
                        </div>
                        <div className={`flex ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                          <Button variant="outline" size="sm">{t('reports.viewReport')}</Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Monthly Revenue Report</p>
                      <p className="text-sm text-gray-600">Every 1st of the month • Next: Feb 1, 2024</p>
                    </div>
                  </div>
                  <div className={`flex ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">{t('reports.downloadPdf')}</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                    <Calendar className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Weekly Operations Summary</p>
                      <p className="text-sm text-gray-600">Every Monday • Next: Jan 15, 2024</p>
                    </div>
                  </div>
                  <div className={`flex ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">{t('reports.downloadPdf')}</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Customer Performance Report</p>
                      <p className="text-sm text-gray-600">Every 15th of the month • Next: Jan 15, 2024</p>
                    </div>
                  </div>
                  <div className={`flex ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">{t('reports.downloadPdf')}</Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('reports.scheduleReport')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Custom Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Report Name</label>
                  <input className="w-full mt-1 p-2 border rounded-lg" placeholder="Enter report name" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Data Source</label>
                  <select className="w-full mt-1 p-2 border rounded-lg">
                    <option>Shipments</option>
                    <option>Customers</option>
                    <option>Financial</option>
                    <option>Operations</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Date Range</label>
                  <select className="w-full mt-1 p-2 border rounded-lg">
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                    <option>Last 6 months</option>
                    <option>Last year</option>
                    <option>Custom range</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Report Format</label>
                  <select className="w-full mt-1 p-2 border rounded-lg">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                  </select>
                </div>
                
                <Button className="w-full">{t('reports.generate')}</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Custom Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Q4 Performance Analysis</p>
                      <p className="text-sm text-gray-600">Generated: Jan 8, 2024</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Customer Retention Report</p>
                      <p className="text-sm text-gray-600">Generated: Jan 5, 2024</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Route Efficiency Analysis</p>
                      <p className="text-sm text-gray-600">Generated: Jan 3, 2024</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
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
