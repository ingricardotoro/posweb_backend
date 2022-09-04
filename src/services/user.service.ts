import { isNull, omit } from 'lodash';
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'; 
import User, { UserDocument } from '../models/user.model';

export async function createUser(input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt'>>){
    try {
        const user = await User.create(input);
        return omit(user.toJSON(), 'password');
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findUsers(){
    try {
        const users = await User.find({ rol: 'User' }).select('-password');
        return users;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findUser(
    userId: string 
){
    try {
        const user = await User.findById(userId).select('-password').where({ rol: 'User' });
        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateUser(userId: string, userUpdate: UpdateQuery<UserDocument>){
    try {
        const user = User.findByIdAndUpdate(userId, userUpdate);
        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteUser(userId: string){
    try {
        return User.findByIdAndDelete(userId);
    } catch (error: any) {
        throw new Error(error);
    }
}