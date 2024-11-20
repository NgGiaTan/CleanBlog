// Hàm Kiểm tra nếu không có file hoặc không có tiêu đề

module.exports = (req, res, next) => {
    
    if (!req.files || !req.files.image || !req.body.title) {
        console.log('Thiếu file hoặc tiêu đề');
        return res.redirect('/posts/new?error=Điền đầy đủ thông tin!');
    }
    next();
};