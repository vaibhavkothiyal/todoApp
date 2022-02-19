const mongoose=require('mongoose');

module.exports=()=>{
    try{
        return mongoose.connect(process.env.DATABASE)
    }catch(e){
        console.log(e.message);
    }
}