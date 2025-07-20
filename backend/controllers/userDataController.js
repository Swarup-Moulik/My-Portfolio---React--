import userDataModel from "../models/userDataModel.js";
import userModel from "../models/userModel.js"
import { v2 as cloudinary } from "cloudinary";

//Adding New Portfolio
const addPortfolio = async (req, res) => {
  try {
    const files = req.files;
    // Upload CV to Cloudinary
    let cvUrl = "";
    if (files?.cv?.length > 0) {
      const uploadedCV = await cloudinary.uploader.upload(files.cv[0].path, {
        resource_type: "raw",
        use_filename: true,
        unique_filename: false,
      });
      cvUrl = uploadedCV.secure_url;
    }

    // Upload project images to Cloudinary
    let projectImageUrls = [];
    if (files?.projectImages?.length > 0) {
      projectImageUrls = await Promise.all(
        files.projectImages.map(async (item) => {
          const uploadedImage = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return uploadedImage.secure_url;
        })
      );
    }
    const userData = {
      userId: req.userId,
      user: {
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.email,
        phoneNumber: req.body.number,
        cv: cvUrl,

        skills: JSON.parse(req.body.skills || "[]").map((skill) => ({
          name: skill.name,
          level: parseInt(skill.level),
          category: skill.category,
        })),

        projects: JSON.parse(req.body.projects || "[]").map(
          (project, index) => ({
            title: project.title,
            about: project.about,
            image: projectImageUrls[index] || "",
            stack: project.stack,
            live: project.live,
            github: project.github,
          })
        ),

        description: req.body.description,
        reflex: req.body.reflex,
        story: req.body.story,
        nspf: req.body.nspf,
        dspf: req.body.dspf,
        nsps: req.body.nsps,
        dsps: req.body.dsps,
        experience: req.body.experience,
        location: req.body.location,
        git: req.body.git,
        linkedin: req.body.linkedin,
        instagram: req.body.instagram,
      },
    };
    const userD = new userDataModel(userData);
    await userD.save();
    res.json({
      success: true,
      message: "User Portfolio created.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
//List Portfolio
const listPortfolio = async (req, res) => {
  const userID = req.params.userId;
  try {
    const portfolios = await userDataModel.findOne({ userId: userID });
    res.json({
      success: true,
      portfolios,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const deleteAccount = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedData = await userDataModel.findOneAndDelete({ userId });
    const deletedAccount = await userModel.findOneAndDelete({ userId });
    if (!deletedData && !deletedAccount) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, message: 'Account and portfolio deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
export { addPortfolio, listPortfolio, deleteAccount };
