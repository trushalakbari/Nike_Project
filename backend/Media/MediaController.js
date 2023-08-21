import Randomstring from "randomstring"
import fs from "fs"
import mediamodal from "./MediaModal.js"

class MediaController {
    async GetMedia(req, res) {
        try {
            let File = req.files.file;

            let { mimetype, size } = File
            let name = File.name;
            let ext = name.split('.');
            ext = ext[ext.length - 1];

            name = Randomstring.generate({
                length: 12,
                charset: 'alphabetic'
            }).toLowerCase();
            name = name + '.' + ext;
            File.name = name;
            mimetype = mimetype.split("/")[0]

            if (mimetype !== 'image' && mimetype !== 'video') {
                mimetype = 'application'
            }

            const folderName = `./uploads/${mimetype}`;

            try {
                if (!fs.existsSync(folderName)) {
                    fs.mkdirSync(folderName);

                }
            } catch (err) {
                console.error(err);
            }

            let path = `./uploads/${mimetype}/${name}`;

            const result = await File.mv(path);
            path = path.substring(1, path.length)

            let Media = await mediamodal.create({ name, mimetype, ext, path, size });
            Media = Media._doc

            let url = `http://localhost:5001${path}`
            Media.url = url

            res.json({ message: "success", media: { ...Media } });

        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }

    async Showmedia(req, res) {
        try {
            const result = await mediamodal.aggregate([
                {
                    $match: {
                        $or: [
                            { mimetype: "image" },
                            { mimetype: "video" }
                        ]
                    }
                },
                {
                    $addFields: {
                        url: {
                            $concat: ["http://localhost:5001", "$path"]
                        }
                    }
                }
            ]);
            if (result) {
                return res.status(200).send({ message: "success", result })
            }

            return res.status(400).send({ message: "Somthing went wrong" })

        } catch (error) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }
}

const mediaController = new MediaController()
export default mediaController