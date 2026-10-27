import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Star, 
  Package, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Download
} from 'lucide-react';
import { Product, Category, Brand, Vendor } from '../../types/dashboard';

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  vendors: Vendor[];
  onOpenAddModal: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onToggleFeatured: (productId: string) => void;
  onQuickAdjustStock: (productId: string, newStock: number) => void;
  onOpenStorefront: () => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  categories,
  brands,
  vendors,
  onOpenAddModal,
  onEditProduct,
  onDeleteProduct,
  onToggleFeatured,
  onQuickAdjustStock,
  onOpenStorefront
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStockStatus, setSelectedStockStatus] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'sold'>('newest');

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesVendor = selectedVendor === 'all' || p.vendor === selectedVendor;

    let matchesStock = true;
    if (selectedStockStatus === 'in_stock') matchesStock = p.stock > 10;
    else if (selectedStockStatus === 'low_stock') matchesStock = p.stock > 0 && p.stock <= 10;
    else if (selectedStockStatus === 'out_of_stock') matchesStock = p.stock === 0;

    return matchesSearch && matchesCategory && matchesVendor && matchesStock;
  }).sort((a, b) => {
    if (sortBy === 'price_low') return a.salePrice - b.salePrice;
    if (sortBy === 'price_high') return b.salePrice - a.salePrice;
    if (sortBy === 'sold') return b.soldCount - a.soldCount;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
          <XCircle size={12} /> Out of Stock (0)
        </span>
      );
    }
    if (stock <= 10) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
          <AlertTriangle size={12} /> Low Stock ({stock})
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
        <CheckCircle size={12} /> In Stock ({stock})
      </span>
    );
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["SKU,Title,Category,Brand,Vendor,RegularPrice,SalePrice,Stock,SoldCount,Status"]
      .concat(products.map(p => `"${p.sku}","${p.name}","${p.category}","${p.brand}","${p.vendor}",${p.regularPrice},${p.salePrice},${p.stock},${p.soldCount},${p.status}`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sellzy_catalog_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#dfe3e8] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Product Catalog</span>
            <span className="text-xs px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full font-semibold">
              {filteredProducts.length} items
            </span>
          </h2>
          <p className="text-xs text-gray-500">
            Control items, inventory levels, marketplace pricing, and vendor assignments
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold transition-colors"
            title="Export catalog to CSV"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#088178] hover:bg-[#005249] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 bg-white rounded-xl border border-[#dfe3e8] shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search title, SKU, brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
          />
        </div>

        {/* Category filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none bg-white text-gray-700"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Stock Filter */}
        <div>
          <select
            value={selectedStockStatus}
            onChange={(e) => setSelectedStockStatus(e.target.value as any)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none bg-white text-gray-700"
          >
            <option value="all">All Stock Statuses</option>
            <option value="in_stock">In Stock (&gt;10)</option>
            <option value="low_stock">Low Stock (≤10)</option>
            <option value="out_of_stock">Out of Stock (0)</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none bg-white text-gray-700"
          >
            <option value="newest">Sort: Newest</option>
            <option value="sold">Sort: Most Sold</option>
            <option value="price_low">Sort: Price Low to High</option>
            <option value="price_high">Sort: Price High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-[#dfe3e8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f4f6f8] text-[#637381] font-bold uppercase text-[10px] tracking-wider border-b border-[#dfe3e8]">
              <tr>
                <th className="py-3 px-4">Product Info</th>
                <th className="py-3 px-4">Category & Brand</th>
                <th className="py-3 px-4">Vendor</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Sales</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400">
                    <Package size={32} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-sm font-semibold">No products match your filter criteria.</p>
                    <p className="text-xs text-gray-400 mt-1">Try resetting the search or category filter.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => {
                  const discount = Math.round(((prod.regularPrice - prod.salePrice) / prod.regularPrice) * 100);
                  return (
                    <tr key={prod.id} className="hover:bg-gray-50/70 transition-colors">
                      {/* Product image & title */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={prod.image} 
                            alt={prod.name}
                            className="size-12 rounded-lg object-contain bg-gray-50 p-1 border border-gray-200 shrink-0" 
                          />
                          <div className="max-w-xs">
                            <h4 className="font-bold text-gray-900 line-clamp-1 hover:text-[#088178] cursor-pointer" title={prod.name}>
                              {prod.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-mono text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.2 rounded">
                                {prod.sku}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category & Brand */}
                      <td className="py-3 px-4">
                        <span className="block font-medium text-gray-800">{prod.category}</span>
                        <span className="block text-[11px] text-gray-400">{prod.brand}</span>
                      </td>

                      {/* Vendor */}
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium text-[11px]">
                          {prod.vendor}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 text-sm">
                            ${prod.salePrice.toFixed(2)}
                          </span>
                          {discount > 0 && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="line-through text-gray-400 text-[11px]">
                                ${prod.regularPrice.toFixed(2)}
                              </span>
                              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1 rounded">
                                -{discount}%
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Stock with quick modifier */}
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1">
                          {getStockBadge(prod.stock)}
                          <div className="flex items-center gap-1 mt-0.5">
                            <button
                              onClick={() => onQuickAdjustStock(prod.id, Math.max(0, prod.stock - 5))}
                              className="px-1.5 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] font-bold"
                              title="Decrease stock by 5"
                            >
                              -5
                            </button>
                            <button
                              onClick={() => onQuickAdjustStock(prod.id, prod.stock + 10)}
                              className="px-1.5 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] font-bold"
                              title="Add 10 units to stock"
                            >
                              +10
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Sold Count */}
                      <td className="py-3 px-4 font-semibold text-gray-700">
                        {prod.soldCount} units
                      </td>

                      {/* Rating */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star size={13} fill="currentColor" />
                          <span>{prod.rating}</span>
                          <span className="text-[10px] text-gray-400 font-normal">({prod.reviewCount})</span>
                        </div>
                      </td>

                      {/* Featured Star */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onToggleFeatured(prod.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            prod.featured ? 'text-amber-500 bg-amber-50' : 'text-gray-300 hover:text-gray-500'
                          }`}
                          title={prod.featured ? 'Featured on storefront (click to toggle)' : 'Not featured (click to feature)'}
                        >
                          <Sparkles size={16} />
                        </button>
                      </td>

                      {/* Action buttons */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onEditProduct(prod)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-[#088178] hover:bg-[#e8f9f0] transition-colors"
                            title="Edit product details"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(prod.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete product"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Info */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={onOpenStorefront}
              className="inline-flex items-center gap-1 text-[#088178] hover:underline font-semibold"
            >
              <span>View catalog in live customer storefront</span>
              <ExternalLink size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
