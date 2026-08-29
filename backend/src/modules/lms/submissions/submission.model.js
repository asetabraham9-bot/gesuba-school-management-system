import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: [true, "Assignment is required"],
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student is required"],
    },

    answer: {
      type: String,
      trim: true,
      maxlength: [
        10000,
        "Answer cannot exceed 10000 characters",
      ],
      default: "",
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: [
        "SUBMITTED",
        "GRADED",
        "RETURNED",
      ],
      default: "SUBMITTED",
    },

    marks: {
      type: Number,
      default: null,
      min: [0, "Marks cannot be negative"],
    },

    feedback: {
      type: String,
      trim: true,
      maxlength: [
        2000,
        "Feedback cannot exceed 2000 characters",
      ],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model(
  "Submission",
  submissionSchema
);

export default Submission;