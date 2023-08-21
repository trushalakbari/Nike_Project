import Validation from "../../User/Validation.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import adminUser from "./AdminUserModal.js";
import Randomstring from "randomstring";
import Send from "../Send/Send.js";



class AdminUserController {
    async CreateUser(req, res) {
        try {

            const { fullName, email, password, role } = req.body
            const validationResult = Validation(req.body, "admin-register")

            if (validationResult.length > 0) {
                return res.status(400).send({ message: "Validation Error", ValidatonResult: validationResult })
            }


            const otp = Randomstring.generate({
                charset: "numeric",
                length: 6
            })

            const UserCode = Randomstring.generate({
                charset: "numeric",
                length: 2
            })

            const UserName = `${fullName}@${UserCode}`
            const UserData = {
                email,
                fullName,
                otp: bcrypt.hashSync(otp, 8),
                role: role || undefined,
                password,
                UserName
            }

            const mailOption = {
                from: "trushalakbari1002@gmail.com",
                to: UserData.email,
                subject: "nodemailer test",
                html: `<h2>Dear User Your One Time Password - ${otp}</h2>`
            }

            const sendMail = await Send(mailOption)
            console.log(sendMail)

            if (sendMail && sendMail.match("OK")[0] === "OK") {
                const EncodePassword = bcrypt.hashSync(UserData.password, 8)
                if (!EncodePassword) {
                    return res.status(500).send({ message: "Something Went Wrong" })
                }

                UserData.password = EncodePassword

                const token = jwt.sign({ ...UserData }, process.env.JWT_SECRATE, { expiresIn: '30d' })

                if (!token) {
                    return res.status(500).send({ message: "Something Went Wrong" })
                }
                const result = await adminUser.create({ ...UserData, token: token })


                if (!result) return res.status(500).send({ message: "Something Went Wrong" })
                let user = result._doc
                delete UserData.password

                return res.status(200).send({ message: "Success", user: { ...user, token: token } })
            }

            return res.status(400).send({ message: "Verification Failed" })

        } catch (error) {
            console.log(error)

            if (error && error.message && error.message.includes("E11000")) {
                return res.status(400).send({ message: "Validation Error", validationResult: [{ key: "email", message: "Email Is Already Exist" }] })
            }

            return res.status(500).send({ message: "Internal Server Error" })
        }
    }

    async OtpVerfy(req, res) {
        try {
            const { otp, email } = req.body;

            if (!otp) return res.status(400).send({ message: "Missing Dependency Otp" });

            if (!email) return res.status(400).send({ message: "Missing Dependency Email" });

            const user = await adminUser.findOne({ email: email })

            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            const isOtpValid = await bcrypt.compare(otp, user.otp);

            if (isOtpValid) {
                return res.status(200).send({ message: "OTP verification successful" });
            } else {
                return res.status(400).send({ message: "Validation Error", validationResult: [{ key: "otp", message: "Invalid" }] });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }

    async LoginUser(req, res) {
        try {
            const { email, password } = req.body

            const validationResult = Validation(req.body, "login")

            if (validationResult.length > 0) {
                return res.status(400).send({ message: "Validation Error", validationResult: validationResult })
            }

            const otp = Randomstring.generate({
                charset: "numeric",
                length: 6
            })


            const UserData = {
                email,
                otp: bcrypt.hashSync(otp, 8),
                password,

            }

            const mailOption = {
                from: "trushalakbari1002@gmail.com",
                to: UserData.email,
                subject: "nodemailer test",
                html: `<h2>Dear User Your One Time Password - ${otp}</h2>`
            }

            const sendMail = await Send(mailOption)
            console.log(sendMail)


            if (sendMail && sendMail.match("OK")[0] === "OK") {

                let user = await adminUser.findOne({ email: UserData.email })

                if (!user) {
                    return res.status(400).send({ message: "Validation Error", validationResult: [{ key: "email", message: "Email Not Found" }] })
                }
                let update = await adminUser.updateOne({ email: email }, { otp: UserData.otp })

                user = user._doc

                if (!(bcrypt.compareSync(password, user.password))) {
                    return res.status(400).send({ message: "Validation Error", validationResult: [{ key: "password", message: "Password Is Not Match" }] })
                }

                const token = jwt.sign({ ...user }, process.env.JWT_SECRATE, { expiresIn: "30d" })
                delete user.password
                delete user.otp

                if (!token) {
                    return res.status(500).send({ message: 'Something Went Wrong' })
                }

                return res.status(200).send({ message: "Success", user: { ...user, token: token } })

            }
            return res.status(400).send({ message: "Verification Failed" })


        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Internal Server Error' })

        }
    }

    async GetUser(req, res) {
        try {
            const result = await adminUser.find({})
            if (!result) {
                return res.status(400).send({ message: "Something Went Wrong" })
            }
            return res.status(200).send({ message: "Success", user: result })
        } catch (error) {
            return res.status(500).send({ message: "Internal Server Error" })

        }
    }

    async removeUser(req, res) {
        try {
            const result = await adminUser.deleteOne({ _id: req.params.id })
            if (result) return res.status(200).send({ message: "Success" })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal Server error" })
        }
    }


    async updateUser(req, res) {
        try {
            const id = req.params.id
            const body = req.body
            const result = await adminUser.updateOne({ "_id": id }, body)
            if (result.modifiedCount > 0 || result.matchedCount > 0) return res.status(200).send({ message: "Success" })

            return res.status(400).send({ message: "Somthing went wrong" })

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }
}

const adminusercontroller = new AdminUserController()
export default adminusercontroller