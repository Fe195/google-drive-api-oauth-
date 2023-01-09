import * as dotenv from 'dotenv';
dotenv.config();

const env = process.env;

let _MONGO_CONNECTION_URL = '';

const MONGO_PROTOCOL = env.MONGO_PROTOCOL || 'mongodb';
const MONGO_SERVER = env.MONGO_SERVER || 'localhost';
const MONGO_USERNAME = env.MONGO_USERNAME || '';
const MONGO_PASSWORD = env.MONGO_PASSWORD || '';
const MONGO_DBNAME = env.MONGO_DBNAME || 'test';
if (MONGO_USERNAME) {
  _MONGO_CONNECTION_URL = `${MONGO_PROTOCOL}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_SERVER}/${MONGO_DBNAME}`;
} else {
  _MONGO_CONNECTION_URL = `${MONGO_PROTOCOL}://localhost:27017/${MONGO_DBNAME}`;
}

export const MONGO_CONNECTION_URL = _MONGO_CONNECTION_URL;

export const GOOGLE = {
  AUTH: {
    CLIENT_ID: env.GOOGLE_DRIVE_CLIENT_ID,
    CLIENT_SECRET: env.GOOGLE_DRIVE_CLIENT_SECRET,
    REDIRECT_URL: env.GOOGLE_DRIVE_REDIRECT_URI,
  },
};
