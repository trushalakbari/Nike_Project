import Jwt from "jsonwebtoken";

class AuthController {
    async CreateOrderAuth(req, res, next) {
        try {
            const token = req.headers.token
            if (!token) return res.status(401).send({ message: "unauthorized" })
            return Jwt.verify(token, process.env.JWT_SECRATE, (err, data) => {
                if (data) {
                    req.body.userInfo = data
                    return next()
                }
                if (err) {
                    return res.status(401).send({ message: "unauthorized" })
                }
            })
        } catch (error) {
            return res.status(200).send({ message: "Internal Server Error" })
        }
    }
}

const Authantication = new AuthController()

export default Authantication