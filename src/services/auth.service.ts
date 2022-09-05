import { omit } from "lodash";
import { UserDocument } from "../models/user.model";
import { signJwt } from "../utils/jwt";

export function signAccessToken(user: UserDocument) {
    const privateFields = [
        "password",
        "employee",
        "createAt",
        "updateAt"
    ];

    const payload = omit(user.toJSON(), privateFields);

    const accessToken = signJwt(payload, { expiresIn: '1h' });

    return accessToken; 
}