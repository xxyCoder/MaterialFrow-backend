import { ArgsHasInvalid, ArgsHasNull } from '../constant/result.constant';
import { Request, Response, NextFunction } from 'express'

const checkArgs = async (req: Request, res: Response, next: NextFunction) => {
    const { customerName, customerPhone, customerAddress, firmName, dispatchAssociates, dispatchPhone, dispatchAddress, acceptPhone, acceptAddress, goodName, count, weight, date, status, price } = req.body;
    if (!customerName ||
        !customerPhone ||
        !customerAddress ||
        !firmName ||
        !dispatchAssociates ||
        !dispatchPhone ||
        !dispatchAddress ||
        !acceptPhone ||
        !acceptAddress ||
        !goodName ||
        !count ||
        !weight ||
        !date ||
        !status ||
        !price
    ) {
        res.send(ArgsHasNull);
        return;
    }
    if (weight <= 0 || price <= 0 || count <= 0) {
        res.send(ArgsHasInvalid);
        return;
    }
    next();
}

export {
    checkArgs
}