import Car from '../models/Car.js';

// @desc    Get all cars with filters
// @route   GET /api/cars
// @access  Public
export const getCars = async (req, res) => {
  try {
    const { category, location, seats, search, maxPrice } = req.query;

    let query = {};

    if (search) {
      query.car_name = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (location) {
        // Simple regex map for partial matching, ex. "Hồ Chí Minh"
      query.location = { $regex: location, $options: 'i' };
    }

    if (seats) {
      query.seats = Number(seats);
    }

    if (maxPrice) {
      query.daily_price = { $lte: Number(maxPrice) };
    }

    const cars = await Car.find(query);
    res.json(cars);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
