const mongoose=require("mongoose");
const express=require("express");
const cors=require("cors");
require("dotenv").config();
const student=require("./routes/userroute")
const app=express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
 console.log("mongodb connected..");
})
.catch((error)=>{
    console.log("mogodb error",error);
})

app.use("/api/students",student);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server running on port " + PORT);
});
