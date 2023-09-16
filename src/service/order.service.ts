import Orders, { type OrderModel } from '../model/order.model'
import Users from '../model/user.model'

class OrderService {
    async entryGood({
        sender,
        senderPhone,
        senderAddress,
        companyName,
        recipient,
        recipientPhone,
        recipientAddress,
        ename,
        count,
        weight,
        date,
        status,
        price,
        goodName
    }: OrderModel) {
        await Orders.create({
            sender,
            senderPhone,
            senderAddress,
            companyName,
            recipient,
            recipientPhone,
            recipientAddress,
            ename,
            count,
            weight,
            date,
            status,
            price,
            goodName
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
        })
        return cnt ? cnt : 0
    }
    async getAllEmployeeName() {
        let data = await Users.findAll({
            attributes: ['username']
        })
        data = [...data]
        return data.map(d => d.dataValues)
    }
}

export default new OrderService()
