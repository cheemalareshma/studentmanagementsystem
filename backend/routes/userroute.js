const express=require("express");
const student=require("../models/usermodel");
const router=express.Router();
router.get("/",async(req,res)=>{
    try{
        const students=await student.find();
        res.json(students);
    }
    catch(error){
      res.status(500).json({message:error.message});
    }
})
router.post("/",async (req,res)=>{
    try{
        const user=req.body;
        const users=new student({
            name:user.name,
            email:user.email,
            course:user.course,
            age:user.age

        });
        const savestudent=await users.save();
        res.status(201).json(savestudent);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
})
router.put("/:id",async(req,res)=>{
    try{
        const updateuser=await student.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            email:req.body.email,
            course:req.body.course,
            age:req.body.age
        },{
            new:true
        });
        res.json(updateuser);
    }
    catch(error){
        res.json({
            message:error.message
        });
    }
})
router.delete("/:id",async(req,res)=>{
    try{
        await student.findByIdAndDelete(req.params.id);
        res.json({
            message:"student deleted successfully"
        })
    }
    catch(error){
        res.json({
            message:error.message
        })
    }
})
module.exports=router;