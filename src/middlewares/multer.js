import multer from 'multer';
import path from 'path';

const destination = (req, file, cb) => {
  const category = req.body.category;
  let uploadPath = 'src/multer/';

  if (category === 'profile') {
    uploadPath = path.resolve('src/multer/profile/');
  } else if (category === 'products') {
    uploadPath = path.resolve('src/multer/product/');
  } else if (category === 'documents') {
    uploadPath = path.resolve('src/multer/documents/');
  }

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
