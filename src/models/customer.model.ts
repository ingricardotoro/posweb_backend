import mongoose from 'mongoose';
import { PersonDocument } from './person.model';

export interface CustomerDocument extends mongoose.Document {
    person: PersonDocument['_id'];
    codeCustomer: string;
    creditLimit: number;
    payIVA: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;  
}

const customerSchema = new mongoose.Schema({
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    codeCustomer: { type: String, required: true, trim: true },
    creditLimit: { type: Number, required: true },
    payIVA: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true }
},{
    timestamps: true,
    versionKey: false
});

const Customer = mongoose.model<CustomerDocument>('Customer', customerSchema);

export default Customer;