import User from "../models/User.js"

export const getUserData= async(req, res)=>{
  try{
    const userId= req.auth.userId
    const user= await User.findById(userId)

    if(!user){
        return res.json({success: false, message: 'User Not found'})
    }

    req.json({success: true, user})
  } catch (error){
    res.json({success: false, message: error.message})

  }
}

// users enrolled courses with lecture link

export const userEnrolledCourses=async(req,res)=>{
    try{
        const userId=req.auth.userId
        const userData=await User.findById(userId).populate('enrolledcourses')
        res.json({success:true, enrolledCourses: userData.enrolledCourses})
    } catch(error){
        res.json({success: false, message:error.message})
    }
}