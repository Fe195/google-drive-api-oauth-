import { uploadFiles } from '../helpers/google.helper.js.js';
import { find_email } from '../models/profile.models.js';
import {
  doc_id,
  findAndUpdate,
  valid_document,
  valid_user,
  create_file
} from '../models/document.models.js';
import { isValidObjectId, isValid } from '../helpers/utils.helpers.js';

export const createDocument = async (req, res) => {
  try {
    let files = req.files;
    let createDocument = {
      filename: files[0].originalname,
      filetype: files[0].mimetype,
    };

    const email = req.body.email;

    if (!isValid(email))
      return res
        .status(400)
        .send({ status: false, message: 'Email-ID is required' });

    if (email) {
      const checkEmail = await find_email(email);

      if (!checkEmail) {
        return res.status(404).json({
          status: false,
          message: 'Try again',
        });
      }

      createDocument['user'] = checkEmail._id;
    }
    let fileResponse;
    if (files && files.length > 0) {
      fileResponse = await uploadFiles(files[0]);
     
    } else
      return res
        .status(400)
        .send({ status: false, message: 'Please Provide Document' });

    let DocUrl = 'https://drive.google.com/drive/folders/1HCiS43jlw-of6reLSiOCrXS3kEAQsEda' + fileResponse;
    createDocument['file'] = DocUrl;

    const uploadedData = await create_file(createDocument);

    if (!uploadedData)
      return res
        .status(400)
        .send({ status: false, message: 'not able to uplaod document' });

    return res
      .status(201)
      .send({ status: true, message: 'document created', data: uploadedData });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
export const getDocumentAll = async (req, res) => {
  try {
    const documents = await valid_document(isDeleted);

    if (!documents) {
      return res
        .status(404)
        .send({ status: false, message: 'no single document found' });
    }

    return res
      .status(200)
      .send({ status: true, message: 'bingo all data found', data: documents });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
export const getDocumentId = async (req, res) => {
  try {
    const docId = req.params.Id;

    if (!isValidObjectId(docId)) {
      return res
        .status(400)
        .send({ status: false, message: 'Please provide valid Id' });
    }

    if (!isValid(docId))
      return res
        .status(400)
        .send({ status: false, message: 'please Prvide valid Params' });

    const user = await doc_id(docId);

    if (!user) {
      return res
        .status(404)
        .send({ status: false, message: 'Id does not exist' });
    }

    const findoc = await valid_user({ user, isDeleted });
    if (!findoc) {
      return res
        .status(404)
        .send({ status: false, message: 'document not found for getdata' });
    }

    return res
      .status(200)
      .send({ status: true, message: 'succsess', data: findoc });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
export const deleteDocument = async (req, res) => {
  try {
    const docId = req.params.Id;

    if (!isValidObjectId(docId)) {
      return res
        .status(400)
        .send({ status: false, message: 'please Prvide valid Object Id' });
    }

    const deleteDocument = await findAndUpdate({ _id: docId });

    if (!deleteDocument)
      return res
        .status(404)
        .send({ status: false, message: 'Book not found or Already Deleted' });
    return res
      .status(200)
      .send({ status: true, message: 'Deleted', data: deleteDocument });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
