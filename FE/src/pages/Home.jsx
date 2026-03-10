import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';
import {
  MapPin, CalendarDays, Search, Shield, Headphones, Heart,
  Car, Users, Fuel, Settings2, Star, ArrowRight, Percent
} from 'lucide-react';
import api from '../lib/api';

const stats = [
  { icon: <Car className="w-7 h-7 text-orange-500" />, value: '500+', label: 'Xe cho thuê' },
  { icon: <Shield className="w-7 h-7 text-orange-500" />, value: '100%', label: 'Bảo hiểm' },
  { icon: <Headphones className="w-7 h-7 text-orange-500" />, value: '24/7', label: 'Hỗ trợ' },
  { icon: <Heart className="w-7 h-7 text-orange-500" />, value: '50K+', label: 'Khách hàng' },
];

const offers = [
  { title: 'Giảm 20% cuối tuần', desc: 'Thuê xe vào thứ 7 & CN được giảm 20% mọi dòng xe' },
  { title: 'Thuê dài hạn -30%', desc: 'Thuê từ 7 ngày trở lên, giảm ngay 30% tổng giá' },
  { title: 'Khách mới -15%', desc: 'Đăng ký lần đầu và nhận ngay ưu đãi 15%' },
];

const typeColors = {
  Sedan: 'bg-blue-500',
  SUV: 'bg-green-500',
  'Hạng sang': 'bg-purple-600',
  'Bán tải': 'bg-amber-600',
  'Điện': 'bg-teal-600',
};

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/cars');
        setCars(data.slice(0, 6)); // Lấy top 6 xe phổ biến nhất
      } catch (error) {
        console.error("Lỗi khi tải danh sách xe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);
  return (
    <div className="w-full">

      {/* ─── HERO ───────────────────────────────────────────────────── */}
      <section className="relative min-h-[580px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
        </div>

        <div className="relative container mx-auto px-6 lg:px-8 py-24 text-white">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-4">
            ⭐ Dịch vụ thuê xe số 1 Việt Nam
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight max-w-2xl mb-5">
            Hành trình của bạn,{' '}
            <span className="text-orange-500">Xe chúng tôi lo</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-lg mb-10 leading-relaxed">
            Đa dạng dòng xe từ tiết kiệm đến hạng sang. Giá tốt nhất, bảo
            hiểm toàn diện, giao xe tận nơi 24/7.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 font-bold px-8 py-6 rounded-full text-base shadow-lg shadow-orange-500/40">
              Đặt ngay
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20 font-semibold px-8 py-6 rounded-full text-base">
              Xem xe
            </Button>
          </div>

          {/* Search bar */}
          <div className="bg-white/95 backdrop-blur rounded-2xl p-2 max-w-3xl flex flex-col sm:flex-row gap-2 shadow-2xl">
            <div className="flex-1 flex items-center px-4 py-2 gap-3">
              <MapPin className="text-orange-400 w-5 h-5 shrink-0" />
              <select className="bg-transparent border-0 outline-none text-gray-700 text-sm w-full font-medium">
                <option>Tất cả</option>
                <option>Hà Nội</option>
                <option>TP. Hồ Chí Minh</option>
                <option>Đà Nẵng</option>
              </select>
            </div>
            <div className="w-px bg-gray-200 hidden sm:block" />
            <div className="flex-1 flex items-center px-4 py-2 gap-3">
              <MapPin className="text-orange-400 w-5 h-5 shrink-0" />
              <input type="text" placeholder="Chọn địa điểm" className="bg-transparent border-0 outline-none text-gray-700 text-sm w-full font-medium placeholder:text-gray-400" />
            </div>
            <div className="w-px bg-gray-200 hidden sm:block" />
            <div className="flex-1 flex items-center px-4 py-2 gap-3">
              <CalendarDays className="text-orange-400 w-5 h-5 shrink-0" />
              <input type="text" placeholder="mm/dd/yyyy" className="bg-transparent border-0 outline-none text-gray-700 text-sm w-full font-medium placeholder:text-gray-400" />
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 rounded-xl px-6 py-6 text-white font-semibold gap-2 shrink-0">
              <Search className="w-4 h-4" /> Tìm xe
            </Button>
          </div>
        </div>
      </section>

      {/* ─── STATS ──────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-4 px-8 py-8">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POPULAR CARS ───────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Section header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">
                Xe nổi bật
              </p>
              <h2 className="text-3xl font-extrabold text-slate-900">Xe phổ biến nhất</h2>
            </div>
            <Link
              to="/cars"
              className="flex items-center gap-1 text-orange-500 font-semibold text-sm hover:text-orange-600 group"
            >
              Xem tất cả
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-center text-gray-500 py-10 col-span-3">Đang tải danh sách xe...</p>
            ) : cars.map((car) => (
              <Card
                key={car._id}
                className="overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <Badge
                    className={`absolute top-3 left-3 z-10 text-white text-xs px-2.5 py-0.5 font-semibold ${typeColors[car.category] ?? 'bg-slate-600'}`}
                  >
                    {car.category}
                  </Badge>
                  <img
                    src={car.image_url}
                    alt={car.car_name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Body */}
                <CardContent className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {car.car_name}
                    </h3>
                  </div>

                  {/* Rating + location */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-slate-700">{car.rating || "5.0"}</span>
                    <span className="text-gray-300">•</span>
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{car.location || "Toàn quốc"}</span>
                  </div>

                  {/* Specs pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                      <Users className="w-3.5 h-3.5" /> {car.seats} chỗ
                    </span>
                    <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                      <Settings2 className="w-3.5 h-3.5" /> {car.transmission_type}
                    </span>
                    <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                      <Fuel className="w-3.5 h-3.5" /> {car.fuel_type}
                    </span>
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-lg font-extrabold text-orange-500">
                        {car.daily_price?.toLocaleString()} ₫
                      </span>
                      <span className="text-xs text-gray-400">/ngày</span>
                    </div>
                    <Link to="/checkout">
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5">
                        Đặt xe
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPECIAL OFFERS ─────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-2">
            Ưu đãi
          </p>
          <h2 className="text-3xl font-extrabold mb-12">Ưu đãi đặc biệt</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer, i) => (
              <div
                key={i}
                className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-left hover:border-orange-500 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-700 group-hover:bg-orange-500/20 flex items-center justify-center mb-6 transition-colors">
                  <Percent className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">{offer.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{offer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Sẵn sàng cho chuyến đi tiếp theo?
          </h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Đặt xe chỉ trong 2 phút. Giao xe tận nơi, bảo hiểm toàn diện.
          </p>
          <Link to="/cars">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 px-12 py-6 rounded-full font-bold text-base shadow-lg shadow-orange-500/30 gap-2">
              Thuê xe ngay <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
