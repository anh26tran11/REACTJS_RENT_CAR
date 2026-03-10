import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - car_name
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của xe được tự động tạo bởi MongoDB
 *         car_name:
 *           type: string
 *           description: Tên dòng xe
 *         category:
 *           type: string
 *           description: Phân khúc xe (e.g. Sedan, SUV)
 *         rating:
 *           type: number
 *           description: Đánh giá trung bình
 *         location:
 *           type: string
 *           description: Vị trí của xe
 *         seats:
 *             type: integer
 *             description: Số lượng chỗ ngồi
 *         transmission_type:
 *             type: string
 *             description: Loại hộp số (Số sàn, Số tự động)
 *         fuel_type:
 *             type: string
 *             description: Loại nhiên liệu (Xăng, Dầu, Điện)
 *         daily_price:
 *             type: number
 *             description: Giá thuê cơ bản mỗi ngày
 *         image_url:
 *             type: string
 *             description: Link hình ảnh của xe
 *         is_available:
 *             type: boolean
 *             description: Tình trạng trống lịch hiện tại
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời điểm tạo bản ghi
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Thời điểm cập nhật cuối
 */
const CarSchema = new mongoose.Schema(
  {
    car_name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    rating: {
      type: Number,
    },
    location: {
      type: String,
    },
    seats: {
      type: Number,
    },
    transmission_type: {
      type: String,
    },
    fuel_type: {
      type: String,
    },
    daily_price: {
      type: Number,
    },
    image_url: {
      type: String,
    },
    is_available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", CarSchema);

export default Car;
