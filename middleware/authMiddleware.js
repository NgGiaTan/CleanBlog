const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Tìm người dùng theo userId trong session
    const user = await User.findById(req.session.userId);

    // Nếu không tìm thấy người dùng, chuyển hướng về trang chủ
    if (!user) {
      return res.redirect('/');
    }

    // Người dùng tồn tại, tiếp tục thực hiện middleware tiếp theo
    next();
  } catch (error) {
    console.error('Error finding user:', error);
    res.redirect('/');
  }
};
