import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Link } from 'react-router-dom';
import api from '../lib/api';

const CarList = () => {
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [location, setLocation] = useState('all');
  const [maxPrice, setMaxPrice] = useState('');

  // Fetch tất cả xe từ API một lần duy nhất
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/cars');
        setAllCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách xe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Lọc dữ liệu trực tiếp ở phía Frontend (Client-side filtering)
  useEffect(() => {
    let result = allCars;

    if (search) {
      result = result.filter(car => car.car_name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category !== 'Tất cả') {
      result = result.filter(car => car.category === category);
    }

    if (location !== 'all') {
      const locStr = location === 'hn' ? 'Hà Nội' : location === 'hcm' ? 'Hồ Chí Minh' : location === 'dn' ? 'Đà Nẵng' : location;
      result = result.filter(car => car.location && car.location.toLowerCase().includes(locStr.toLowerCase()));
    }

    if (maxPrice) {
      result = result.filter(car => car.daily_price <= Number(maxPrice));
    }

    setFilteredCars(result);
  }, [search, category, location, maxPrice, allCars]);

  const handleClearFilters = () => {
    setSearch('');
    setCategory('Tất cả');
    setLocation('all');
    setMaxPrice('');
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filter */}
      <aside className="w-full md:w-64 flex-shrink-0 bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg text-slate-900">Bộ lọc</h2>
          <button onClick={handleClearFilters} className="text-orange-500 text-sm font-medium hover:underline">Xóa tất cả</button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-slate-700 block mb-2">Tìm kiếm</label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tên xe..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-slate-700 block mb-2">Loại xe</label>
          <div className="flex flex-wrap gap-2">
            {["Tất cả", "Sedan", "SUV", "Hatchback", "Hạng sang", "Bán tải"].map((cat) => (
              <Badge 
                key={cat}
                variant={category === cat ? "default" : "outline"}
                className={`cursor-pointer ${category === cat ? "bg-orange-500 hover:bg-orange-600" : "text-slate-600 font-normal hover:bg-gray-50 border-gray-200"}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-slate-700 block mb-2">Địa điểm</label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:ring-orange-500/20">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="hn">Hà Nội</SelectItem>
              <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
              <SelectItem value="dn">Đà Nẵng</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Max Price */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">Giá tối đa (VNĐ/ngày)</label>
          <input 
            type="number" 
            placeholder="VD: 2000000" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Thuê xe</h1>
          <p className="text-gray-500 text-sm">Tìm thấy <span className="font-semibold text-slate-900">{filteredCars.length}</span> xe phù hợp với nhu cầu của bạn</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading ? (
             <p className="text-gray-500 py-6">Đang tải danh sách xe...</p>
          ) : filteredCars.map((car) => (
            <Card key={car._id} className="overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all group flex flex-col">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Badge className="absolute top-3 left-3 z-10 bg-orange-500 hover:bg-orange-600 text-xs px-2 py-0.5">{car.category}</Badge>
                <img src={car.image_url} alt={car.car_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <CardContent className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{car.car_name}</h3>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-500 font-bold mr-1">★ {car.rating || "5.0"}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="truncate">{car.location || "Toàn quốc"}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-5 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg text-center">
                  <div>
                    <span className="block font-medium text-slate-700">{car.seats}</span>
                    <span className="scale-90 inline-block text-[10px] uppercase tracking-wider">Chỗ</span>
                  </div>
                  <div className="border-l border-gray-200">
                    <span className="block font-medium text-slate-700">{car.transmission_type}</span>
                    <span className="scale-90 inline-block text-[10px] uppercase tracking-wider">Số</span>
                  </div>
                  <div className="border-l border-gray-200">
                    <span className="block font-medium text-slate-700">{car.fuel_type}</span>
                    <span className="scale-90 inline-block text-[10px] uppercase tracking-wider">NL</span>
                  </div>
                </div>

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-lg font-bold text-orange-500">{car.daily_price?.toLocaleString()} ₫</span>
                    <span className="text-gray-400 text-xs">/ngày</span>
                  </div>
                  <Link to="/checkout" state={{ car }}>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4">Đặt xe</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CarList;
