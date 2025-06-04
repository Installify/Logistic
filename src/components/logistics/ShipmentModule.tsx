
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ship, Plane, Truck, Plus, Search, Filter } from "lucide-react";

export const ShipmentModule = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const shipments = [
    {
      id: "SH001",
      origin: "Shanghai, China",
      destination: "Los Angeles, USA",
      mode: "Sea",
      status: "In Transit",
      eta: "2024-01-15",
      customer: "Global Trade Co.",
      containers: "2x 40ft",
      value: "$45,000"
    },
    {
      id: "SH002",
      origin: "Dubai, UAE",
      destination: "Frankfurt, Germany",
      mode: "Air",
      status: "Delivered",
      eta: "2024-01-08",
      customer: "Euro Logistics",
      weight: "2.5 tons",
      value: "$78,000"
    },
    {
      id: "SH003",
      origin: "Mumbai, India",
      destination: "Rotterdam, Netherlands",
      mode: "Sea",
      status: "Loading",
      eta: "2024-01-20",
      customer: "Ocean Freight Ltd",
      containers: "3x 20ft",
      value: "$32,000"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "In Transit": return "bg-blue-100 text-blue-800";
      case "Loading": return "bg-yellow-100 text-yellow-800";
      case "Customs": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "Sea": return <Ship className="h-4 w-4" />;
      case "Air": return <Plane className="h-4 w-4" />;
      case "Land": return <Truck className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Shipment Management</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Shipment
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Shipments</TabsTrigger>
            <TabsTrigger value="sea">Sea Freight</TabsTrigger>
            <TabsTrigger value="air">Air Freight</TabsTrigger>
            <TabsTrigger value="land">Land Transport</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search shipments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {shipments.map((shipment) => (
            <Card key={shipment.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getModeIcon(shipment.mode)}
                      <span className="font-bold text-lg">{shipment.id}</span>
                    </div>
                    <Badge className={getStatusColor(shipment.status)}>
                      {shipment.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{shipment.value}</p>
                    <p className="text-sm text-gray-600">ETA: {shipment.eta}</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Route</p>
                    <p className="text-sm">{shipment.origin} → {shipment.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Customer</p>
                    <p className="text-sm">{shipment.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cargo</p>
                    <p className="text-sm">{shipment.containers || shipment.weight}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm">Track</Button>
                  <Button variant="outline" size="sm">Documents</Button>
                  <Button variant="outline" size="sm">Invoice</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
