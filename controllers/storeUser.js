const User = require('../models/User.js')

module.exports = (req, res) => {
    User.create(req.body)
        .then((user) =>{
            console.log("thêm thành công")
            res.redirect('back')
        })
        .catch((err) =>{
            console.log(err)
            res.redirect('back')
        })
    

}