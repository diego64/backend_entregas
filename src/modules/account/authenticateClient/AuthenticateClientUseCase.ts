import { prisma } from "../../../database/prismaClient";
import { compare  } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        //Verificar se username é cadastrado
        const client = await prisma.clients.findFirst({
            where: {
                username,
            },
        })

        if(!client) {
            throw new Error("Username or password invalid!");
        }

        //Verificar se a senha é correspondente ao username
        const passwordMatch = await compare(password, client.password)
        
        if(!passwordMatch) {
            throw new Error("Username or password invalid")
        }

        //Gerar o Token
        const token = sign({username}, "cbf59f93406e4276ab5a81d67920f4a7", {
            subject: client.id,
            expiresIn: "1d"
        })

        return token;
    }
}