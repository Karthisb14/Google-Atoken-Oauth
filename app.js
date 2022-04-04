const cookieParser = require('cookie-parser')
const express = require('express')
const {auth, verifytoken} = require('./Middleware/auth')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())
app.use(cookieParser())


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/userinfo', verifytoken, async (req, res) => {

    const fileapp = req.verifydata
    if(fileapp.email_verified === 'true'){
        // console.log('hiiii')
        res.redirect('/dashboard')
    }

})

app.get('/dashboard', auth,(req, res) => {

    try{

        let user = req.user
        // console.log(user)
        res.render('dashboard',{user})
    }catch(error){
        console.log(error)
    }
   
    
})


app.get('/protectedRoute', (req, res) => {
    res.send('This route is protected')
})

app.get('/logout', (req, res) => {
    res.clearCookie('session-token');
    res.redirect('/login')
})


app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
})




