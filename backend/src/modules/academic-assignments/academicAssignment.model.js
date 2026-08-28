import mongoose from "mongoose";

const academicAssignmentSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Teacher is required"],
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject is required"],
    },

    grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
      required: [true, "Grade is required"],
    },

    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: [true, "Section is required"],
    },

    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: [true, "Academic year is required"],
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

academicAssignmentSchema.index(
  {
    teacher: 1,
    subject: 1,
    grade: 1,
    section: 1,
    academicYear: 1,
  },
  {
    unique: true,
  }
);

const AcademicAssignment =
  mongoose.model(
    "AcademicAssignment",
    academicAssignmentSchema
  );

export default AcademicAssignment;