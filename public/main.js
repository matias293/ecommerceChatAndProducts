
let socket = io.connect('http://localhost:8080', { forceNew: true });


socket.on('askProduct');
socket.on('askMensajes');

 const sendProduct = () => {
    
    
    const title    = document.getElementById('title')
    const price     = document.getElementById('price')
    const thumbnail = document.getElementById('thumbnail')
  
    const product = { title:title.value, price:price.value , thumbnail:thumbnail.value }
   
         socket.emit('new-product',product)
    
    
}
const render = (productos) => {   

    let productsHtml = ''
        productos.forEach((producto )=> {
            
        productsHtml +=`
           <tr>
              <td(scope="col")>${producto.id}</td>
              <td(scope="col")>${producto.title}</td>
              <td(scope="col")>${producto.price}</td>
              <td(scope="col")>${producto.thumbnail}</td>
           </tr>
        `  
    })
    
    document.getElementById('table_body').innerHTML = productsHtml
}
  
  
  
 socket.on('products', (lista)=> {
    if(lista.lenght === 0) return
    
       render(lista);
});



sendMensaje=() => {
   
   const email = document.getElementById('email_id')
   const nombre = document.getElementById('nombre_id')
   const apellido = document.getElementById('apellido_id')
   const edad = document.getElementById('edad_id')
   const alias = document.getElementById('alias_id')
   const avatar = document.getElementById('avatar_id')
   const mensaje = document.getElementById('txtMensaje')
    
  
   const mensajeId = { 
     author:{
        email:      email.value,
        nombre:     nombre.value ,
        apellido:   apellido.value ,
        edad:       Number(edad.value) ,
        alias:      alias.value ,
        avatar:     avatar.value, 
        
     },
     mensaje:  mensaje.value     
 }
   socket.emit('new-mensaje',mensajeId)
    
}
 
const renderizar = (mensajes) =>{
     let mensajesHTML = '';   
     
        mensajes.forEach( (mensaje) => {
         
         mensajesHTML += `
                <li class="border float-left ">
                    <p class="fw-bolder text-primary float-left ">${mensaje.author.email}</p> <p class="text-warning float-left"> ${mensaje.author.fecha}  : </p> <p col-sm-6 float-left">${mensaje.mensaje} </p>   
                </li>
            `;
        });
        document.getElementById('ulMensajes').innerHTML = mensajesHTML
      
}


socket.on('mensajes', (mensajes)=> {
   if(mensajes.lenght === 0) return
 
    renderizar(mensajes);
});


 



