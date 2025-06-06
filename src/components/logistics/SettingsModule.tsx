import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Bell, 
  Users, 
  Zap,
  Save,
  Plus,
  Edit,
  Trash2,
  Mail,
  Upload,
  Image
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

// Default settings that will be used if no saved settings exist
const defaultSettings = {
  companyName: "LogisCRM Solutions Ltd.",
  address: "123 Business District, Logistics City",
  phone: "+1-555-0123",
  email: "info@logiscrm.com",
  website: "https://www.logiscrm.com",
  timezone: "UTC+0 (GMT)",
  currency: "USD - US Dollar",
  dateFormat: "MM/DD/YYYY",
  logoUrl: null as string | null
};

// Comprehensive timezone list
const timezones = [
  "UTC-12:00 (International Date Line West)",
  "UTC-11:00 (Coordinated Universal Time-11)",
  "UTC-10:00 (Hawaii)",
  "UTC-09:00 (Alaska)",
  "UTC-08:00 (Pacific Time US & Canada)",
  "UTC-07:00 (Mountain Time US & Canada)",
  "UTC-06:00 (Central Time US & Canada)",
  "UTC-05:00 (Eastern Time US & Canada)",
  "UTC-04:00 (Atlantic Time Canada)",
  "UTC-03:30 (Newfoundland)",
  "UTC-03:00 (Brazil, Argentina)",
  "UTC-02:00 (Coordinated Universal Time-02)",
  "UTC-01:00 (Azores)",
  "UTC+0 (GMT, London, Dublin)",
  "UTC+1 (Central European Time)",
  "UTC+2 (Eastern European Time)",
  "UTC+3 (Moscow, Kuwait, Riyadh)",
  "UTC+3:30 (Tehran)",
  "UTC+4 (Abu Dhabi, Muscat)",
  "UTC+4:30 (Afghanistan)",
  "UTC+5 (Pakistan, Kazakhstan)",
  "UTC+5:30 (India, Sri Lanka)",
  "UTC+5:45 (Nepal)",
  "UTC+6 (Bangladesh, Kazakhstan)",
  "UTC+6:30 (Myanmar)",
  "UTC+7 (Bangkok, Jakarta)",
  "UTC+8 (China, Singapore, Malaysia)",
  "UTC+9 (Japan, Korea)",
  "UTC+9:30 (Adelaide, Darwin)",
  "UTC+10 (Eastern Australia)",
  "UTC+11 (Solomon Islands, New Caledonia)",
  "UTC+12 (Fiji, New Zealand)",
  "UTC+13 (Tonga)",
  "UTC+14 (Line Islands)"
];

export const SettingsModule = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const isRTL = language === 'ar';
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [formData, setFormData] = useState(defaultSettings);

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('logiscrm-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading saved settings:', error);
      }
    }
  }, []);

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
      icon: Zap,
      configurable: true
    },
    {
      name: "Shipping Lines API",
      status: "Connected", 
      description: "Container tracking and schedules",
      lastSync: "2024-01-10 14:25",
      icon: Zap,
      configurable: true
    },
    {
      name: "Payment Gateway",
      status: "Disconnected",
      description: "Online payment processing",
      lastSync: "Never",
      icon: Zap,
      configurable: true
    },
    {
      name: "SMS Service",
      status: "Connected",
      description: "SMS notifications and alerts",
      lastSync: "2024-01-10 14:20",
      icon: Zap,
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

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setFormData(prev => ({ ...prev, logoUrl: result }));
        console.log('Logo uploaded and preview updated');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    try {
      localStorage.setItem('logiscrm-settings', JSON.stringify(formData));
      
      console.log('Settings saved successfully:', formData);
      
      toast({
        title: t('settings.saveSuccess'),
        description: t('settings.saveSuccessMessage'),
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  const renderConfigurationForm = (integration) => {
    switch (integration.name) {
      case "Zoho SMTP API":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">{t('settings.smtpServer')}</label>
              <Input defaultValue="smtp.zoho.com" placeholder={t('settings.enterSmtpServer')} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">{t('settings.port')}</label>
                <Input defaultValue="587" placeholder="587" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">{t('settings.encryption')}</label>
                <select className="w-full mt-1 p-2 border rounded-lg">
                  <option>TLS</option>
                  <option>SSL</option>
                  <option>None</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">{t('settings.username')}</label>
              <Input placeholder={t('settings.enterEmail')} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">{t('settings.password')}</label>
              <Input type="password" placeholder={t('settings.enterPassword')} />
            </div>
          </div>
        );
      case "Customs API":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">{t('settings.apiEndpoint')}</label>
              <Input placeholder={t('settings.enterApiEndpoint')} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">{t('settings.apiKey')}</label>
              <Input type="password" placeholder={t('settings.enterApiKey')} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">{t('settings.region')}</label>
              <select className="w-full mt-1 p-2 border rounded-lg">
                <option>{t('settings.selectRegion')}</option>
                <option>UAE</option>
                <option>Saudi Arabia</option>
                <option>Qatar</option>
                <option>Kuwait</option>
              </select>
            </div>
          </div>
        );
      case "Shipping Lines API":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">{t('settings.apiEndpoint')}</label>
              <Input placeholder={t('settings.enterApiEndpoint')} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">{t('settings.apiKey')}</label>
              <Input type="password" placeholder={t('settings.enterApiKey')} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">{t('settings.shippingLines')}</label>
              <select className="w-full mt-1 p-2 border rounded-lg">
                <option>{t('settings.selectShippingLine')}</option>
                <option>Maersk</option>
                <option>MSC</option>
                <option>CMA CGM</option>
                <option>COSCO</option>
              </select>
            </div>
          </div>
        );
      case "SMS Service":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">{t('settings.provider')}</label>
              <select className="w-full mt-1 p-2 border rounded-lg">
                <option>Twilio</option>
                <option>AWS SNS</option>
                <option>MessageBird</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">{t('settings.apiKey')}</label>
              <Input type="password" placeholder={t('settings.enterApiKey')} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">{t('settings.senderNumber')}</label>
              <Input placeholder={t('settings.enterSenderNumber')} />
            </div>
          </div>
        );
      case "Payment Gateway":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">{t('settings.provider')}</label>
              <select className="w-full mt-1 p-2 border rounded-lg">
                <option>Stripe</option>
                <option>PayPal</option>
                <option>Square</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">{t('settings.apiKey')}</label>
              <Input type="password" placeholder={t('settings.enterApiKey')} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">{t('settings.webhookUrl')}</label>
              <Input placeholder={t('settings.enterWebhookUrl')} />
            </div>
          </div>
        );
      default:
        return <p>{t('settings.noConfigurationAvailable')}</p>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">{t('settings.title')}</h2>
        <Button onClick={handleSaveChanges}>
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
                  <label className="text-sm font-medium text-gray-600">{t('settings.logo')}</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                        {formData.logoUrl ? (
                          <img 
                            src={formData.logoUrl} 
                            alt="Company Logo" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Upload className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label htmlFor="logo-upload">
                          <Button variant="outline" className="cursor-pointer" asChild>
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              {t('settings.uploadLogo')}
                            </span>
                          </Button>
                        </label>
                        {formData.logoUrl && (
                          <p className="text-xs text-gray-600 mt-1">Logo uploaded successfully</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">{t('settings.companyName')}</label>
                  <Input 
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('settings.address')}</label>
                  <Input 
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">{t('settings.phone')}</label>
                    <Input 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">{t('settings.email')}</label>
                    <Input 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('settings.website')}</label>
                  <Input 
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('settings.systemPreferences')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('settings.timezone')}</label>
                  <select 
                    className="w-full mt-1 p-2 border rounded-lg"
                    value={formData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                  >
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('settings.currency')}</label>
                  <select 
                    className="w-full mt-1 p-2 border rounded-lg"
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                  >
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - British Pound</option>
                    <option>AED - UAE Dirham</option>
                    <option>SAR - Saudi Riyal</option>
                    <option>QAR - Qatari Riyal</option>
                    <option>KWD - Kuwaiti Dinar</option>
                    <option>JPY - Japanese Yen</option>
                    <option>CNY - Chinese Yuan</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('settings.dateFormat')}</label>
                  <select 
                    className="w-full mt-1 p-2 border rounded-lg"
                    value={formData.dateFormat}
                    onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                  >
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
                        <p className="text-xs text-gray-500">{t('settings.lastSync')}: {integration.lastSync}</p>
                      </div>
                    </div>
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                      <Badge className={integration.status === "Connected" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {t(`settings.${integration.status.toLowerCase()}`)}
                      </Badge>
                      {integration.configurable && (
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedIntegration(integration)}>
                              {t('settings.configure')}
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-[400px] sm:w-[540px]">
                            <SheetHeader>
                              <SheetTitle>{t('settings.configure')} {integration.name}</SheetTitle>
                              <SheetDescription>
                                {t('settings.configureIntegrationSettings')}
                              </SheetDescription>
                            </SheetHeader>
                            <div className="py-6">
                              {renderConfigurationForm(integration)}
                            </div>
                            <div className="flex justify-end space-x-2 pt-4">
                              <Button variant="outline">{t('settings.testConnection')}</Button>
                              <Button>{t('settings.saveConfiguration')}</Button>
                            </div>
                          </SheetContent>
                        </Sheet>
                      )}
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
