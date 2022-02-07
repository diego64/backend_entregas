import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
    sub: string
}

export async function ensureAuthenticateClient(
    request: Request,
    response: Response,
    next: NextFunction
){
    const authHeader = request.headers.authorization;    

    if(!authHeader) {
        return response.status(401).json({
            message: "Token missing"
        })
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub } = verify( token, "cbf59f93406e4276ab5a81d67920f4a7" ) as IPayLoad;

        request.id_client = sub;

        return next();
    } catch(err) {
        return response.status(401).json({
            message: "Invalid token!"
        });
    }
}