import mongoose from "mongoose";

const UserScheema = new mongoose.Schema({
    username: {type: String, unique: true, required:true},
    email: {type: String, unique: true, required:true},
    authentication : {
        password: {type: String, required:true, select:false},
        salt: {type: String, select:false},
        sessionToken: {type: String, selct:false},
    }
});

export const UserModel = mongoose.model('User', UserScheema);

export const getUsers = () => UserModel.find({});
export const getUserByEmail = (email: string) => UserModel.findOne({email})
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken
})
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) =>user.toObject());
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete({ _id: id});
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);