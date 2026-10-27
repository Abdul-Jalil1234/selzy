import React, { useState } from 'react';
import { X, Upload, Sparkles, AlertCircle } from 'lucide-react';
import { Product, Category, Brand, Vendor } from '../../types/dashboard';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<Product, 'id' | 'soldCount' | 'reviewCount' | 'createdAt'>) => void;
  categories: Category[];
  brands: Brand[];
  vendors: Vendor[];
  initialData?: Product | null;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  categories,
  brands,
  vendors,
  initialData
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [sku, setSku] = useState(initialData?.sku || `SLZ-${Math.floor(100 + Math.random() * 900)}`);
  const [category, setCategory] = useState(initialData?.category || categories[0]?.name || '');
  const [brand, setBrand] = useState(initialData?.brand || brands[0]?.name || '');
  const [vendor, setVendor] = useState(initialData?.vendor || vendors[0]?.storeName || '');
  const [regularPrice, setRegularPrice] = useState(initialData?.regularPrice?.toString() || '45.00');
  const [salePrice, setSalePrice] = useState(initialData?.salePrice?.toString() || '38.00');
  const [stock, setStock] = useState(initialData?.stock?.toString() || '50');
  const [rating, setRating] = useState(initialData?.rating?.toString() || '4.8');
  const [image, setImage] = useState(
    initialData?.image || 
    'https://ik.imagekit.io/bf62vomqy/sellzy/products/vitalife-omega-3-softgels-heart-support-max-strength/product_vitalife_omega-3_softgels_heart_support_max_strength_1_vY_PF802u.jpg'
  );
  const [description, setDescription] = useState(
    initialData?.description || 
    'Premium quality laboratory-tested formula engineered for highest bioavailability and effectiveness.'
  );
  const [featured, setFeatured] = useState(initialData?.featured ?? true);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a product title');
      return;
    }
    const reg = parseFloat(regularPrice);
    const sale = parseFloat(salePrice);
    const stk = parseInt(stock, 10);

    if (isNaN(reg) || isNaN(sale) || isNaN(stk)) {
      setError('Please provide valid numbers for prices and stock quantity.');
      return;
    }

    onAddProduct({
      name: name.trim(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      sku: sku.trim(),
      category,
      brand,
      vendor,
      regularPrice: reg,
      salePrice: sale,
      stock: stk,
      status: stk > 0 ? 'active' : 'out_of_stock',
      rating: parseFloat(rating) || 4.5,
      image,
      description: description.trim(),
      featured
    });

    onClose();
  };

  const sampleImages = [
    'https://ik.imagekit.io/bf62vomqy/sellzy/products/vitalife-omega-3-softgels-heart-support-max-strength/product_vitalife_omega-3_softgels_heart_support_max_strength_1_vY_PF802u.jpg',
    'https://ik.imagekit.io/bf62vomqy/sellzy/products/diesel-whey-protein-2kg-combo-jar/product_diesel_whey_protein_2kg_combo_jar_1_b1Tpikc9Z.jpg',
    'https://ik.imagekit.io/bf62vomqy/sellzy/products/digital-blood-pressure-monitor-wrist/product_digital_blood_pressure_monitor_wrist_1_XoN-sITDc.jpg',
    'https://ik.imagekit.io/bf62vomqy/sellzy/products/everherb-neem-capsules-copy/product_everherb_neem_capsules-copy_1_2mFQvyUPs.jpg',
    'https://res.cloudinary.com/dxkhdqifr/image/upload/v1770888383/sellzy/products/ldgjx17mnx63pcvo9xga.png',
    'https://ik.imagekit.io/bf62vomqy/sellzy/categories/your-daily-skin-ritual/category_your_daily_skin_ritual_ZsZHeTyt6.jpg'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {initialData ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-xs text-gray-500">List an item in the Sellzy multi-vendor marketplace catalog</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Product Title *</label>
            <input 
              type="text"
              required
              placeholder="e.g. VitaLife Magnesium Complex 500mg - 90 Capsules"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#088178] focus:ring-2 focus:ring-[#088178]/20 outline-none"
            />
          </div>

          {/* SKU, Category & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">SKU Code</label>
              <input 
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#088178] outline-none bg-white"
              >
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#088178] outline-none bg-white"
              >
                {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
              </select>
            </div>
          </div>

          {/* Vendor Assignment */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Assigned Vendor / Seller</label>
            <select
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#088178] outline-none bg-white"
            >
              {vendors.map(v => <option key={v.id} value={v.storeName}>{v.storeName} ({v.name})</option>)}
            </select>
          </div>

          {/* Pricing & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Regular Price ($)</label>
              <input 
                type="number"
                step="0.01"
                required
                value={regularPrice}
                onChange={(e) => setRegularPrice(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Sale Price ($)</label>
              <input 
                type="number"
                step="0.01"
                required
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#088178] outline-none text-[#088178] font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Stock Units</label>
              <input 
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
          </div>

          {/* Image URL & Quick Previews */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Product Image URL</label>
            <div className="flex gap-2">
              <input 
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
              <img 
                src={image} 
                alt="Preview" 
                className="size-10 rounded-lg border border-gray-200 object-contain p-1 bg-gray-50 shrink-0" 
              />
            </div>

            {/* Quick Presets */}
            <div className="mt-2">
              <span className="text-[10px] text-gray-500 font-semibold uppercase">Or choose from Sellzy verified assets:</span>
              <div className="flex gap-2 mt-1.5 overflow-x-auto pb-1">
                {sampleImages.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImage(src)}
                    className={`size-10 rounded-lg border p-1 bg-gray-50 shrink-0 transition-all ${
                      image === src ? 'border-[#088178] ring-2 ring-[#088178]/30' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={src} alt="preset" className="size-full object-contain" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Description & Key Benefits</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
            />
          </div>

          {/* Featured checkbox */}
          <div className="flex items-center gap-2 pt-2">
            <input 
              type="checkbox"
              id="featured_check"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="size-4 accent-[#088178] rounded cursor-pointer"
            />
            <label htmlFor="featured_check" className="text-xs font-medium text-gray-700 cursor-pointer">
              Feature on Homepage & "Best Selling Products" carousel
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#088178] hover:bg-[#005249] text-white text-xs font-bold shadow-xs transition-colors"
            >
              {initialData ? 'Update Product' : 'Publish Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
