import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Clock, 
  AlertCircle, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  CreditCard,
  Download,
  Calendar
} from 'lucide-react';
import { Order, OrderStatus } from '../../types/dashboard';

interface OrdersViewProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onSelectOrder,
  onUpdateStatus
}) => {
  const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === 'all' || order.orderStatus === activeTab;
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(search.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(search.toLowerCase());
    const matchesPayment = paymentFilter === 'all' || order.paymentMethod.toLowerCase().includes(paymentFilter.toLowerCase());

    return matchesTab && matchesSearch && matchesPayment;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800"><Clock size={12} /> Pending</span>;
      case 'processing':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800"><AlertCircle size={12} /> Processing</span>;
      case 'shipped':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800"><Truck size={12} /> Shipped</span>;
      case 'delivered':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800"><CheckCircle2 size={12} /> Delivered</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800"><XCircle size={12} /> Cancelled</span>;
    }
  };

  const tabs: { id: OrderStatus | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.orderStatus === 'pending').length },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.orderStatus === 'processing').length },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.orderStatus === 'shipped').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.orderStatus === 'delivered').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.orderStatus === 'cancelled').length },
  ];

  const handleExportOrders = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["OrderNumber,CustomerName,CustomerEmail,Date,Total,Status,PaymentMethod,TrackingNumber"]
      .concat(orders.map(o => `"${o.orderNumber}","${o.customer.name}","${o.customer.email}","${o.createdAt}",${o.total},"${o.orderStatus}","${o.paymentMethod}","${o.trackingNumber}"`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sellzy_orders_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#dfe3e8] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Orders Management</span>
            <span className="text-xs px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full font-semibold">
              {filteredOrders.length} orders
            </span>
          </h2>
          <p className="text-xs text-gray-500">
            Monitor incoming marketplace purchases, dispatch shipments, and track fulfillment
          </p>
        </div>

        <button
          onClick={handleExportOrders}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold transition-colors"
        >
          <Download size={14} />
          <span>Export Orders CSV</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-xl border border-[#dfe3e8] shadow-xs flex items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                isActive 
                  ? 'bg-[#088178] text-white shadow-xs' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-700'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filters Bar */}
      <div className="p-4 bg-white rounded-xl border border-[#dfe3e8] shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative sm:col-span-2">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order # (e.g. SLZ-984321), customer name, email, tracking..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
          />
        </div>

        <div>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none bg-white text-gray-700"
          >
            <option value="all">All Payment Gateways</option>
            <option value="stripe">Stripe / Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cash">Cash on Delivery</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-[#dfe3e8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f4f6f8] text-[#637381] font-bold uppercase text-[10px] tracking-wider border-b border-[#dfe3e8]">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status & Quick Update</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <ShoppingBag size={32} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-sm font-semibold">No orders found in this view.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-gray-900 block text-xs cursor-pointer hover:text-[#088178]" onClick={() => onSelectOrder(order)}>
                        {order.orderNumber}
                      </span>
                      <span className="text-[11px] text-gray-400 block mt-0.5">{order.createdAt}</span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={order.customer.avatar} 
                          alt={order.customer.name}
                          className="size-8 rounded-full object-cover shrink-0" 
                        />
                        <div>
                          <span className="font-bold text-gray-900 block">{order.customer.name}</span>
                          <span className="text-[11px] text-gray-400 block">{order.customer.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        {order.items.slice(0, 2).map((item, i) => (
                          <img 
                            key={i}
                            src={item.image} 
                            alt={item.name} 
                            title={`${item.name} (Qty: ${item.quantity})`}
                            className="size-8 rounded-md object-contain bg-gray-50 border border-gray-200 p-0.5" 
                          />
                        ))}
                        {order.items.length > 2 && (
                          <span className="size-8 rounded-md bg-gray-100 text-gray-600 font-bold text-[10px] flex items-center justify-center">
                            +{order.items.length - 2}
                          </span>
                        )}
                        <span className="text-[11px] text-gray-500 ml-1">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} pcs
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="block font-medium text-gray-800 text-[11px]">{order.paymentMethod}</span>
                      <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-bold uppercase mt-0.5 ${
                        order.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-extrabold text-gray-900 text-sm">
                        ${order.total.toFixed(2)}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(order.orderStatus)}
                        <select
                          value={order.orderStatus}
                          onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                          className="text-[11px] py-1 px-1.5 border border-gray-200 rounded bg-white text-gray-700 hover:border-gray-400 cursor-pointer"
                        >
                          <option value="pending">Change: Pending</option>
                          <option value="processing">Change: Processing</option>
                          <option value="shipped">Change: Shipped</option>
                          <option value="delivered">Change: Delivered</option>
                          <option value="cancelled">Change: Cancelled</option>
                        </select>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectOrder(order)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#e8f9f0] hover:bg-[#d0f4e3] text-[#088178] font-bold text-xs transition-colors"
                      >
                        <Eye size={14} />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
