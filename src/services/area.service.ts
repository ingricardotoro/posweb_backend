import { isNull, omit } from 'lodash';
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'; 
import Area, { AreaDocument } from '../models/area.model';

export async function createArea(input: DocumentDefinition<Omit<AreaDocument, 'createdAt' | 'updatedAt'>>){
    try {
        const area = await Area.create(input);
        return area;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findAreas(){
    try {
        const areas = await Area.find().populate('employee');
        return areas;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findArea(
    areaId: string 
){
    try {
        const area = await Area.findById(areaId);
        
        return area;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateArea(areaId: string, areaUpdate: UpdateQuery<AreaDocument>){
    try {
        const area = Area.findByIdAndUpdate(areaId, areaUpdate);
        return area;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteArea(areaId: string){
    try {
        return Area.findByIdAndDelete(areaId);
    } catch (error: any) {
        throw new Error(error);
    }
}