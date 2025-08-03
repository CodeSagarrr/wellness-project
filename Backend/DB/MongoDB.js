import mongoose from "mongoose"

export const connectDB = async(url) => {
    try {
        await mongoose.connect(url)
        .then(() => console.log("Database connected"))
        .catch((err) => console.error("Error occured : " , err))
    } catch (error) {
        console.log("Error from the database" , error.message)
    }
}

