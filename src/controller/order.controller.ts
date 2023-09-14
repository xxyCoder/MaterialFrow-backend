import { Request, Response } from 'express'
import OrderService from '../service/order.service'
import { serviceError, successRequest } from '../constant/result.constant'

const { entryGood } = OrderService;

class OrderController {
    async entry(req: Request, res: Response) {
        const { customerName, customerPhone, customerAddress, firmName, dispatchAssociates, dispatchPhone, dispatchAddress, acceptPhone, acceptAddress, goodName, count, weight, date, status, price } = req.body;
        try {
            await entryGood({ customerName, customerPhone, customerAddress, firmName, dispatchAssociates, dispatchPhone, dispatchAddress, acceptPhone, acceptAddress, goodName, count, weight, date, status, price });
            res.send(successRequest);
        } catch (e: any) {
            res.send(serviceError);
        }
    }
}

export default new OrderController();