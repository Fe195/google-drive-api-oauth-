import mongoose from 'mongoose';
import { MONGO_CONNECTION_URL } from '../config.js';
mongoose.set('strictQuery', false);

const connectDatabase = () => {
  console.log('mongodb is connecting');
  mongoose
    .connect(
      MONGO_CONNECTION_URL,
      {
        useNewUrlParser: true,
      }
    )
    .then(() => {
      console.log(`mongodb is connected`);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
};

export default connectDatabase;
