import mongoose from 'mongoose';
import { PersonDocument } from './person.model';

export interface SupplierDocument extends mongoose.Document {
    person: PersonDocument['_id'];
    codeSupplier: string;
    companyName: string;
    companyLocation: string;
    companyPhone1: string;
    companyPhone2: string;
    companyRtn: string; 
    companyLogo: string;
    workPosition: string;
    title: string; 
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;  
}

const supplierSchema = new mongoose.Schema({
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    codeSupplier: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    companyLocation: { type: String, required: true, trim: true },
    companyPhone1: { type: String, required: true, trim: true },
    companyPhone2: { type: String, trim: true },
    companyRtn: { type: String, required: true, trim: true },
    companyLogo: { type: String, trim: true },
    workPosition: { type: String, trim: true },
    title: { type: String, trim: true },
    isActive: { type: Boolean, default: true }
},{
    timestamps: true,
    versionKey: false
});

const Supplier = mongoose.model<SupplierDocument>('Supplier', supplierSchema);

export default Supplier;