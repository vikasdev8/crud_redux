const app = require('express')();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const PrettyError = require('pretty-error');
const route = require('./routes');
const pe = new PrettyError();
require("./DB")

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    methods: ["POST", "GET", "DELETE"],
    origin: "http://localhost:3000",
    credentials:true,
    
}))


app.use('/', route)

process.on('uncaughtException',(err,origin)=>{
    pe.render(err, origin);
})
process.on('unhandledRejection',(err,origin)=>{
    pe.render(err, origin);
})

app.listen(3005, () => {
    console.log('Server running on 3005')
})