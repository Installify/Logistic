
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const CustomerModule = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const customers = [
    {
      id: "CUST001",
      name: "Global Trade Co.",
      email: "contact@globaltrade.com",
      phone: "+1-555-0123",
      address: "123 Trade Street, New York, NY",
      status: "Active",
      totalShipments: 45,
      totalValue: "$2.1M",
      lastShipment: "2024-01-10"
    },
    {
      id: "CUST002", 
      name: "Euro Logistics",
      email: "info@eurologistics.eu",
      phone: "+49-30-12345678",
      address: "Hauptstraße 45, Berlin, Germany",
      status: "Active",
      totalShipments: 32,
      totalValue: "$1.8M",
      lastShipment: "2024-01-08"
    },
    {
      id: "CUST003",
      name: "Ocean Freight Ltd",
      email: "operations@oceanfreight.com",
      phone: "+44-20-7946-0958",
      address: "Ocean Plaza, London, UK",
      status: "Pending",
      totalShipments: 18,
      totalValue: "$890K",
      lastShipment: "2024-01-05"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">{t('customers.title')}</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t('customers.add')}
        </Button>
      </div>

      <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
        <div className="relative flex-1 max-w-md">
          <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 ${isRTL ? 'right-3' : 'left-3'}`} />
          <Input
            placeholder={t('customers.search')}
            className={isRTL ? 'pr-10' : 'pl-10'}
          />
        </div>
        <Button variant="outline">{t('customers.filter')}</Button>
        <Button variant="outline">{t('customers.export')}</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <p className="text-sm text-gray-600">{customer.id}</p>
                  </div>
                </div>
                <Badge className={customer.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {t(`status.${customer.status.toLowerCase()}`)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className={`flex items-center text-sm ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{customer.email}</span>
                </div>
                <div className={`flex items-center text-sm ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{customer.phone}</span>
                </div>
                <div className={`flex items-start text-sm ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                  <span>{customer.address}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">{t('customers.totalShipments')}</p>
                    <p className="font-semibold">{customer.totalShipments}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t('customers.totalValue')}</p>
                    <p className="font-semibold">{customer.totalValue}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-gray-600 text-xs">{t('customers.lastShipment')}: {customer.lastShipment}</p>
                </div>
              </div>
              
              <div className={`flex ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <Button variant="outline" size="sm" className="flex-1">{t('customers.viewDetails')}</Button>
                <Button variant="outline" size="sm" className="flex-1">{t('customers.newQuote')}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
