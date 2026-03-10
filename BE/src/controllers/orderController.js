import Order from '../models/Order.js';
import Car from '../models/Car.js';

// @desc    Create new order (Đặt xe)
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const {
      car_id,
      order_date,
      pickup_location,
      duration_days,
      total_price,
      payment_method,
    } = req.body;

    // Check if the car exists
    const carExists = await Car.findById(car_id);
    if (!carExists) {
      return res.status(404).json({ message: 'Xe không tồn tại' });
    }

    const order = new Order({
      user_id: req.user._id,
      car_id,
      order_date,
      pickup_location,
      duration_days,
      total_price,
      payment_method,
      status: 'Chờ xác nhận',
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel an order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn đặt xe' });
    }

    // Check if user is the owner
    if (order.user_id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Không có quyền thực hiện hành động này' });
    }

    if (order.status !== 'Chờ xác nhận') {
      return res.status(400).json({ message: 'Chỉ có thể hủy đơn khi đang Chờ xác nhận' });
    }

    order.status = 'Đã hủy';
    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user._id })
      .populate('car_id')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
