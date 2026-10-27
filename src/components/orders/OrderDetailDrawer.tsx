import React from 'react';
import { 
  X, 
  Printer, 
  Truck, 
  MapPin, 
  User, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  Copy,
  Mail,
  Phone
} from 'lucide-react';
import { Order, OrderStatus } from '../../types/dashboard';

interface OrderDetailDrawerProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

export const OrderDetailDrawer: React.FC<OrderDetailDrawerProps> = ({
  order,
  onClose,
  onUpdateStatus
}) => {
  if (!order) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const printInvoice = () => {
    window.print();
  };

  const steps: { key: OrderStatus; label: string; icon: any }[] = [
    { key: 'pending', label: 'Order Placed', icon: Clock },
    { key: 'processing', label: 'Processing', icon: AlertCircle },
    { key: 'shipped', label: 'Dispatched', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === order.orderStatus);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-gray-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900">{order.orderNumber}</h2>
              <button 
                onClick={() => copyToClipboard(order.orderNumber)}
                className="text-gray-400 hover:text-gray-600"
                title="Copy order number"
              >
                <Copy size={13} />
              </button>
            </div>
            <p className="text-xs text-gray-500">Placed on {order.createdAt}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={printInvoice}
              className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Print Order Receipt"
            >
              <Printer size={15} />
              <span className="hidden sm:inline">Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Status Updater Card */}
          <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">Fulfillment Status</span>
              <select
                value={order.orderStatus}
                onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                className="px-2.5 py-1 text-xs font-bold rounded-lg border border-gray-300 outline-none focus:border-[#088178] bg-white text-gray-900"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Stepper Timeline */}
            {order.orderStatus !== 'cancelled' ? (
              <div className="pt-2">
                <div className="flex items-center justify-between">
                  {steps.map((step, idx) => {
                    const isDone = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="flex-1 flex flex-col items-center relative">
                        {idx > 0 && (
                          <div 
                            className={`absolute top-3.5 right-1/2 left-[-50%] h-0.5 -z-0 ${
                              idx <= currentStepIndex ? 'bg-[#088178]' : 'bg-gray-200'
                            }`}
                          />
                        )}
                        <div 
                          className={`size-7 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-colors ${
                            isCurrent 
                              ? 'bg-[#088178] text-white ring-4 ring-[#e8f9f0]' 
                              : isDone 
                              ? 'bg-[#088178] text-white' 
                              : 'bg-gray-100 text-gray-400 border border-gray-200'
                          }`}
                        >
                          <Icon size={13} />
                        </div>
                        <span className={`text-[10px] mt-1.5 font-medium ${isDone ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-2.5 bg-rose-50 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                <XCircle size={15} />
                <span>This order was cancelled and refunded.</span>
              </div>
            )}

            {/* Tracking Number */}
            <div className="pt-2 flex items-center justify-between text-xs border-t border-gray-100">
              <span className="text-gray-500">Tracking Code:</span>
              <span className="font-mono font-bold text-[#088178]">{order.trackingNumber}</span>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                <User size={14} className="text-[#088178]" />
                <span>Customer Profile</span>
              </div>
              <div className="text-xs space-y-1">
                <p className="font-bold text-gray-900">{order.customer.name}</p>
                <p className="text-gray-600 flex items-center gap-1.5">
                  <Mail size={12} className="text-gray-400" /> {order.customer.email}
                </p>
                <p className="text-gray-600 flex items-center gap-1.5">
                  <Phone size={12} className="text-gray-400" /> {order.customer.phone}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                <MapPin size={14} className="text-[#088178]" />
                <span>Shipping Address</span>
              </div>
              <div className="text-xs text-gray-700 leading-relaxed">
                <p>{order.customer.address.street}</p>
                <p>{order.customer.address.city}, {order.customer.address.state} {order.customer.address.zip}</p>
                <p className="font-semibold text-gray-900">{order.customer.address.country}</p>
              </div>
            </div>
          </div>

          {/* Ordered Items List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Order Items ({order.items.length})
            </h4>
            <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
              {order.items.map((item) => (
                <div key={item.id} className="p-3.5 flex items-center gap-3 bg-white hover:bg-gray-50/50">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="size-12 rounded-lg object-contain bg-gray-50 p-1 border border-gray-100 shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-gray-900 line-clamp-1">{item.name}</h5>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-rose-600">
                <span>Promotional Discount</span>
                <span className="font-semibold">-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Shipping Fee</span>
              <span className="font-semibold text-gray-900">
                {order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Estimated Tax (8%)</span>
              <span className="font-semibold text-gray-900">${order.tax.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-black text-gray-900">
              <span>Total Paid</span>
              <span className="text-[#088178]">${order.total.toFixed(2)}</span>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-gray-500">
              <span className="flex items-center gap-1">
                <CreditCard size={12} /> Payment: <strong>{order.paymentMethod}</strong>
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                order.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {order.paymentStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
