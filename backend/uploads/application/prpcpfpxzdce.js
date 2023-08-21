import Randomstring from "randomstring"
import fs from "fs"
import mediamodal from "./MediaModal.js"

class MediaController {
    async GetMedia(req, res) {
        try {
            // console.log(req.files)
            const file = req.files.file
            let { mimetype, size } = file
            let name = file.name

            let extension = name?.split(".")
            extension = extension[extension.length - 1]
            name = Randomstring.generate({
                length: 12,
                charset: "alphabetic"
            }).toLowerCase()


            name = name + "." + extension
            file.name = name
            mimetype = mimetype.split("/")[0]

            if (mimetype !== "image" && mimetype !== "video") {
                mimetype = "application"
            }

            const folderName = `./Uploads/${mimetype}`;

            try {
                if (!fs.existsSync(folderName)) {
                    fs.mkdirSync(folderName);
                }
            } catch (err) {
                console.error(err);
            }

            const path = `./Uploads/${mimetype}/${name}`
            console.log(name)
            const result = await file.mv(path)
            console.log(result)
            const Media = await mediamodal.create({ name, mimetype, size, path, extension })

            res.json({ message: "success", media: Media })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }
}

const mediaController = new MediaController()
export default mediaController