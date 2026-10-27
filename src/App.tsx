import React, { useState } from 'react';
import { 
  NavigationTab, 
  Product, 
  Category, 
  Brand, 
  Order, 
  Vendor, 
  Customer, 
  Coupon, 
  Banner, 
  NotificationItem, 
  OrderStatus 
} from './types/dashboard';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_BRANDS, 
  INITIAL_ORDERS, 
  INITIAL_VENDORS, 
  INITIAL_CUSTOMERS, 
  INITIAL_COUPONS, 
  INITIAL_BANNERS, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { OverviewView } from './components/dashboard/OverviewView';
import { ProductsView } from './components/products/ProductsView';
import { AddProductModal } from './components/products/AddProductModal';
import { OrdersView } from './components/orders/OrdersView';
import { OrderDetailDrawer } from './components/orders/OrderDetailDrawer';
import { CategoriesView } from './components/categories/CategoriesView';
import { VendorsView } from './components/vendors/VendorsView';
import { CustomersView } from './components/customers/CustomersView';
import { CouponsView } from './components/coupons/CouponsView';
import { BannersView } from './components/banners/BannersView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { SettingsView } from './components/settings/SettingsView';
import { StorefrontPreviewModal } from './components/storefront/StorefrontPreviewModal';
import { ExportCodeModal } from './components/export/ExportCodeModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState<'admin' | 'vendor'>('admin');
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Datasets
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [brands, setBrands] = useState<Brand[]>(INITIAL_BRANDS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [banners, setBanners] = useState<Banner[]>(INITIAL_BANNERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals & Drawers
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isStorefrontOpen, setIsStorefrontOpen] = useState(false);

  // Counters
  const pendingOrdersCount = orders.filter(o => o.orderStatus === 'pending').length;
  const lowStockCount = products.filter(p => p.stock <= 10).length;

  // Product Actions
  const handleAddProduct = (newProdData: Omit<Product, 'id' | 'soldCount' | 'reviewCount' | 'createdAt'>) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? {
        ...p,
        ...newProdData
      } : p));
      setEditingProduct(null);
    } else {
      const newProduct: Product = {
        ...newProdData,
        id: `prod-${Date.now()}`,
        soldCount: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProducts(prev => [newProduct, ...prev]);

      // Add notification
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: 'New Product Published',
        message: `"${newProduct.name}" is now live on the marketplace.`,
        type: 'stock',
        read: false,
        time: 'Just now'
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleToggleFeatured = (productId: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, featured: !p.featured } : p));
  };

  const handleQuickAdjustStock = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? {
      ...p,
      stock: newStock,
      status: newStock === 0 ? 'out_of_stock' : p.status
    } : p));
  };

  // Order Actions
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: status } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, orderStatus: status } : null);
    }
  };

  // Category Actions
  const handleAddCategory = (newCatData: Omit<Category, 'id' | 'productCount'>) => {
    const newCat: Category = {
      ...newCatData,
      id: `cat-${Date.now()}`,
      productCount: 0
    };
    setCategories(prev => [...prev, newCat]);
  };

  const handleToggleCategoryStatus = (id: string) => {
    setCategories(prev => prev.map(c => c.id === id ? {
      ...c,
      status: c.status === 'active' ? 'inactive' : 'active'
    } : c));
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Vendor Actions
  const handleUpdateVendorStatus = (id: string, status: 'verified' | 'pending' | 'suspended') => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };

  // Customer Actions
  const handleToggleCustomerStatus = (id: string) => {
    setCustomers(prev => prev.map(c => c.id === id ? {
      ...c,
      status: c.status === 'active' ? 'inactive' : 'active'
    } : c));
  };

  // Coupon Actions
  const handleAddCoupon = (newCouponData: Omit<Coupon, 'id' | 'usageCount'>) => {
    const newCoupon: Coupon = {
      ...newCouponData,
      id: `cpn-${Date.now()}`,
      usageCount: 0
    };
    setCoupons(prev => [newCoupon, ...prev]);
  };

  const handleDeleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  // Banner Actions
  const handleAddBanner = (newBannerData: Omit<Banner, 'id'>) => {
    const newBanner: Banner = {
      ...newBannerData,
      id: `bnr-${Date.now()}`
    };
    setBanners(prev => [newBanner, ...prev]);
  };

  const handleToggleBannerStatus = (id: string) => {
    setBanners(prev => prev.map(b => b.id === id ? {
      ...b,
      status: b.status === 'active' ? 'inactive' : 'active'
    } : b));
  };

  const handleDeleteBanner = (id: string) => {
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  // Notification Actions
  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#212529]">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        orderPendingCount={pendingOrdersCount}
        lowStockCount={lowStockCount}
        onOpenStorefront={() => setIsStorefrontOpen(true)}
        role={role}
        onToggleRole={() => setRole(r => r === 'admin' ? 'vendor' : 'admin')}
      />

      {/* Top Header */}
      <TopHeader
        activeTab={activeTab}
        collapsed={sidebarCollapsed}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onClearAllNotifications={handleClearAllNotifications}
        onOpenAddProduct={() => {
          setEditingProduct(null);
          setIsAddProductOpen(true);
        }}
        onOpenStorefront={() => setIsStorefrontOpen(true)}
        onOpenExportModal={() => setIsExportOpen(true)}
      />

      {/* Main Content Area */}
      <main 
        className={`pt-20 pb-12 px-4 sm:px-6 transition-all duration-300 min-h-screen ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <OverviewView
              products={products}
              orders={orders}
              vendors={vendors}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectOrder={(order) => setSelectedOrder(order)}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onOpenAddProduct={() => {
                setEditingProduct(null);
                setIsAddProductOpen(true);
              }}
            />
          )}

          {activeTab === 'products' && (
            <ProductsView
              products={products}
              categories={categories}
              brands={brands}
              vendors={vendors}
              onOpenAddModal={() => {
                setEditingProduct(null);
                setIsAddProductOpen(true);
              }}
              onEditProduct={(product) => {
                setEditingProduct(product);
                setIsAddProductOpen(true);
              }}
              onDeleteProduct={handleDeleteProduct}
              onToggleFeatured={handleToggleFeatured}
              onQuickAdjustStock={handleQuickAdjustStock}
              onOpenStorefront={() => setIsStorefrontOpen(true)}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView
              orders={orders}
              onSelectOrder={(order) => setSelectedOrder(order)}
              onUpdateStatus={handleUpdateOrderStatus}
            />
          )}

          {activeTab === 'categories' && (
            <CategoriesView
              categories={categories}
              onAddCategory={handleAddCategory}
              onToggleCategoryStatus={handleToggleCategoryStatus}
              onDeleteCategory={handleDeleteCategory}
            />
          )}

          {activeTab === 'vendors' && (
            <VendorsView
              vendors={vendors}
              onUpdateVendorStatus={handleUpdateVendorStatus}
            />
          )}

          {activeTab === 'customers' && (
            <CustomersView
              customers={customers}
              onToggleStatus={handleToggleCustomerStatus}
            />
          )}

          {activeTab === 'coupons' && (
            <CouponsView
              coupons={coupons}
              onAddCoupon={handleAddCoupon}
              onToggleCouponStatus={() => {}}
              onDeleteCoupon={handleDeleteCoupon}
            />
          )}

          {activeTab === 'banners' && (
            <BannersView
              banners={banners}
              onToggleBannerStatus={handleToggleBannerStatus}
              onDeleteBanner={handleDeleteBanner}
              onAddBanner={handleAddBanner}
              onOpenStorefront={() => setIsStorefrontOpen(true)}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              products={products}
              orders={orders}
              categories={categories}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}

          {activeTab === 'brands' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-5 rounded-xl border border-[#dfe3e8] shadow-xs">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Brand Partners</h2>
                  <p className="text-xs text-gray-500">Official manufacturers and certified supplement brands</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {brands.map(brand => (
                  <div key={brand.id} className="bg-white p-5 rounded-xl border border-[#dfe3e8] shadow-xs flex flex-col items-center text-center hover:border-[#088178] transition-all">
                    <img src={brand.logo} alt={brand.name} className="size-16 rounded-xl object-contain bg-gray-50 p-2 border border-gray-100" />
                    <h3 className="font-bold text-sm text-gray-900 mt-3">{brand.name}</h3>
                    <span className="text-xs text-gray-500 mt-1">{brand.productCount} products</span>
                    <span className="mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      Certified Partner
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add / Edit Product Modal */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => {
          setIsAddProductOpen(false);
          setEditingProduct(null);
        }}
        onAddProduct={handleAddProduct}
        categories={categories}
        brands={brands}
        vendors={vendors}
        initialData={editingProduct}
      />

      {/* Order Detail Drawer */}
      <OrderDetailDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateOrderStatus}
      />

      {/* Live Customer Storefront Mirror Modal */}
      <StorefrontPreviewModal
        isOpen={isStorefrontOpen}
        onClose={() => setIsStorefrontOpen(false)}
        products={products}
        categories={categories}
        banners={banners}
      />

      {/* Code Export & Setup Modal */}
      <ExportCodeModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
