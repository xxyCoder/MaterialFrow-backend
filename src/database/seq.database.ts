import { Sequelize } from 'sequelize'
import env from '../config/config.default';

const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE
} = env;

const seq = new Sequelize(MYSQL_DATABASE!, MYSQL_USER!, MYSQL_PASSWORD, {
    host: MYSQL_HOST!,
    dialect: 'mysql'
});

// 测试是否成功
// seq.authenticate().then(() => {
//     console.log('success');
// }).catch(err => {
//     console.log(err);
// })

export default seq;