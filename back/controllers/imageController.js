const path = require('path');
const Usuarios = require('../models/Usuario');
const fs = require('fs')
const sendProfileImage = async (req, res) => {
  const user = req.usuario;
  const filename = path.basename(user.imagen);
  const imagePath = path.join(__dirname, '..', '..', 'front', 'public', 'uploads', 'perfil', filename);
  res.sendFile(imagePath);
};
const uploadImage = async (req, res, next) => {
  try {
    const {id} = req.usuario
    const usuario = await Usuarios.findByPk(id)
    
    
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo'});
    }
    if(req.file){
      if(usuario.imagen){
          const filename = path.basename(usuario.imagen);
          const imagePath = path.join(__dirname, '..', 'public', 'uploads', 'users', filename);
          fs.unlink(imagePath, (err) => {
            if (err) {
 
              return;
            } 
 
          });
        }
        usuario.imagen = req.file.filename
        await usuario.save()
    }
 
      res.json({msg:'Imagen de perfil actualizada'});
    } catch(err) {
 
      res.status(500).send('Server Error');
    }
  };
module.exports = {
  sendProfileImage,
  uploadImage
};