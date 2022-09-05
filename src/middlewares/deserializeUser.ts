import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const accessToken = (
    req.headers.authorization || 
    req.headers.cookie ||
    //req.cookies.jwt ||
    ""
  ).replace(/^Bearer\s/, "");

  if (!accessToken) {
    return next();
  }
  
  const decoded = verifyJwt(accessToken.replace('jwt=', ''));
  
  if (decoded) {
    res.locals.user = decoded;
  }

  return next();
};

export default deserializeUser;