import mongoose from "mongoose";

export const connectDB = async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('Mongo Atlas Database Connected...');
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/SATscorer`);
}