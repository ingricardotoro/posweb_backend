import { isNull, omit } from 'lodash';
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'; 
import Supplier, { SupplierDocument } from '../models/supplier.model';

export async function createSupplier(input: DocumentDefinition<Omit<SupplierDocument, 'createdAt' | 'updatedAt'>>){
    try {
        const supplier = await Supplier.create(input);
        return supplier;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findSuppliers(){
    try {
        const suppliers = await Supplier
            .find()
            .populate('person');

        return suppliers;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findSupplier(
    supplierId: string 
){
    try {
        const supplier = await Supplier.findById(supplierId);
        return supplier;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateSupplier(supplierId: string, supplierUpdate: UpdateQuery<SupplierDocument>){
    try {
        const supplier = Supplier.findByIdAndUpdate(supplierId, supplierUpdate);
        return supplier;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteSupplier(supplierId: string){
    try {
        return Supplier.findByIdAndDelete(supplierId);
    } catch (error: any) {
        throw new Error(error);
    }
}