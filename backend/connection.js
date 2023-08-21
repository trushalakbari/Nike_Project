import mongoose from "mongoose"

const ConnectDb = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/nike')
        console.log("Db Connected");
    } catch (error) {
        console.log("Db connection loss");
    }
}

export default ConnectDb