import React, { useState, useEffect } from 'react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, MapPin, ArrowLeft, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders');
        setOrders(data);
      } catch (error) {
        console.error("Lỗi khi tải lịch sử đơn hàng:", error);
        toast.error("Không thể tải lịch sử đơn hàng");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn này?')) return;
    try {
      await api.put(`/orders/${orderId}/cancel`);
      toast.success('Đã hủy đơn thành công');
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: 'Đã hủy' } : o));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi hủy đơn');
    }
  };

  const statusColors = {
    'Chờ xác nhận': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Đã xác nhận': 'bg-blue-100 text-blue-700 border-blue-200',
    'Đã hủy': 'bg-red-100 text-red-700 border-red-200',
    'Hoàn thành': 'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 max-w-5xl">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-orange-500 mb-6 text-sm transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Trang chủ
      </Link>

      <h1 className="text-3xl font-bold text-slate-900 mb-8">Lịch sử đơn hàng</h1>

      {loading ? (
        <p className="text-gray-500">Đang tải lịch sử...</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                {/* Left Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-slate-900">{order.car_id ? order.car_id.car_name : 'Xe không tồn tại'}</h3>
                    <Badge variant="outline" className={`${statusColors[order.status] || 'bg-gray-100 text-gray-700'} font-semibold px-3 py-1`}>
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                    <div className="flex items-center text-slate-600">
                      <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                      {order.duration_days} ngày
                    </div>
                    <div className="flex items-center text-slate-600">
                      <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                      {order.pickup_location}
                    </div>
                    <div className="text-slate-400 bg-gray-50 px-2 py-1 rounded-md">
                      {new Date(order.order_date).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                </div>

                {/* Right Content */}
                <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-100 md:border-0">
                  <div className="text-right w-full">
                    <p className="text-2xl font-bold text-orange-500">{order.total_price.toLocaleString()} ₫</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">
                      {order.payment_method}
                    </p>
                  </div>
                  
                  {order.status === 'Chờ xác nhận' && (
                    <Button onClick={() => handleCancelOrder(order._id)} variant="outline" className="w-full md:w-auto text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300 font-medium">
                      <XCircle className="w-4 h-4 mr-2" />
                      Hủy đơn
                    </Button>
                  )}
                </div>

              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500">Bạn chưa có đơn đặt xe nào.</p>
              <Link to="/cars">
                <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                  Khám phá xe ngay
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
