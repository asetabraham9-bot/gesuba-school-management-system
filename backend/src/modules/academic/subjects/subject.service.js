import Subject from "./subject.model.js";

export const createSubject = async (subjectData) => {
  const { name, code, description } = subjectData;

  // Check duplicate subject code
  const existingSubject = await Subject.findOne({
    code: code.trim().toUpperCase(),
  });

  if (existingSubject) {
    throw new Error("Subject code already exists");
  }

  // Check duplicate subject name
  const existingSubjectName = await Subject.findOne({
    name: name.trim(),
  });

  if (existingSubjectName) {
    throw new Error("Subject name already exists");
  }

  const subject = await Subject.create({
    name,
    code,
    description,
  });

  return subject;
};

export const getAllSubjects = async () => {
  return await Subject.find()
    .sort({ name: 1 });
};

export const getSubjectById = async (id) => {
  return await Subject.findById(id);
};

export const updateSubject = async (id, subjectData) => {
  const subject = await Subject.findById(id);

  if (!subject) {
    throw new Error("Subject not found");
  }

  // Check duplicate code when code is being changed
  if (subjectData.code) {
    const existingSubject = await Subject.findOne({
      code: subjectData.code.trim().toUpperCase(),
      _id: { $ne: id },
    });

    if (existingSubject) {
      throw new Error("Subject code already exists");
    }
  }

  // Check duplicate name when name is being changed
  if (subjectData.name) {
    const existingSubjectName = await Subject.findOne({
      name: subjectData.name.trim(),
      _id: { $ne: id },
    });

    if (existingSubjectName) {
      throw new Error("Subject name already exists");
    }
  }

  return await Subject.findByIdAndUpdate(
    id,
    subjectData,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteSubject = async (id) => {
  const subject = await Subject.findById(id);

  if (!subject) {
    throw new Error("Subject not found");
  }

  await Subject.findByIdAndDelete(id);

  return subject;
};