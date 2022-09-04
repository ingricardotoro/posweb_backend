import { isNull, omit } from 'lodash';
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'; 
import Category, { CategoryDocument } from '../models/category.model';

export async function createCategory(input: DocumentDefinition<Omit<CategoryDocument, 'createdAt' | 'updatedAt'>>){
    try {
        const category = await Category.create(input);
        return category;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findCategories(){
    try {
        const categories = await Category.find();
        return categories;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findCategory(
    categoryId: string 
){
    try {
        const category = await Category.findById(categoryId);
        return category;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateCategory(categoryId: string, categoryUpdate: UpdateQuery<CategoryDocument>){
    try {
        const category = Category.findByIdAndUpdate(categoryId, categoryUpdate);
        return category;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteCategory(categoryId: string){
    try {
        return Category.findByIdAndDelete(categoryId);
    } catch (error: any) {
        throw new Error(error);
    }
}