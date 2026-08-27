import mongoose from "mongoose";
import { USER_ROLES, } from "./user.constants.js";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name must contain at least 3 characters"],
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },

    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      uppercase: true,
      immutable: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must contain at least 8 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      required: [true, "User role is required"],
    },

    phone: {
      type: String,
      trim: true,
    },

    profileImage: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },

    deletedAt: {
        type: Date,
        default: null,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;