

import logger from '../config/logger'
import {messageModel} from '../models/mensaje'


  
class Mensajes {
    getAll = async() => {
        try {
            
            let messages = await messageModel.find()

            return messages;
          } catch (err) {
            
            logger.error(err);
          }
        
    }

    add = async(messageData) =>{
        try {
          
          let nuevoMensaje = new messageModel(messageData)
          await nuevoMensaje.save()
          return

          
        } catch (error) {
         logger.error(error) 
        }
   
       

    }
}
export const mensajesPersistencia = new Mensajes();