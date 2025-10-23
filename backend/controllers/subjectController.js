const Subject = require("../models/studentModel");
const cloudinary = require("../services/cloudinary"); 
const getSubjects = async (req, res) => {
  try {
    const Subjects = await Subject.find({});
    res.status(200).json(Subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const Subjects = await Subject.findById(id);
    res.status(200).json(Subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSubject = async (req, res) => {

  try{
    const SubjectData=req.body;
    if(req.file){
      SubjectData.imageUrl=req.file.path;
      SubjectData.cloudinaryId=req.file.filename;
    }    
    const Subject =  await Subject.create(SubjectData);
    res.status(201).json(Subject);
  }catch(error){
    console.error("Error creating Subject: ".error);
    res.status(500).json({message: error.message});
  }
}
const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if(req.file){
      updateData.imageUrl=req.file.path;
      updateData.cloudinaryId=req.file.filename;
    }
    const Subject = await Subject.findByIdAndUpdate(id, updateData, {new: true});
    if (!Subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json(Subject);
  } catch (error) {
    console.error("Error updating Subject: ",error);
    res.status(500).json({ message: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const Subject = await Subject.findByIdAndDelete(id);

    if (!Subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    if(Subject.cloudinaryId){
      await cloudinary.uploader.destroy(Subject.cloudinaryId);
    }

    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("Error deleting Subject: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};
