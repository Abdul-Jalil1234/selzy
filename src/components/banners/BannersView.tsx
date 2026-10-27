import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Check, Trash2, ExternalLink } from 'lucide-react';
import { Banner } from '../../types/dashboard';

interface BannersViewProps {
  banners: Banner[];
  onToggleBannerStatus: (id: string) => void;
  onDeleteBanner: (id: string) => void;
  onAddBanner: (banner: Omit<Banner, 'id'>) => void;
  onOpenStorefront: () => void;
}

export const BannersView: React.FC<BannersViewProps> = ({
  banners,
  onToggleBannerStatus,
  onDeleteBanner,
  onAddBanner,
  onOpenStorefront
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [badge, setBadge] = useState('New Season Promo');
  const [buttonText, setButtonText] = useState('Shop Now');
  const [buttonUrl, setButtonUrl] = useState('/shop');
  const [position, setPosition] = useState<'hero' | 'promo_top' | 'promo_bottom'>('hero');
  const [image, setImage] = useState('https://ik.imagekit.io/bf62vomqy/sellzy/banners/exclusive-offer/banner_exclusive_offer_XvnNXFGrH.jpg');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddBanner({
      title: title.trim(),
      subtitle: subtitle.trim(),
      badge,
      buttonText,
      buttonUrl,
      image,
      position,
      status: 'active'
    });

    setTitle('');
    setSubtitle('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#dfe3e8] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Marketing Banners & Carousels</span>
            <span className="text-xs px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full font-semibold">
              {banners.length} banners
            </span>
          </h2>
          <p className="text-xs text-gray-500">
            Control the hero homepage slider, promotional deal banners, and CTA links
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenStorefront}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold"
          >
            <ExternalLink size={14} />
            <span>Preview in Storefront</span>
          </button>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#088178] hover:bg-[#005249] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Banner</span>
          </button>
        </div>
      </div>

      {/* Add Drawer */}
      {isAdding && (
        <form onSubmit={handleCreate} className="p-5 bg-white rounded-xl border-2 border-dashed border-[#088178] shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900">Configure Marketing Banner</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Headline Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Pure Organic Botanicals & Herbs"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Subtitle / Highlight</label>
              <input
                type="text"
                placeholder="e.g. Up to 40% OFF with fast shipping"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Badge Tag</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Position</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none bg-white"
              >
                <option value="hero">Hero Main Slider</option>
                <option value="promo_top">Promo Banner (Top Row)</option>
                <option value="promo_bottom">Promo Banner (Bottom Row)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Button Label</label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Banner Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#088178] outline-none"
            />
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
              Save Banner
            </button>
          </div>
        </form>
      )}

      {/* Banner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-xl border border-[#dfe3e8] overflow-hidden shadow-xs flex flex-col justify-between hover:border-[#088178] transition-all">
            <div className="relative h-44 bg-gray-100 overflow-hidden">
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-gray-900 w-fit mb-1">
                  {banner.badge}
                </span>
                <h4 className="font-extrabold text-sm line-clamp-1 leading-snug">{banner.title}</h4>
                <p className="text-[11px] text-gray-200 line-clamp-1 mt-0.5">{banner.subtitle}</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between text-xs">
              <span className="px-2 py-1 rounded-md bg-gray-100 font-semibold text-gray-700 text-[11px] capitalize">
                Position: {banner.position.replace('_', ' ')}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleBannerStatus(banner.id)}
                  className={`px-2 py-1 rounded text-[11px] font-bold ${
                    banner.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {banner.status}
                </button>
                <button
                  onClick={() => onDeleteBanner(banner.id)}
                  className="p-1 rounded text-gray-400 hover:text-rose-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
