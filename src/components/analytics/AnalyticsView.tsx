import React from 'react';
import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Users, ArrowUpRight, Award, Target, Percent } from 'lucide-react';
import { Product, Order, Category } from '../../types/dashboard';

interface AnalyticsViewProps {
  products: Product[];
  orders: Order[];
  categories: Category[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  products,
  orders,
  categories
}) => {
  const categorySales = [
    { name: 'Healthcare & Wellness', percent: 42, amount: '$78,240', color: 'bg-[#088178]' },
    { name: 'Gym & Fitness', percent: 26, amount: '$48,120', color: 'bg-[#3366ff]' },
    { name: 'Skincare & Beauty', percent: 18, amount: '$33,400', color: 'bg-[#826af9]' },
    { name: 'Diet & Nutrition', percent: 14, amount: '$25,160', color: 'bg-[#ffab00]' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#dfe3e8] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Marketplace Analytics & Reports</span>
          </h2>
          <p className="text-xs text-gray-500">
            Real-time conversion metrics, customer acquisition, and department contribution
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            Conversion Rate: 3.84% (+0.6%)
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-[#dfe3e8] shadow-xs">
          <span className="text-xs text-gray-500 font-medium">Average Order Value</span>
          <h3 className="text-2xl font-black text-gray-900 mt-2">$78.40</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp size={13} /> +$4.20 vs Q3
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#dfe3e8] shadow-xs">
          <span className="text-xs text-gray-500 font-medium">Customer Retention Rate</span>
          <h3 className="text-2xl font-black text-gray-900 mt-2">64.2%</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp size={13} /> +5.1% returning shoppers
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#dfe3e8] shadow-xs">
          <span className="text-xs text-gray-500 font-medium">Gross Margin</span>
          <h3 className="text-2xl font-black text-gray-900 mt-2">32.8%</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <Percent size={13} /> Solid vendor commission split
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#dfe3e8] shadow-xs">
          <span className="text-xs text-gray-500 font-medium">Cart Abandonment Rate</span>
          <h3 className="text-2xl font-black text-gray-900 mt-2">21.4%</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <Award size={13} /> 12% lower than industry avg
          </p>
        </div>
      </div>

      {/* Category Sales Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 bg-white rounded-xl border border-[#dfe3e8] shadow-xs">
          <h3 className="font-bold text-gray-900 text-base mb-4">Department Revenue Contribution</h3>
          <div className="space-y-4">
            {categorySales.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-gray-800">{cat.name}</span>
                  <span className="text-gray-900">{cat.amount} ({cat.percent}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className={`${cat.color} h-2.5 rounded-full`} style={{ width: `${cat.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-[#dfe3e8] shadow-xs">
          <h3 className="font-bold text-gray-900 text-base mb-2">Checkout Funnel Conversion</h3>
          <p className="text-xs text-gray-500 mb-4">Shopper progression through purchase journey</p>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-gray-900">1. Product Page Visits</span>
                <span className="text-[11px] text-gray-500">42,850 unique visitors</span>
              </div>
              <span className="text-xs font-black text-gray-900">100%</span>
            </div>

            <div className="p-3 bg-blue-50/50 rounded-lg flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-gray-900">2. Added to Cart</span>
                <span className="text-[11px] text-gray-500">7,284 visitors</span>
              </div>
              <span className="text-xs font-black text-blue-700">17.0%</span>
            </div>

            <div className="p-3 bg-amber-50/50 rounded-lg flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-gray-900">3. Initiated Checkout</span>
                <span className="text-[11px] text-gray-500">2,410 visitors</span>
              </div>
              <span className="text-xs font-black text-amber-700">5.6%</span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-lg flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-gray-900">4. Completed Payment</span>
                <span className="text-[11px] text-gray-500">1,645 completed orders</span>
              </div>
              <span className="text-xs font-black text-emerald-700">3.84%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
