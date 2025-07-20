import express from 'express';
import { updateWithMedia, removeItem } from '../controllers/portfolioController.js';
import upload from '../middleware/multer.js'; 
import userAuth from '../middleware/userAuth.js'; // if you use it

const portRouter = express.Router();

portRouter.put('/update-field', upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]), userAuth, updateWithMedia);

portRouter.post('/remove', userAuth, removeItem);

export default portRouter;
