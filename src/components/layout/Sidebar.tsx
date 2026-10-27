import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Tag, 
  ShoppingBag, 
  Store, 
  Users, 
  TicketPercent, 
  Image as ImageIcon, 
  BarChart3, 
  Settings, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { NavigationTab } from '../../types/dashboard';

interface SidebarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  orderPendingCount: number;
  lowStockCount: number;
  onOpenStorefront: () => void;
  role: 'admin' | 'vendor';
  onToggleRole: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  collapsed,
  onToggleCollapse,
  orderPendingCount,
  lowStockCount,
  onOpenStorefront,
  role,
  onToggleRole
}) => {
  const menuItems = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products' as NavigationTab, label: 'Products', icon: Package, badge: lowStockCount > 0 ? `${lowStockCount} low` : undefined, badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'categories' as NavigationTab, label: 'Categories', icon: Layers },
    { id: 'brands' as NavigationTab, label: 'Brands', icon: Tag },
    { id: 'orders' as NavigationTab, label: 'Orders', icon: ShoppingBag, badge: orderPendingCount > 0 ? `${orderPendingCount}` : undefined, badgeColor: 'bg-rose-100 text-rose-700' },
    { id: 'vendors' as NavigationTab, label: 'Vendors', icon: Store, adminOnly: true },
    { id: 'customers' as NavigationTab, label: 'Customers', icon: Users, adminOnly: true },
    { id: 'coupons' as NavigationTab, label: 'Coupons & Deals', icon: TicketPercent },
    { id: 'banners' as NavigationTab, label: 'Banners & Sliders', icon: ImageIcon, adminOnly: true },
    { id: 'analytics' as NavigationTab, label: 'Analytics', icon: BarChart3 },
    { id: 'settings' as NavigationTab, label: 'Settings', icon: Settings },
  ];

  const visibleMenuItems = menuItems.filter(item => !item.adminOnly || role === 'admin');

  return (
    <aside 
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-white border-r border-[#dfe3e8] flex flex-col justify-between ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#dfe3e8]">
          <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => onTabChange('dashboard')}>
            <div className="size-9 rounded-lg bg-[#088178] flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0">
              S
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-[#212529] flex items-center gap-1.5">
                  Sellzy
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#e8f9f0] text-[#088178]">
                    {role === 'admin' ? 'Admin' : 'Vendor'}
                  </span>
                </span>
                <span className="text-[11px] text-[#637381]">Multi-Vendor Hub</span>
              </div>
            )}
          </div>

          <button 
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Role Switcher Pill */}
        {!collapsed && (
          <div className="px-3 pt-3">
            <button
              onClick={onToggleRole}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg border border-dashed border-gray-300 hover:border-[#088178] bg-gray-50/70 hover:bg-[#e6f6f4]/40 text-gray-700 transition-all"
            >
              <span className="flex items-center gap-2">
                {role === 'admin' ? <ShieldCheck size={14} className="text-[#088178]" /> : <UserCheck size={14} className="text-blue-600" />}
                <span>Role: <strong>{role === 'admin' ? 'Super Admin' : 'Vendor View'}</strong></span>
              </span>
              <span className="text-[10px] text-gray-400 underline">Switch</span>
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-240px)]">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  isActive 
                    ? 'bg-[#088178] text-white shadow-sm' 
                    : 'text-[#495057] hover:bg-[#f4f6f8] hover:text-[#088178]'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    size={20} 
                    className={isActive ? 'text-white' : 'text-[#637381] group-hover:text-[#088178] transition-colors'} 
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!collapsed && item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Storefront Preview Card */}
      <div className="p-3 border-t border-[#dfe3e8]">
        <button
          onClick={onOpenStorefront}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-[#088178]/30 bg-[#e8f9f0] hover:bg-[#d0f4e3] text-[#088178] font-medium text-xs transition-all shadow-xs ${
            collapsed ? 'justify-center' : 'justify-between'
          }`}
          title="Open live customer storefront preview"
        >
          <div className="flex items-center gap-2">
            <ExternalLink size={16} />
            {!collapsed && <span>Storefront Live</span>}
          </div>
          {!collapsed && (
            <span className="text-[10px] bg-[#088178] text-white px-1.5 py-0.2 rounded font-bold">
              View
            </span>
          )}
        </button>

        {!collapsed && (
          <div className="mt-3 flex items-center gap-2.5 px-2">
            <div className="size-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center font-bold text-slate-700 text-xs">
              AJ
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-gray-800 truncate">Abdul Jalil</p>
              <p className="text-[11px] text-gray-500 truncate">admin@sellzy.com</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
