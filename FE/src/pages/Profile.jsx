import React from 'react';
import { Button } from '../components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 max-w-3xl">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-orange-500 mb-6 text-sm transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Trang chủ
      </Link>

      <h1 className="text-3xl font-bold text-slate-900 mb-8">Hồ sơ cá nhân</h1>

      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 mt-4">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-3xl mb-4 cursor-pointer hover:bg-orange-200 transition-colors shadow-sm border-4 border-white ring-2 ring-gray-100">
            TT
          </div>
          <button className="text-gray-500 text-sm hover:text-orange-500 transition-colors font-medium">
            Nhấn vào ảnh để thay đổi
          </button>
        </div>

        {/* Form Section */}
        <form className="max-w-xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input 
              type="email" 
              defaultValue="anhtrann1204@gmail.com" 
              disabled
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed font-medium" 
            />
            <p className="text-xs text-gray-400 mt-2">Email không thể thay đổi sau khi đăng ký.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Họ tên</label>
            <input 
              type="text" 
              defaultValue="Trần Tiến Anh" 
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Số điện thoại</label>
            <input 
              type="tel" 
              defaultValue="0901234567" 
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium" 
            />
          </div>

          <div className="pt-6">
            <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 text-base rounded-xl">
              <Save className="w-5 h-5 mr-2" /> Lưu thay đổi
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Profile;
