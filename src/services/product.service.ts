import { isNull, omit } from 'lodash';
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'; 
import Product, { ProductDocument } from '../models/product.model';

export async function createProduct(input: DocumentDefinition<Omit<ProductDocument, 'createdAt' | 'updatedAt'>>){
    try {
        const product = await Product.create(input);
        return product;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findProducts(){
    try {
        const products = await Product.find()
            .populate('category')
            .populate('supplier');

        return products;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findProduct(
    productId: string 
){
    try {
        const product = await Product.findById(productId);
        return product;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateProduct(productId: string, productUpdate: UpdateQuery<ProductDocument>){
    try {
        const product = Product.findByIdAndUpdate(productId, productUpdate);
        return product;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteProduct(productId: string){
    try {
        return Product.findByIdAndDelete(productId);
    } catch (error: any) {
        throw new Error(error);
    }
}