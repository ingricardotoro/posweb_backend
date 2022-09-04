import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import { EmployeeDocument } from './employee.model';

enum Roles { Admin, User };

export interface UserDocument extends mongoose.Document {
    username: string;
    password: string;
    rol: Roles | string;
    employee: EmployeeDocument['_id'];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;  
}

const userSchema = new mongoose.Schema({
    username: { type: String, required:true, unique:true, trim: true },
    password: { type: String, required:true, trim: true },
    rol: { type: String, enum: Roles, required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    isActive: { type: Boolean, default: true }
},{
    timestamps: true,
    versionKey: false
});

userSchema.pre('save', async function (next){
    let user = this as UserDocument;

    if(!user.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean>{
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e)=> false);
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;