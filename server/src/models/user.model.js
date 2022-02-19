const {Schema,model}=require('mongoose');
const brycpt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    list:[{
        title:{type:String},
        status:{type:String},
        description:{type:String},
    }],
    tokens:[{
        token:{type:String,required:true}
    }]

});

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await brycpt.hash(this.password,12);
    }
    next();
});

userSchema.methods.newToken = async function(){
    try{
        const token = await jwt.sign({_id:this._id},process.env.User_token);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(e){
        console.log(e.message);
    }
}

module.exports=model("user",userSchema);