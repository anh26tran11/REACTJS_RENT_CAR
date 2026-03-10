# Tài liệu Đặc tả Chức năng Hệ thống Thuê xe

Dự án này tập trung vào việc cung cấp nền tảng kết nối giữa khách hàng và các dịch vụ cho thuê xe ô tô. Dưới đây là danh sách các chức năng chính được thiết kế dựa trên cấu trúc cơ sở dữ liệu hiện tại.

---

## 1. Quản lý Người dùng

### 🔐 Đăng ký (SignUp)
- **Mô tả**: Cho phép người dùng mới tạo tài khoản để sử dụng dịch vụ.
- **Dữ liệu yêu cầu**: Tên người dùng, Email (duy nhất), Số điện thoại, Ảnh đại diện.
- **Bảng liên quan**: `Users`

### 🔑 Đăng nhập (Login)
- **Mô tả**: Xác thực người dùng vào hệ thống để thực hiện các chức năng cá nhân hóa và đặt xe.
- **Luồng xử lý**: Kiểm tra thông tin tài khoản và trả về phiên làm việc (Session/Token).
- **Bảng liên quan**: `Users`

### 👤 Chỉnh sửa hồ sơ cá nhân
- **Mô tả**: Người dùng có quyền cập nhật thông tin cá nhân để giữ cho dữ liệu luôn chính xác.
- **Các trường cho phép sửa**: `user_name`, `avatar`, `phone_number`.
- **Bảng liên quan**: `Users`

---

## 2. Dịch vụ Thuê xe

### 🚗 Lấy danh sách xe
- **Mô tả**: Hiển thị toàn bộ xe có sẵn trong hệ thống để người dùng lựa chọn.
- **Tính năng mở rộng**: Lọc xe theo phân khúc (`category`), địa điểm (`location`), hoặc số chỗ ngồi (`seats`).
- **Bảng liên quan**: `Cars`

### 📅 Đặt xe (Dat xe)
- **Mô tả**: Người dùng thực hiện đặt một chiếc xe cụ thể cho hành trình của mình.
- **Dữ liệu ghi lại**: 
  - Liên kết `user_id` và `car_id`.
  - Ngày nhận xe, địa điểm nhận, số ngày thuê.
  - Tổng tiền và phương thức thanh toán.
- **Trạng thái mặc định**: `Chờ xác nhận`.
- **Bảng liên quan**: `Orders`, `Cars`

### ❌ Hủy đơn
- **Mô tả**: Người dùng có thể hủy yêu cầu đặt xe nếu không còn nhu cầu.
- **Điều kiện**: Chỉ áp dụng cho các đơn hàng đang ở trạng thái `Chờ xác nhận`.
- **Kết quả**: Cập nhật `status` của đơn hàng thành `Đã hủy`.
- **Bảng liên quan**: `Orders`

---

## 3. Quy trình Trạng thái Đơn hàng (Workflow)



1. **Khởi tạo**: Đơn hàng mới -> `Chờ xác nhận`.
2. **Xử lý**: 
   - Chủ xe đồng ý -> `Đã xác nhận`.
   - Khách hàng/Hệ thống hủy -> `Đã hủy`.
3. **Hoàn tất**: Sau khi trả xe và thanh toán -> `Hoàn thành`.

---
*Tài liệu này được soạn thảo vào ngày 05/03/2026.*