import express from 'express';
import { createOrder, cancelOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Tạo đơn đặt xe mới
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - car_id
 *               - order_date
 *               - duration_days
 *               - total_price
 *             properties:
 *               car_id:
 *                 type: string
 *               order_date:
 *                 type: string
 *                 format: date
 *               pickup_location:
 *                 type: string
 *               duration_days:
 *                 type: integer
 *               total_price:
 *                 type: number
 *               payment_method:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo đơn thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Xe không tồn tại
 */
router.post('/', protect, createOrder);

/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   put:
 *     summary: Hủy đơn đặt xe
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Hủy đơn thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Không thể hủy đơn
 *       401:
 *         description: Không có quyền
 *       404:
 *         description: Không tìm thấy đơn
 */
router.put('/:id/cancel', protect, cancelOrder);

export default router;
