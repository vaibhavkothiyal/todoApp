const express=require('express');
const User=require('../models/user.model');
const router=express.Router();


router.get('/:id',async (req,res)=>{
    try{
        const user = await User.findOne({ email: req.params.id });
        return res.status(200).json(user.list);
    }catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

router.post('/:id',async (req,res)=>{
    try{
        const updatelist=await User.findOneAndUpdate({email:req.params.id},
            {$push:{
                list:req.body
            }}
            )
        res.status(200).json(updatelist)
    }catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

router.get('/one/:id',async (req,res)=>{
    try{
        const selTodo=await User.findOne({email:req.params.id})
        res.status(200).json(selTodo)
    }catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

router.patch('/:email/:id',async (req,res)=>{
    try{
        const delTodo=await User.findOneAndUpdate({email:req.params.email},
            {$pull:{
                list:{"_id" : req.params.id}
            }}
        )
        res.status(200).json("del")
    }catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

router.patch('/status/:email/:id',async (req,res)=>{
    console.log("here in status update");
    try{
        const updateSts=await User.findOneAndUpdate({"email":req.params.email,"list._id":req.params.id},
        {$set:{"list.$.status":"list.$.status"=="Incomplete"?"Complete":"Incomplete"}}
        )
        res.status(200).json("del")
    }catch(e){
        console.log("in error")
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

router.patch('/desc/:email/:id/:desc',async (req,res)=>{
    console.log("here in desc update");
    try{
        const updateSts=await User.findOneAndUpdate({"email":req.params.email,"list._id":req.params.id},
        {$set:{"list.$.description":req.params.desc}}
        )
        res.status(200).json(req.params.desc)
    }catch(e){
        console.log("in error")
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

module.exports=router;