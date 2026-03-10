import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, CreditCard, Landmark, Wallet } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../lib/api';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const car = location.state?.car;

  const [formData, setFormData] = useState({
    name: user?.user_name || '',
    email: user?.email || '',
    phone: user?.phone_number || '',
    pickup_location: '',
  });

  const [durationDays, setDurationDays] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('Chuyển khoản');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!car) {
      toast.error('Vui lòng chọn xe trước khi thanh toán');
      navigate('/cars');
    }
  }, [car, navigate]);

  if (!car) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const rentalPrice = car.daily_price * durationDays;
  const serviceFee = rentalPrice * 0.05;
  const totalPrice = rentalPrice + serviceFee;

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để đặt xe');
      navigate('/login');
      return;
    }
    if (!formData.pickup_location) {
      toast.error('Vui lòng nhập địa chỉ giao xe');
      return;
    }

    try {
      setLoading(true);
      const orderData = {
        car_id: car._id,
        order_date: new Date().toISOString(),
        pickup_location: formData.pickup_location,
        duration_days: durationDays,
        total_price: totalPrice,
        payment_method: paymentMethod,
      };

      await api.post('/orders', orderData);
      toast.success('Đặt xe thành công!');
      navigate('/order-history');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi thanh toán');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 max-w-6xl">
      <Link to="/cars" className="inline-flex items-center text-gray-500 hover:text-orange-500 mb-6 text-sm transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại danh sách xe
      </Link>

      <h1 className="text-3xl font-bold text-slate-900 mb-8">Thanh toán</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Customer Info */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Thông tin khách hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Họ tên *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Số điện thoại *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Địa chỉ giao xe *</label>
                <input type="text" name="pickup_location" value={formData.pickup_location} onChange={handleInputChange} placeholder="Nhập địa chỉ nhận xe..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium" />
              </div>
            </div>
          </section>

          {/* Rental Duration */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Thời gian thuê</h2>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-700">Số ngày thuê:</label>
              <div className="flex items-center gap-2">
                <input type="number" value={durationDays} onChange={(e) => setDurationDays(Math.max(1, parseInt(e.target.value) || 1))} min="1" className="w-20 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-center text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium" />
                <span className="text-sm text-gray-500">ngày</span>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Phương thức thanh toán</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div onClick={() => handlePaymentMethod('Chuyển khoản')} className={`border-2 ${paymentMethod === 'Chuyển khoản' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100 hover:border-orange-200 bg-white'} rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-colors`}>
                <Landmark className={`${paymentMethod === 'Chuyển khoản' ? 'text-orange-500' : 'text-gray-400'} w-5 h-5 flex-shrink-0`} />
                <span className={`font-semibold text-sm ${paymentMethod === 'Chuyển khoản' ? 'text-orange-700' : 'text-slate-600'}`}>Chuyển khoản</span>
              </div>
              <div onClick={() => handlePaymentMethod('Thẻ tín dụng')} className={`border-2 ${paymentMethod === 'Thẻ tín dụng' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100 hover:border-orange-200 bg-white'} rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-colors`}>
                <CreditCard className={`${paymentMethod === 'Thẻ tín dụng' ? 'text-orange-500' : 'text-gray-400'} w-5 h-5 flex-shrink-0`} />
                <span className={`font-semibold text-sm ${paymentMethod === 'Thẻ tín dụng' ? 'text-orange-700' : 'text-slate-600'}`}>Thẻ tín dụng</span>
              </div>
              <div onClick={() => handlePaymentMethod('Ví điện tử')} className={`border-2 ${paymentMethod === 'Ví điện tử' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100 hover:border-orange-200 bg-white'} rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-colors`}>
                <Wallet className={`${paymentMethod === 'Ví điện tử' ? 'text-orange-500' : 'text-gray-400'} w-5 h-5 flex-shrink-0`} />
                <span className={`font-semibold text-sm ${paymentMethod === 'Ví điện tử' ? 'text-orange-700' : 'text-slate-600'}`}>Ví điện tử</span>
              </div>
            </div>

            <Button onClick={handleCheckout} disabled={loading} size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-orange-500/30 disabled:opacity-70">
              {loading ? 'Đang xử lý...' : 'Xác nhận thanh toán'} <span className="ml-2 font-normal">→</span>
            </Button>
          </section>

        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Tóm tắt đơn hàng</h2>
            
            <div className="mb-6">
              <div className="rounded-xl overflow-hidden mb-4 bg-gray-100 aspect-video relative">
                <img src={car.image_url} alt={car.car_name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-1">{car.car_name}</h3>
              <p className="text-sm text-gray-500">
                {car.location} <span className="mx-1">•</span> {car.transmission_type} <span className="mx-1">•</span> {car.fuel_type}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Giá thuê ({durationDays} ngày)</span>
                <span className="font-semibold text-slate-900">{rentalPrice.toLocaleString()} ₫</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Phí dịch vụ (5%)</span>
                <span className="font-semibold text-slate-900">{serviceFee.toLocaleString()} ₫</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between items-center mt-2">
              <span className="font-bold text-lg text-slate-900">Tổng cộng</span>
              <span className="font-bold text-2xl text-orange-500">{totalPrice.toLocaleString()} ₫</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
