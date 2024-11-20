const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Tìm người dùng theo username
    const user = await User.findOne({ username: username });

    if (!user) {
      // Nếu không tìm thấy người dùng, chuyển hướng đến trang đăng nhập
      return res.redirect('/auth/login');
    }

    // So sánh mật khẩu người dùng nhập với mật khẩu đã hash trong database
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Nếu mật khẩu khớp, lưu thông tin người dùng vào session
      req.session.userId = user._id;
      return res.redirect('/');
    } else {
      // Nếu mật khẩu không khớp, chuyển hướng đến trang đăng nhập
      return res.redirect('/auth/login');
    }
  } catch (error) {
    console.error('Error during login process:', error);
    res.status(500).send('Internal Server Error');
  }
};
