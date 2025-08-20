import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import {generateToken} from "../libs/utils.js"
import cloudinary from "../libs/cloudinary.js";

export const signup = async (req,res)=>{
    const {fullname,email,password} = req.body;
   try {
    if(!fullname || !email || !password){
        res.status(400).json({message:"All fields are required!"});
    }
    if(password.length < 6){
        res.status(400).json({message:"Password must be at least 6 characters long!"});
    }
    const user = await User.findOne({email});
    if(user) return res.status(400).json({message:"Email already exist!"});
    
    const salt = await bcrypt.genSalt(10);  
    const hashPass = await bcrypt.hash(password,salt);

    const newUser = new User(
        {
           fullname, // cause we use the same variable we shouldn't say fullname:fullname 
           email,
           password:hashPass 
        }
    );
    if(newUser){
        // if the user is created successfully the we going to generate jwt
        generateToken(newUser._id,res);
        await newUser.save();

        res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            email:newUser.email,
            profilePic:newUser.profilePic
        })
    }else{
        res.status(400).json({message:"Invalid user data."})
    }
}catch(error){
    console.log("Error in signup controller",error.message);
    res.status(500).json({
        message:"Internal server error."
    })

}
}

export const login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credential!"});
        }
        const isCorrect = await bcrypt.compare(password, user.password)
        if(!isCorrect){
            return res.status (400).json({message:"Invalid credential!"});
        }

        generateToken(user._id, res);

        res.status(201).json({
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            profilePic:user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(500).json({
            message:"Internal server error."
        })

    }

}

export const logout = (req,res)=>{
    try {
        // jwt - is the name of the cookie we set in generateToken function
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully!"})
    } catch (error) {
        console.log(500).json({message:"Internal server error."})
    }

}


export const updateProfile = async(req,res)=>{
    try{
        const {profilePic} = req.body;
        const userId = await User.findById(req.user._id);
        if(!profilePic){
            return res.status(400).json({message:"Profile picture is required!"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
            folder: "chat-app/profile-pics"
        });
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                profilePic:uploadResponse.secure_url
            },
            {new:true}
        );
        res.status(200).json(updateProfile);
    }catch(error){
        console.log("Error in updateProfile controller",error.message);
        res.status(500).json({
            message:"Internal server error."
        })
    }
}

export const checkAuth = (req, res) => {
   try{
       res.status(200).json(req.user);
   }catch(error){
       console.log("Error in checkAuth controller",error.message);
       res.status(500).json({
           message:"Internal server error."
       })
   }
}
