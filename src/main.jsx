import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,  
} from '@tanstack/react-query'
import Root from './Components/Root/Root.jsx';
import Home from './Components/Root/Home.jsx';
import Error from './Components/Root/Error.jsx';
import Login from './Components/Firebase/Login.jsx';
import Register from './Components/Firebase/Register.jsx';
import Wishlist from './Components/Wishlist/Wishlist.jsx';
import Products from './Components/Products/Products.jsx';
import ViewProduct from './Components/Products/ViewProduct.jsx';
import Dashboard from './Components/Dashboard/Admin/Dashboard.jsx';
import AddProducts from './Components/Dashboard/ProductsCollection/AddProducts.jsx';
import EditProduct from './Components/Dashboard/ProductsCollection/EditProduct.jsx';
import AllProducts from './Components/Dashboard/ProductsCollection/AllProducts.jsx';
import Users from './Components/Dashboard/Users/Users.jsx';
import Order from './Components/Dashboard/Order/Order.jsx';
import AllThing from './Components/Dashboard/Admin/AllThing.jsx';
import AuthProvider from './Components/Firebase/AuthProvider.jsx';
import CategoryProduct from './Components/Products/Category/CategoryProduct.jsx';
import Payment from './Components/Dashboard/Order/Payment.jsx';
import Contact from './Components/About/Contact.jsx';
import LookBook from './Components/About/LookBook.jsx';
import Confirm from './Components/Dashboard/Order/Confirm.jsx';
import Overview from './Components/Dashboard/Admin/Overview.jsx';
import CategoryInner from './Components/Products/CategoryInner/CategoryInner.jsx';
import Policy from './Components/About/Policy.jsx';
import Faq from './Components/About/Faq.jsx';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/wishlist',
        element: <Wishlist></Wishlist>
      },
      {
        path: '/dresses' ,
        element: <Products></Products>
      },
      {
        path: '/payment' ,
        element: <Payment></Payment>
      },
      {
        path: '/contact' ,
        element: <Contact></Contact>
      },
      {
        path: '/policy' ,
        element: <Policy></Policy>
      },
      {
        path: '/faq' ,
        element: <Faq></Faq>
      },
      {
        path: '/confirm' ,
        element: <Confirm></Confirm>
      },
      {
        path: 'dresses/lookbook' ,
        element: <LookBook></LookBook>
      },
      {
        path: '/view/:id',
        element: <ViewProduct></ViewProduct>
      },
      {
        path: '/dresses/:category',
        element: <CategoryProduct></CategoryProduct>
      },
      {
        path: '/dresses/:cat1/:cat2',
        element: <CategoryInner></CategoryInner>
      },
    ]
  },
{
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
    {
      path: "/dashboard",
      element: <Overview></Overview>
    },
    {
      path: "/dashboard/add-product",
      element: <AddProducts></AddProducts>
    },
    {
      path: "/dashboard/edit-product/:id",
      element: <EditProduct></EditProduct>
    },
    {
      path: "/dashboard/all-product",
      element: <AllProducts />
    },
    {
      path: "/dashboard/users",
      element: <Users></Users>
    },
    {
      path: "/dashboard/orders",
      element: <Order></Order>
    },
    {
      path: "/dashboard/all-thing",
      element: <AllThing></AllThing>
    },

  ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)