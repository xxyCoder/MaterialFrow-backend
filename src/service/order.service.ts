import Orders, { type OrderModel } from "../model/order.model";

class OrderService {
    async entryGood({ customerName, customerPhone, customerAddress, firmName, dispatchAssociates, dispatchPhone, dispatchAddress, acceptPhone, acceptAddress, goodName, count, weight, date, status, price }: OrderModel) {
        await Orders.create({ customerName, customerPhone, customerAddress, firmName, dispatchAssociates, dispatchPhone, dispatchAddress, acceptPhone, acceptAddress, goodName, count, weight, date, status, price });
    }
}

export default new OrderService();