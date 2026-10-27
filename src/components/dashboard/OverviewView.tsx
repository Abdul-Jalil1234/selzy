import React, { useState } from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  Eye, 
  AlertCircle,
  Plus,
  ArrowRight,
  Filter
} from 'lucide-react';
import { Product, Order, Vendor, NavigationTab, OrderStatus } from '../../types/dashboard';

interface OverviewViewProps {
  products: Product[];
  orders: Order[];
  vendors: Vendor[];
  onNavigateTab: (tab: NavigationTab) => void;
  onSelectOrder: (order: Order) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onOpenAddProduct: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  products,
  orders,
  vendors,
  onNavigateTab,
  onSelectOrder,
  onUpdateOrderStatus,
  onOpenAddProduct
}) => {
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | 'year'>('30days');

  // Compute metrics
  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.paymentStatus === 'paid' ? curr.total : 0), 184920);
  const totalOrdersCount = orders.length + 1415;
  const pendingOrders = orders.filter(o => o.orderStatus === 'pending');
  const lowStockProducts = products.filter(p => p.stock <= 10);

  // Status counters
  const statusCounts = {
    pending: orders.filter(o => o.orderStatus === 'pending').length,
    processing: orders.filter(o => o.orderStatus === 'processing').length,
    shipped: orders.filter(o => o.orderStatus === 'shipped').length,
    delivered: orders.filter(o => o.orderStatus === 'delivered').length,
    cancelled: orders.filter(o => o.orderStatus === 'cancelled').length,
  };

  // Chart data points
  const chartData = [
    { label: 'Jan', revenue: 14200, orders: 120 },
    { label: 'Feb', revenue: 18500, orders: 145 },
    { label: 'Mar', revenue: 16800, orders: 130 },
    { label: 'Apr', revenue: 22400, orders: 180 },
    { label: 'May', revenue: 26900, orders: 210 },
    { label: 'Jun', revenue: 24100, orders: 195 },
    { label: 'Jul', revenue: 29800, orders: 240 },
    { label: 'Aug', revenue: 31200, orders: 260 },
    { label: 'Sep', revenue: 34500, orders: 290 },
    { label: 'Oct', revenue: 38900, orders: 320 },
  ];

  const maxRevenue = Math.max(...chartData.map(d => d.revenue));

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><Clock size={12} /> Pending</span>;
      case 'processing':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><AlertCircle size={12} /> Processing</span>;
      case 'shipped':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"><Truck size={12} /> Shipped</span>;
      case 'delivered':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"><CheckCircle2 size={12} /> Delivered</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800"><XCircle size={12} /> Cancelled</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Alert for Low Stock or Action Items */}
      {lowStockProducts.length > 0 && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0">
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900">Inventory Alert: {lowStockProducts.length} items running low</h4>
              <p className="text-xs text-amber-700">
                Products including <strong>"{lowStockProducts[0]?.name}"</strong> are below reorder threshold.
              </p>
            </div>
          </div>
          <button 
            onClick={() => onNavigateTab('products')}
            className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold whitespace-nowrap shadow-xs transition-colors"
          >
            Manage Inventory
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Revenue */}
        <div className="p-5 bg-white rounded-xl border border-[#dfe3e8] shadow-xs relative overflow-hidden group hover:border-[#088178] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#637381]">Total Revenue</span>
            <div className="size-10 rounded-xl bg-[#e8f9f0] text-[#088178] flex items-center justify-center">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
              ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
              <TrendingUp size={14} />
              <span>+18.4%</span>
              <span className="text-gray-400 font-normal">vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Orders */}
        <div className="p-5 bg-white rounded-xl border border-[#dfe3e8] shadow-xs relative overflow-hidden group hover:border-[#088178] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#637381]">Total Orders</span>
            <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag size={20} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
              {totalOrdersCount.toLocaleString()}
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
              <TrendingUp size={14} />
              <span>+9.2%</span>
              <span className="text-gray-400 font-normal">active fulfillment</span>
            </div>
          </div>
        </div>

        {/* Card 3: Products */}
        <div className="p-5 bg-white rounded-xl border border-[#dfe3e8] shadow-xs relative overflow-hidden group hover:border-[#088178] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#637381]">Active Products</span>
            <div className="size-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package size={20} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
              {products.length * 18}
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-gray-600">
              <span className="text-[#088178] font-bold">{products.length} catalog styles</span>
              <span className="text-gray-400 font-normal">across 7 categories</span>
            </div>
          </div>
        </div>

        {/* Card 4: Vendors */}
        <div className="p-5 bg-white rounded-xl border border-[#dfe3e8] shadow-xs relative overflow-hidden group hover:border-[#088178] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#637381]">Marketplace Vendors</span>
            <div className="size-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
              {vendors.length} Verified
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-blue-600">
              <ArrowUpRight size={14} />
              <span>1 Pending Application</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Analytics Chart (2 cols) */}
        <div className="lg:col-span-2 p-5 bg-white rounded-xl border border-[#dfe3e8] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-gray-900 text-base">Sales & Revenue Performance</h3>
              <p className="text-xs text-gray-500">Gross marketplace transaction volume overview</p>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg text-xs font-medium">
              <button 
                onClick={() => setTimeRange('7days')}
                className={`px-2.5 py-1 rounded-md transition-all ${timeRange === '7days' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
              >
                7 Days
              </button>
              <button 
                onClick={() => setTimeRange('30days')}
                className={`px-2.5 py-1 rounded-md transition-all ${timeRange === '30days' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
              >
                30 Days
              </button>
              <button 
                onClick={() => setTimeRange('year')}
                className={`px-2.5 py-1 rounded-md transition-all ${timeRange === 'year' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Year
              </button>
            </div>
          </div>

          {/* SVG Bar / Area Visualization */}
          <div className="mt-6">
            <div className="h-60 w-full flex items-end justify-between gap-2 pt-6 pb-2">
              {chartData.map((d, index) => {
                const heightPercent = Math.round((d.revenue / maxRevenue) * 100);
                return (
                  <div key={d.label} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="relative w-full flex flex-col items-center">
                      {/* Tooltip on hover */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gray-900 text-white text-[10px] rounded px-2 py-1 whitespace-nowrap z-20 shadow-lg">
                        ${d.revenue.toLocaleString()} ({d.orders} orders)
                      </div>
                      
                      {/* Bar with gradient */}
                      <div 
                        style={{ height: `${heightPercent * 1.8}px` }}
                        className="w-full max-w-[34px] rounded-t-md bg-gradient-to-t from-[#088178] to-[#2cd9c5] group-hover:from-[#005249] group-hover:to-[#088178] transition-all duration-300"
                      />
                    </div>
                    <span className="text-[11px] font-medium text-gray-500 group-hover:text-gray-900">
                      {d.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="size-3 rounded bg-[#088178]" />
                  <span>Marketplace Revenue</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-3 rounded bg-[#3366ff]" />
                  <span>Vendor Payouts</span>
                </span>
              </div>
              <span className="text-[#088178] font-bold">Average Order Value: $74.20</span>
            </div>
          </div>
        </div>

        {/* Order Fulfillment Breakdown (1 col) */}
        <div className="p-5 bg-white rounded-xl border border-[#dfe3e8] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">Fulfillment Status</h3>
              <button 
                onClick={() => onNavigateTab('orders')}
                className="text-xs text-[#088178] hover:underline font-semibold"
              >
                View all
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {/* Pending */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1 text-amber-700">
                    <Clock size={13} /> Pending Orders
                  </span>
                  <span className="text-gray-900">{statusCounts.pending} ({Math.round((statusCounts.pending / orders.length) * 100)}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${(statusCounts.pending / orders.length) * 100}%` }} />
                </div>
              </div>

              {/* Processing */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1 text-blue-700">
                    <AlertCircle size={13} /> Processing
                  </span>
                  <span className="text-gray-900">{statusCounts.processing} ({Math.round((statusCounts.processing / orders.length) * 100)}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(statusCounts.processing / orders.length) * 100}%` }} />
                </div>
              </div>

              {/* Shipped */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1 text-purple-700">
                    <Truck size={13} /> In Transit / Shipped
                  </span>
                  <span className="text-gray-900">{statusCounts.shipped} ({Math.round((statusCounts.shipped / orders.length) * 100)}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(statusCounts.shipped / orders.length) * 100}%` }} />
                </div>
              </div>

              {/* Delivered */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <CheckCircle2 size={13} /> Delivered
                  </span>
                  <span className="text-gray-900">{statusCounts.delivered} ({Math.round((statusCounts.delivered / orders.length) * 100)}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(statusCounts.delivered / orders.length) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-6">
            <div className="p-3 bg-[#e8f9f0] rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#088178]">Delivery SLA Performance</p>
                <p className="text-[11px] text-[#005249]">98.2% on-time dispatch rate</p>
              </div>
              <span className="size-8 rounded-full bg-white text-[#088178] font-bold text-xs flex items-center justify-center shadow-xs">
                A+
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Orders & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table (2 cols) */}
        <div className="lg:col-span-2 p-5 bg-white rounded-xl border border-[#dfe3e8] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-gray-900 text-base">Recent Orders</h3>
              <p className="text-xs text-gray-500">Live feed of orders across all marketplace vendors</p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#088178] hover:underline"
            >
              <span>View all orders</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f4f6f8] text-[#637381] font-semibold uppercase text-[10px] tracking-wider rounded-lg">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-3 font-bold text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <img 
                          src={order.customer.avatar} 
                          alt={order.customer.name}
                          className="size-6 rounded-full object-cover" 
                        />
                        <span className="font-medium text-gray-800">{order.customer.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-500">
                      {order.createdAt}
                    </td>
                    <td className="py-3 px-3 font-bold text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-3 px-3">
                      {getStatusBadge(order.orderStatus)}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onSelectOrder(order)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-[#088178] hover:bg-[#e8f9f0] transition-colors"
                        title="View order details"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products (1 col) */}
        <div className="p-5 bg-white rounded-xl border border-[#dfe3e8] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-gray-900 text-base">Top Best Sellers</h3>
              <p className="text-xs text-gray-500">Highest volume items</p>
            </div>
            <button 
              onClick={() => onNavigateTab('products')}
              className="text-xs font-semibold text-[#088178] hover:underline"
            >
              Catalog
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {products.slice(0, 4).map((prod) => (
              <div key={prod.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <img 
                  src={prod.image} 
                  alt={prod.name}
                  className="size-12 rounded-lg object-contain bg-gray-50 p-1 border border-gray-100 shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate" title={prod.name}>
                    {prod.name}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mt-1">
                    <span>${prod.salePrice.toFixed(2)}</span>
                    <span className="font-semibold text-emerald-600">{prod.soldCount} sold</span>
                  </div>
                  {/* Stock progress */}
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5">
                    <div 
                      className="bg-[#088178] h-1.5 rounded-full" 
                      style={{ width: `${Math.min(100, (prod.soldCount / (prod.soldCount + prod.stock)) * 100)}%` }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-3 border-t border-gray-100">
            <button
              onClick={onOpenAddProduct}
              className="w-full py-2 px-3 rounded-lg border border-dashed border-[#088178] text-[#088178] hover:bg-[#e8f9f0] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Plus size={15} />
              <span>Add New Product to Store</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
