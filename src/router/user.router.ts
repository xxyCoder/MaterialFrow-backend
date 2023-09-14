import express from 'express';
import { checkTwicePasswordIsSame, checkArgsIsNotNull, checkUserIsExists, crpytPassword, verifyLogin } from '../middleware/user.middleware';
import USerController from '../controller/user.controller';
import { auth, check } from '../middleware/auth.middleware';

const { registry, login } = USerController;
const router = express.Router();

// 注册
router.post('/registry', checkArgsIsNotNull, checkTwicePasswordIsSame, checkUserIsExists, crpytPassword, registry);
// 登录
router.post('/login', checkArgsIsNotNull, verifyLogin, login);
// 检查token
router.get('/checkToken', auth, check);

export default router;