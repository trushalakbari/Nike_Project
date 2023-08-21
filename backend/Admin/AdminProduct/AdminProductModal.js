import mongoose from "mongoose";

class AdminProductModal {
    constructor() {
        this.schema = new mongoose.Schema({
            title: { type: String, required: true },
            Brand: { type: String, required: true },
            alias: { type: String, required: true },
            FetureImages: { type: mongoose.Types.ObjectId, required: true },
            ReleventImages: { type: Array, required: true },
            price: { type: Number, required: true },
            description: { type: String, required: true, default: null },
            discount: { type: Number, default: true },
            countInStock: { type: Number, required: true },
            totalprice: { type: Number, required: true },
        }, { timestamps: true })

        this.Product = new mongoose.model("tbl_AdminProducts", this.schema)
    }
}

const Adminproductmodal = new AdminProductModal()


export default Adminproductmodal