import mongoose from 'mongoose';
import { PersonDocument } from './person.model';

export interface EmployeeDocument extends mongoose.Document {
    person: PersonDocument['_id'];
    codeEmployee: string;
    workLocation: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;  
}

const employeeSchema = new mongoose.Schema({
    person: { type: mongoose.Schema.Types.ObjectId, ref:'Person' },
    codeEmployee: { type: String, required: true, unique: true },
    workLocation: { type: String, trim: true },
    isActive: { type: Boolean, default: true }
},{
    timestamps: true,
    versionKey: false
});

const Employee = mongoose.model<EmployeeDocument>('Employee', employeeSchema);

export default Employee;