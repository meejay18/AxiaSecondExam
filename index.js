import express from 'express';
import mongoose from 'mongoose';
import env from 'dotenv';
import userRouter from './router/userRouter.js';
env.config();
const app = express();
app.use(express.json());

const port = 4000;

mongoose
 .connect(process.env.MONGO_URL)
 .then(() => {
  console.log('Database Connected');
 })
 .catch(() => {
  console.log('Error connecting database');
 });

app.use(userRouter);
app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
