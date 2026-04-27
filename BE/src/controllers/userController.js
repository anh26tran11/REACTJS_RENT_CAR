import User from '../models/User.js';
import bcrypt from 'bcryptjs';

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

// @desc    Change user password
// @route   PUT /api/users/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (user && (await bcrypt.compare(currentPassword, user.password))) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
      res.json({ message: 'Thay đổi mật khẩu thành công' });
    } else {
      res.status(401).json({ message: 'Sai mật khẩu! Yêu cầu nhập lại' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
