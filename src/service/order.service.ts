/*
 * @Author: 李羊
 * @Date: 2023-09-14 23:03:29
 * @FilePath: \MaterialFrow-backend\src\service\order.service.ts
 * @LastEditTime: 2023-09-15 16:05:01
 * @Description:
 */
import Orders, { type OrderModel } from '../model/order.model'

class OrderService {
    async entryGood({
        sender, senderPhone, senderAddress,
        companyName, recipient, recipientPhone,
        recipientAddress, ename, count, weight,
        date, status, price, goodName
    }: OrderModel) {
        await Orders.create({
            sender, senderPhone, senderAddress,
            companyName, recipient, recipientPhone,
            recipientAddress, ename, count, weight,
            date, status, price, goodName
        })
    }
    async searchAllGood() {
        let data = await Orders.findAll()
        data = [...data]
        return data.map(d => d.dataValues)
    }
    async searchGoodById(id: string): Promise<string> {
        const data = await Orders.findOne({
            where: {
                id
            }
        })
        return data ? data.dataValues : ''
    }
    async modifyGoodStatus({ id, status }: { id: string; status: string }) {
        await Orders.update(
            { status },
            {
                where: {
                    id
                }
            }
        )
    }
    async getOrderCountByName(ename: string) {
        const cnt = await Orders.count({
            where: {
                ename
            }
        });
        return cnt ? cnt : 0;
    }
}

export default new OrderService()
