import { useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  Download,
  Edit3,
  FileText,
  FileType,
  Filter,
  Link2,
  Plus,
  Search,
  Upload,
  UsersRound,
  Video,
  X,
} from "lucide-react";

const initialMaterials = [
  {
    id: "MAT001",
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    grade: "Grade 9",
    section: "A",
    type: "PDF",
    date: "September 5, 2026",
    status: "Published",
    description:
      "A learning guide covering variables, algebraic expressions, constants, and basic operations.",
    size: "2.4 MB",
  },
  {
    id: "MAT002",
    title: "Linear Equations Practice",
    subject: "Mathematics",
    grade: "Grade 9",
    section: "B",
    type: "Document",
    date: "September 6, 2026",
    status: "Published",
    description:
      "Practice exercises designed to help students understand and solve linear equations.",
    size: "1.8 MB",
  },
  {
    id: "MAT003",
    title: "Cell Biology Notes",
    subject: "Biology",
    grade: "Grade 10",
    section: "A",
    type: "PDF",
    date: "September 7, 2026",
    status: "Draft",
    description:
      "Lesson notes covering cell structures, organelles, and their major functions.",
    size: "3.1 MB",
  },
  {
    id: "MAT004",
    title: "Chemical Reactions Guide",
    subject: "Chemistry",
    grade: "Grade 10",
    section: "B",
    type: "Presentation",
    date: "September 8, 2026",
    status: "Published",
    description:
      "Presentation introducing reactants, products, chemical equations, and reaction types.",
    size: "5.6 MB",
  },
  {
    id: "MAT005",
    title: "Motion and Velocity",
    subject: "Physics",
    grade: "Grade 11",
    section: "A",
    type: "Link",
    date: "September 9, 2026",
    status: "Draft",
    description:
      "Additional learning resources for understanding motion, speed, displacement, and velocity.",
    size: "External resource",
  },
];

const statusStyles = {
  Published:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  Draft:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
};

const typeIcons = {
  PDF: FileText,
  Document: FileType,
  Presentation: FileText,
  Link: Link2,
  Video,
};

const materialTypes = [
  "PDF",
  "Document",
  "Presentation",
  "Video",
  "Link",
];

const TeacherMaterials = () => {
  const [materials, setMaterials] =
    useState(initialMaterials);

  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [showUploadForm, setShowUploadForm] =
    useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    grade: "",
    section: "",
    type: "PDF",
    status: "Draft",
    externalUrl: "",
    file: null,
  });

  const [formError, setFormError] = useState("");

  const subjects = useMemo(() => {
    return [
      "All",
      ...new Set(
        materials.map((material) => material.subject)
      ),
    ];
  }, [materials]);

  const filterTypes = useMemo(() => {
    return [
      "All",
      ...new Set(
        materials.map((material) => material.type)
      ),
    ];
  }, [materials]);

  const filteredMaterials = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    return materials.filter((material) => {
      const matchesSearch =
        !normalizedSearch ||
        material.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        material.subject
          .toLowerCase()
          .includes(normalizedSearch) ||
        material.grade
          .toLowerCase()
          .includes(normalizedSearch) ||
        material.section
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesSubject =
        subjectFilter === "All" ||
        material.subject === subjectFilter;

      const matchesType =
        typeFilter === "All" ||
        material.type === typeFilter;

      return (
        matchesSearch &&
        matchesSubject &&
        matchesType
      );
    });
  }, [
    materials,
    searchTerm,
    subjectFilter,
    typeFilter,
  ]);

  const handleCreateMaterial = () => {
    setFormError("");

    setFormData({
      title: "",
      description: "",
      subject: "",
      grade: "",
      section: "",
      type: "PDF",
      status: "Draft",
      externalUrl: "",
      file: null,
    });

    setShowUploadForm(true);
  };

  const handleCloseForm = () => {
    setShowUploadForm(false);
    setFormError("");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (formError) {
      setFormError("");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;

    setFormData((previous) => ({
      ...previous,
      file,
    }));

    if (formError) {
      setFormError("");
    }
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;

    setFormData((previous) => ({
      ...previous,
      type,
      file: null,
      externalUrl: "",
    }));

    if (formError) {
      setFormError("");
    }
  };

  const handleSubmitMaterial = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setFormError("Material title is required.");
      return;
    }

    if (!formData.description.trim()) {
      setFormError("Material description is required.");
      return;
    }

    if (!formData.subject) {
      setFormError("Please select a subject.");
      return;
    }

    if (!formData.grade) {
      setFormError("Please select a grade.");
      return;
    }

    if (!formData.section) {
      setFormError("Please select a section.");
      return;
    }

    if (formData.type === "Link") {
      if (!formData.externalUrl.trim()) {
        setFormError(
          "Please provide the external resource URL."
        );
        return;
      }
    } else if (!formData.file) {
      setFormError(
        `Please select a ${formData.type.toLowerCase()} file.`
      );
      return;
    }

    const newMaterial = {
      id: `MAT${String(
        materials.length + 1
      ).padStart(3, "0")}`,
      title: formData.title.trim(),
      subject: formData.subject,
      grade: formData.grade,
      section: formData.section,
      type: formData.type,
      date: "September 10, 2026",
      status: formData.status,
      description: formData.description.trim(),
      size:
        formData.type === "Link"
          ? "External resource"
          : formData.file
            ? `${(
                formData.file.size /
                (1024 * 1024)
              ).toFixed(1)} MB`
            : "Uploaded file",
    };

    setMaterials((previous) => [
      newMaterial,
      ...previous,
    ]);

    setShowUploadForm(false);

    setFormData({
      title: "",
      description: "",
      subject: "",
      grade: "",
      section: "",
      type: "PDF",
      status: "Draft",
      externalUrl: "",
      file: null,
    });

    setFormError("");
  };

  const handleViewMaterial = (material) => {
    console.log("View material:", material);
  };

  const handleEditMaterial = (material) => {
    console.log("Edit material:", material);
  };

  return (
    <div className="space-y-6">
      {/* =========================================
          PAGE HEADER
      ========================================= */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <BookOpen size={17} />
            <span>Teaching / LMS</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Study Materials
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500 sm:text-base">
            Create, organize, publish, and manage learning
            materials for your assigned students.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateMaterial}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
        >
          <Plus size={18} />
          Add Material
        </button>
      </div>

      {/* =========================================
          MATERIAL UPLOAD FORM
      ========================================= */}
      {showUploadForm && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Form header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <div className="flex items-center gap-2">
                <Upload
                  size={19}
                  className="text-blue-700"
                />

                <h2 className="text-base font-semibold text-slate-900">
                  Add Study Material
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Upload and assign a learning resource to your
                students.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseForm}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close upload form"
            >
              <X size={19} />
            </button>
          </div>

          <form
            onSubmit={handleSubmitMaterial}
            className="p-5"
          >
            {formError && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {formError}
              </div>
            )}

            <div className="grid gap-5 lg:grid-cols-2">
              {/* Title */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="material-title"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Material Title
                </label>

                <input
                  id="material-title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="e.g. Algebra Fundamentals"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Description */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="material-description"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Description
                </label>

                <textarea
                  id="material-description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Describe what students will learn from this material..."
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="material-subject"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Subject
                </label>

                <select
                  id="material-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Select subject
                  </option>
                  <option value="Mathematics">
                    Mathematics
                  </option>
                  <option value="Biology">
                    Biology
                  </option>
                  <option value="Chemistry">
                    Chemistry
                  </option>
                  <option value="Physics">
                    Physics
                  </option>
                  <option value="English">
                    English
                  </option>
                </select>
              </div>

              {/* Grade */}
              <div>
                <label
                  htmlFor="material-grade"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Grade
                </label>

                <select
                  id="material-grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Select grade
                  </option>
                  <option value="Grade 9">
                    Grade 9
                  </option>
                  <option value="Grade 10">
                    Grade 10
                  </option>
                  <option value="Grade 11">
                    Grade 11
                  </option>
                  <option value="Grade 12">
                    Grade 12
                  </option>
                </select>
              </div>

              {/* Section */}
              <div>
                <label
                  htmlFor="material-section"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Section
                </label>

                <select
                  id="material-section"
                  name="section"
                  value={formData.section}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Select section
                  </option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>
              </div>

              {/* Material Type */}
              <div>
                <label
                  htmlFor="material-type"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Material Type
                </label>

                <select
                  id="material-type"
                  name="type"
                  value={formData.type}
                  onChange={handleTypeChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {materialTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* File / URL */}
              <div className="lg:col-span-2">
                {formData.type === "Link" ? (
                  <>
                    <label
                      htmlFor="material-url"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      External Resource URL
                    </label>

                    <div className="relative">
                      <Link2
                        size={18}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="material-url"
                        name="externalUrl"
                        type="url"
                        value={formData.externalUrl}
                        onChange={handleFormChange}
                        placeholder="https://example.com/resource"
                        className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <label
                      htmlFor="material-file"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Upload{" "}
                      {formData.type === "Video"
                        ? "Video"
                        : "File"}
                    </label>

                    <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition hover:border-blue-300 hover:bg-blue-50/30">
                      {formData.file ? (
                        <div className="flex flex-col items-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                            {formData.type === "Video" ? (
                              <Video size={23} />
                            ) : (
                              <FileText size={23} />
                            )}
                          </div>

                          <p className="mt-3 text-sm font-semibold text-slate-800">
                            {formData.file.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {(
                              formData.file.size /
                              (1024 * 1024)
                            ).toFixed(2)}{" "}
                            MB
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              setFormData(
                                (previous) => ({
                                  ...previous,
                                  file: null,
                                })
                              )
                            }
                            className="mt-3 text-xs font-semibold text-red-600 hover:text-red-700"
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm">
                            {formData.type === "Video" ? (
                              <Video size={23} />
                            ) : (
                              <Upload size={23} />
                            )}
                          </div>

                          <p className="mt-3 text-sm font-semibold text-slate-700">
                            Choose a file to upload
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {formData.type === "Video"
                              ? "Upload an educational video for your students."
                              : "Select the learning material from your computer."}
                          </p>

                          <label
                            htmlFor="material-file"
                            className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                          >
                            <Upload size={16} />
                            Choose File
                          </label>

                          <input
                            id="material-file"
                            type="file"
                            onChange={handleFileChange}
                            accept={
                              formData.type === "Video"
                                ? "video/*"
                                : "*/*"
                            }
                            className="hidden"
                          />
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Publication status */}
              <div className="lg:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Publication Status
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className={`cursor-pointer rounded-lg border p-4 transition ${
                      formData.status === "Draft"
                        ? "border-amber-300 bg-amber-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="Draft"
                      checked={
                        formData.status === "Draft"
                      }
                      onChange={handleFormChange}
                      className="mr-2"
                    />

                    <span className="text-sm font-semibold text-slate-800">
                      Save as Draft
                    </span>

                    <p className="mt-1 pl-5 text-xs text-slate-500">
                      Keep the material private until you
                      are ready to publish it.
                    </p>
                  </label>

                  <label
                    className={`cursor-pointer rounded-lg border p-4 transition ${
                      formData.status === "Published"
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="Published"
                      checked={
                        formData.status === "Published"
                      }
                      onChange={handleFormChange}
                      className="mr-2"
                    />

                    <span className="text-sm font-semibold text-slate-800">
                      Publish Now
                    </span>

                    <p className="mt-1 pl-5 text-xs text-slate-500">
                      Make this material immediately available
                      to students.
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Form actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCloseForm}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <X size={17} />
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                <Upload size={17} />
                Save Material
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================================
          SUMMARY CARDS
      ========================================= */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Materials
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {materials.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <BookOpen size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Published
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {
                  materials.filter(
                    (material) =>
                      material.status === "Published"
                  ).length
                }
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <FileText size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Drafts
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {
                  materials.filter(
                    (material) =>
                      material.status === "Draft"
                  ).length
                }
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
              <Edit3 size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Subjects
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {subjects.length - 1}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
              <UsersRound size={21} />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          FILTER BAR
      ========================================= */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Filter size={17} />
          Filters
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search materials, subjects, grades..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="md:w-52">
            <select
              value={subjectFilter}
              onChange={(event) =>
                setSubjectFilter(event.target.value)
              }
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject === "All"
                    ? "All Subjects"
                    : subject}
                </option>
              ))}
            </select>
          </div>

          <div className="md:w-52">
            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value)
              }
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              {filterTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "All"
                    ? "All Types"
                    : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* =========================================
          MATERIAL LIST
      ========================================= */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                My Study Materials
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredMaterials.length} material
                {filteredMaterials.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>
            </div>

            <BookOpen
              size={20}
              className="text-slate-400"
            />
          </div>
        </div>

        {filteredMaterials.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredMaterials.map((material) => {
              const TypeIcon =
                typeIcons[material.type] || FileText;

              return (
                <div
                  key={material.id}
                  className="p-5 transition hover:bg-slate-50"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex min-w-0 flex-1 gap-4">
                      <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 sm:flex">
                        <TypeIcon size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold text-slate-900">
                            {material.title}
                          </h3>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              statusStyles[
                                material.status
                              ]
                            }`}
                          >
                            {material.status}
                          </span>
                        </div>

                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                          {material.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
                          <span className="inline-flex items-center gap-1.5">
                            <BookOpen size={15} />
                            {material.subject}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <UsersRound size={15} />
                            {material.grade} - Section{" "}
                            {material.section}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays size={15} />
                            {material.date}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <TypeIcon size={15} />
                            {material.type}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <Download size={15} />
                            {material.size}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleViewMaterial(material)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                      >
                        View
                        <ChevronRight size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleEditMaterial(material)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Edit3 size={16} />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <BookOpen size={25} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-slate-900">
              No study materials found
            </h3>

            <p className="mt-1 max-w-md text-sm text-slate-500">
              Try changing your search or filters. You can
              also create a new learning material.
            </p>

            <button
              type="button"
              onClick={handleCreateMaterial}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              <Plus size={17} />
              Add Material
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherMaterials;
