import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: [true, "Lesson is required"],
    },

    title: {
      type: String,
      required: [true, "Material title is required"],
      trim: true,
      minlength: [
        3,
        "Material title must contain at least 3 characters",
      ],
      maxlength: [
        150,
        "Material title cannot exceed 150 characters",
      ],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [
        1000,
        "Material description cannot exceed 1000 characters",
      ],
      default: "",
    },

    type: {
      type: String,
      enum: [
        "PDF",
        "DOCUMENT",
        "VIDEO",
        "IMAGE",
        "LINK",
        "OTHER",
      ],
      required: [true, "Material type is required"],
    },

    url: {
      type: String,
      required: [true, "Material URL is required"],
      trim: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Material = mongoose.model(
  "Material",
  materialSchema
);

export default Material;