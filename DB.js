const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
mongoose.connect('mongodb://127.0.0.1:27017/CRUD',{}).then((res)=>{
    console.log('DBConnected');
}).catch((err)=>{
    console.log('check[5]',err);
})


const users = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name field is missing'],
        unique:true
    },
    email:{
        type:String,
        required:[true, 'email field is missing'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'password field is missing']
    },

})

users.pre('save',function(){
    this.password = bcrypt.hashSync(this.password, 10)
}) 

users.methods.checkPassword = function (input, encPassword){
    return bcrypt.compareSync(input, encPassword)
}

users.methods.createToken = function (res, user) {
    try {
        console.log('check[39]',user);
        const token =  jwt.sign({name:user.name, email:user.email},'this_is_private_key_for_crud',{expiresIn:"2h"})
        console.log('check[40]',token);
        res.status(200).cookie(`token`, token ,{ expires: new Date(Date.now() + 2*60*60*1000), httpOnly:true, path:"/"}).json({
            success:true
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}
const USERS = mongoose.model('user', users);
module.exports = {USERS}
