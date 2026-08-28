import mongoose from "mongoose";

const academicYearSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Academic year name is required"],
      unique: true,
      trim: true,
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },

    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "INACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const AcademicYear = mongoose.model(
  "AcademicYear",
  academicYearSchema
);

export default AcademicYear;