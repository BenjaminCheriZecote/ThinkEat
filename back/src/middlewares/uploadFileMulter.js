import multer from 'multer';


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
    
const upload = multer({ 
  storage:storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// const uploadFile = (req, res, next) => {
//   upload.single('image')(req, res, err => {
//     if (err instanceof multer.MulterError) {
//       // Gestion des erreurs Multer
//       return res.status(400).json({ message: 'Erreur lors du téléchargement du fichier.', error: err });
//     } else if (err) {
//       // Gestion des autres erreurs
//       return res.status(500).json({ message: 'Une erreur est survenue lors du traitement du fichier.', error: err });
//     }
//     next();
//   });
// };

export default upload;
