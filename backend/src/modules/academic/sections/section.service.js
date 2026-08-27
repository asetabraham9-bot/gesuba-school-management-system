import Section from "./section.model.js";
import Grade from "../grades/grade.model.js";

export const createSection = async (sectionData) => {
  const {
    name,
    grade,
    description,
  } = sectionData;

  // Check whether the Grade exists
  const existingGrade = await Grade.findById(grade);

  if (!existingGrade) {
    throw new Error("Grade not found");
  }

  // Check duplicate section within the same Grade
  const existingSection = await Section.findOne({
    name: name.trim(),
    grade,
  });

  if (existingSection) {
    throw new Error(
      "Section already exists in this grade"
    );
  }

  const section = await Section.create({
    name,
    grade,
    description,
  });

  return section;
};

export const getAllSections = async () => {
  return await Section.find()
    .populate("grade", "name status")
    .sort({ name: 1 });
};

export const getSectionsByGrade = async (gradeId) => {
  // Make sure the Grade exists
  const grade = await Grade.findById(gradeId);

  if (!grade) {
    throw new Error("Grade not found");
  }

  return await Section.find({
    grade: gradeId,
  })
    .populate("grade", "name status")
    .sort({ name: 1 });
};

export const getSectionById = async (id) => {
  return await Section.findById(id)
    .populate("grade", "name status");
};

export const updateSection = async (id, sectionData) => {
  const section = await Section.findById(id);

  if (!section) {
    throw new Error("Section not found");
  }

  // If grade is being changed, verify the new Grade
  if (sectionData.grade) {
    const grade = await Grade.findById(
      sectionData.grade
    );

    if (!grade) {
      throw new Error("Grade not found");
    }
  }

  // If name or grade is being changed,
  // check for duplicate section
  if (
    sectionData.name ||
    sectionData.grade
  ) {
    const name =
      sectionData.name || section.name;

    const grade =
      sectionData.grade || section.grade;

    const duplicateSection =
      await Section.findOne({
        name: name.trim(),
        grade,
        _id: { $ne: id },
      });

    if (duplicateSection) {
      throw new Error(
        "Section already exists in this grade"
      );
    }
  }

  return await Section.findByIdAndUpdate(
    id,
    sectionData,
    {
      new: true,
      runValidators: true,
    }
  ).populate(
    "grade",
    "name status"
  );
};

export const deleteSection = async (id) => {
  const section = await Section.findById(id);

  if (!section) {
    throw new Error("Section not found");
  }

  await Section.findByIdAndDelete(id);

  return section;
};