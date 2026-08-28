import AcademicYear from "./academicYear.model.js";

export const createAcademicYear = async (data) => {
  const { name, startDate, endDate, status } = data;

  if (new Date(startDate) >= new Date(endDate)) {
    throw new Error(
      "Start date must be before end date"
    );
  }

  const existingYear = await AcademicYear.findOne({
    name: name.trim(),
  });

  if (existingYear) {
    throw new Error(
      "Academic year already exists"
    );
  }

  // If creating an active year,
  // deactivate existing active year.
  if (status === "ACTIVE") {
    await AcademicYear.updateMany(
      { status: "ACTIVE" },
      { $set: { status: "INACTIVE" } }
    );
  }

  return await AcademicYear.create({
    name: name.trim(),
    startDate,
    endDate,
    status,
  });
};

export const getAllAcademicYears = async () => {
  return await AcademicYear.find()
    .sort({ startDate: -1 });
};

export const getAcademicYearById = async (id) => {
  return await AcademicYear.findById(id);
};

export const updateAcademicYear = async (
  id,
  data
) => {
  const academicYear =
    await AcademicYear.findById(id);

  if (!academicYear) {
    throw new Error(
      "Academic year not found"
    );
  }

  if (
    data.startDate &&
    data.endDate &&
    new Date(data.startDate) >=
      new Date(data.endDate)
  ) {
    throw new Error(
      "Start date must be before end date"
    );
  }

  if (data.name) {
    const existingYear =
      await AcademicYear.findOne({
        name: data.name.trim(),
        _id: { $ne: id },
      });

    if (existingYear) {
      throw new Error(
        "Academic year already exists"
      );
    }

    data.name = data.name.trim();
  }

  if (data.status === "ACTIVE") {
    await AcademicYear.updateMany(
      {
        status: "ACTIVE",
        _id: { $ne: id },
      },
      {
        $set: {
          status: "INACTIVE",
        },
      }
    );
  }

  return await AcademicYear.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteAcademicYear = async (id) => {
  const academicYear =
    await AcademicYear.findById(id);

  if (!academicYear) {
    throw new Error(
      "Academic year not found"
    );
  }

  await AcademicYear.findByIdAndDelete(id);

  return academicYear;
};