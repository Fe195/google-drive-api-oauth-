import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId

const documentSchema = new mongoose.Schema({
    filename: { type: String, required: true, trim: true },
    file: { type: String, required: true, trim: true },
    filetype: { type: String, required: true, trim: true },
    user: {
        type: ObjectId,
        ref: "profiles"
    },
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true })

export const Document = mongoose.model('Document', documentSchema);