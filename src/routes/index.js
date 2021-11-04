import { Router } from 'express';

import authRouter from './auth'
import productsRouter from './productos';


const router = Router();

router.use('/', productsRouter);
// router.use('/',authRouter)



export default router;