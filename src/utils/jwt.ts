import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(
    object: Object,
    options?: jwt.SignOptions | undefined 
) {

    const secretKey = config.get<string>('JwtSecret');

    return jwt.sign(object, secretKey, options);
}

export function verifyJwt<T>(token: string) {
    try {
        const secretKey = config.get<string>('JwtSecret');

        const decoded = jwt.verify(token, secretKey);

        return decoded; 
    } catch (error: any) {
        return null;
    }
}