import { isNull, omit } from 'lodash';
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'; 
import Person, { PersonDocument } from '../models/person.model';

export async function createPerson(input: DocumentDefinition<Omit<PersonDocument, 'createdAt' | 'updatedAt'>>){
    try {
        const person = await Person.create(input);
        
        return person;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findPerson(
    personId: string 
){
    try {
        const person = await Person.findById(personId);
        return person;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updatePerson(personId: string, personUpdate: UpdateQuery<PersonDocument>){
    try {
        const person = Person.findByIdAndUpdate(personId, personUpdate);
        return person;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deletePerson(personId: string){
    try {
        return Person.findByIdAndDelete(personId);
    } catch (error: any) {
        throw new Error(error);
    }
}