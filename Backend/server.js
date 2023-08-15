require('dotenv').config();
const express = require("express");
const {default: mongoose}= require("mongoose");
const app = express(); // Used to connect server.js 
const PORT = 5000;
const cors= require("cors");

app.use(cors());
app.use(express.json());

// db connection 
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gxbcwuh.mongodb.net/login`).then(()=>{
    console.log("db connection successfully");
})
.catch((error)=>{
    console.log(error);
});


// User Schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
},
{timestamps: true});

const User= mongoose.model("User", userSchema);

// Create User

app.post("/createuser", async(req,res)=>{
try{
 const bodyData=req.body;
 const user =new User(bodyData);
 const userData=await user.save();
 res.send(userData);
} catch(error){
res.send(error);
}
});

// Read all user

app.get("/readalluser", async (req,res)=>{
    try{
     const userData = await User.find({});
     res.send(userData);
    }
    catch{
     res.send(error);
    }
});

app.get("/read/:id", async(req,res)=>{
    // res.send("from get route");// This will get the reply at server at PORT
  try{
   const id=req.params.id;
   const user=await User.findById({ _id:id});
   res.send(user);

  }
  catch(error){
  res.send(error);
  }

});

// Update user

app.put("/updateuser/:id",async(req,res)=>{
    try{
     const id= req.params.id;
     const user=await User.findByIdAndUpdate({ _id:id },req.body,{
        new:true,
     });
     res.send(user);
    }
    catch(error){
    res.send(error);
    }
});

// Delete user

app.delete("/delete/:id",async(req,res)=>{
    try{
     const id= req.params.id;
     const user=await User.findByIdAndDelete({ _id:id });
     res.send(user);
    }
    catch(error){
    res.send(error);
    }
});



// This will tell on terminal giving message
app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`);
});