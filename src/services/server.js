import express from 'express';
import path from 'path';
import * as http from 'http';
import io from 'socket.io';
import session from 'express-session';
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo';
import passport from 'passport'
import compression from 'compression'
// import passport from '../middlewares/passportFacebook'

import {SmsService} from '../services/twilio'
import apiRouter from '../routes/index';
import authRouter from '../routes/auth'
import { productsPersistencia } from '../persistencia/productos';
import { mensajesPersistencia } from '../persistencia/mensajes';
import Config from '../config/index'

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const StoreOptions = {

  store: MongoStore.create({
    mongoUrl: Config.MONGO_INGRESS,
    mongoOptions: advancedOptions,
  }),

  cookie: { maxAge: 600000 },
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false 
};

const app = express();
app.use(compression())

app.use(cookieParser());

app.use(session(StoreOptions))

app.use(passport.initialize())
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));


app.use('/api', apiRouter);
app.use('/',authRouter)






app.use('/',(req,res,next)=>{

  if(req.isAuthenticated()){
    if(req.session.loggedNormal){
      return res.render('home',{pageTitle:'Home', mensaje:req.user.username, isLogIn:req.isAuthenticated()})
    }
    return res.render('home',{pageTitle:'Home', mensaje:req.user.displayName, isLogIn:req.isAuthenticated()})
  }
  else{

    res.render('home',{pageTitle:'Home',isLogIn:false})
  }
})





const myServer = new http.Server(app);

const myWSServer = io(myServer);

//Productos
myWSServer.on('connect', async(socket) => {
  //Agregar Producto
    socket.on('new-product', async(product) => {
       await productsPersistencia.add(product) 
   })

   //Mostrar La Lista
   let listaProductos = await productsPersistencia.getAll()
   
   myWSServer.emit('products', listaProductos);
 
   //Cuando un usuario se conecta obtiene los productos anteriores
  socket.on('askProduct', async(productos) => {
      let listaProductos = await productsPersistencia.getAll()
        
        socket.emit('products', listaProductos);
  });
 

  //Mensajes
 
  socket.on('new-mensaje', async(message) => {
    const haveAdministrador = message.mensaje.includes('administrador')
    if(haveAdministrador){
      SmsService.sendMessage('+54 264 563 2938',message.mensaje )
    }
    
   
     await mensajesPersistencia.add(message)
  })
  
  //Mostar Mensajes
  let todosMensajes = await mensajesPersistencia.getAll()
         myWSServer.emit('mensajes', todosMensajes);
 
  //Mostar mensajes anteriores
  socket.on('askMensajes', async(mensajes) => {
   let todosMensajes =  await mensajesPersistencia.getAll()
    
     socket.emit('mensajes', todosMensajes); 
 });
})



export default myServer