import mongoose from 'mongoose';
import {userSchema}
  from '../models/userInterface';

export async function addUser(username: string, 
  email: string, password: string) {

  const errorArray = [false, false];
  const UserSchema = mongoose.model('User', userSchema, 'User');
  const upload = new UserSchema({
    username: username,
    email: email,
    password: password,
    allergens: []
  });
  const existingUsername = await UserSchema.findOne({ username: username })
    .exec();
  const existingEmail = await UserSchema.findOne({ email: email })
    .exec();

  if (existingEmail) {
    errorArray[0] = true;
  }
  if (existingUsername) {
    errorArray[1] = true;
  }
  if (errorArray.includes(true)) {
    return errorArray;
  }
  await upload.save();
  return errorArray;
}

export async function loginUser(username: string, 
  password: string) {
  const UserSchema = mongoose.model('User', userSchema, 'User');
  const userData = await UserSchema.find();
  for (const elem of userData) {
    if ((elem.username === username || 
      elem.email === username) && elem.password === password) {
      return true;
    }
  }
  return false;
}

export async function getAllergens(email: string) {
  const UserSchema = mongoose.model('User', userSchema, 'User');
  const userData = await UserSchema.findOne({email: email})
    .exec();
  return userData;
}

export async function updateAllergens(email: string, allergens: string) {
  const UserSchema = mongoose.model('User', userSchema, 'User');
  const userData = await UserSchema.findOneAndUpdate({email: email}, {allergens: JSON.parse(allergens)}, {new: true});
  return userData;
}
