import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    photo: { type: String, required: true, trim: true },
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Profile = mongoose.model('Profile', profileSchema);

export const find_email = async (email) => {
  return await Profile.findOne({ email: email });
};

export const create_file = async (data) => {
  return await Profile.create(data);
};

export const find_id = async (id) => {
  return await Profile.findById(id);
};

export const find_phone = async (phone) => {
  return await Profile.findOne({ phone: phone });
};
