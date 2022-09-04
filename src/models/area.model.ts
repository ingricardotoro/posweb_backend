import mongoose from 'mongoose';
import { EmployeeDocument } from './employee.model';

export interface AreaDocument extends mongoose.Document {
    index: number;
    parentCode: number;
    codeArea: string;
    nameArea: string;
    phoneArea: string;
    employee: EmployeeDocument['_id'];
    details: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;  
}

const areaSchema = new mongoose.Schema({
    index: { type: Number, required: true },
    parentCode: { type: Number },
    codeArea: { type: String, required: true, trim: true },
    nameArea: { type: String, required: true, trim: true },
    phoneArea: { type: String, trim: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    details: { type: String, trim: true },
    isActive: { type: Boolean, default: true }
},{
    timestamps: true,
    versionKey: false
});

const Area = mongoose.model<AreaDocument>('Area', areaSchema);

export default Area;