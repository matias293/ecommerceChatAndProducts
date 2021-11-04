import { Router } from 'express';
import { productsController } from '../controllers/productos';


const router = Router();

 router.get('/productos/listar', productsController.getProducts);

router.get('/vista-test', productsController.getProductsFake);

 router.get('/productos/listar/:id', productsController.getProduct);

 router.post('/productos/agregar',productsController.postProduct);
 
 router.put('/productos/actualizar/:id', productsController.updateProduct);

 router.delete('/productos/borrar/:id', productsController.deleteProduct);

export default router