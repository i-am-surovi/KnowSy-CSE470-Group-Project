import User from "../models/User.js";
import { Purchase } from "../models/Purchase.js";
import Stripe from "stripe";


//get user data   
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


//purchase course
export const purchaseCourse = async ()=>{
    try{
        const{courseId}= req.body
        const{origin}= req.headers
        const userId = req.auth.userId
        const userData = await User.findById(userId)
        const courseData= await Course.findById(courseId)

        if(!userData || !courseData){
            return res.json({success: false, message: 'data not found'})
        }

        const purchaseData= {
            courseId: courseData._id,
            userId,
            amount: (courseData.coursePrice-courseData.discount * courseData.coursePrice /100).toFixed(2)


        }

        const newPurchase= await Purchase.create(purchaseData)


        //stripe gateway initiate

        const stripeInstance= new Stripe(process.env.STRIPE_SECRET_KEY)

        


    }  catch(error){

    }
}

