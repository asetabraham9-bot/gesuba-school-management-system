import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    academicAssignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicAssignment",
      required: [true, "Academic assignment is required"],
    },

    title: {
      type: String,
      required: [true, "Lesson title is required"],
      trim: true,
      minlength: [
        3,
        "Lesson title must contain at least 3 characters",
      ],
      maxlength: [
        150,
        "Lesson title cannot exceed 150 characters",
      ],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [
        1000,
        "Lesson description cannot exceed 1000 characters",
      ],
      default: "",
    },

    content: {
      type: String,
      trim: true,
      default: "",
    },

    lessonNumber: {
      type: Number,
      required: [true, "Lesson number is required"],
      min: [1, "Lesson number must be at least 1"],
    },

    scheduledDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
      default: "DRAFT",
    },
  },
  {
    timestamps: true,
  }
);

lessonSchema.index(
  {
    academicAssignment: 1,
    lessonNumber: 1,
  },
  {
    unique: true,
  }
);

const Lesson = mongoose.model(
  "Lesson",
  lessonSchema
);

export default Lesson;