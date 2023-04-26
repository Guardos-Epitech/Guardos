import mongoose from 'mongoose';

//Database structure for restaurants
export const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});
