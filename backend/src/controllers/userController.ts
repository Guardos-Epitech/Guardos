import mongoose from 'mongoose';
import {userSchema}
  from '../models/userInterface';

export async function addUser(username: string, 
  email: string, password: string) {
  console.log('Adding an User');
  const UserSchema = mongoose.model('User', userSchema, 'User');
  const upload = new UserSchema({
    username: username,
    email: email,
    password: password
  });
  await upload.save();
  console.log('User ' + username + ' saved ' + ' with email ' + email);
}

export async function loginUser(username: string, 
  password: string) {
  console.log('Loggin as an User');
  const UserSchema = mongoose.model('User', userSchema, 'User');
  const userData = await UserSchema.find();
  console.log(password);
  for (const elem of userData) {
    if ((elem.username === username || 
      elem.email === username) && elem.password === password) {
      console.log('User ' + username + ' logged in ' + ' with password ' + password);
      return true;
    }
  }
  return false;
}
