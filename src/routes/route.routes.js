import express from 'express';
import { createUser, loginUser } from '../controller/profile.controller.js';
import {
  createDocument,
  getDocumentAll,
  deleteDocument,
  getDocumentId,
} from '../controller/document.controller.js';
import { authentication, authorization } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);

router.post('/uploadfile', authentication, createDocument);
router.get('/files', getDocumentAll);
router.get('/files/:Id', authentication, getDocumentId);
router.delete('/files/:Id', authentication, authorization, deleteDocument);

export default router;
