import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - car_id
 *         - user_id
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của đơn đặt xe
 *         car_id:
 *           type: string
 *           description: ID của xe (Ref đến Car Model)
 *         user_id:
 *           type: string
 *           description: ID của người đặt xe (Ref đến User Model)
 *         order_date:
 *           type: string
 *           format: date-time
 *           description: Ngày bắt đầu thuê xe
 *         pickup_location:
 *           type: string
 *           description: Vị trí nhận xe
 *         duration_days:
 *             type: integer
 *             description: Số ngày thuê
 *         total_price:
 *             type: number
 *             description: Tổng tiền thuê (VNĐ)
 *         status:
 *             type: string
 *             description: Trạng thái đơn đặt xe (Chờ xác nhận, Đã xác nhận, Đã hủy, Hoàn thành)
 *         payment_method:
 *             type: string
 *             description: Phương thức thanh toán (Tiền mặt, Chuyển khoản, v.v)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
const OrderSchema = new mongoose.Schema(
  {
    car_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    order_date: {
      type: Date,
    },
    pickup_location: {
      type: String,
    },
    duration_days: {
      type: Number,
    },
    total_price: {
      type: Number,
    },
    status: {
      type: String,
      default: "Chờ xác nhận",
    },
    payment_method: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
