import express from 'express'
import { createUser, loginUser } from '../controller/profileController.js'
import { createDocument, getDocumentAll, deleteDocument, getDocumentId } from '../controller/document.controller.js';
import { authentication, authorization } from '../middlewares/auth.js'

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);

router.post('/uploadfile/:Id', authentication, createDocument);
router.get('/files', getDocumentAll);
router.get('/files/:Id', authentication, getDocumentId);
router.delete('/files/:Id', authentication, authorization, deleteDocument);

export default router