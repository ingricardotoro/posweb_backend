import mongoose from 'mongoose';

export interface PersonDocument extends mongoose.Document {
    identidad: string;
    name: string;
    lastName: string; 
    rtn: string;
    birth: Date | string;
    gender: string;
    email: string;
    phone1: string;
    phone2: string; 
    country: string;
    city: string;
    location: string;
    website: string;
    facebook: string;
    twitter: string;
    linkedin: string; 
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;  
}

const personSchema = new mongoose.Schema({
    identidad: { type: String, required:true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    rtn: { type: String, trim: true },
    birth: { type: Date, default: Date.now },
    gender: { type: String, enum: ['Male', 'Female'] },
    email: { type: String, required:true, unique:true },
    phone1: { type: String, trim: true },
    phone2: { type: String, trim: true },
    country: { type: String, trim: true },
    city: { type: String, trim: true },
    location: {type: String, trim: true },
    website: { type: String, trim: true },
    facebook: { type: String, trim: true },
    twitter: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    isActive: { type: Boolean, default: true }
},{
    timestamps: true,
    versionKey: false
});

const Person = mongoose.model<PersonDocument>('Person', personSchema);

export default Person;