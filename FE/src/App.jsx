import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import CarList from './pages/CarList';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PaymentQR from './pages/PaymentQR';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="cars" element={<CarList />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment-qr" element={<PaymentQR />} />
            <Route path="profile" element={<Profile />} />
            <Route path="history" element={<OrderHistory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
