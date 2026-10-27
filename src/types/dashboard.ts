export type NavigationTab = 
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'brands'
  | 'orders'
  | 'vendors'
  | 'customers'
  | 'coupons'
  | 'banners'
  | 'analytics'
  | 'settings';

export type ProductStatus = 'active' | 'draft' | 'out_of_stock';

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  brand: string;
  vendor: string;
  regularPrice: number;
  salePrice: number;
  stock: number;
  soldCount: number;
  status: ProductStatus;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  featured: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  productCount: number;
  status: 'active' | 'inactive';
  description?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  productCount: number;
  featured: boolean;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'refunded';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: 'Stripe / Credit Card' | 'PayPal' | 'Cash on Delivery';
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber: string;
  notes?: string;
  createdAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  storeName: string;
  logo: string;
  phone: string;
  rating: number;
  totalProducts: number;
  totalSales: number;
  commissionRate: number; // e.g. 10%
  status: 'verified' | 'pending' | 'suspended';
  joinedDate: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  totalOrders: number;
  totalSpend: number;
  status: 'active' | 'inactive';
  joinedDate: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minSpend: number;
  usageLimit: number;
  usageCount: number;
  expiresAt: string;
  status: 'active' | 'expired' | 'disabled';
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  buttonText: string;
  buttonUrl: string;
  image: string;
  position: 'hero' | 'promo_top' | 'promo_bottom';
  status: 'active' | 'inactive';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'stock' | 'vendor' | 'system';
  read: boolean;
  time: string;
}
