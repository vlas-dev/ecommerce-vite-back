const multer = require('multer');
const path = require('path');
 
const shortid = require('shortid')
const projectRoot = path.dirname(require.main.filename);

const fileFilter = (req, file, cb) => {
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
    cb(null , true);
  } else {
    cb(new Error('Formato no valido'), false);
  }
};

const limits = {
  fileSize: 1000 * 1000 // 1 mb
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,  path.join(__dirname, '/../public/uploads/users/'));
  },
  filename: function(req, file, cb) {
    const extension = file.mimetype.split('/')[1]
    cb(null,`${shortid.generate()}.${extension}`)
  }
});

const upload = multer({ storage, fileFilter, limits }).single('imagen');

const subirImagenProfile = (req,res,next)=>{
    upload(req,res,function(error){
        if(error){
            res.json({mensaje:error})
        }
        return next()
    })
}

module.exports = {
    subirImagenProfile
};