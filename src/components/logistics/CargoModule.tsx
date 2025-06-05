
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Ruler, 
  Weight, 
  Truck,
  Plus,
  Search,
  Calculator
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const CargoModule = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const cargoItems = [
    {
      id: "CARGO001",
      description: "Electronics Components",
      dimensions: "120cm x 80cm x 100cm",
      weight: "850 kg",
      volume: "0.96 m³",
      value: "$45,000",
      shipmentId: "SH001",
      customer: "Global Trade Co.",
      containerType: "20ft Standard",
      hazardous: false
    },
    {
      id: "CARGO002",
      description: "Pharmaceutical Products",
      dimensions: "100cm x 60cm x 80cm",
      weight: "320 kg",
      volume: "0.48 m³",
      value: "$78,000",
      shipmentId: "SH002",
      customer: "Euro Logistics",
      containerType: "Refrigerated",
      hazardous: false,
      temperature: "2-8°C"
    },
    {
      id: "CARGO003",
      description: "Industrial Machinery",
      dimensions: "200cm x 150cm x 180cm",
      weight: "2,500 kg",
      volume: "5.4 m³",
      value: "$32,000",
      shipmentId: "SH003",
      customer: "Ocean Freight Ltd",
      containerType: "40ft High Cube",
      hazardous: true,
      hazardClass: "Class 3"
    }
  ];

  const containerTypes = [
    { type: "20ft Standard", dimensions: "6.06m x 2.44m x 2.59m", capacity: "33.2 m³" },
    { type: "40ft Standard", dimensions: "12.19m x 2.44m x 2.59m", capacity: "67.7 m³" },
    { type: "40ft High Cube", dimensions: "12.19m x 2.44m x 2.90m", capacity: "76.3 m³" },
    { type: "20ft Refrigerated", dimensions: "5.45m x 2.29m x 2.27m", capacity: "28.3 m³" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">{t('cargo.title')}</h2>
        <div className={`flex ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
          <Button variant="outline">
            <Calculator className="h-4 w-4 mr-2" />
            {t('cargo.volumeCalculator')}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t('cargo.add')}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('cargo.totalCargoItems')}</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-blue-600 mt-1">{t('cargo.activeShipments')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('cargo.totalWeight')}</CardTitle>
            <Weight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847 tons</div>
            <p className="text-xs text-green-600 mt-1">{t('invoices.thisMonth')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('cargo.totalVolume')}</CardTitle>
            <Ruler className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,432 m³</div>
            <p className="text-xs text-purple-600 mt-1">{t('cargo.cubicMeters')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('cargo.containerUtilization')}</CardTitle>
            <Truck className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <p className="text-xs text-orange-600 mt-1">{t('cargo.averageEfficiency')}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cargo" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="cargo">{t('cargo.cargoItems')}</TabsTrigger>
            <TabsTrigger value="containers">{t('cargo.containerTypes')}</TabsTrigger>
            <TabsTrigger value="calculator">{t('cargo.dimensionCalculator')}</TabsTrigger>
          </TabsList>
          
          <div className="relative">
            <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 ${isRTL ? 'right-3' : 'left-3'}`} />
            <Input
              placeholder={t('cargo.search')}
              className={`w-64 ${isRTL ? 'pr-10' : 'pl-10'}`}
            />
          </div>
        </div>

        <TabsContent value="cargo" className="space-y-4">
          {cargoItems.map((cargo) => (
            <Card key={cargo.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{cargo.id}</h3>
                      <p className="text-gray-600">{cargo.description}</p>
                      <p className="text-sm text-gray-500">{t('shipments.customer')}: {cargo.customer}</p>
                      <div className={`flex items-center mt-2 ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                        {cargo.hazardous && (
                          <Badge className="bg-red-100 text-red-800">
                            Hazardous {cargo.hazardClass}
                          </Badge>
                        )}
                        {cargo.temperature && (
                          <Badge className="bg-blue-100 text-blue-800">
                            Temperature Controlled
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={isRTL ? 'text-left' : 'text-right'}>
                    <p className="font-semibold text-xl">{cargo.value}</p>
                    <p className="text-sm text-gray-600">{t('shipments.title')}: {cargo.shipmentId}</p>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className={`flex items-center mb-1 ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                      <Ruler className="h-4 w-4 text-gray-600" />
                      <p className="text-sm font-medium text-gray-600">{t('cargo.dimensions')}</p>
                    </div>
                    <p className="text-sm font-semibold">{cargo.dimensions}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className={`flex items-center mb-1 ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                      <Weight className="h-4 w-4 text-gray-600" />
                      <p className="text-sm font-medium text-gray-600">{t('cargo.weight')}</p>
                    </div>
                    <p className="text-sm font-semibold">{cargo.weight}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className={`flex items-center mb-1 ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                      <Package className="h-4 w-4 text-gray-600" />
                      <p className="text-sm font-medium text-gray-600">{t('cargo.volume')}</p>
                    </div>
                    <p className="text-sm font-semibold">{cargo.volume}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className={`flex items-center mb-1 ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                      <Truck className="h-4 w-4 text-gray-600" />
                      <p className="text-sm font-medium text-gray-600">{t('cargo.container')}</p>
                    </div>
                    <p className="text-sm font-semibold">{cargo.containerType}</p>
                  </div>
                </div>
                
                {cargo.temperature && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">
                      {t('cargo.temperatureRequirements')}: {cargo.temperature}
                    </p>
                  </div>
                )}
                
                <div className={`mt-4 flex ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <Button variant="outline" size="sm">{t('cargo.viewDetails')}</Button>
                  <Button variant="outline" size="sm">{t('cargo.editCargo')}</Button>
                  <Button variant="outline" size="sm">{t('cargo.calculateFreight')}</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="containers">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {containerTypes.map((container, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span>{container.type}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Internal Dimensions</p>
                    <p className="text-lg font-semibold">{container.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cargo Capacity</p>
                    <p className="text-lg font-semibold">{container.capacity}</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    {t('cargo.useForCalculation')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calculator">
          <Card>
            <CardHeader>
              <CardTitle>{t('cargo.freightCalculator')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('cargo.length')}</label>
                  <Input placeholder="Enter length" type="number" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('cargo.width')}</label>
                  <Input placeholder="Enter width" type="number" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('cargo.height')}</label>
                  <Input placeholder="Enter height" type="number" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('cargo.actualWeight')}</label>
                  <Input placeholder="Enter actual weight" type="number" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('cargo.quantity')}</label>
                  <Input placeholder="Number of items" type="number" defaultValue="1" />
                </div>
              </div>
              
              <div className={`flex ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                <Button>{t('cargo.calculateVolume')}</Button>
                <Button variant="outline">{t('cargo.calculateChargeableWeight')}</Button>
                <Button variant="outline">{t('cargo.recommendContainer')}</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('cargo.calculatedVolume')}</p>
                  <p className="text-lg font-semibold">-- m³</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('cargo.volumetricWeight')}</p>
                  <p className="text-lg font-semibold">-- kg</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('cargo.chargeableWeight')}</p>
                  <p className="text-lg font-semibold">-- kg</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
