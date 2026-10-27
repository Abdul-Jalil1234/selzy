import React, { useState } from 'react';
import { Store, Search, ShieldCheck, Clock, Ban, Star, DollarSign, Mail, Phone, Plus } from 'lucide-react';
import { Vendor } from '../../types/dashboard';

interface VendorsViewProps {
  vendors: Vendor[];
  onUpdateVendorStatus: (id: string, status: 'verified' | 'pending' | 'suspended') => void;
}

export const VendorsView: React.FC<VendorsViewProps> = ({
  vendors,
  onUpdateVendorStatus
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'pending' | 'suspended'>('all');

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.storeName.toLowerCase().includes(search.toLowerCase()) || 
                          v.name.toLowerCase().includes(search.toLowerCase()) ||
                          v.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || v.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#dfe3e8] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Marketplace Vendors & Sellers</span>
            <span className="text-xs px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full font-semibold">
              {vendors.length} registered
            </span>
          </h2>
          <p className="text-xs text-gray-500">
            Multi-vendor lifecycle, verification approvals, commission terms, and sales reporting
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-[#e8f9f0] border border-[#088178]/20 text-[#088178] text-xs font-bold">
            Avg Marketplace Commission: 10%
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendor store, owner or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
          />
        </div>

        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#dfe3e8]">
          {(['all', 'verified', 'pending', 'suspended'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filter === tab ? 'bg-[#088178] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredVendors.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-xl border border-[#dfe3e8] p-5 shadow-xs flex flex-col justify-between hover:border-[#088178] transition-all">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={vendor.logo} 
                    alt={vendor.storeName}
                    className="size-14 rounded-xl object-contain bg-gray-50 border border-gray-200 p-1 shrink-0" 
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{vendor.storeName}</h3>
                    <p className="text-xs text-gray-500 font-medium">Owner: {vendor.name}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                      <span>Joined {vendor.joinedDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star size={12} fill="currentColor" /> {vendor.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                  vendor.status === 'verified' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : vendor.status === 'pending'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {vendor.status}
                </span>
              </div>

              {/* Metrics Pill Grid */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100 text-center">
                <div className="p-2 rounded-lg bg-gray-50">
                  <span className="block text-[10px] text-gray-500 uppercase font-semibold">Products</span>
                  <span className="block text-sm font-bold text-gray-900 mt-0.5">{vendor.totalProducts}</span>
                </div>
                <div className="p-2 rounded-lg bg-gray-50">
                  <span className="block text-[10px] text-gray-500 uppercase font-semibold">Total Sales</span>
                  <span className="block text-sm font-bold text-emerald-600 mt-0.5">
                    ${vendor.totalSales.toLocaleString()}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-gray-50">
                  <span className="block text-[10px] text-gray-500 uppercase font-semibold">Commission</span>
                  <span className="block text-sm font-bold text-gray-900 mt-0.5">{vendor.commissionRate}%</span>
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-500 space-y-1">
                <p className="flex items-center gap-2">
                  <Mail size={13} className="text-gray-400" /> {vendor.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={13} className="text-gray-400" /> {vendor.phone}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">Status Control:</span>
              <div className="flex items-center gap-2">
                {vendor.status !== 'verified' && (
                  <button
                    onClick={() => onUpdateVendorStatus(vendor.id, 'verified')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1"
                  >
                    <ShieldCheck size={14} />
                    <span>Approve</span>
                  </button>
                )}
                {vendor.status !== 'suspended' && (
                  <button
                    onClick={() => onUpdateVendorStatus(vendor.id, 'suspended')}
                    className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 font-semibold text-xs transition-colors flex items-center gap-1"
                  >
                    <Ban size={14} />
                    <span>Suspend</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
