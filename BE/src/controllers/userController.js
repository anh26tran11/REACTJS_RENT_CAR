import User from '../models/User.js';

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.user_name = req.body.user_name || user.user_name;
      user.avatar = req.body.avatar || user.avatar;
      user.phone_number = req.body.phone_number || user.phone_number;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        user_name: updatedUser.user_name,
        email: updatedUser.email,
        phone_number: updatedUser.phone_number,
        avatar: updatedUser.avatar,
      });
    } else {
      res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
