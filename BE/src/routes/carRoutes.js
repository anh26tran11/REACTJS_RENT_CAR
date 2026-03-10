import express from 'express';
import { getCars } from '../controllers/carController.js';

const router = express.Router();

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Lấy danh sách xe
 *     tags: [Cars]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Lọc theo phân khúc xe
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Lọc theo địa điểm
 *       - in: query
 *         name: seats
 *         schema:
 *           type: integer
 *         description: Lọc theo số chỗ ngồi
 *     responses:
 *       200:
 *         description: Danh sách xe
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
router.get('/', getCars);

export default router;
