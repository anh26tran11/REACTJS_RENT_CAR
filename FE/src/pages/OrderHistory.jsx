import React from 'react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, MapPin, ArrowLeft, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const orders = [
    {
      id: 1,
      carName: 'Toyota Camry 2024',
      status: 'Chờ xác nhận',
      statusColor: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200',
      duration: '1 ngày',
      location: '01 Trần Khánh Dư, Đà Nẵng',
      date: '5/3/2026',
      price: '1.260.000',
      paymentMethod: 'Chuyển khoản'
    }
  ];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 max-w-5xl">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-orange-500 mb-6 text-sm transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Trang chủ
      </Link>

      <h1 className="text-3xl font-bold text-slate-900 mb-8">Lịch sử đơn hàng</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              
              {/* Left Content */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-900">{order.carName}</h3>
                  <Badge variant="outline" className={`${order.statusColor} font-semibold px-3 py-1`}>
                    {order.status}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                  <div className="flex items-center text-slate-600">
                    <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                    {order.duration}
                  </div>
                  <div className="flex items-center text-slate-600">
                    <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                    {order.location}
                  </div>
                  <div className="text-slate-400 bg-gray-50 px-2 py-1 rounded-md">
                    {order.date}
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-100 md:border-0">
                <div className="text-right w-full">
                  <p className="text-2xl font-bold text-orange-500">{order.price} ₫</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">
                    {order.paymentMethod}
                  </p>
                </div>
                
                <Button variant="outline" className="w-full md:w-auto text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300 font-medium">
                  <XCircle className="w-4 h-4 mr-2" />
                  Hủy đơn
                </Button>
              </div>

            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500">Bạn chưa có đơn đặt xe nào.</p>
            <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
              Khám phá xe ngay
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
