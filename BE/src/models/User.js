import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - user_name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của người dùng
 *         avatar:
 *           type: string
 *           description: Link ảnh đại diện
 *         user_name:
 *           type: string
 *           description: Họ và tên người dùng
 *         email:
 *           type: string
 *           description: Địa chỉ email của người dùng
 *         password:
 *             type: string
 *             description: Mật khẩu đã được hash
 *         phone_number:
 *             type: string
 *             description: Số điện thoại người dùng
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời điểm tạo tài khoản
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
const UserSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    user_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
