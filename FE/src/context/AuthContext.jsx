import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Khôi phục user từ localStorage khi load trang
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Đăng nhập thành công!');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Lỗi kết nối đến máy chủ';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const signup = async (userData) => {
    try {
      const { data } = await api.post('/auth/signup', userData);
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Đăng ký tài khoản thành công!');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Có lỗi xảy ra khi đăng ký';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    toast.success('Đã đăng xuất!');
  };

  const updateProfile = async (updates) => {
    try {
      const { data } = await api.put('/users/profile', updates);
      // Dữ liệu mới không báo gồm token, nên ta copy lại token cũ
      const newUserInfo = { ...data, token: user.token };
      setUser(newUserInfo);
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      toast.success('Cập nhật hồ sơ thành công!');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Cập nhật thất bại';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await api.put('/users/change-password', { currentPassword, newPassword });
      toast.success('Thay đổi mật khẩu thành công');
      return { success: true };
    } catch (error) {
      toast.error('Sai mật khẩu! Yêu cầu nhập lại');
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile, changePassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
