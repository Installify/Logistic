
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Bell, 
  Users, 
  Zap,
  Save,
  Plus,
  Edit,
  Trash2,
  Upload,
  Mail,
  CreditCard,
  Ship,
  FileText
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export const SettingsModule = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const [logo, setLogo] = useState<string | null>(null);

  const userAccounts = [
    {
      name: "John Smith",
      email: "john.smith@logiscrm.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-01-10"
    },
    {
      name: "Sarah Johnson",
      email: "sarah.johnson@logiscrm.com", 
      role: "Manager",
      status: "Active",
      lastLogin: "2024-01-09"
    },
    {
      name: "Mike Wilson",
      email: "mike.wilson@logiscrm.com",
      role: "Operator",
      status: "Inactive",
      lastLogin: "2024-01-05"
    }
  ];

  const integrations = [
    {
      name: "Customs API",
      status: "Connected",
      description: "Real-time customs clearance updates",
      lastSync: "2024-01-10 14:30",
      icon: FileText,
      configurable: true
    },
    {
      name: "Shipping Lines API",
      status: "Connected", 
      description: "Container tracking and schedules",
      lastSync: "2024-01-10 14:25",
      icon: Ship,
      configurable: true
    },
    {
      name: "SMS Service",
      status: "Connected",
      description: "SMS notifications and alerts",
      lastSync: "2024-01-10 14:20",
      icon: Bell,
      configurable: true
    },
    {
      name: "Zoho SMTP API",
      status: "Disconnected",
      description: "Email delivery service for notifications",
      lastSync: "Never",
      icon: Mail,
      configurable: true
    }
  ];

  const paymentGateways = [
    {
      name: "PayPal",
      status: "Disconnected",
      description: "PayPal payment processing",
      lastSync: "Never",
      icon: CreditCard,
      configurable: true
    },
    {
      name: "Stripe",
      status: "Disconnected",
      description: "Credit card and online payments",
      lastSync: "Never", 
      icon: CreditCard,
      configurable: true
    }
  ];

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">{t('settings.title')}</h2>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          {t('settings.save')}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">{t('settings.general')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('settings.notifications')}</TabsTrigger>
          <TabsTrigger value="users">{t('settings.users')}</TabsTrigger>
          <TabsTrigger value="integrations">{t('settings.integrations')}</TabsTrigger>
          <TabsTrigger value="payments">{t('settings.payments')}</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <Settings className="h-5 w-5 text-blue-600" />
                  <span>{t('settings.companyInfo')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">{t('settings.companyLogo')}</Label>
                  <div className="mt-2 space-y-4">
                    {logo && (
                      <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <img src={logo} alt="Company Logo" className="max-w-full max-h-full object-contain" />
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Button variant="outline" asChild>
                        <label htmlFor="logo-upload" className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          {t('settings.uploadLogo')}
                        </label>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-600">{t('settings.companyName')}</Label>
                  <Input defaultValue="LogisCRM Solutions Ltd." />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-600">{t('settings.address')}</Label>
                  <Textarea defaultValue="123 Business District, Logistics City" rows={2} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">{t('settings.phone')}</Label>
                    <Input defaultValue="+1-555-0123" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">{t('settings.email')}</Label>
                    <Input defaultValue="info@logiscrm.com" />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-600">{t('settings.website')}</Label>
                  <Input defaultValue="https://www.logiscrm.com" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('settings.systemPreferences')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">{t('settings.timezone')}</Label>
                  <select className="w-full mt-1 p-2 border rounded-lg">
                    <option>UTC+0 (GMT)</option>
                    <option>UTC-5 (EST)</option>
                    <option>UTC+1 (CET)</option>
                    <option>UTC+3 (AST)</option>
                  </select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-600">{t('settings.currency')}</Label>
                  <select className="w-full mt-1 p-2 border rounded-lg">
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - British Pound</option>
                    <option>AED - UAE Dirham</option>
                  </select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-600">{t('settings.language')}</Label>
                  <select className="w-full mt-1 p-2 border rounded-lg">
                    <option>English</option>
                    <option>العربية</option>
                    <option>Français</option>
                    <option>Español</option>
                  </select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-600">{t('settings.dateFormat')}</Label>
                  <select className="w-full mt-1 p-2 border rounded-lg">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                    <option>DD-MM-YYYY</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <Bell className="h-5 w-5 text-blue-600" />
                  <span>{t('settings.emailNotifications')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('settings.shipmentAlerts')}</p>
                    <p className="text-sm text-gray-600">Receive updates on shipment status changes</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{t('settings.enabled')}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('settings.invoiceReminders')}</p>
                    <p className="text-sm text-gray-600">Automated payment reminders</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{t('settings.enabled')}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('settings.systemUpdates')}</p>
                    <p className="text-sm text-gray-600">System maintenance and updates</p>
                  </div>
                  <Badge className="bg-gray-100 text-gray-800">{t('settings.disabled')}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('settings.smsNotifications')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('settings.mobileAlerts')}</p>
                    <p className="text-sm text-gray-600">Critical alerts via SMS</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{t('settings.enabled')}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Customer Notifications</p>
                    <p className="text-sm text-gray-600">Send SMS updates to customers</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{t('settings.enabled')}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Emergency Alerts</p>
                    <p className="text-sm text-gray-600">System failures and emergencies</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{t('settings.enabled')}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>{t('settings.userAccounts')}</span>
                </CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('settings.addUser')}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userAccounts.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">Last login: {user.lastLogin}</p>
                      </div>
                    </div>
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                      <Badge className={user.role === "Admin" ? "bg-purple-100 text-purple-800" : 
                                     user.role === "Manager" ? "bg-blue-100 text-blue-800" : 
                                     "bg-gray-100 text-gray-800"}>
                        {t(`settings.${user.role.toLowerCase()}`)}
                      </Badge>
                      <Badge className={user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {t(`settings.${user.status.toLowerCase()}`)}
                      </Badge>
                      <div className={`flex ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <Zap className="h-5 w-5 text-blue-600" />
                <span>{t('settings.apiIntegrations')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <integration.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                        <p className="text-xs text-gray-500">Last sync: {integration.lastSync}</p>
                      </div>
                    </div>
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                      <Badge className={integration.status === "Connected" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {t(`settings.${integration.status.toLowerCase()}`)}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {t('settings.configure')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <CreditCard className="h-5 w-5 text-blue-600" />
                <span>{t('settings.paymentGateways')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentGateways.map((gateway, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <gateway.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{gateway.name}</p>
                        <p className="text-sm text-gray-600">{gateway.description}</p>
                        <p className="text-xs text-gray-500">Last sync: {gateway.lastSync}</p>
                      </div>
                    </div>
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                      <Badge className={gateway.status === "Connected" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {t(`settings.${gateway.status.toLowerCase()}`)}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {t('settings.configure')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
