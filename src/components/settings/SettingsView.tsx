import React, { useState } from 'react';
import { Save, Check, Shield, CreditCard, Truck, Store, Globe } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [storeName, setStoreName] = useState('Sellzy Multi-Vendor Marketplace');
  const [supportPhone, setSupportPhone] = useState('(480) 555-0103');
  const [supportEmail, setSupportEmail] = useState('support@sellzy.reactbd.com');
  const [currency, setCurrency] = useState('USD');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('50.00');
  const [standardShippingFee, setStandardShippingFee] = useState('5.00');
  const [taxRate, setTaxRate] = useState('8.0');
  const [defaultCommission, setDefaultCommission] = useState('10');
  const [autoApproveVendors, setAutoApproveVendors] = useState(false);
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [paypalEnabled, setPaypalEnabled] = useState(true);
  const [codEnabled, setCodEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between bg-white p-5 rounded-xl border border-[#dfe3e8] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Marketplace Settings</h2>
          <p className="text-xs text-gray-500">Configure global business rules, payment gateways, and vendor agreements</p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold animate-in fade-in">
            <Check size={14} /> Settings Saved Successfully
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Storefront Info */}
        <div className="p-5 bg-white rounded-xl border border-[#dfe3e8] shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <Globe size={16} className="text-[#088178]" />
            <span>Storefront & Contact Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Marketplace Brand Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Customer Support Hotline</label>
              <input
                type="text"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Support Email Address</label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
            />
          </div>
        </div>

        {/* Shipping & Tax */}
        <div className="p-5 bg-white rounded-xl border border-[#dfe3e8] shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <Truck size={16} className="text-[#088178]" />
            <span>Shipping Fees & Tax Calculation</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Free Shipping Min Order ($)</label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Standard Shipping Fee ($)</label>
              <input
                type="number"
                value={standardShippingFee}
                onChange={(e) => setStandardShippingFee(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Sales Tax Rate (%)</label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Vendor Terms */}
        <div className="p-5 bg-white rounded-xl border border-[#dfe3e8] shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <Store size={16} className="text-[#088178]" />
            <span>Vendor Agreement & Commission</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Default Marketplace Commission (%)</label>
              <input
                type="number"
                value={defaultCommission}
                onChange={(e) => setDefaultCommission(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="auto_approve"
                checked={autoApproveVendors}
                onChange={(e) => setAutoApproveVendors(e.target.checked)}
                className="size-4 accent-[#088178] rounded cursor-pointer"
              />
              <label htmlFor="auto_approve" className="text-xs font-medium text-gray-700 cursor-pointer">
                Automatically verify new vendor applications
              </label>
            </div>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="p-5 bg-white rounded-xl border border-[#dfe3e8] shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <CreditCard size={16} className="text-[#088178]" />
            <span>Active Payment Gateways</span>
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded bg-indigo-50 text-indigo-600 font-bold text-xs flex items-center justify-center">
                  S
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Stripe Payments (Credit & Debit Cards)</h4>
                  <p className="text-[11px] text-gray-500">Accepts Visa, Mastercard, AMEX, Apple Pay, Google Pay</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={stripeEnabled}
                onChange={(e) => setStripeEnabled(e.target.checked)}
                className="size-4 accent-[#088178] rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center">
                  P
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">PayPal Express Checkout</h4>
                  <p className="text-[11px] text-gray-500">Direct wallet and international PayPal payments</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={paypalEnabled}
                onChange={(e) => setPaypalEnabled(e.target.checked)}
                className="size-4 accent-[#088178] rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded bg-emerald-50 text-emerald-600 font-bold text-xs flex items-center justify-center">
                  $
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Cash on Delivery (COD)</h4>
                  <p className="text-[11px] text-gray-500">Collect payment upon courier delivery to customer</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={codEnabled}
                onChange={(e) => setCodEnabled(e.target.checked)}
                className="size-4 accent-[#088178] rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#088178] hover:bg-[#005249] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Save size={16} />
            <span>Save Marketplace Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
