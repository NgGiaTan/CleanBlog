const BlogPost = require('../models/BlogPost.js')
module.exports = (req, res) => {
     //res.sendFile(path.resolve(__dirname,'pages/about.html'))
    //res.render('post')
    BlogPost.findById(req.params.id)
    .then(detailPost=>{
        res.render('post',{
            detailPost})
    })
}