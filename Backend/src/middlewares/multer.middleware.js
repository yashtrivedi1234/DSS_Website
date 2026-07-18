import multer from "multer";
import fs from "fs";
import path from "path";

 const Upload = (folderName = "temp") => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join("public", folderName);
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  return multer({ storage });
};
export default Upload;
