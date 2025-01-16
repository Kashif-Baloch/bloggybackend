import multer from "multer";

//upload image using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/blogImages");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
