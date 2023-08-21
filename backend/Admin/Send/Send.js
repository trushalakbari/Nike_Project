import nodemailer from "nodemailer"

const Send = (mailOption) => {
    return new Promise((resolve, reject) => {
        const Transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "trushalakbari1002@gmail.com",
                pass: "xlirmgcvuvzfngit"
            }
        })


        Transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                reject(error)
            } else {
                resolve("Email Sent" + info.response)
            }
        })
    })

}

export default Send