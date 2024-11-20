const BlogPost = require('../models/BlogPost.js')
module.exports = (request, response) => {
 //response.sendFile(path.resolve(__dirname, 'index.html'))
    //response.render('index')
    BlogPost.find({})
        .then(posts =>{
            //console.log(posts)
            console.log(request.session)
            response.render('index', {
                
                blogposts: posts
            })
        })
}