import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  user: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    cv: { type: String, required: true },
    skills: [
      {
        name: String,
        level: Number,
        category: String,
      },
    ],
    projects: [
      {
        title: String,
        about: String,
        image: String,
        stack: [String],
        live: String,
        github: String,
      },
    ],
    description: { type: String, required: true },
    reflex: { type: String, required: true },
    story: { type: String, required: true },
    nspf: { type: String, required: true },
    dspf: { type: String, required: true },
    nsps: { type: String, required: true },
    dsps: { type: String, required: true },
    experience: { type: String, required: true },
    location: { type: String, required: true },
    git: { type: String, required: true },
    linkedin: { type: String, required: true },
    instagram: { type: String, required: true },
  },
});

const userDataModel =
  mongoose.models.userData || mongoose.model("UserData", userDataSchema);

export default userDataModel;
