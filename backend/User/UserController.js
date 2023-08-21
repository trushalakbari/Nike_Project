import userModel from "./UserModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import Validation from "./Validation.js";

class UserController {
  async registerUser(req, res) {
    try {
      const ValidationResult = Validation(req.body, "register");
      if (ValidationResult.length > 0) {
        return res.status(400).send({
          message: "Validation failed",
          validationResult: ValidationResult,
        });
      }

      let { password } = req.body;
      const EncodePassword = bcrypt.hashSync(password, 8);

      if (!EncodePassword) {
        return res.status(500).send({ message: "something is wrong" });
      }

      req.body.password = EncodePassword;

      const result = await userModel.create(req.body);
      if (!result) {
        return res.status(500).send({ message: "something is wrong" });
      }
      // console.log(result);

      let user = result._doc;
      delete user.password;

      const token = Jwt.sign({ ...user }, process.env.JWT_SECRATE, {
        expiresIn: "30d",
      });

      if (!token) {
        return res.status(500).send({ message: "something is wrong" });
      }

      return res
        .status(200)
        .send({ message: "success", user: { ...user, token: token } });
    } catch (error) {
      console.log(error);
      if (error && error.message && error.message.includes("E11000")) {
        return res.status(400).send({
          message: "Validation failed",
          validationresult: [{ key: "email", message: "email already exists" }],
        });
      }
      return res.status(500).send({ message: "internal server error" });
    }
  }

  //<--------------------------------------User Login Validation--------------------------------->

  async UserLogin(req, res) {
    try {
      const { email, password } = req.body;
      const ValidationResult = Validation(req.body, "login");

      if (ValidationResult.length > 0) {
        return res.status(400).send({
          message: "Validation Error",
          validationResult: ValidationResult,
        });
      }

      let user = await userModel.findOne({ email: email });

      if (!user) {
        return res.status(400).send({
          message: "Validation Error",
          validationResult: [{ key: "email", message: "Email Not Found" }],
        });
      }

      user = user._doc;

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).send({
          message: "Validation Error",
          validationResult: [
            { key: "password", message: "Email and Password are not Match" },
          ],
        });
      }

      const token = Jwt.sign(user, process.env.JWT_SECRATE, {
        expiresIn: "30d",
      });

      delete user.password;

      if (!token) {
        return res.status(500).send({ message: "Something Went Wrong" });
      }
      return res
        .status(200)
        .send({ message: "success", user: { ...user, token: token } });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
}

const userController = new UserController();
export default userController;
