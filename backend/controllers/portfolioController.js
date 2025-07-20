import userDataModel from "../models/userDataModel.js";
import { v2 as cloudinary } from "cloudinary";

export const updateWithMedia = async (req, res) => {
  try {
    const { userId, field, value } = req.body;
    const files = req.files;

    console.log("Incoming update:", {
      userId,
      field,
      value,
      updatePath: `user.${field}`,
    });

    if (!userId || !field) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    let updateValue;
    try {
      updateValue = JSON.parse(value);
    } catch {
      updateValue = value;
    }

    let updated;

    // 🧠 Add SKILLS
    if (field === "skills" && Array.isArray(updateValue)) {
      updated = await userDataModel.findOneAndUpdate(
        { userId },
        { $push: { "user.skills": { $each: updateValue } } },
        { new: true }
      );
    }

    // 🧠 Add PROJECTS
    else if (field === "projects" && Array.isArray(updateValue)) {
      // Upload project image if provided
      if (files?.image?.length > 0) {
        const uploadedImage = await cloudinary.uploader.upload(files.image[0].path, {
          resource_type: "image",
          use_filename: true,
          unique_filename: false,
        });

        // Inject Cloudinary URL into the project object
        updateValue[0].image = uploadedImage.secure_url;
      }

      updated = await userDataModel.findOneAndUpdate(
        { userId },
        { $push: { "user.projects": { $each: updateValue } } },
        { new: true }
      );
    }

    // 📄 Upload CV
    else if (field === "cv") {
      console.log("CV File Check:", files?.cv);
      if (files?.cv?.length > 0) {
        const uploadedCV = await cloudinary.uploader.upload(files.cv[0].path, {
          resource_type: "raw",
          use_filename: true,
          unique_filename: false,
        });

        updateValue = uploadedCV.secure_url;
      }

      const update = { [`user.${field}`]: updateValue };

      updated = await userDataModel.findOneAndUpdate(
        { userId },
        { $set: update },
        { new: true }
      );
    }

    // 🛠 Generic updates (like description, firstName, git, etc.)
    else {
      const update = { [`user.${field}`]: updateValue };
      updated = await userDataModel.findOneAndUpdate(
        { userId },
        { $set: update },
        { new: true }
      );
    }

    if (!updated) {
      console.log("❌ No matching document found for userId:", userId);
      return res
        .status(404)
        .json({ success: false, message: "User not found in DB" });
    }

    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
//Remove function
export const removeItem = async (req, res) => {
    const { userId, type, value } = req.body;
    console.log("Incoming REMOVE request:", { userId, type, value });
    if (!userId || !type || !value) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }
    try {
        let updateQuery = {};
        if (type === 'skills') {
            updateQuery = { 'user.skills': { name: value } };
        } else if (type === 'projects') {
            updateQuery = { 'user.projects': { title: value } };
        } else {
            return res.status(400).json({ success: false, message: "Invalid type" });
        }

        const updated = await userDataModel.findOneAndUpdate({ userId }, { $pull: updateQuery  }, { new: true });

        if (!updated) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: `${type} removed` });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};