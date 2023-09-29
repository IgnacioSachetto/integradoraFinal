import multer from 'multer';
import path from 'path'; // Importa el módulo path

const destination = (req, file, cb) => {
  const category = req.body.category;
  let uploadPath = 'src/multer/';

  if (category === 'profile') {
    uploadPath = path.resolve('src/multer/'); // Ruta relativa desde la raíz de tu proyecto
  } else if (category === 'product') {
    uploadPath = path.resolve('src/multer/'); // Ruta relativa desde la raíz de tu proyecto
  } else if (category === 'document') {
    uploadPath = path.resolve('src/multer/'); // Ruta relativa desde la raíz de tu proyecto
  }

  console.log('Multer Middleware - Destination:', uploadPath);
  cb(null, uploadPath);
};

const storage = multer.diskStorage({
  destination: destination,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
