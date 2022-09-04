import mongoose from 'mongoose';
import { CategoryDocument } from './category.model';
import { SupplierDocument } from './supplier.model';

export interface ProductDocument extends mongoose.Document {
    codeProduct: string;
    name: string;
    description: string;
    category: CategoryDocument['_id'];
    supplier: SupplierDocument['_id'];
    price1: number;
    price2: number;
    price3: number;
    price4: number;
    inStock: number;
    cost: number;
    brand: string; 
    serie: string;
    color: string;
    year: string;
    weight: string;
    size: string;
    minCount: number; 
    expiredDate: Date | string; 
    expiredSaleDate: Date | string; 
    isConsumible: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;  
}

const productSchema = new mongoose.Schema({
    codeProduct: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    price1: { type: Number, required: true },
    price2: { type: Number, required: true },
    price3: { type: Number, required: true },
    price4: { type: Number, required: true },
    inStock: { type: Number, required: true },
    cost: { type: Number, required: true },
    brand: { type: String, required: true, trim: true },
    serie: { type: String, required: true, trim: true },
    color: { type: String, trim: true },
    year: { type: String, trim: true },
    weight: { type: String, trim: true },
    size: { type: String, trim: true },
    minCount: { type: Number, required: true },
    expiredDate: { type: Date },
    expiredSaleDate: { type: Date },
    isConsumible: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true }
},{
    timestamps: true,
    versionKey: false
});

const Product = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;