import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const documentSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true, trim: true },
    file: { type: String, required: true, trim: true },
    filetype: { type: String, required: true, trim: true },
    user: {
      type: ObjectId,
      ref: 'profiles',
    },
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Document = mongoose.model('Document', documentSchema);

export const find_id = async (id) => {
  return await Document.findOne({ _id: id });
};

export const create_file = async (data) => {
  return await Document.create(data);
};

export const valid_document = async (isDeleted) => {
  return await Document.find({ isDeleted: false });
};

export const doc_id = async (docID) => {
  return await Document.findOne({ email: docId });
};

export const valid_user = async (userID, isDeleted) => {
  return await Document.find({ user: user._id, isDeleted: false });
};

export const findAndUpdate = async (docId) => {
  return await Document.findOneAndUpdate(
    { _id: docId, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );
};
