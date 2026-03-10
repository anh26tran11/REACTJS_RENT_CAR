import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, CreditCard, Landmark, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
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
                <input type="text" defaultValue="Trần Tiến Anh" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                <input type="email" defaultValue="anhtrann1204@gmail.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Số điện thoại *</label>
                <input type="tel" defaultValue="0901234567" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Địa chỉ giao xe</label>
                <input type="text" defaultValue="123 Nguyễn Huệ, Q.1" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium" />
              </div>
            </div>
          </section>

          {/* Rental Duration */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Thời gian thuê</h2>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-700">Số ngày thuê:</label>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue="1" min="1" className="w-20 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-center text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium" />
                <span className="text-sm text-gray-500">ngày</span>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Phương thức thanh toán</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="border-2 border-orange-500 bg-orange-50/30 rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                <Landmark className="text-orange-500 w-5 h-5 flex-shrink-0" />
                <span className="font-semibold text-orange-700 text-sm">Chuyển khoản</span>
              </div>
              <div className="border-2 border-gray-100 hover:border-orange-200 bg-white rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-colors">
                <CreditCard className="text-gray-400 w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-slate-600 text-sm">Thẻ tín dụng</span>
              </div>
              <div className="border-2 border-gray-100 hover:border-orange-200 bg-white rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-colors">
                <Wallet className="text-gray-400 w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-slate-600 text-sm">Ví điện tử</span>
              </div>
            </div>

            <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-orange-500/30">
              Xác nhận thanh toán <span className="ml-2 font-normal">→</span>
            </Button>
          </section>

        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Tóm tắt đơn hàng</h2>
            
            <div className="mb-6">
              <div className="rounded-xl overflow-hidden mb-4 bg-gray-100 aspect-video relative">
                <img src="https://images.unsplash.com/photo-1559416523-140ddc3d238c" alt="Ford Ranger" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-1">Ford Ranger Wildtrak</h3>
              <p className="text-sm text-gray-500">
                TP. Hồ Chí Minh <span className="mx-1">•</span> Số tự động <span className="mx-1">•</span> Dầu
              </p>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Giá thuê (1 ngày)</span>
                <span className="font-semibold text-slate-900">1.800.000 ₫</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Phí dịch vụ (5%)</span>
                <span className="font-semibold text-slate-900">90.000 ₫</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between items-center mt-2">
              <span className="font-bold text-lg text-slate-900">Tổng cộng</span>
              <span className="font-bold text-2xl text-orange-500">1.890.000 ₫</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
