import mongoose from "mongoose";

class MediaModal {
    constructor() {
        this.schema = new mongoose.Schema({
            name: { type: String, required: true },
            mimetype: { type: String, required: true },
            ext: { type: String, required: true },
            path: { type: String, required: true },
            size: { type: String, required: true },
            filePurpose: { type: String, default: null },
            uploadedby: { type: String, default: null },
        }, { timestamps: true })
    }
}

const Media = new MediaModal()
const mediamodal = mongoose.model("tbl_media", Media.schema)

export default mediamodal