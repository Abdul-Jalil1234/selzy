import React, { useState } from 'react';
import { Users, Search, Mail, Phone, Calendar, ShoppingBag, DollarSign } from 'lucide-react';
import { Customer } from '../../types/dashboard';

interface CustomersViewProps {
  customers: Customer[];
  onToggleStatus: (id: string) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({
  customers,
  onToggleStatus
}) => {
  const [search, setSearch] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#dfe3e8] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Customer Accounts</span>
            <span className="text-xs px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full font-semibold">
              {customers.length} buyers
            </span>
          </h2>
          <p className="text-xs text-gray-500">
            View registered shopper profiles, customer lifetime value, and order engagement
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm w-full">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by customer name, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
        />
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-xl border border-[#dfe3e8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f4f6f8] text-[#637381] font-bold uppercase text-[10px] tracking-wider border-b border-[#dfe3e8]">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Orders Placed</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Join Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={cust.avatar} 
                        alt={cust.name}
                        className="size-9 rounded-full object-cover" 
                      />
                      <span className="font-bold text-gray-900 text-xs">{cust.name}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-gray-500">
                    <p className="text-gray-900 font-medium">{cust.email}</p>
                    <p className="text-[11px] text-gray-400">{cust.phone}</p>
                  </td>

                  <td className="py-3 px-4 font-bold text-gray-900">
                    <span className="flex items-center gap-1.5">
                      <ShoppingBag size={13} className="text-[#088178]" />
                      <span>{cust.totalOrders} orders</span>
                    </span>
                  </td>

                  <td className="py-3 px-4 font-black text-gray-900 text-sm">
                    ${cust.totalSpend.toFixed(2)}
                  </td>

                  <td className="py-3 px-4 text-gray-500 text-[11px]">
                    {cust.joinedDate}
                  </td>

                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      cust.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {cust.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onToggleStatus(cust.id)}
                      className="px-2.5 py-1 rounded text-xs font-semibold border border-gray-200 hover:bg-gray-100 text-gray-700"
                    >
                      {cust.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
