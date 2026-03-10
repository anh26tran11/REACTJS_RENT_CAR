import dotenv from "dotenv";
import connectDB from "../config/database.js";
import Car from "../models/Car.js";

dotenv.config();

const cars = [
  {
    car_name: "Toyota Vios",
    category: "economy",
    seats: 5,
    transmission_type: "automatic",
    fuel_type: "gasoline",
    daily_price: 500000,
    image_url: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb",
    is_available: true,
    location: "Hà Nội",
    rating: 4.8,
  },
  {
    car_name: "Honda CR-V",
    category: "suv",
    seats: 7,
    transmission_type: "automatic",
    fuel_type: "gasoline",
    daily_price: 1200000,
    image_url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b",
    is_available: true,
    location: "Hồ Chí Minh",
    rating: 4.9,
  },
  {
    car_name: "Mercedes E-Class",
    category: "luxury",
    seats: 5,
    transmission_type: "automatic",
    fuel_type: "hybrid",
    daily_price: 3000000,
    image_url: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741",
    is_available: true,
    location: "Đà Nẵng",
    rating: 5.0,
  },
];

const seedData = async () => {
  try {
    await connectDB();

    // Xóa data cũ
    await Car.deleteMany({});
    console.log("🗑️  Đã xóa dữ liệu cũ");

    // Thêm data mới
    await Car.insertMany(cars);
    console.log("✅ Đã thêm dữ liệu mẫu");

    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi seed data:", error);
    process.exit(1);
  }
};

seedData();