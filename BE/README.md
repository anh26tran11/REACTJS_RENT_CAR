# VroomCar Backend API Documentation

Tài liệu này mô tả chi tiết các API (Endpoints), cách sử dụng (Payload), và các dữ liệu trả về (Response) cho hệ thống Backend của dịch vụ thuê xe VroomCar.

**Base URL**: `https://reactjs-rent-car.onrender.com/api`

---

## 🔐 1. Authentication (Xác thực)

### 1.1. Đăng ký tài khoản mới (Sign Up)
- **Method**: `POST`
- **Endpoint**: `/auth/signup`
- **Mô tả**: Tạo một tài khoản người dùng mới trong hệ thống.
- **Request Body** (JSON):
```json
{
  "user_name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "password": "password123",
  "phone_number": "0901234567",
  "avatar": "https://example.com/avatar.jpg" // Không bắt buộc
}
```
- **Response** (`201 Created`):
```json
{
  "_id": "64bcdef12345...",
  "user_name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "phone_number": "0901234567",
  "avatar": "https://example.com/avatar.jpg",
  "token": "eyJhbGciOiJIUzI1NiIsInR5c... (Chuỗi JWT Token)"
}
```
- **Lỗi phổ biến** (`400 Bad Request`): Cung cấp thiếu trường bắt buộc hoặc `Email đã tồn tại`.

### 1.2. Đăng nhập (Login)
- **Method**: `POST`
- **Endpoint**: `/auth/login`
- **Mô tả**: Xác thực người dùng và trả về JWT Token.
- **Request Body** (JSON):
```json
{
  "email": "nguyenvana@example.com",
  "password": "password123"
}
```
- **Response** (`200 OK`):
```json
{
  "_id": "64bcdef12345...",
  "user_name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "phone_number": "0901234567",
  "avatar": "https://example.com/avatar.jpg",
  "token": "eyJhbGciOiJIUzI1NiIsInR5c... (Cần dùng cho các API yêu cầu xác thực)"
}
```
- **Lỗi phổ biến** (`401 Unauthorized`): `Email hoặc mật khẩu không đúng`.

---

## 👤 2. Người dùng (Users)

### 2.1. Cập nhật hồ sơ cá nhân
- **Method**: `PUT`
- **Endpoint**: `/users/profile`
- **Headers**: 
  - `Authorization`: `Bearer <Token_của_bạn_từ_Login>`
- **Mô tả**: Cập nhật thông tin của người dùng đang đăng nhập. Không cho phép sửa Email.
- **Request Body** (JSON - Chỉ truyền lên các trường cần sửa):
```json
{
  "user_name": "Nguyễn Văn B",
  "phone_number": "0988888888",
  "avatar": "https://example.com/new_avatar.jpg"
}
```
- **Response** (`200 OK`):
```json
{
  "_id": "64bcdef12345...",
  "user_name": "Nguyễn Văn B",
  "email": "nguyenvana@example.com",
  "phone_number": "0988888888",
  "avatar": "https://example.com/new_avatar.jpg"
}
```

---

## 🚗 3. Dịch vụ Thuê xe (Cars)

### 3.1. Lấy danh sách xe
- **Method**: `GET`
- **Endpoint**: `/cars`
- **Mô tả**: Lấy toàn bộ danh sách xe. Hỗ trợ query để lọc xe.
- **Query Parameters (Tùy chọn)**:
  - `category`: Lọc theo phân khúc (VD: `Sedan`, `SUV`, `Hạng sang`)
  - `location`: Lọc theo địa điểm (VD: `Hà Nội`, `Hồ Chí Minh` - Hỗ trợ tìm tương đối)
  - `seats`: Lọc theo số chỗ ngồi (VD: `5`, `7`)
  - VD: `/api/cars?category=SUV&location=Hồ Chí Minh&seats=7`
- **Response** (`200 OK`):
```json
[
  {
    "_id": "64bca1...",
    "car_name": "Honda CR-V 2024",
    "category": "SUV",
    "rating": 4.9,
    "location": "Hồ Chí Minh",
    "seats": 7,
    "transmission_type": "automatic",
    "fuel_type": "gasoline",
    "daily_price": 1200000,
    "image_url": "https://...",
    "is_available": true,
    "createdAt": "2024-03-05T00:00:00.000Z",
    "updatedAt": "2024-03-05T00:00:00.000Z"
  },
  // ... các xe khác
]
```

---

## 📦 4. Đơn hàng (Orders)

### 4.1. Tạo đơn đặt xe mới (Checkout)
- **Method**: `POST`
- **Endpoint**: `/orders`
- **Headers**: 
  - `Authorization`: `Bearer <Token_của_bạn>`
- **Mô tả**: Đặt một chiếc xe. Đơn khởi tạo sẽ có trạng thái mặc định là `Chờ xác nhận`.
- **Request Body** (JSON):
```json
{
  "car_id": "64bca123...",     // ID của chiếc xe
  "order_date": "2026-03-05",  // Ngày nhận xe
  "pickup_location": "123 Nguyễn Huệ, TP.HCM",
  "duration_days": 2,          // Số ngày thuê
  "total_price": 2400000,      // Tổng tiền
  "payment_method": "Chuyển khoản"
}
```
- **Response** (`201 Created`):
```json
{
  "_id": "64bcdorder123...",
  "user_id": "64bcdef12345...",
  "car_id": "64bca123...",
  "order_date": "2026-03-05T00:00:00.000Z",
  "pickup_location": "123 Nguyễn Huệ, TP.HCM",
  "duration_days": 2,
  "total_price": 2400000,
  "status": "Chờ xác nhận",
  "payment_method": "Chuyển khoản",
  "createdAt": "2026-03-05T12:00:00.000Z",
  "updatedAt": "2026-03-05T12:00:00.000Z",
  "__v": 0
}
```
- **Lỗi phổ biến** (`404 Not Found`): `Xe không tồn tại`.

### 4.2. Hủy đơn hàng
- **Method**: `PUT`
- **Endpoint**: `/orders/:id/cancel`
- **Headers**: 
  - `Authorization`: `Bearer <Token_của_bạn>`
- **Mô tả**: Hủy đơn đặt xe. **Lưu ý:**
  - Chỉ hủy được đơn hàng do chính User đó tạo ra.
  - Chỉ hủy được đơn khi trạng thái đang là `Chờ xác nhận`.
- **Path Parameters**:
  - `id`: Mã `_id` của đơn hàng (Order)
- **Request Body**: (Không bắt buộc)
- **Response** (`200 OK`): Trả về nguyên object đơn hàng đã được cập nhật thuộc tính `"status": "Đã hủy"`.
```json
{
  "_id": "64bcdorder123...",
  "user_id": "64bcdef12345...",
  "car_id": "64bca123...",
  "status": "Đã hủy",
  // ... các thông tin khác ...
  "updatedAt": "2026-03-06T09:00:00.000Z"
}
```
- **Lỗi phổ biến**:
  - `401 Unauthorized`: `Không có quyền thực hiện hành động này` (Hủy đơn của người khác).
  - `400 Bad Request`: `Chỉ có thể hủy đơn khi đang Chờ xác nhận` (Trường hợp đơn đã được Xác nhận hoặc Hoàn thành).

---
*Ghi chú: Để dễ dàng trải nghiệm, hãy bật server và mở `http://localhost:5000/api-docs` để xem trực tiếp Swagger UI cho các thao tác test nhanh bằng giao diện.*
