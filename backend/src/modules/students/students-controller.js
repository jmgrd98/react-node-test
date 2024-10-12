const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json(students);
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const { name, age, grade } = req.body;
    const newStudent = await addNewStudent({ name, age, grade });
    res.status(201).json(newStudent);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedStudent = await updateStudent(id, updatedData);
    if (updatedStudent) {
        res.status(200).json(updatedStudent);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);
    if (student) {
        res.status(200).json(student);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const updatedStudent = await setStudentStatus(id, status);
    if (updatedStudent) {
        res.status(200).json(updatedStudent);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
