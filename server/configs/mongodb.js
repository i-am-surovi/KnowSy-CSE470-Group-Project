import mongoose, { connect } from "mongoose";

// Connect to the MongoDB database

const connectDB = async ()=>{
    mongoose.connection.on('connected', ()=> console.log('MongoDB Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/knowsy`)
}

export default connectDB