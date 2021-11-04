import logger from '../config/logger'
export const calculo = (cant) => {
   let numRepetido = {}
        for (let index = 0; index < cant; index++) {
         let num = Math.floor((Math.random() * (1000 - 1 + 1)) + 1) 
         
          if(numRepetido[num]) {
            numRepetido[num] += 1
          } else {
            numRepetido[num] = 1
          }
        }
        return numRepetido
}


process.on('message', (msg) => {
  
 const query = Number(process.argv[2]) 
  
    if (msg == 'start') {
      
    
      const sum = calculo(query);
        process.send(sum);
      
    }
  });