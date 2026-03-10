import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name: '',
    phone_number: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setFormData({
        user_name: user.user_name || '',
        phone_number: user.phone_number || '',
      });
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateProfile(formData);
    setLoading(false);
  };

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
            {user.user_name ? user.user_name.substring(0, 2).toUpperCase() : 'US'}
          </div>
          <button className="text-gray-500 text-sm hover:text-orange-500 transition-colors font-medium">
            Nhấn vào ảnh để thay đổi
          </button>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input 
              type="email" 
              value={user.email} 
              disabled
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed font-medium" 
            />
            <p className="text-xs text-gray-400 mt-2">Email không thể thay đổi sau khi đăng ký.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Họ tên</label>
            <input 
              type="text" 
              name="user_name"
              value={formData.user_name} 
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Số điện thoại</label>
            <input 
              type="tel" 
              name="phone_number"
              value={formData.phone_number} 
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium" 
            />
          </div>

          <div className="pt-6">
            <Button disabled={loading} type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 text-base rounded-xl disabled:opacity-70">
              <Save className="w-5 h-5 mr-2" /> {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Profile;
