import { 
  Product, 
  Category, 
  Brand, 
  Order, 
  Vendor, 
  Customer, 
  Coupon, 
  Banner, 
  NotificationItem 
} from '../types/dashboard';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Healthcare & Wellness',
    slug: 'healthcare',
    icon: 'HeartPulse',
    image: 'https://ik.imagekit.io/bf62vomqy/sellzy/categories/health-immunity-box/category_health___immunity_box_RIF1M89n9.jpg',
    productCount: 42,
    status: 'active',
    description: 'Vitamins, supplements, diagnostics, and daily immunity boosters.'
  },
  {
    id: 'cat-2',
    name: 'Skincare & Beauty',
    slug: 'skincare',
    icon: 'Sparkles',
    image: 'https://ik.imagekit.io/bf62vomqy/sellzy/categories/skincare/category__skincare_JU91zeVgI6.jpg',
    productCount: 38,
    status: 'active',
    description: 'Organic cleansers, serums, hydrating creams, and sunscreen.'
  },
  {
    id: 'cat-3',
    name: 'Gym & Fitness Supplements',
    slug: 'gym-supplements',
    icon: 'Dumbbell',
    image: 'https://ik.imagekit.io/bf62vomqy/sellzy/categories/gym-supplements/category_gym_supplements_-0ohpRFwV.jpg',
    productCount: 29,
    status: 'active',
    description: 'Whey protein, BCAAs, creatine, and pre-workout blends.'
  },
  {
    id: 'cat-4',
    name: 'Diet & Nutrition',
    slug: 'diet-nutrition',
    icon: 'Apple',
    image: 'https://ik.imagekit.io/bf62vomqy/sellzy/categories/diet-nutrition/category_diet___nutrition_540x-Knps.jpg',
    productCount: 24,
    status: 'active',
    description: 'Keto bars, organic protein powders, herbal infusions, and superfoods.'
  },
  {
    id: 'cat-5',
    name: 'Diabetes Care',
    slug: 'diabetes-care',
    icon: 'Activity',
    image: 'https://ik.imagekit.io/bf62vomqy/sellzy/categories/diabetes-care/category_diabetes_care_jyws23gce.jpg',
    productCount: 16,
    status: 'active',
    description: 'Sugar-free nutrition, continuous monitors, and test strips.'
  },
  {
    id: 'cat-6',
    name: 'Haircare Solutions',
    slug: 'haircare-solutions',
    icon: 'Scissors',
    image: 'https://ik.imagekit.io/bf62vomqy/sellzy/categories/haircare-solutions/category_haircare_solutions_N4dERIAOc.jpg',
    productCount: 19,
    status: 'active',
    description: 'Biotin oils, sulfate-free shampoos, and keratin hair masks.'
  },
  {
    id: 'cat-7',
    name: 'Organic Groceries',
    slug: 'breakfast',
    icon: 'Coffee',
    image: 'https://ik.imagekit.io/bf62vomqy/sellzy/categories/breakfast/category_breakfast_2QzpyBmPp.jpg',
    productCount: 33,
    status: 'active',
    description: 'Granola, organic honey, dairy substitutes, and breakfast oats.'
  }
];

export const INITIAL_BRANDS: Brand[] = [
  { id: 'b-1', name: 'VitaLife Labs', slug: 'vitalife', logo: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1770831636/sellzy/banners/axmgiuxueu4woxcge6he.png', productCount: 18, featured: true },
  { id: 'b-2', name: 'Optimum Nutrition', slug: 'optimum-nutrition', logo: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1770831677/sellzy/banners/xq0hhmidsz3xzazoborn.png', productCount: 14, featured: true },
  { id: 'b-3', name: 'Dabur Herbal', slug: 'dabur', logo: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1770831704/sellzy/banners/lwktkf9wv1pfmbemq37b.png', productCount: 12, featured: true },
  { id: 'b-4', name: 'EverHerb Organic', slug: 'everherb', logo: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1770831636/sellzy/banners/axmgiuxueu4woxcge6he.png', productCount: 9, featured: false },
  { id: 'b-5', name: 'Omron Healthcare', slug: 'omron', logo: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1770831677/sellzy/banners/xq0hhmidsz3xzazoborn.png', productCount: 8, featured: true }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'VitaLife Omega-3 Softgels Heart Support Max Strength',
    slug: 'vitalife-omega-3-softgels-heart-support-max-strength',
    sku: 'SLZ-VTL-001',
    category: 'Healthcare & Wellness',
    brand: 'VitaLife Labs',
    vendor: 'VitaLife Official Store',
    regularPrice: 42.00,
    salePrice: 34.99,
    stock: 145,
    soldCount: 342,
    status: 'active',
    rating: 4.9,
    reviewCount: 128,
    image: 'https://ik.imagekit.io/bf62vomqy/sellzy/products/vitalife-omega-3-softgels-heart-support-max-strength/product_vitalife_omega-3_softgels_heart_support_max_strength_1_vY_PF802u.jpg',
    description: 'Triple strength 1400mg wild-caught fish oil softgels delivering 900mg active EPA & DHA for cardiovascular wellness and joint mobility.',
    featured: true,
    createdAt: '2026-09-12'
  },
  {
    id: 'prod-2',
    name: 'Diesel 100% New Zealand Whey Protein 2kg Jar',
    slug: 'diesel-whey-protein-2kg-combo-jar',
    sku: 'SLZ-DSL-089',
    category: 'Gym & Fitness Supplements',
    brand: 'Optimum Nutrition',
    vendor: 'Apex Sports Nutrition',
    regularPrice: 79.99,
    salePrice: 68.50,
    stock: 58,
    soldCount: 215,
    status: 'active',
    rating: 4.8,
    reviewCount: 94,
    image: 'https://ik.imagekit.io/bf62vomqy/sellzy/products/diesel-whey-protein-2kg-combo-jar/product_diesel_whey_protein_2kg_combo_jar_1_b1Tpikc9Z.jpg',
    description: 'Ultra-pure cold-filtered whey isolate formulated in Canada with 27g protein per scoop, 0 sugar, and digestive enzymes.',
    featured: true,
    createdAt: '2026-09-18'
  },
  {
    id: 'prod-3',
    name: 'Digital Blood Pressure Monitor Wrist Type Pro',
    slug: 'digital-blood-pressure-monitor-wrist',
    sku: 'SLZ-OMR-404',
    category: 'Healthcare & Wellness',
    brand: 'Omron Healthcare',
    vendor: 'MedTech Global',
    regularPrice: 59.00,
    salePrice: 48.00,
    stock: 32,
    soldCount: 189,
    status: 'active',
    rating: 4.7,
    reviewCount: 65,
    image: 'https://ik.imagekit.io/bf62vomqy/sellzy/products/digital-blood-pressure-monitor-wrist/product_digital_blood_pressure_monitor_wrist_1_XoN-sITDc.jpg',
    description: 'Clinically validated accurate wrist blood pressure monitor with heart rhythm detection, backlit LCD, and 120-memory dual user logs.',
    featured: true,
    createdAt: '2026-10-02'
  },
  {
    id: 'prod-4',
    name: 'EverHerb Organic Neem Extract Immunity Capsules 60ct',
    slug: 'everherb-neem-capsules-copy',
    sku: 'SLZ-EVH-210',
    category: 'Healthcare & Wellness',
    brand: 'EverHerb Organic',
    vendor: 'Pure Botanic Store',
    regularPrice: 22.50,
    salePrice: 17.99,
    stock: 18,
    soldCount: 88,
    status: 'active',
    rating: 4.6,
    reviewCount: 42,
    image: 'https://ik.imagekit.io/bf62vomqy/sellzy/products/everherb-neem-capsules-copy/product_everherb_neem_capsules-copy_1_2mFQvyUPs.jpg',
    description: 'Standardized pure organic neem leaf extract for blood purification, clear skin complexion, and natural immune defense.',
    featured: false,
    createdAt: '2026-10-05'
  },
  {
    id: 'prod-5',
    name: 'Dabur Honitus Herbal Cough Remedy Syrup 200ml',
    slug: 'dabur-honitus-cough-remedy',
    sku: 'SLZ-DBR-112',
    category: 'Healthcare & Wellness',
    brand: 'Dabur Herbal',
    vendor: 'VitaLife Official Store',
    regularPrice: 16.00,
    salePrice: 12.50,
    stock: 82,
    soldCount: 410,
    status: 'active',
    rating: 4.9,
    reviewCount: 204,
    image: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1770888383/sellzy/products/ldgjx17mnx63pcvo9xga.png',
    description: '100% Ayurvedic non-drowsy cough syrup fortified with Tulsi, Mulethi, Banapsha, and pure organic mountain honey.',
    featured: true,
    createdAt: '2026-08-25'
  },
  {
    id: 'prod-6',
    name: 'LiveEasy Diabetic Protein Balanced Drink Powder 500g',
    slug: 'liveeasy-diabetic-protein-powder',
    sku: 'SLZ-LVE-776',
    category: 'Diabetes Care',
    brand: 'VitaLife Labs',
    vendor: 'VitaLife Official Store',
    regularPrice: 38.00,
    salePrice: 29.99,
    stock: 4,
    soldCount: 142,
    status: 'active',
    rating: 4.8,
    reviewCount: 57,
    image: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1772391982/sellzy/products/bc8m4wupakthqdaht9ol.jpg',
    description: 'Low GI scientifically tailored nutritional beverage designed for glucose regulation with high fiber and essential vitamins.',
    featured: false,
    createdAt: '2026-10-08'
  },
  {
    id: 'prod-7',
    name: 'Infrared Non-Contact Digital Thermometer Pro',
    slug: 'infrared-thermometer-noncontact-pro',
    sku: 'SLZ-OMR-902',
    category: 'Healthcare & Wellness',
    brand: 'Omron Healthcare',
    vendor: 'MedTech Global',
    regularPrice: 45.00,
    salePrice: 32.00,
    stock: 0,
    soldCount: 320,
    status: 'out_of_stock',
    rating: 4.7,
    reviewCount: 112,
    image: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1772392011/sellzy/products/j5ny2hq5xoe4hdvw6kfo.jpg',
    description: 'Instant 1-second accurate forehead temperature scanner with 3-color fever alert LED indicator.',
    featured: false,
    createdAt: '2026-09-01'
  },
  {
    id: 'prod-8',
    name: 'Hydrating Rose Petal Hyaluronic Face Serum 50ml',
    slug: 'hydrating-rose-hyaluronic-serum',
    sku: 'SLZ-SKN-301',
    category: 'Skincare & Beauty',
    brand: 'EverHerb Organic',
    vendor: 'Pure Botanic Store',
    regularPrice: 34.00,
    salePrice: 26.50,
    stock: 64,
    soldCount: 97,
    status: 'active',
    rating: 4.9,
    reviewCount: 48,
    image: 'https://ik.imagekit.io/bf62vomqy/sellzy/categories/your-daily-skin-ritual/category_your_daily_skin_ritual_ZsZHeTyt6.jpg',
    description: 'Deep moisture replenishment with botanical rose water, multi-weight hyaluronic acid, and niacinamide brightening complex.',
    featured: true,
    createdAt: '2026-10-14'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'SLZ-984321',
    customer: {
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      phone: '+1 (555) 234-5678',
      address: {
        street: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'IL',
        zip: '62704',
        country: 'United States'
      }
    },
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        name: 'VitaLife Omega-3 Softgels Heart Support Max Strength',
        price: 34.99,
        quantity: 2,
        image: 'https://ik.imagekit.io/bf62vomqy/sellzy/products/vitalife-omega-3-softgels-heart-support-max-strength/product_vitalife_omega-3_softgels_heart_support_max_strength_1_vY_PF802u.jpg'
      },
      {
        id: 'item-2',
        productId: 'prod-5',
        name: 'Dabur Honitus Herbal Cough Remedy Syrup 200ml',
        price: 12.50,
        quantity: 1,
        image: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1770888383/sellzy/products/ldgjx17mnx63pcvo9xga.png'
      }
    ],
    subtotal: 82.48,
    discount: 8.25,
    shipping: 0.00,
    tax: 5.94,
    total: 80.17,
    paymentMethod: 'Stripe / Credit Card',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    trackingNumber: 'TRK-USPS-88492019',
    notes: 'Please leave package at the front porch.',
    createdAt: '2026-10-24 09:14'
  },
  {
    id: 'ord-1002',
    orderNumber: 'SLZ-984322',
    customer: {
      name: 'Marcus Vance',
      email: 'm.vance@techcorp.io',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      phone: '+1 (555) 345-6789',
      address: {
        street: '120 Market Street, Suite 400',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'United States'
      }
    },
    items: [
      {
        id: 'item-3',
        productId: 'prod-2',
        name: 'Diesel 100% New Zealand Whey Protein 2kg Jar',
        price: 68.50,
        quantity: 1,
        image: 'https://ik.imagekit.io/bf62vomqy/sellzy/products/diesel-whey-protein-2kg-combo-jar/product_diesel_whey_protein_2kg_combo_jar_1_b1Tpikc9Z.jpg'
      }
    ],
    subtotal: 68.50,
    discount: 0.00,
    shipping: 5.00,
    tax: 5.88,
    total: 79.38,
    paymentMethod: 'PayPal',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    trackingNumber: 'TRK-FEDEX-49201844',
    createdAt: '2026-10-24 08:30'
  },
  {
    id: 'ord-1003',
    orderNumber: 'SLZ-984323',
    customer: {
      name: 'Elena Rostova',
      email: 'elena.rostova@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      phone: '+1 (555) 890-1234',
      address: {
        street: '450 Lexington Ave',
        city: 'New York',
        state: 'NY',
        zip: '10017',
        country: 'United States'
      }
    },
    items: [
      {
        id: 'item-4',
        productId: 'prod-3',
        name: 'Digital Blood Pressure Monitor Wrist Type Pro',
        price: 48.00,
        quantity: 1,
        image: 'https://ik.imagekit.io/bf62vomqy/sellzy/products/digital-blood-pressure-monitor-wrist/product_digital_blood_pressure_monitor_wrist_1_XoN-sITDc.jpg'
      },
      {
        id: 'item-5',
        productId: 'prod-4',
        name: 'EverHerb Organic Neem Extract Immunity Capsules 60ct',
        price: 17.99,
        quantity: 2,
        image: 'https://ik.imagekit.io/bf62vomqy/sellzy/products/everherb-neem-capsules-copy/product_everherb_neem_capsules-copy_1_2mFQvyUPs.jpg'
      }
    ],
    subtotal: 83.98,
    discount: 10.00,
    shipping: 0.00,
    tax: 6.72,
    total: 80.70,
    paymentMethod: 'Stripe / Credit Card',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    trackingNumber: 'TRK-UPS-99120391',
    createdAt: '2026-10-23 16:45'
  },
  {
    id: 'ord-1004',
    orderNumber: 'SLZ-984324',
    customer: {
      name: 'David Chen',
      email: 'd.chen@outlook.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      phone: '+1 (555) 456-7890',
      address: {
        street: '88 King Street East',
        city: 'Seattle',
        state: 'WA',
        zip: '98104',
        country: 'United States'
      }
    },
    items: [
      {
        id: 'item-6',
        productId: 'prod-8',
        name: 'Hydrating Rose Petal Hyaluronic Face Serum 50ml',
        price: 26.50,
        quantity: 2,
        image: 'https://ik.imagekit.io/bf62vomqy/sellzy/categories/your-daily-skin-ritual/category_your_daily_skin_ritual_ZsZHeTyt6.jpg'
      }
    ],
    subtotal: 53.00,
    discount: 5.00,
    shipping: 0.00,
    tax: 4.24,
    total: 52.24,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'pending',
    orderStatus: 'pending',
    trackingNumber: 'TRK-PENDING-001',
    createdAt: '2026-10-24 10:12'
  },
  {
    id: 'ord-1005',
    orderNumber: 'SLZ-984325',
    customer: {
      name: 'Amara Okafor',
      email: 'amara.okafor@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
      phone: '+1 (555) 789-0123',
      address: {
        street: '1540 Peachtree St NW',
        city: 'Atlanta',
        state: 'GA',
        zip: '30309',
        country: 'United States'
      }
    },
    items: [
      {
        id: 'item-7',
        productId: 'prod-6',
        name: 'LiveEasy Diabetic Protein Balanced Drink Powder 500g',
        price: 29.99,
        quantity: 1,
        image: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1772391982/sellzy/products/bc8m4wupakthqdaht9ol.jpg'
      }
    ],
    subtotal: 29.99,
    discount: 0.00,
    shipping: 4.50,
    tax: 2.40,
    total: 36.89,
    paymentMethod: 'Stripe / Credit Card',
    paymentStatus: 'refunded',
    orderStatus: 'cancelled',
    trackingNumber: 'CANCELLED',
    createdAt: '2026-10-22 11:20'
  }
];

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'vnd-1',
    name: 'Dr. Gregory Vance',
    email: 'vendor@vitalifelabs.com',
    storeName: 'VitaLife Official Store',
    logo: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1770831636/sellzy/banners/axmgiuxueu4woxcge6he.png',
    phone: '+1 (800) 555-0199',
    rating: 4.9,
    totalProducts: 24,
    totalSales: 48920.00,
    commissionRate: 10,
    status: 'verified',
    joinedDate: '2025-11-10'
  },
  {
    id: 'vnd-2',
    name: 'Chadwick Miller',
    email: 'partners@apexsports.com',
    storeName: 'Apex Sports Nutrition',
    logo: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1770831677/sellzy/banners/xq0hhmidsz3xzazoborn.png',
    phone: '+1 (888) 777-9922',
    rating: 4.8,
    totalProducts: 19,
    totalSales: 32450.00,
    commissionRate: 12,
    status: 'verified',
    joinedDate: '2026-01-15'
  },
  {
    id: 'vnd-3',
    name: 'Sophia Patel',
    email: 'sales@purebotanic.co',
    storeName: 'Pure Botanic Store',
    logo: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1770831704/sellzy/banners/lwktkf9wv1pfmbemq37b.png',
    phone: '+1 (555) 432-8811',
    rating: 4.7,
    totalProducts: 14,
    totalSales: 16800.00,
    commissionRate: 8,
    status: 'verified',
    joinedDate: '2026-03-20'
  },
  {
    id: 'vnd-4',
    name: 'Arthur Pendelton',
    email: 'admin@medtechglobal.com',
    storeName: 'MedTech Global',
    logo: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1770831636/sellzy/banners/axmgiuxueu4woxcge6he.png',
    phone: '+1 (555) 998-2233',
    rating: 4.6,
    totalProducts: 11,
    totalSales: 21900.00,
    commissionRate: 10,
    status: 'pending',
    joinedDate: '2026-10-18'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    phone: '+1 (555) 234-5678',
    totalOrders: 6,
    totalSpend: 482.50,
    status: 'active',
    joinedDate: '2026-02-14'
  },
  {
    id: 'cust-2',
    name: 'Marcus Vance',
    email: 'm.vance@techcorp.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phone: '+1 (555) 345-6789',
    totalOrders: 4,
    totalSpend: 310.20,
    status: 'active',
    joinedDate: '2026-04-09'
  },
  {
    id: 'cust-3',
    name: 'Elena Rostova',
    email: 'elena.rostova@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    phone: '+1 (555) 890-1234',
    totalOrders: 9,
    totalSpend: 745.80,
    status: 'active',
    joinedDate: '2025-12-01'
  },
  {
    id: 'cust-4',
    name: 'David Chen',
    email: 'd.chen@outlook.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    phone: '+1 (555) 456-7890',
    totalOrders: 2,
    totalSpend: 114.20,
    status: 'active',
    joinedDate: '2026-08-19'
  },
  {
    id: 'cust-5',
    name: 'Amara Okafor',
    email: 'amara.okafor@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
    phone: '+1 (555) 789-0123',
    totalOrders: 1,
    totalSpend: 36.89,
    status: 'inactive',
    joinedDate: '2026-09-11'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'cpn-1',
    code: 'SELLZY10',
    discountType: 'percentage',
    value: 10,
    minSpend: 50,
    usageLimit: 500,
    usageCount: 182,
    expiresAt: '2026-12-31',
    status: 'active'
  },
  {
    id: 'cpn-2',
    code: 'FLASH25',
    discountType: 'percentage',
    value: 25,
    minSpend: 100,
    usageLimit: 100,
    usageCount: 94,
    expiresAt: '2026-11-05',
    status: 'active'
  },
  {
    id: 'cpn-3',
    code: 'WELCOME5',
    discountType: 'fixed',
    value: 5,
    minSpend: 25,
    usageLimit: 1000,
    usageCount: 421,
    expiresAt: '2027-01-01',
    status: 'active'
  }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'bnr-1',
    title: 'VitaLife Omega-3 Softgels Heart Support',
    subtitle: 'Triple Strength Omega-3 with 900mg EPA & DHA',
    badge: 'Exclusive Offer 20% OFF',
    buttonText: 'Shop Collection',
    buttonUrl: '/shop?category=healthcare',
    image: 'https://ik.imagekit.io/bf62vomqy/sellzy/banners/exclusive-offer/banner_exclusive_offer_XvnNXFGrH.jpg',
    position: 'hero',
    status: 'active'
  },
  {
    id: 'bnr-2',
    title: 'Boost Your Health With Trusted Supplements',
    subtitle: 'Laboratory tested natural herbs and protein formulas',
    badge: 'Trending Brands',
    buttonText: 'Explore Nutrition',
    buttonUrl: '/shop?category=gym-supplements',
    image: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1770831636/sellzy/banners/axmgiuxueu4woxcge6he.png',
    position: 'promo_top',
    status: 'active'
  },
  {
    id: 'bnr-3',
    title: 'Gentle Skincare Rituals & Glow Essentials',
    subtitle: 'Nourishing botanical serums with pure hyaluronic acid',
    badge: 'New Season Arrival',
    buttonText: 'View Skincare',
    buttonUrl: '/shop?category=skincare',
    image: 'https://res.cloudinary.com/dxkhdqifr/image/upload/v1770831677/sellzy/banners/xq0hhmidsz3xzazoborn.png',
    position: 'promo_bottom',
    status: 'active'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Order Received',
    message: 'Order #SLZ-984321 was placed by Sarah Jenkins ($80.17)',
    type: 'order',
    read: false,
    time: '15m ago'
  },
  {
    id: 'notif-2',
    title: 'Low Stock Alert',
    message: 'LiveEasy Diabetic Protein Powder has only 4 units remaining.',
    type: 'stock',
    read: false,
    time: '1h ago'
  },
  {
    id: 'notif-3',
    title: 'Vendor Verification Request',
    message: 'MedTech Global submitted documents for marketplace approval.',
    type: 'vendor',
    read: false,
    time: '3h ago'
  },
  {
    id: 'notif-4',
    title: 'System Backup Complete',
    message: 'Sellzy database snapshot was saved securely to cloud storage.',
    type: 'system',
    read: true,
    time: '1d ago'
  }
];
