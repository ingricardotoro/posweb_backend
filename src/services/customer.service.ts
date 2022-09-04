import { isNull, omit } from 'lodash';
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'; 
import Customer, { CustomerDocument } from '../models/customer.model';

export async function createCustomer(input: DocumentDefinition<Omit<CustomerDocument, 'createdAt' | 'updatedAt'>>){
    try {
        const customer = await Customer.create(input);
        return customer;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findCustomers(){
    try {
        const customers = await Customer
            .find()
            .populate('person');

        return customers;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findCustomer(
    customerId: string 
){
    try {
        const customer = await Customer.findById(customerId);
        return customer;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateCustomer(customerId: string, customerUpdate: UpdateQuery<CustomerDocument>){
    try {
        const customer = Customer.findByIdAndUpdate(customerId, customerUpdate);
        return customer;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteCustomer(customerId: string){
    try {
        return Customer.findByIdAndDelete(customerId);
    } catch (error: any) {
        throw new Error(error);
    }
}