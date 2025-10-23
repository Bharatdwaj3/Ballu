const Student = require("../models/studentModel");
const cloudinary = require("../services/cloudinary"); 
const getStudents = async (req, res) => {
  try {
    const Students = await Student.find({});
    res.status(200).json(Students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const Students = await Student.findById(id);
    res.status(200).json(Students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createStudent = async (req, res) => {

  try{
    const StudentData=req.body;
    if(req.file){
      StudentData.imageUrl=req.file.path;
      StudentData.cloudinaryId=req.file.filename;
    }    
    const Student =  await Student.create(StudentData);
    res.status(201).json(Student);
  }catch(error){
    console.error("Error creating Student: ".error);
    res.status(500).json({message: error.message});
  }
}
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if(req.file){
      updateData.imageUrl=req.file.path;
      updateData.cloudinaryId=req.file.filename;
    }
    const Student = await Student.findByIdAndUpdate(id, updateData, {new: true});
    if (!Student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(Student);
  } catch (error) {
    console.error("Error updating Student: ",error);
    res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const Student = await Student.findByIdAndDelete(id);

    if (!Student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if(Student.cloudinaryId){
      await cloudinary.uploader.destroy(Student.cloudinaryId);
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting Student: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
