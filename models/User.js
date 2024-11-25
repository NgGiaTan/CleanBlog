const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');


const UserSchema = new Schema({
username: {type: String, required: true},
password: {type: String, required: true}
});

//tạo index cho username với type:text và unique:duy nhất
UserSchema.index({ username: 'text' }, { unique: true });

UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 5, (error, hash) => {
    user.password = hash
    next()
    })
})
// export model
const User = mongoose.model('User', UserSchema);
module.exports = User