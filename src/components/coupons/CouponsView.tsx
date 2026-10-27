import React, { useState } from 'react';
import { TicketPercent, Plus, Trash2, CheckCircle2, Clock, XCircle, Copy } from 'lucide-react';
import { Coupon } from '../../types/dashboard';

interface CouponsViewProps {
  coupons: Coupon[];
  onAddCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void;
  onToggleCouponStatus: (id: string) => void;
  onDeleteCoupon: (id: string) => void;
}

export const CouponsView: React.FC<CouponsViewProps> = ({
  coupons,
  onAddCoupon,
  onToggleCouponStatus,
  onDeleteCoupon
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState('15');
  const [minSpend, setMinSpend] = useState('50');
  const [usageLimit, setUsageLimit] = useState('200');
  const [expiresAt, setExpiresAt] = useState('2026-12-31');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    onAddCoupon({
      code: code.trim().toUpperCase(),
      discountType,
      value: parseFloat(value) || 10,
      minSpend: parseFloat(minSpend) || 0,
      usageLimit: parseInt(usageLimit, 10) || 100,
      expiresAt,
      status: 'active'
    });

    setCode('');
    setIsAdding(false);
  };

  const copyCode = (c: string) => {
    navigator.clipboard.writeText(c);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#dfe3e8] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Coupons & Discount Promotions</span>
            <span className="text-xs px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full font-semibold">
              {coupons.length} active campaigns
            </span>
          </h2>
          <p className="text-xs text-gray-500">
            Create promotional codes, seasonal discounts, and customer cart incentives
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#088178] hover:bg-[#005249] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus size={16} />
          <span>Create Coupon</span>
        </button>
      </div>

      {/* Add Drawer */}
      {isAdding && (
        <form onSubmit={handleCreate} className="p-5 bg-white rounded-xl border-2 border-dashed border-[#088178] shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900">Create New Promo Code</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Coupon Code (Uppercase)</label>
              <input
                type="text"
                required
                placeholder="e.g. SUMMER20"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none font-mono font-bold uppercase"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Discount Type</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none bg-white"
              >
                <option value="percentage">Percentage (%) Off</option>
                <option value="fixed">Fixed Dollar ($) Off</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Discount Value</label>
              <input
                type="number"
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Min Spend ($)</label>
              <input
                type="number"
                value={minSpend}
                onChange={(e) => setMinSpend(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Usage Limit</label>
              <input
                type="number"
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Expires On</label>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#088178] rounded-lg"
            >
              Publish Coupon
            </button>
          </div>
        </form>
      )}

      {/* Coupon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coupons.map((cpn) => {
          const usagePercent = Math.min(100, Math.round((cpn.usageCount / cpn.usageLimit) * 100));
          return (
            <div key={cpn.id} className="bg-white rounded-xl border border-[#dfe3e8] p-5 shadow-xs flex flex-col justify-between hover:border-[#088178] transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-black px-2.5 py-1 bg-emerald-50 text-[#088178] border border-dashed border-[#088178] rounded-lg">
                      {cpn.code}
                    </span>
                    <button onClick={() => copyCode(cpn.code)} className="text-gray-400 hover:text-gray-600">
                      <Copy size={13} />
                    </button>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    cpn.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {cpn.status}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="text-2xl font-black text-gray-900">
                    {cpn.discountType === 'percentage' ? `${cpn.value}% OFF` : `$${cpn.value} OFF`}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Requires min spend of ${cpn.minSpend.toFixed(2)}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                    <span>Usage: <strong>{cpn.usageCount}</strong> / {cpn.usageLimit}</span>
                    <span>{usagePercent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-[#088178] h-2 rounded-full" style={{ width: `${usagePercent}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>Expires: {cpn.expiresAt}</span>
                <button
                  onClick={() => onDeleteCoupon(cpn.id)}
                  className="p-1 rounded text-gray-400 hover:text-rose-600"
                  title="Delete coupon"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
