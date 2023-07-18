const express = require('express');
const route = express.Router();
const APIS = require('./controller')
const Auth = require('./middleware')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

route.post('/register', (req, res, next)=>{
    const apis = new APIS();
    return apis.register(req, res, next);
})

route.post('/login', (req, res, next)=>{
    const apis = new APIS();
    return apis.login(req, res, next);
})

route.post('/uploadImage',Auth, upload.any(), (req, res, next)=>{
    const apis = new APIS();
    return apis.uploadImage(req, res, next);
})

route.post('/getImages',Auth,upload.none(), (req, res, next)=>{
    const apis = new APIS();
    return apis.getFiles(req, res, next);
})

route.delete('/delete/:id',Auth,(req, res, next)=>{
    const apis = new APIS();
    return apis.deleteFile(req, res, next);
})

module.exports = route;