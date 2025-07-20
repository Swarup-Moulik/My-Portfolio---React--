import express from 'express';
import { addPortfolio, listPortfolio, deleteAccount } from '../controllers/userDataController.js'; // Adjust path if your controller is named differently or located elsewhere
import upload from '../middleware/multer.js'; // Your Multer middleware
import userAuth from '../middleware/userAuth.js';

const userDataRouter = express.Router();

// Route for adding a new portfolio with two distinct file uploads: one for 'cv' and one for a general 'image'
userDataRouter.post('/add', userAuth, upload.fields([
    { name: 'cv', maxCount: 1 },         // For the CV file
    { name: 'projectImages' }      // For the general image file (e.g., project image, profile pic)
]), addPortfolio);

// Route for listing all portfolios
userDataRouter.get('/list/:userId?', listPortfolio);
userDataRouter.delete('/delete-account/:userId', userAuth, deleteAccount);
export default userDataRouter;