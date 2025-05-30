import userModel from '../model/user.model.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
 const { name, email, password, ...others } = req.body;

 if (!email || !password) {
  return res.send('Email and password are required');
 }
 try {
  const isUser = await userModel.findOne({ email });
  if (isUser) {
   return res.send('User already exists, please login to your account.');
  }
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const newUser = await userModel.create({
   name,
   email,
   password: hashed,
   ...others,
  });
  return res.status(201).json({
   message: 'User created Succesfully',
   data: newUser,
  });
 } catch (error) {
  return res.status(404).json({
   message: 'Error creating user',
   error: error.message,
  });
 }
};
export const getAllUsers = async (req, res) => {
 try {
  const users = await userModel.find();
  return res.status(201).json({
   message: 'Users gotten  Succesfully',
   data: users,
  });
 } catch (error) {
  return res.status(404).json({
   message: 'Error getting users',
   error: error.message,
  });
 }
};
export const updateUser = async (req, res) => {
 const { id } = req.params;
 const data = req.body;
 try {
  const updatedUser = await userModel.findByIdAndUpdate(id, data, {
   new: true,
  });
  return res.status(200).json({
   message: 'User updated Successfully',
   data: updatedUser,
  });
 } catch (error) {
  return res.status(404).json({
   message: 'Error getting users',
   error: error.message,
  });
 }
};
export const loginUser = async (req, res) => {
 const { email, password } = req.body;
 if (!email || !password) {
  return res.status(401).json({
   message: 'Invalid credentials',
  });
 }

 try {
  const user = await userModel.findOne({ email });
  if (!user) {
   return res.status(404).json({
    message: 'User does not exist, create account',
   });
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
   return res.status(401).json({
    message: 'Invalid Password',
   });
  }

  return res.status(200).json({
   message: 'Login Successfull',
   data: {
    id: user.id,
    name: user.name,
    email: user.email,
   },
  });
 } catch (error) {
  return res.status(404).json({
   message: 'Error logging in',
   error: error.message,
  });
 }
};
export const deleteUser = async (req, res) => {
 const { id } = req.params;
 try {
  const deletedUser = await userModel.findByIdAndDelete(id);
  return res.status(200).json({
   message: 'User deleted Successfully',
   data: deletedUser,
  });
 } catch (error) {
  return res.status(404).json({
   message: 'Error deleting user',
   error: error.message,
  });
 }
};
