const express=require('express');
const connect=require('./config/db')
require("dotenv").config();
const app=express();
app.use(express.json());
const {register,login}=require("./config/auth");

const todoController=require('./controller/user.controller');

app.use('/register',register);
app.use('/login',login);
app.use('/todo',todoController)

app.get("/", (req,res)=>{
    res.send("hiii")
});

app.listen(3444, async()=>{
    connect();
    console.log("server running at port number 3444")
});