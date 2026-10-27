import React, { useState } from 'react';
import { Plus, Search, Layers, Edit2, Trash2, Check, X, Image as ImageIcon } from 'lucide-react';
import { Category } from '../../types/dashboard';

interface CategoriesViewProps {
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id' | 'productCount'>) => void;
  onToggleCategoryStatus: (id: string) => void;
  onDeleteCategory: (id: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  onAddCategory,
  onToggleCategoryStatus,
  onDeleteCategory
}) => {
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatImage, setNewCatImage] = useState('https://ik.imagekit.io/bf62vomqy/sellzy/categories/skincare/category__skincare_JU91zeVgI6.jpg');

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    onAddCategory({
      name: newCatName.trim(),
      slug: newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      icon: 'Tag',
      image: newCatImage,
      status: 'active',
      description: newCatDesc.trim() || 'Curated high-grade selection for retail customers.'
    });
    setNewCatName('');
    setNewCatDesc('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#dfe3e8] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Store Categories</span>
            <span className="text-xs px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full font-semibold">
              {categories.length} departments
            </span>
          </h2>
          <p className="text-xs text-gray-500">
            Structure your marketplace navigation, taxonomy, and category banner assets
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#088178] hover:bg-[#005249] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Add Category Drawer/Form */}
      {isAdding && (
        <form onSubmit={handleCreate} className="p-5 bg-white rounded-xl border-2 border-dashed border-[#088178] shadow-sm space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-900">Create New Department / Category</h3>
            <button type="button" onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Baby Care & Nursery"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Cover Image URL</label>
              <input
                type="url"
                value={newCatImage}
                onChange={(e) => setNewCatImage(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Short description shown on category banners..."
              value={newCatDesc}
              onChange={(e) => setNewCatDesc(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#088178] rounded-lg hover:bg-[#005249]"
            >
              Save Department
            </button>
          </div>
        </form>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Filter categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
        />
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCategories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl border border-[#dfe3e8] shadow-xs overflow-hidden flex flex-col justify-between group hover:border-[#088178] transition-all">
            <div className="relative h-32 bg-gray-100 overflow-hidden">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <span className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                cat.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
              }`}>
                {cat.status}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#088178] transition-colors">
                  {cat.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {cat.description || 'Department products catalog.'}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-700 bg-gray-50 px-2 py-1 rounded-md">
                  {cat.productCount} products
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onToggleCategoryStatus(cat.id)}
                    className="p-1 rounded text-gray-400 hover:text-gray-700"
                    title="Toggle active status"
                  >
                    <Check size={14} className={cat.status === 'active' ? 'text-emerald-600' : 'text-gray-300'} />
                  </button>
                  <button
                    onClick={() => onDeleteCategory(cat.id)}
                    className="p-1 rounded text-gray-400 hover:text-rose-600"
                    title="Delete category"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
