const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());

function connect(){
    return mongoose.connect(" mongodb://127.0.0.1:27017/assignment2")
}
const userSchema=new mongoose.Schema({
    movie_name:{type:String, required:true},
    movie_genre:{type:String, required:true},
    production_year:{type:Number, required:true},
    budget:{type:Number, required:true}
},{
    versionKey:false,
    timestamps:true,
    })
const Movie=mongoose.model("movie",userSchema)
app.post('/movie',async (req,res)=>{
    const user= await Movie.create(req.body)
    res.status(201).send(user);
})
app.get('/',async(req,res)=>{
    const users=await Movie.find().lean().exec();
    res.send(users);
})
app.get('/movie/:id',async(req,res)=>{
    const user=await Movie.findById(req.params.id).lean().exec();
    //const user=await Movie.findOne({"_id":req.params.id}).lean().exec();
    res.send({user})
})
app.patch('/movie/:id', async(req,res)=>{
    try{
        const user=await Movie .findByIdAndUpdate(req.params.id,req.body,{new:true})
       return res.status(201).send(user);
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }
})
app.delete('/movie/:id', async(req,res)=>{
    try{
        const user=await Movie .findByIdAndDelete(req.params.id)
       return res.status(201).send(user);
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }
})

app.listen(1234,async ()=>{
    await connect();
    console.log("server is running")
})