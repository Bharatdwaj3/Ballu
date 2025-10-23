const Faculty = require("../models/FacultyModel");
const cloudinary = require("../services/cloudinary"); 
const getFacultys = async (req, res) => {
  try {
    const Facultys = await Faculty.find({});
    res.status(200).json(Facultys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const Facultys = await Faculty.findById(id);
    res.status(200).json(Facultys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFaculty = async (req, res) => {

  try{
    const FacultyData=req.body;
    if(req.file){
      FacultyData.imageUrl=req.file.path;
      FacultyData.cloudinaryId=req.file.filename;
    }    
    const Faculty =  await Faculty.create(FacultyData);
    res.status(201).json(Faculty);
  }catch(error){
    console.error("Error creating Faculty: ".error);
    res.status(500).json({message: error.message});
  }
}



const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if(req.file){
      updateData.imageUrl=req.file.path;
      updateData.cloudinaryId=req.file.filename;
    }
    const Faculty = await Faculty.findByIdAndUpdate(id, updateData, {new: true});
    if (!Faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json(Faculty);
  } catch (error) {
    console.error("Error updating Faculty: ",error);
    res.status(500).json({ message: error.message });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const Faculty = await Faculty.findByIdAndDelete(id);

    if (!Faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    if(Faculty.cloudinaryId){
      await cloudinary.uploader.destroy(Faculty.cloudinaryId);
    }

    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    console.error("Error deleting Faculty: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFacultys,
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
};
