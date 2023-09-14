import { Request, Response } from 'express'
import OrderService from '../service/order.service'
import { serviceError, successRequest } from '../constant/result.constant'

const { entryGood, searchAllGood, modifyGoodStatus } = OrderService;

class OrderController {
    async entry(req: Request, res: Response) {
        const {
            customerName, customerPhone, customerAddress,
            firmName, dispatchAssociates, dispatchPhone,
            dispatchAddress, acceptPhone, acceptAddress,
            goodName, count, weight,
            date, status, price
        } = req.body;

        try {
            await entryGood(
                {
                    customerName, customerPhone, customerAddress,
                    firmName, dispatchAssociates, dispatchPhone,
                    dispatchAddress, acceptPhone, acceptAddress,
                    goodName, count, weight,
                    date, status, price
                });
            res.send(successRequest);
        } catch (e: any) {
            res.send(serviceError);
        }
    }
    async getAllInfo(req: Request, res: Response) {
        try {
            const data = await searchAllGood();
            const result = successRequest;
            result.result = data;
            res.send(result);
        } catch (e: any) {
            console.error(e);
            res.send(serviceError);
        }
    }
    async modify(req: Request, res: Response) {
        try {
            const { id, status } = req.body;
            await modifyGoodStatus({ id, status });
            res.send(successRequest);
        } catch (e: any) {
            console.error(e);
            res.send(serviceError);
        }
    }
}

export default new OrderController();