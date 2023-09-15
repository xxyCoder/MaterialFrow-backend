import { Request, Response } from 'express'
import OrderService from '../service/order.service'
import { serviceError, successRequest } from '../constant/result.constant'

const { entryGood, searchAllGood, modifyGoodStatus, getOrderCountByName } = OrderService;

class OrderController {
    async entry(req: Request, res: Response) {
        const {
            sender, senderPhone, senderAddress,
            companyName, recipient, recipientPhone,
            recipientAddress, goodName, ename,
            count, weight, date, status, price
        } = req.body;

        try {
            await entryGood(
                {
                    sender, senderPhone, senderAddress,
                    companyName, recipient, recipientPhone,
                    recipientAddress, ename, count, weight,
                    date, status, price, goodName
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
    async searchCount(req: Request, res: Response) {
        try {
            const { ename } = req.query;
            const cnt = getOrderCountByName(ename as string);
            const result = successRequest;
            result.result = { cnt };
            res.send(result);
        } catch (e: any) {
            console.error(e);
            res.send(serviceError);
        }
    }
}

export default new OrderController();