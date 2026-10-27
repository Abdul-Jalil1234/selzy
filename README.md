# Sellzy — Multi-Vendor E-Commerce Admin & Management Dashboard

A full-featured, responsive multi-vendor e-commerce administration and management platform modeled on **Sellzy** ([sellzy.reactbd.com](https://sellzy.reactbd.com/en)). Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Features

- **📊 Comprehensive Analytics & KPI Overview**:
  - Live revenue calculation, order fulfillment tracking, active inventory counters, and vendor counts.
  - Interactive SVG revenue & sales bar charts with customizable timeframe toggles (7 Days, 30 Days, Year).
  - Order fulfillment SLA progress breakdown (Pending, Processing, Shipped, Delivered).
  - Recent live orders feed and top-selling product ranking with stock level indicators.

- **📦 Product Catalog & Inventory Management**:
  - Pre-populated with realistic healthcare, fitness, and grocery items (VitaLife Omega-3, Diesel Whey Protein, Omron Digital BP Monitor, Dabur Honitus Syrup, etc.).
  - Search by product title, SKU code, or brand.
  - Multi-filtering by category, stock status (*In Stock*, *Low Stock ≤ 10*, *Out of Stock*), and assigned vendor.
  - Quick inline stock modifiers (`+10` / `-5`) and featured product toggle.
  - Full Add / Edit Product modal with instant image preset selection.
  - Export product catalog to CSV.

- **🛒 Orders & Fulfillment Hub**:
  - Tabular filtering by status: *All*, *Pending*, *Processing*, *Shipped*, *Delivered*, *Cancelled*.
  - 1-click status updater and customer search.
  - **Slide-out Order Detail Drawer**: Customer shipping profile, itemized receipt with images, tracking number generator, financial breakdown (tax, discount, shipping, subtotal), and printable invoice.
  - Export orders to CSV.

- **🏬 Multi-Vendor & Store Management**:
  - Vendor lifecycle directory with store approval flow (*Approve* / *Suspend*).
  - Commission rate tracking (default 10%), total lifetime sales, and vendor store ratings.

- **🏷️ Categories & Departments**:
  - Category taxonomy with high-resolution imagery and product counters.
  - Create new departments with custom cover images and descriptions.

- **👥 Customer Directory**:
  - Shopper accounts with lifetime spend, order history counters, contact details, and account activation controls.

- **🎟️ Coupons & Promotions**:
  - Promo campaign creator supporting percentage (`%`) and fixed (`$`) discounts, minimum order thresholds, usage caps, and expiration dates.
  - Copy coupon code shortcut.

- **🖼️ Banners & Marketing Manager**:
  - Hero carousel slides, top promotional banners, and seasonal campaign manager with direct CTA linking.

- **⚙️ Storefront Settings**:
  - Brand name, support phone hotline, support email.
  - Shipping fees, free shipping threshold, sales tax percentage.
  - Payment gateway toggles (Stripe, PayPal, Cash on Delivery).
  - Vendor auto-approval switch.

- **🛍️ Live Customer Storefront Mirror**:
  - Built-in customer shop preview modal mirroring `sellzy.reactbd.com/en` with top hotline, category search, cart drawer preview, hero banner slider, trust badges, and synchronized catalog grid.

- **🔄 Role Switcher**:
  - Toggle between **Super Admin** and **Vendor View** right from the sidebar.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (SPA)
- **Bundler**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React (`lucide-react`)
- **Typography**: DM Sans & Plus Jakarta Sans

---

## 💻 Local Setup in Visual Studio Code

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### Steps

1. **Extract / Open the Folder in VS Code**:
   - Open Visual Studio Code.
   - Go to `File` > `Open Folder...` and select this project directory.
   - Or open your terminal and run:
     ```bash
     cd sellzy-dashboard
     code .
     ```

2. **Install Dependencies**:
   Open the integrated terminal in VS Code (`Ctrl + \`` or `Cmd + \``) and run:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Build for Production**:
   To test the production build:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🐙 How to Push to GitHub

Follow these steps to create a new GitHub repository and push your project:

1. **Initialize Git** (if not already initialized):
   ```bash
   git init
   ```

2. **Stage all files**:
   ```bash
   git add .
   ```

3. **Commit the changes**:
   ```bash
   git commit -m "Initial commit: Sellzy Multi-Vendor E-Commerce Admin Dashboard"
   ```

4. **Create a New Repository on GitHub**:
   - Go to [github.com/new](https://github.com/new).
   - Enter a repository name (e.g., `sellzy-dashboard`).
   - Choose **Public** or **Private**.
   - Do **NOT** check "Add a README file", ".gitignore", or "license" (we already have them).
   - Click **Create repository**.

5. **Link the Remote Repository and Push**:
   Copy the command from GitHub and run:
   ```bash
   # Set the primary branch to main
   git branch -M main

   # Add your remote repository URL (replace with your GitHub username & repository)
   git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/sellzy-dashboard.git

   # Push the code to GitHub
   git push -u origin main
   ```

---

## 📁 Project Structure

```
sellzy-dashboard/
├── index.html                   # HTML entry point with fonts & metadata
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite bundler configuration
├── .gitignore                   # Git ignore patterns
├── README.md                    # Project documentation
├── public/                      # Static assets & downloadable package
└── src/
    ├── main.tsx                 # Application entry point
    ├── App.tsx                  # Root dashboard controller & state manager
    ├── index.css                # Tailwind styling & Sellzy color tokens
    ├── types/
    │   └── dashboard.ts         # TypeScript interfaces (Products, Orders, Vendors, etc.)
    ├── data/
    │   └── mockData.ts          # Authentic Sellzy marketplace initial dataset
    └── components/
        ├── layout/
        │   ├── Sidebar.tsx      # Collapsible navigation & role switcher
        │   └── TopHeader.tsx    # Global search, notifications, & action bar
        ├── dashboard/
        │   └── OverviewView.tsx # KPI cards, interactive SVG chart, & SLAs
        ├── products/
        │   ├── ProductsView.tsx # Catalog table, filters, stock modifiers, CSV
        │   └── AddProductModal.tsx # Add/Edit modal with asset presets
        ├── orders/
        │   ├── OrdersView.tsx   # Order pipeline, status filters, CSV
        │   └── OrderDetailDrawer.tsx # Receipt invoice, tracking, & status updater
        ├── categories/
        │   └── CategoriesView.tsx # Department taxonomy & creation
        ├── vendors/
        │   └── VendorsView.tsx  # Seller directory & approval workflow
        ├── customers/
        │   └── CustomersView.tsx # Buyer accounts & lifetime spend
        ├── coupons/
        │   └── CouponsView.tsx  # Promo codes & discount campaigns
        ├── banners/
        │   └── BannersView.tsx  # Hero carousel & marketing banners
        ├── analytics/
        │   └── AnalyticsView.tsx # Revenue contribution & funnel conversion
        ├── settings/
        │   └── SettingsView.tsx # Store settings & payment gateways
        └── storefront/
            └── StorefrontPreviewModal.tsx # Live customer shop mirror
```

---

## 📄 License
This project is for educational and portfolio demonstration purposes. All trademark rights for Sellzy belong to ReactBD.
