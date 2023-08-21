import express from "express"
import adminusercontroller from "./User/AdminUserController.js"
import mediaController from "../Media/MediaController.js"

const AdminRouter = express.Router()

AdminRouter.post("/adduser", adminusercontroller.CreateUser)
AdminRouter.post("/login", adminusercontroller.LoginUser)
AdminRouter.get("/getuser", adminusercontroller.GetUser)
AdminRouter.delete("/remove/:id", adminusercontroller.removeUser)
AdminRouter.put("/update/:id", adminusercontroller.updateUser)
AdminRouter.post("/verify", adminusercontroller.OtpVerfy)


AdminRouter.get("/getmedia", mediaController.Showmedia)
AdminRouter.post("/upload", mediaController.GetMedia)


export default AdminRouter