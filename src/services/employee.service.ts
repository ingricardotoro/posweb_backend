import { isNull, omit } from 'lodash';
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'; 
import Employee, { EmployeeDocument } from '../models/employee.model';

export async function createEmployee(input: DocumentDefinition<Omit<EmployeeDocument, 'createdAt' | 'updatedAt'>>){
    try {
        const employee = await Employee.create(input);
        return employee;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findEmployees(){
    try {
        const employees = await Employee
            .find()
            .populate('person');

        return employees;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findEmployee(
    EmployeeId: string 
){
    try {
        const employee = await Employee.findById(EmployeeId);
        return employee;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateEmployee(employeeId: string, employeeUpdate: UpdateQuery<EmployeeDocument>){
    try {
        const employee = Employee.findByIdAndUpdate(employeeId, employeeUpdate);
        return employee;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteEmployee(employeeId: string){
    try {
        return Employee.findByIdAndDelete(employeeId);
    } catch (error: any) {
        throw new Error(error);
    }
}