// create express server
import express, { json } from "express";
import productcontroller from "./Product/ProductController.js";
import cors from "cors";
import ConnectDb from "./connection.js";
import { } from "dotenv/config.js"
import userController from "./User/UserController.js";
import Authantication from "./Auth/Auth.js";
import ordercontroller from "./Order/OrderController.js";
import fileUpload from "express-fileupload";
import mediaController from "./Media/MediaController.js";
import AdminRouter from "./Admin/AdminRouter.js";


const app = express()

app.use(cors())
app.use(json())
app.use(fileUpload())
ConnectDb()


app.use("/uploads", express.static("./uploads"))



// port hit test request 1
app.get("/", (req, res) => {
    return res.status(200).send({ message: "success" })
})

// port hit test request 2 from product
app.get("/product", productcontroller.getProduct)
app.get("/product/:id", productcontroller.getProductbyId)
app.post("/cart", productcontroller.getcart)

// app.post("/user", userController.addUser)
app.post("/register", userController.registerUser)
app.post("/user/login", userController.UserLogin)

//insertuser 
// app.get("/product/insert/many", productcontroller.insertProducts)


//order
app.post("/neworder", Authantication.CreateOrderAuth, ordercontroller.CreateOrder)
app.post("/order", Authantication.CreateOrderAuth, ordercontroller.GetOrder)
app.post("/order/:id", Authantication.CreateOrderAuth, ordercontroller.getOrderByID)


app.use("/admin", AdminRouter)

// local host 5001
app.listen(process.env.PORT, () => {
    console.log("server started");
})

// userController.validation({
//     firstName: "trushal", lastName: "akbari", email: "trushalakbari1002@gmail.com", password: "abc@1234"
// }, "register")


// 6450d12cc80c50018418c217    
