import Student from '../models/Student.js'
import Professor from '../models/Professor.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const generateToken=(user)=>{
    return jwt.sign({id:user._id,role:user.role}, process.env.JWT_SECRET_KEY,{
        expiresIn:'15d',
    });
}

export const register = async (req,res)=>{
    const{email,password,name,role} =req.body;
      try{
          let user=null;
          if(role=='student'){
            user= await Student.findOne({email}) 
          }
          else if(role=='professor'){
            user= await Professor.findOne({email})
          }
          // chekck if user exist
          if(user){
             return res.status(400).json({message:'User already exist'});
          }

          // hash password
          const salt= await bcrypt.genSalt(10);
          const  hashPassword=await bcrypt.hash(password,salt);

          if(role=='student'){
            user=new Student({
                  name,
                  email,
                  password:hashPassword,
                  role
            })
          }
          if(role=='professor'){
            user=new Professor({
                  name,
                  email,
                  password:hashPassword,
                  role
            })
          }

          await user.save()

          res.status(200).json({success:true,message:'user successfully created'})
      }
      catch(err){
          
        res.status(500).json({success:false,message:'Internal Server Error'})
      
        }
}


export const login = async (req,res)=>{
    const {email}=req.body;
    try{
        let user=null;
        
        const student= await Student.findOne({email});
        const professor= await Professor.findOne({email});

        if(student){
            user=student;
        } 

        if(professor){
            user=professor;
        }

        if(!user){
            return res.status(500).json({ success:false, message:'user not found'})

        }


        const isPasswordMatch = await bcrypt.compare(req.body.password,user.password);
         
        if(!isPasswordMatch){
            return res.status(500).json({success :false,message:'Invalid credentials'})

        }

        //get token
        const token=generateToken(user);

        const {password,role,...rest}=user._doc
        res.status(200).json({success :true,message:'Successfully Login',token,data:{...rest},role});


    }
    catch(err){
        res.status(500).json({success :false,message:'FAILED to LOGIN'})
 
    }

}