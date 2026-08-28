import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: [true, "Lesson is required"],
    },

    title: {
      type: String,
      required: [true, "Assignment title is required"],
      trim: true,
      minlength: [
        3,
        "Assignment title must contain at least 3 characters",
      ],
      maxlength: [
        150,
        "Assignment title cannot exceed 150 characters",
      ],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [
        2000,
        "Assignment description cannot exceed 2000 characters",
      ],
      default: "",
    },

    instructions: {
      type: String,
      trim: true,
      maxlength: [
        5000,
        "Assignment instructions cannot exceed 5000 characters",
      ],
      default: "",
    },

    dueDate: {
      type: Date,
      default: null,
    },

    totalMarks: {
      type: Number,
      required: [true, "Total marks are required"],
      min: [1, "Total marks must be at least 1"],
    },

    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "CLOSED"],
      default: "DRAFT",
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model(
  "Assignment",
  assignmentSchema
);

export default Assignment;