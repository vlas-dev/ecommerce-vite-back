const express = require('express')
const { dbConnection } = require('../config/config.js')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
 
class Server{
    constructor(){
        this.app = express()
        this.PORT = process.env.PORT || 5000
        this.host = process.env.HOST || '0.0.0.0'
        this.paths = {
            authRoutes:"/",
            productRoutes:"/product",
            orderRoutes:"/order",
            categoryRoutes:"/category",
            searchRoutes:'/search',
            paymentRoutes:'/payment',
        }
        //conectar a base de datos

 
        //Midlewares : no son mas que funciones que van a añadirle otras funcionalidades al web server
        // en otras palabras es una funcion que se ejecuta antes de llamar un controlador o seguir con la ejecucion
        //de las peticiones
        //rutas de mi applicacion

        this.middlewares()
        
        this.routes()
        this.conectarDB()
        //sockets
 
    }


    middlewares(){
        this.app.use(express.static('public'))
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended:true}))
        this.app.use(cors())
  
    }

    routes(){
    
        this.app.use(this.paths.authRoutes, require("../routes/authRoutes.js"))
        this.app.use(this.paths.productRoutes, require("../routes/productRoutes.js"))
        this.app.use(this.paths.categoryRoutes, require("../routes/categoryRoutes.js"))
        this.app.use(this.paths.searchRoutes, require("../routes/searchRoutes.js"))
        this.app.use(this.paths.paymentRoutes, require("../routes/paymentRoutes.js"))
        this.app.use(this.paths.orderRoutes, require("../routes/orderRoutes.js"))
 
    }
 
    listen(){
        this.app.listen(this.PORT,this.HOST, ()=>{
            console.log("Servidor corriendo en puerto", this.PORT)
        })
      
    }

    async conectarDB(){
        await dbConnection()
    }
}


module.exports = Server