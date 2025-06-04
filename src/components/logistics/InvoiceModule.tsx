
import { useState } from "react";
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

export const InvoiceModule = () => {
  const invoices = [
    {
      id: "INV-2024-001",
      customer: "Global Trade Co.",
      amount: "$45,000",
      status: "Paid",
      issueDate: "2024-01-05",
      dueDate: "2024-01-20",
      shipmentRef: "SH001",
      items: ["Sea Freight", "Documentation", "Insurance"]
    },
    {
      id: "INV-2024-002",
      customer: "Euro Logistics",
      amount: "$78,000",
      status: "Pending",
      issueDate: "2024-01-08",
      dueDate: "2024-01-23",
      shipmentRef: "SH002",
      items: ["Air Freight", "Customs Clearance", "Handling"]
    },
    {
      id: "INV-2024-003",
      customer: "Ocean Freight Ltd",
      amount: "$32,000",
      status: "Overdue",
      issueDate: "2023-12-20",
      dueDate: "2024-01-04",
      shipmentRef: "SH003",
      items: ["Sea Freight", "Port Charges", "THC"]
    }
  ];

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
        <h2 className="text-3xl font-bold text-gray-900">E-Invoicing System</h2>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Bulk Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Invoice Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-blue-600 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$127,800</div>
            <p className="text-xs text-yellow-600 mt-1">12 invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            <div className="w-4 h-4 bg-red-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,200</div>
            <p className="text-xs text-red-600 mt-1">5 invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <div className="w-4 h-4 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-green-600 mt-1">On-time payments</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Invoices</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search invoices..."
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-bold text-lg">{invoice.id}</p>
                        <p className="text-sm text-gray-600">{invoice.customer}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(invoice.status)}
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-xl">{invoice.amount}</p>
                    <p className="text-sm text-gray-600">Due: {invoice.dueDate}</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Issue Date</p>
                    <p className="text-sm">{invoice.issueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Shipment Reference</p>
                    <p className="text-sm">{invoice.shipmentRef}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Services</p>
                    <p className="text-sm">{invoice.items.join(", ")}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
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
