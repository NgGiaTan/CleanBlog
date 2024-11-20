const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://localhost/test_my_database');

// Cách cũ lỗi khi dùng callback:
// BlogPost.create({
//     title: 'Đây là sách dạy học lập trình Node.js từ cơ bản',
//     body: 'Nếu bạn đam mê với Javascript và muốn khám phá cách xây dựng ứng dụng với Node.js thì đây là cuốn sách dành cho bạn.'
//     })

// Dùng Promise để create một doc mới:
// BlogPost.create({
//     title: 'C++ cơ bản',
//     body: 'Nếu bạn đam mê với C++ và muốn khám phá cách xây dựng ứng dụng với thì đây là cuốn sách dành cho bạn.'
//     })
//     .then(newBlogPost => {
//         console.log('Blog post created:', newBlogPost);
//     })
    // .catch(error => {
    //     console.error('Error creating blog post:', error);
    // });

//Lấy ra doc trong db bằng promise:
// BlogPost.find({title:'C++ cơ bản'})
//     .then(resutl =>{
//         console.log(resutl)})
//     .catch(error => {
//         console.error('Error finding blog posts:', error)
//     });   


var id = "6593ea8e50278653447347b5";
BlogPost.findByIdAndUpdate(id, {
    title: 'C# nâng cao 1'}, { new: true }) // new: true để trả về giá trị sau khi update
    .then(resutl =>{
        console.log(resutl)})
    .catch(error => {
        console.error('Error finding blog posts:', error)})   
