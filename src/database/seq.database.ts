import { Sequelize } from 'sequelize'   // 引入第三方库
import env from '../config/config.default'; // 引入.env文件

const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE
} = env;

const seq = new Sequelize(MYSQL_DATABASE!, MYSQL_USER!, MYSQL_PASSWORD, {   // 建立mysql连接
    host: MYSQL_HOST!,
    dialect: 'mysql'
});

// 测试是否成功
// seq.authenticate().then(() => {
//     console.log('success');
// }).catch(err => {
//     console.log(err);
// })

export default seq; // 导出seq