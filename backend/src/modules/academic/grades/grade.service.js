import Grade from "./grade.model.js";

export const createGrade = async (gradeData) => {
  const { name, description } = gradeData;

  const existingGrade = await Grade.findOne({
    name: name.trim(),
  });

  if (existingGrade) {
    throw new Error("Grade already exists");
  }

  const grade = await Grade.create({
    name,
    description,
  });

  return grade;
};

export const getAllGrades = async () => {
  return await Grade.find()
    .sort({ name: 1 });
};

export const getGradeById = async (id) => {
  return await Grade.findById(id);
};

export const updateGrade = async (id, gradeData) => {
  return await Grade.findByIdAndUpdate(
    id,
    gradeData,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteGrade = async (id) => {
  const grade = await Grade.findById(id);

  if (!grade) {
    throw new Error("Grade not found");
  }

  await Grade.findByIdAndDelete(id);

  return grade;
};