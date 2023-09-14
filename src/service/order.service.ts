import Orders, { type OrderModel } from "../model/order.model";

class OrderService {
    async entryGood({ customerName, customerPhone, customerAddress, firmName, dispatchAssociates, dispatchPhone, dispatchAddress, acceptPhone, acceptAddress, goodName, count, weight, date, status, price }: OrderModel) {
        await Orders.create({ customerName, customerPhone, customerAddress, firmName, dispatchAssociates, dispatchPhone, dispatchAddress, acceptPhone, acceptAddress, goodName, count, weight, date, status, price });
    }
    async searchAllGood() {
        let data = await Orders.findAll();
        data = [...data];
        return data.map(d => d.dataValues);
    }
    async searchGoodById(id: string): Promise<string> {
        const data = await Orders.findOne({
            where: {
                id
            }
        });
        return data ? data.dataValues : "";
    }
    async modifyGoodStatus({ id, status }: { id: string, status: string }) {
        await Orders.update({ status }, {
            where: {
                id
            }
        });
    }
}

export default new OrderService();