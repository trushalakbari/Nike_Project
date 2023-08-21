import mongoose from "mongoose";

class AdminUserModal {
    constructor() {
        this.schema = new mongoose.Schema({
            fullName: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            otp: { type: String, required: true, default: null },
            token: { type: String, default: null },
            role: { type: String, required: true },
        }, { timestamps: true })
    }
}

const adminUserModal = new AdminUserModal()
const adminUser = mongoose.model("tbl_admins", adminUserModal.schema)
export default adminUser 