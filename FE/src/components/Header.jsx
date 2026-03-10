import React from 'react';
import { Car, ClipboardList, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth(); // Lấy thông tin user đăng nhập

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Thuê xe', path: '/cars' },
    { name: 'Ưu đãi', path: '#' },
    { name: 'Liên hệ', path: '#' },
  ];

  return (
    <header className="bg-slate-900 text-white w-full py-4 shadow-sm relative z-50">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Car className="text-orange-500 w-8 h-8 group-hover:text-orange-400 transition" />
          <span className="text-2xl font-bold tracking-tight text-white group-hover:text-gray-200 transition">
            VroomCar
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                location.pathname === link.path ? 'text-orange-500' : 'text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* User actions */}
        <div className="flex items-center gap-4 lg:gap-6">
          {user ? (
            <>
              <Link to="/history" className="text-gray-300 hover:text-white transition" title="Lịch sử thuê">
                <ClipboardList className="w-5 h-5" />
              </Link>
              
              <Link to="/profile" className="flex items-center gap-2 text-gray-300 hover:text-white transition" title="Khoảng tin cá nhân">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium hidden lg:inline max-w-[120px] truncate">
                  {user.user_name || user.email}
                </span>
              </Link>

              <button onClick={logout} className="text-gray-300 hover:text-red-400 transition" title="Đăng xuất">
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <Link to="/login" className="text-sm font-semibold text-white hover:text-orange-400 transition">
              Đăng nhập
            </Link>
          )}

          <Link to="/cars">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white border-0 font-medium ml-2 shadow-sm">
              Đặt xe ngay
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
