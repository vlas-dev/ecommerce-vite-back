const { generarJWT } = require("../helpers/generarJWT");
const Pedidos = require("../models/Pedido");
const Usuarios = require("../models/Usuario");
const bcrypt = require('bcrypt')
const multer = require('multer')
const shortid = require('shortid')
require('dotenv').config()

const createUser = async(req, res = response) => {
    const usuario = req.body
    try {
        await Usuarios.create(usuario)
        res.json({
          msg:'Usuario creado con exito'
        })
    } catch (error) {
 
    }
 
}
const login = async(req,res,next)=>{
  const {email, password} = req.body
    const usuario = await Usuarios.findOne({where:{email:email}})
 
    if(!usuario){
      return res.status(400).json({
          msg:'Ese usuario no existe'
      })
 
  }
  
  if(!usuario.validPassword(password)){
    // si el password es incorrecto
    return res.status(400).json({
        msg:'Contraseña incorrecta'
    })
 
}
   
    const token = await generarJWT(usuario.id)
    res.json({token})
  }
const getAllUsers = async(req, res) =>{
    try {
      const usuarios = await Usuarios.findAll();
      res.json(usuarios);
    } catch(err) {
 
      res.status(500).json({ msg: "Error al obtener usuarios" });
    }
}

const getUserById = async(req,res)=>{
  const id = req.params.id;
  try {
    const usuario = await Usuarios.findByPk(id);
    if(usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ msg: "Usuario no encontrado" });
    }
  } catch(err) {
 
    res.status(500).json({ msg: "Error al obtener usuario" })
  }
}

const updateUser = async(req,res)=>{
  const {id} = req.params
  const {_id,password, ...resto} = req.body
  const usuario = await Usuarios.findOne({where:{email:resto.email}})

  if(usuario ){
    return res.status(400).json({
      msg:`Ya existe un usuario con el email ${resto.email}`
    })
 
  }
    if(password){
      const salt = bcrypt.genSaltSync()
      resto.password = bcrypt.hashSync(password, salt);

  }
  try {
      await Usuarios.update(resto,{where:{id:id}})
 
      res.json({
        msg:`Datos actualizados con exito`
      })
    
  } catch (error) {
      res.status(400).json({
        msg:'Error al tratar de actualizar'
    })
  }
  
  
}
const deleteUser = async(req,res)=>{
  try {
    const usuario = await Usuarios.findByPk(req.params.id)

    const {id, nombre, apellido } = usuario
    await usuario.destroy()
    res.json({
      msg:`El usuario ${nombre} ${apellido} con el id: ${id} ha sido eliminado con exito`
    })
    
  } catch (error) {
    res.status(400).json({
      msg:`Se produjo un error al intentar eliminar ha ${nombre} ${apellido}`
    })
    
  }

}
const getUserProfile = async(req,res)=>{
  const usuario = await Usuarios.findByPk(req.usuario.id)
  const pedidos = await Pedidos.findAll({where:{usuarioId:req.usuario.id}})
  res.json({
    usuario,
    pedidos
  })
}
 
const updateProfile = async(req,res, next)=>{
  const {password, role, ...resto} = req.body
  const {id} = req.usuario
  const usuario = await Usuarios.findOne({where:{email:resto.email}})
  
  if(usuario && req.usuario.email != resto.email){
    return res.status(400).json({
      msg:`Ya existe un usuario con el email ${resto.email}`
    })
 
  }
  if(password){
    const salt = bcrypt.genSaltSync()
    resto.password = bcrypt.hashSync(password, salt);
    
  }
  try {
     
    await Usuarios.update(resto,{where:{id:id}})
    
      res.json({
        msg:`Datos actualizados con exito`
      })
    
  } catch (error) {
 
      res.status(400).json({
        msg:'Error al tratar de actualizar'
    })
  }
}
const checking = ( req, res)=>{
  res.status(200).send("Hola mundo")
}
module.exports = {
    createUser,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserProfile,
    updateProfile,
    checking
}