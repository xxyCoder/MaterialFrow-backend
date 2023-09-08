import express from 'express';
import { checkTwicePasswordIsSame, checkArgsIsNotNull, checkUserIsExists, crpytPassword, verifyLogin } from '../middleware/user.middleware';
import USerController from '../controller/user.controller';

const { registry, login } = USerController;
const router = express.Router();

// 注册
router.post('/registry', checkArgsIsNotNull, checkTwicePasswordIsSame, checkUserIsExists, crpytPassword, registry);
// 登录
router.post('/login', checkArgsIsNotNull, verifyLogin, login);

export default router;