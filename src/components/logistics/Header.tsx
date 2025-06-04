
import { Bell, Search, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">LogisCRM</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search shipments, customers..."
              className="pl-10 w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <User className="h-4 w-4" />
            Profile
          </Button>
        </div>
      </div>
    </header>
  );
};
