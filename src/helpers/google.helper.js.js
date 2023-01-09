import { google } from 'googleapis';
import { GOOGLE } from '../config.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client_id = GOOGLE.AUTH.CLIENT_ID;
const client_secret = GOOGLE.AUTH.CLIENT_SECRET;
const redirect_url = GOOGLE.AUTH.REDIRECT_URL;
const refresh_token = GOOGLE.AUTH.REFRESH_TOKEN;

const folderId = process.env.GOOGLE_API_FOLDER_ID;

const oauth2client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_url
);

oauth2client.setCredentials({ refresh_token: refresh_token });
const drive = google.drive({ version: 'v3', auth: oauth2client });
const filePath = path.join(__dirname, 'postman.png');

export const uploadFiles = async (file) => {
  try {
    const response = await drive.files.create({
      scopes: ['https://www.googleapis.com/auth/drive.appdata'],
      requestBody: {
        name: 'testimage.png',
        mimeType: 'image/jpg',
      },
      media: {
        mimeType: 'image/jpg',
        body: fs.createReadStream(filePath),
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log('error', error.message);
  }
};

export const deleteFiles = async (id) => {
  try {
    const response = await drive.files.delete({
      fileId: id,
    });
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error.mesage);
  }
};
