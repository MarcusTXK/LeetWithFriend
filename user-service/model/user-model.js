import mongoose from "mongoose"

var Schema = mongoose.Schema
const UserModelSchema = new Schema({
    username: { // Identifier for the user, since it is unique
        type: String,
        required: true,
        minLength: 1,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: { // For communication purposes
        type: String,
    },
    role: { // For future proofing, we can add roles to users
        type: String,
    },
    refreshToken: { // Refresh token (JWT)
        type: String,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
})

UserModelSchema.pre("save", function (next) {
    this.updatedAt = Date.now()
    next()
})

export default mongoose.model("UserModel", UserModelSchema)
