const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    try {
        const {token} = req.cookies;
        if (!token) {
           res.status(400).json({
                error:"Please login Again"
            })
        }
        const user = jwt.verify(token, 'this_is_private_key_for_crud')
        if (!user.name) {
            res.status(400).json({
                 error:"Please login Again"
             })
         }
         req.user = user;
         next()
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}