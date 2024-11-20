const BlogPost = require('../models/BlogPost.js')
const path = require('path')
module.exports = (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', 'public/upload', image.name), function (err) {

        if (err) {
            return res.status(500).send('File upload failed: ' + err.message);
        }
    // model creates a new doc with browser data
    BlogPost.create({
        ...req.body,
        image: '/upload/' + image.name
        })
        .then(createdPost =>{
            console.log("thêm thành công")
            res.redirect('/')
        })
    })
    // model creates a new doc with browser data
    // BlogPost.create(req.body)
    //     .then(createdPost =>{
    //         console.log("thêm thành công")
    //         res.redirect('/')
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
}