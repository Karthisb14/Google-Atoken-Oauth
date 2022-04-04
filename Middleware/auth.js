const request = require('request')

const auth = async (req, res, next) => {

    const cookie = req.cookies['session-token']
    // console.log(cookie)
    var url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${cookie}`

    request({
        method: "GET",
        url: url
    }, (e, response, body) => {
        if (e) {
            console.log(e)
        } else {
            const filestore = JSON.parse(body)
            // console.log(filestore)
            const user = {

                name: filestore.name,
                email: filestore.email,
                picture: filestore.picture
            }
            // console.log(user);
            req.user = user
            next()
        }
    })
        
}

const verifytoken = async (req, res, next) =>{

    const token = req.header('Authorization').replace('Bearer ', '')
    // console.log(token);

    var url = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`

    request({
        method: 'GET',
        url
    }, (e, response, body) => {
        const data = JSON.parse(body)
        // console.log(data)
        const verifydata = {
            email_verified: data.email_verified
        }
        req.verifydata = verifydata
        res.cookie('session-token', token)
        next()
    })
}


module.exports = {auth,verifytoken}