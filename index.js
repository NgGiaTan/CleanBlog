const express = require('express')
const mongoose = require('mongoose');
const expressSession = require('express-session');
const app = new express()
//Khai bao ejs engine
const ejs = require('ejs')
app.set('view engine','ejs')

//Khai vao module file upload
const fileUpload = require('express-fileupload')
app.use(fileUpload())

// module bodyparser, mục đích để module này sẽ parse những dữ liệu trong POST request rồi đưa
// vào trường body để bạn có thể lấy ra một cách dễ dàng
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
        useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

//Đăng ký thư mục public.
app.use(express.static('public'))

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.use(expressSession({
    secret: 'keyboard cat'
    }))


global.loggedIn = null;
app.use("*", (req, res, next) => {
loggedIn = req.session.userId;
next()
});


// middleware
const authMiddleware = require('./middleware/authMiddleware')
const authRedirect = require('./middleware/authRedirect')
//Routing.
app.get('/', require('./controllers/home.js'))

// Với đoạn code trên, ExpressJS sẽ tìm trong thư mục "views" của dự án xem có tệp
// index.ejs không? Nếu có thì generate ra HTML với sự trợ giúp của EJS engine.

app.get('/about', (req, res) =>{
    //res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about')
})

app.get('/contact', (req, res) =>{
    //res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('contact')
})

app.get('/post/:id', require('./controllers/getPost.js'))

app.get('/posts/new', authMiddleware, require('./controllers/newPost.js'))

app.use('/posts/store',authMiddleware, require('./middleware/validateM.js'))

app.post('/posts/store' , require('./controllers/storePost.js'));// truyền validate vào thẳng post/store để kiểm tra khi gửi req
    

app.get('/auth/register', authRedirect, require('./controllers/newUser.js'));
app.post('/users/register', authRedirect, require('./controllers/storeUser.js'));

app.get('/auth/login', authRedirect, require('./controllers/login.js'));
app.post('/users/login', authRedirect, require('./controllers/loginUser.js'));
app.get('/auth/logout', require('./controllers/logout'));
app.use((req, res) => res.render('notfound'));
