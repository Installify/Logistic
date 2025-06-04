
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Calculator, 
  FileText, 
  Truck,
  BarChart3,
  Settings
} from "lucide-react";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "shipments", label: "Shipments", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
  { id: "accounting", label: "Accounting", icon: Calculator },
  { id: "invoices", label: "E-Invoicing", icon: FileText },
  { id: "cargo", label: "Cargo & Dimensions", icon: Truck },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ activeModule, setActiveModule }: SidebarProps) => {
  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Truck className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">LogisCRM</h2>
            <p className="text-slate-400 text-sm">Freight & Logistics</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors",
                    activeModule === item.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="text-xs text-slate-400">
          <p>Integrated Accounting System</p>
          <p className="text-green-400 mt-1">● All modules connected</p>
        </div>
      </div>
    </div>
  );
};
