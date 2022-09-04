import mongoose from 'mongoose';

export interface CategoryDocument extends mongoose.Document {
    index: number;
    parentCode: number;
    codeCategory: string;
    nameCategory: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;  
}

const categorySchema = new mongoose.Schema({
    index: { type: Number, required: true },
    parentCode: { type: Number },
    codeCategory: { type: String, required: true, trim: true },
    nameCategory: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    isActive: { type: Boolean, default: true }
},{
    timestamps: true,
    versionKey: false
});

const Category = mongoose.model<CategoryDocument>('Category', categorySchema);

export default Category;