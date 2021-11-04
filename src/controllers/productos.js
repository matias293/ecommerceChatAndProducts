import faker from 'faker'

import { productsPersistencia } from "../persistencia/productos"

class Producto {
    getProducts = async(req,res) => {
        
       let productos = await productsPersistencia.getAll()
       if (productos.length === 0) {
        return res.status(404).json({ error: 'No hay productos cargados' });
        } else {
        res.json({
            productos
        })
       }
       
    }

    getProduct = async(req,res) => {
        const {id} = req.params 
            let product = await productsPersistencia.getProduct(id)
            if(product.length === 0){
                return res.status(404).json({ error: 'No existe producto con ese id' });
            }
            else {
                res.json({
                    product
                })
            }
    }

    getProductsFake = async(req,res) => {
        const { cantidad } =  req.query
        const products = []

        const fakerProducts = {
			title: faker.commerce.productName(),
			price: Number(faker.commerce.price()),
			thumbnail: faker.image.technics(),
		};

       
		if (cantidad) {
			if (Number(cantidad) !== 0) {
				for (let i = 0; i < Number(cant); i++) {
					products.push(fakerProducts);
				}
				return res.json({ products });
			}
			return res.status(404).json({ message: 'No hay productos' });
		}

		for (let i = 0; i < 10; i++) {
			products.push(fakerProducts);
		}
        
		return res.json({ products });

    }

    postProduct = async(req,res) => {
        const body = req.body
         await productsPersistencia.add(body)
        res.json({
            msg : 'Producto fue agregado exitosamente'
        })

     }

     updateProduct = async(req,res) => {
        const {id} = req.params 
        const body = req.body
         let product = await productsPersistencia.update(id,body)
         if(product === 0){
            res.json({
                msg:'No existe un producto con ese id'
            })
        }
        else{
            res.json({
                msg:'Producto Actualizado correctamente',
                product
             })
        }
            
     }

     deleteProduct = async(req,res) =>  {
        const {id} = req.params 
        let product =  await productsPersistencia.delete(id)
        if(product === 0){
            res.json({
                msg:'No existe un producto con ese id'
            })
        }
        else{
                res.json({
                    msg: 'Producto Eliminado exitosamente',
                    
                })
            }
     }
}

export const productsController = new Producto();