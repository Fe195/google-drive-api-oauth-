import { google } from 'googleapis';

const GOOGLE_API_FOLDER_ID = process.env.GOOGLE_API_FOLDER_ID;

export const uploadFiles = async (file) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: '../../keyfile.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const driveService = google.drive({
      version: 'v3',
      auth,
    });

    const fileBuffer = Buffer.from(file, 'utf-8');

    const fileMetaData = {
      name: file.originalname,
      parents: [GOOGLE_API_FOLDER_ID],
    };

    const media = {
      mimeType: file.mimeType,
      body: fileBuffer,
    };

    const response = await driveService.files.create(
      {
        resource: fileMetaData,
        media: media,
        fields: 'id',
      },
      (err, file) => {
        if (err) {
        } else {
          console.log(`File ID: ${file.id}`);
        }
      }
    );
    return response.data.id;
  } catch (err) {
    console.log(err.message);
  }
};
