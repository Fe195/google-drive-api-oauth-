import { google } from 'googleapis';
import { GOOGLE } from '../config.js';
import fs from 'fs';

const client_id = GOOGLE.AUTH.CLIENT_ID;
const client_secret = GOOGLE.AUTH.CLIENT_SECRET;
const redirect_url = GOOGLE.AUTH.REDIRECT_URL;

const folderId = process.env.GOOGLE_API_FOLDER_ID;

const client = new google.auth.OAuth2(client_id, client_secret, redirect_url);

export const uploadFiles = async (file) => {
  try {
    const auth = await google.auth.getClient({
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const drive = google.drive({ version: 'v3', auth });
    console.log('auth ',drive)

    const filePath = '../../postman.PNG';
    const fileBuffer = fs.createReadStream(filePath);
    const media = {
      body: fileBuffer,
      mimeType: 'text/plain',
    };
    const fileMetadata = {
      name: 'file.txt',
      parents: [folderId],
    };

    const response = await drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: 'id',
      },
      (err, file) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`File uploaded: ${file.id}`);
        }
      }
    );
    return response.data.id;
  } catch (err) {
    console.log(err.message);
  }
};
