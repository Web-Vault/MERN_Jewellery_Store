import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Contact from "./pages/contact";
import ProductListing from "./pages/ProductListing";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import Wishlist from "./pages/Wishlist";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Logout from "./pages/Logout";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ReviewPage from './pages/ReviewPage';
import CollectionsPage from './pages/CollectionPage';
import SearchResults from './pages/searchResults';

// admin
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/admindashboard';
import UserList from './admin/users/UserList';
import AddUser from './admin/users/AddUser';
import UserCart from './admin/users/UserCart';
import UserWishlist from './admin/users/UserWishlist';
import ProductList from './admin/products/ProductList';
import AddProduct from './admin/products/AddProduct';
import CategoryManagement from './admin/products/CategoryManagement';
import OrderList from './admin/orders/OrderList';
import OrderDetails from './admin/orders/OrderDetails';
import ReviewList from './admin/reviews/ReviewList';
import DiscountList from './admin/discounts/DiscountList';
import DiscountForm from './admin/discounts/DiscountForm';
import ContactList from './admin/contacts/ContactList';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

const MainLayout = () => {
  const location = useLocation(); // Get current route

  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("userToken");
      setIsAuthenticated(!!token); // Updates state dynamically
    };

    checkAuth();
    window.addEventListener("storage", checkAuth); // Listen for token changes

    return () => window.removeEventListener("storage", checkAuth);
  }, []);


  // Hide Navbar & Footer on Login and Signup pages
  const hideNavbarAndFooter = location.pathname === "/login" || location.pathname === "/signup" || location.pathname.startsWith("/admin");;

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f3ee]">
      {!hideNavbarAndFooter && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />  {/* ✅ This must exist */}
          <Route path="/collections" element={<CollectionsPage />} />

          {/* authenticated routes */}
          <Route path="/cart" element={isAuthenticated ? <Cart /> : <Login />} />
          <Route path="/checkout" element={isAuthenticated ? <CheckoutPage /> : <Login />} />
          <Route path="/wishlist" element={isAuthenticated ? <Wishlist /> : <Login />} />
          <Route path="/order-history" element={isAuthenticated ? <OrderHistory /> : <Login />} />
          <Route path="/review" element={isAuthenticated ? <ReviewPage /> : <Login />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login />} />
          <Route path="/edit-profile" element={isAuthenticated ? <EditProfile /> : <Login />} />


          {/* Admin routes - MOVE THESE TO THE TOP */}

          <Route path="/admin/login" element={<AdminLogin />} />


          <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />

          <Route path="/admin/users" element={<AdminLayout><UserList /></AdminLayout>} />
          <Route path="/admin/users/add" element={<AdminLayout><AddUser /></AdminLayout>} />
          <Route path="/admin/users/cart/:userId" element={<AdminLayout><UserCart /></AdminLayout>} />
          <Route path="/admin/users/wishlist/:userId" element={<AdminLayout><UserWishlist /></AdminLayout>} />

          <Route path="/admin/products" element={<AdminLayout><ProductList /></AdminLayout>} />
          <Route path="/admin/products/add" element={<AdminLayout><AddProduct /></AdminLayout>} />
          <Route path="/admin/categories" element={<AdminLayout><CategoryManagement /></AdminLayout>} />
          {/* <Route path="/admin/products/edit/:id" element={<AdminLayout><EditProduct /></AdminLayout>} /> */}

          <Route path="/admin/orders" element={<AdminLayout><OrderList /></AdminLayout>} />
          <Route path="/admin/orders/:orderId" element={<AdminLayout><OrderDetails /></AdminLayout>} />

          <Route path="/admin/reviews" element={<AdminLayout><ReviewList /></AdminLayout>} />
          {/* <Route path="/admin/reviews/:reviewId" element={<AdminLayout><ReviewDetails /></AdminLayout>} /> */}
          {/* <Route path="/admin/users/:userId" element={<AdminLayout><UserDetails /></AdminLayout>} /> */}
          {/* <Route path="/admin/orders/:orderId" element={<AdminLayout><OrderDetails /></AdminLayout>} /> */}

          <Route path="/admin/discounts" element={<AdminLayout><DiscountList /></AdminLayout>} />
          <Route path="/admin/discounts/add" element={<AdminLayout><DiscountForm /></AdminLayout>} />
          <Route path="/admin/discounts/edit/:discountId" element={<AdminLayout><DiscountForm /></AdminLayout>} />

          <Route path="/admin/contacts" element={<AdminLayout><ContactList /></AdminLayout>} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>

      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
};

export default App;
