import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Globe, 
  Store, 
  Plus, 
  Check, 
  ShoppingBag, 
  AlertTriangle, 
  ShieldCheck, 
  X,
  SlidersHorizontal,
  Download
} from 'lucide-react';
import { NotificationItem, NavigationTab } from '../../types/dashboard';

interface TopHeaderProps {
  activeTab: NavigationTab;
  collapsed: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onClearAllNotifications: () => void;
  onOpenAddProduct: () => void;
  onOpenStorefront: () => void;
  onOpenExportModal: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeTab,
  collapsed,
  searchQuery,
  onSearchChange,
  notifications,
  onMarkNotificationRead,
  onClearAllNotifications,
  onOpenAddProduct,
  onOpenStorefront,
  onOpenExportModal
}) => {
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const tabLabels: Record<NavigationTab, string> = {
    dashboard: 'Dashboard Overview',
    products: 'Products Catalog',
    categories: 'Category Management',
    brands: 'Brand Partners',
    orders: 'Orders & Fulfillment',
    vendors: 'Vendor Directory',
    customers: 'Customer Accounts',
    coupons: 'Coupons & Promotions',
    banners: 'Marketing Banners',
    analytics: 'Analytics & Insights',
    settings: 'Store Configuration'
  };

  return (
    <header 
      className={`fixed top-0 right-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-[#dfe3e8] transition-all duration-300 flex items-center justify-between px-4 sm:px-6 ${
        collapsed ? 'left-20' : 'left-64'
      }`}
    >
      {/* Left: View title & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="hidden lg:block">
          <h1 className="text-base font-bold text-gray-900 capitalize tracking-tight">
            {tabLabels[activeTab]}
          </h1>
          <p className="text-[11px] text-gray-500">Sellzy Multi-Vendor Admin Portal</p>
        </div>

        {/* Global Search */}
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products, order #, SKU, customers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-[#f4f6f8] border border-transparent rounded-lg focus:bg-white focus:border-[#088178] focus:ring-2 focus:ring-[#088178]/20 outline-none transition-all placeholder:text-gray-400"
          />
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Add Product Button */}
        <button
          onClick={onOpenAddProduct}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#088178] hover:bg-[#005249] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus size={15} />
          <span>Add Product</span>
        </button>

        {/* Storefront Link */}
        <button
          onClick={onOpenStorefront}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-medium transition-colors"
          title="Preview Sellzy Customer Storefront"
        >
          <Store size={15} className="text-[#088178]" />
          <span className="hidden md:inline">Storefront</span>
        </button>

        {/* Export Code / Package ZIP Button */}
        <button
          onClick={onOpenExportModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#088178]/30 bg-[#e8f9f0] hover:bg-[#d0f4e3] text-[#088178] text-xs font-bold transition-all shadow-xs cursor-pointer"
          title="Open Project Code Exporter & In-Browser ZIP Generator"
        >
          <Download size={14} />
          <span>Export Code (ZIP)</span>
        </button>

        {/* Language/Currency Pill */}
        <div className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium">
          <Globe size={13} className="text-gray-500" />
          <span>EN / $USD</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 size-4 bg-[#cb0233] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-gray-900">Notifications</h3>
                  <p className="text-[11px] text-gray-500">{unreadCount} unread alerts</p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={onClearAllNotifications}
                    className="text-xs text-[#088178] hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                {notifications.length === 0 ? (
                  <p className="py-8 text-center text-xs text-gray-400">No notifications right now.</p>
                ) : (
                  notifications.map((notif) => {
                    const iconMap = {
                      order: <ShoppingBag size={14} className="text-[#088178]" />,
                      stock: <AlertTriangle size={14} className="text-amber-500" />,
                      vendor: <Store size={14} className="text-blue-500" />,
                      system: <ShieldCheck size={14} className="text-purple-500" />
                    };
                    return (
                      <div
                        key={notif.id}
                        onClick={() => onMarkNotificationRead(notif.id)}
                        className={`p-3.5 flex items-start gap-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                          !notif.read ? 'bg-[#f4f6f8]/60' : ''
                        }`}
                      >
                        <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                          {iconMap[notif.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-xs ${notif.read ? 'text-gray-700' : 'font-bold text-gray-900'}`}>
                              {notif.title}
                            </p>
                            <span className="text-[10px] text-gray-400">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-2">
                            {notif.message}
                          </p>
                        </div>
                        {!notif.read && (
                          <span className="size-2 rounded-full bg-[#088178] shrink-0 self-center" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Admin Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <div className="size-8 rounded-full bg-gradient-to-tr from-[#088178] to-[#2cd9c5] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            A
          </div>
          <div className="hidden md:block text-left">
            <span className="block text-xs font-bold text-gray-800 leading-tight">Admin Portal</span>
            <span className="block text-[10px] text-emerald-600 font-medium">● Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};
