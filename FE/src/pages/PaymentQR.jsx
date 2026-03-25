import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Copy, CheckCircle2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentQR = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = useState(null);

  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      toast.error('Không tìm thấy thông tin đơn hàng');
      navigate('/history');
    }
  }, [order, navigate]);

  if (!order) return null;

  const totalPrice = order.total_price || 0;
  const transferContent = `RENTAL ${order._id.slice(-6).toUpperCase()}`;
  
  // Thông tin ngân hàng của bạn
  const bankInfo = {
    bankName: "TPBank",
    accountNumber: "0000 2429 064",
    accountName: "TRAN TIEN ANH",
  };

  // Tạo URL VietQR với đầy đủ số tiền và nội dung
  const qrUrl = `https://img.vietqr.io/image/tpbank-${bankInfo.accountNumber.replace(/\s/g, '')}-compact2.jpg?amount=${totalPrice}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(bankInfo.accountName)}`;

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`Đã sao chép ${field}`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-orange-500 p-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Thanh toán đơn hàng</h1>
          <p className="text-orange-100">Vui lòng quét mã QR hoặc chuyển khoản theo thông tin bên dưới</p>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Cột Mã QR */}
            <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
                <img 
                  src={qrUrl} 
                  alt="QR Code Thanh Toán" 
                  className="w-full max-w-[250px] aspect-square object-contain"
                />
              </div>
              <p className="text-sm text-gray-500 text-center">
                Sử dụng app ngân hàng hoặc ví điện tử để quét mã
              </p>
            </div>

            {/* Cột Thông tin chuyển khoản */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Thông tin chuyển khoản</h2>
              
              <div className="space-y-4">
                {/* Ngân hàng */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ngân hàng</label>
                  <div className="font-bold text-slate-900 text-lg">{bankInfo.bankName}</div>
                </div>

                {/* Tên tài khoản */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Chủ tài khoản</label>
                  <div className="font-bold text-slate-900">{bankInfo.accountName}</div>
                </div>

                {/* Số tài khoản */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Số tài khoản</label>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mt-1 border border-gray-100">
                    <span className="font-bold text-slate-900 text-lg tracking-widest">{bankInfo.accountNumber}</span>
                    <button 
                      onClick={() => handleCopy(bankInfo.accountNumber, 'số tài khoản')}
                      className="text-orange-500 hover:bg-orange-50 p-2 rounded-md transition-colors"
                      title="Sao chép số tài khoản"
                    >
                      {copiedField === 'số tài khoản' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Số tiền */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Số tiền cần chuyển</label>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mt-1 border border-gray-100">
                    <span className="font-bold text-orange-600 text-xl">{totalPrice.toLocaleString()} ₫</span>
                    <button 
                      onClick={() => handleCopy(totalPrice.toString(), 'số tiền')}
                      className="text-orange-500 hover:bg-orange-50 p-2 rounded-md transition-colors"
                      title="Sao chép số tiền"
                    >
                      {copiedField === 'số tiền' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Nội dung */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nội dung chuyển khoản</label>
                  <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg mt-1 border border-orange-100">
                    <span className="font-bold text-slate-900">{transferContent}</span>
                    <button 
                      onClick={() => handleCopy(transferContent, 'nội dung')}
                      className="text-orange-500 hover:bg-orange-100 p-2 rounded-md transition-colors"
                      title="Sao chép nội dung"
                    >
                      {copiedField === 'nội dung' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-10 flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-6 text-center max-w-md">
              Hệ thống sẽ tự động xác nhận sau khi nhận được thanh toán. Bạn có thể kiểm tra trạng thái trong lịch sử đơn hàng.
            </p>
            <Button onClick={() => navigate('/history')} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-8 py-6 flex items-center gap-2">
              Hoàn tất & Về lịch sử đơn hàng <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentQR;
