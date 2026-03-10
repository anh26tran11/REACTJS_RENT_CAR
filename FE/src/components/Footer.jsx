import React from 'react';
import { Car, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-400 py-12 pb-6 border-t border-slate-800">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand block */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 group cursor-pointer w-fit">
              <Car className="text-orange-500 w-8 h-8 group-hover:text-orange-400 transition" />
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-gray-200 transition">
                VroomCar
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-gray-400">
              Dịch vụ thuê xe uy tín hàng đầu Việt Nam. Đa dạng dòng xe, giá cả hợp lý, phục vụ 24/7.
            </p>
          </div>

          {/* Links block */}
          <div>
            <h3 className="text-white font-semibold mb-6">Liên kết</h3>
            <ul className="space-y-3">
              {['Trang chủ', 'Thuê xe', 'Ưu đãi', 'Liên hệ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-orange-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Car types block */}
          <div>
            <h3 className="text-white font-semibold mb-6">Loại xe</h3>
            <ul className="space-y-3">
              {['Sedan', 'SUV', 'Hạng sang', 'Bán tải'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-orange-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact block */}
          <div>
            <h3 className="text-white font-semibold mb-6">Liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-sm">1900 1234</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-sm">contact@vroomcar.vn</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-sm leading-relaxed">
                  123 Nguyễn Huệ, Q.1, TP.HCM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800 pt-6 text-center text-sm">
          <p>&copy; 2026 VroomCar. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
