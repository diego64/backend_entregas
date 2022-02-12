import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";

export class UpdateDeliverymanController {
    async handle(request: Request, reponse: Response) {
        const { id_deliveryman } = request;
        const { id: id_delivery } = request.params;

        const updateDeliverymanUseCase = new UpdateDeliverymanUseCase();
        const delivery = await updateDeliverymanUseCase.execute({
            id_deliveryman,
            id_delivery
        });

        return reponse.json(delivery);
    }
}