import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
    username: string;
    password: string
}

export class CreateClientUseCase {
    async execute({ password, username }: ICreateClient) {
        //Validação do Client (Existe ou não)
        const clientExist = await prisma.clients.findFirst({
            where: {
                username: {
                    mode: "insensitive"
                }
            }
        });

        if(clientExist) {
            throw new Error("Client already exists")
        }

        //Criptografar a senha
        const hashPassword = await hash(password, 10);

        //Salvar o Client
        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword,
            }
        });

        return client;
    }
}