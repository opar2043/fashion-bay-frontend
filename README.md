# Fashion Bay - Frontend

Welcome to the Fashion Bay frontend! This is a modern e-commerce platform built with React and Vite, offering a seamless shopping experience for fashion enthusiasts.

## 🔐 Admin Credentials

Use these credentials to access the admin dashboard:

- **Email:** fashionbay.admin@gmail.com
- **Password:** 1234567

## 🌐 Live Link

Visit the live application here: [https://fashion-bay-pro.netlify.app/](https://fashion-bay-pro.netlify.app/)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 🏗️ Project Structure

```
src/
├── Components/
│   ├── About/          # About, FAQ, Policy pages
│   ├── Dashboard/      # Admin and user dashboards
│   ├── Firebase/       # Authentication
│   ├── Hooks/          # Custom React hooks
│   ├── Products/       # Product display and categories
│   ├── Review/         # Customer reviews
│   ├── Root/           # Layout components
│   ├── Share/          # Shared components
│   └── Wishlist/       # Wishlist functionality
├── App.jsx             # Main App component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## ✨ Key Features

- **Product Catalog** - Browse and search fashion items
- **Shopping Cart** - Add/remove items from cart
- **User Authentication** - Sign up and login with Firebase
- **Role-Based Redirect** - Admins land on the dashboard after login, customers on the store
- **Admin Dashboard** - Manage products, orders, and users
- **Order Status Workflow** - Update orders as Confirmed → Shipped → Delivered → Cancelled
- **Analytics Overview** - Revenue, average order value, 7-day revenue trend, order-status breakdown & recent orders
- **Newsletter Subscriptions** - Footer signup with a dashboard subscribers list (CSV export)
- **Contact Inbox** - Contact messages saved to a dashboard inbox (read / unread / delete)
- **Customer Reviews** - Read and submit product reviews
- **Wishlist** - Save favorite items
- **About & FAQ Pages** - Brand story and frequently asked questions
- **Responsive Design** - Optimized for mobile and desktop

## 🆕 Recent Upgrade Highlights

- A redesigned, e-commerce-grade **admin dashboard** (sidebar + analytics) using the
  brand palette — see [`DESIGN.md`](../DESIGN.md).
- Three full-stack features (Newsletter, Contact Inbox, Order Status) spanning the
  frontend, the Express/Mongo backend, and dedicated dashboard routes.
- A redesigned multi-column **footer** with newsletter signup and a polished **About** page.
- An **FAQ** section added to the bottom of the home page.

> Full visual language (colours, typography, components) is documented in
> [`DESIGN.md`](../DESIGN.md) at the repository root.

## 🛠️ Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase** - Authentication and backend services
- **Axios** - HTTP client
- **ESLint** - Code quality tool

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🔗 Backend

The backend API is located in the `../backend` directory. Make sure the backend is running for full functionality.

## 📝 Configuration

### Tailwind CSS

Configuration file: `tailwind.config.js`

### Vite

Configuration file: `vite.config.js`

### ESLint

Configuration file: `eslint.config.js`

## 🤝 Contributing

Feel free to contribute by submitting issues or pull requests.

## 📄 License

This project is private and proprietary.

---

**Happy Shopping! 🛍️**
