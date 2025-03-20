const multer = require("multer");
const path = require("path");

const generateFilename = (req) => {
  return `${req.body.type_id}-${req.body.name.replace(/\s+/g, '-')}`;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "public/images"));
  },
  filename: (req, file, cb) => {
    const filename = generateFilename(req);
    const extension = path.extname(file.originalname);
    cb(null, `${filename}${extension}`);
  }
});

// Check if the mimetype is allowed
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/png"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Type de fichier non supporté. Seuls les fichiers PNG sont autorisés."));
  }
};

// Set the file size limit (5 Mo)
const limits = {
  fileSize: 1024 * 1024 * 5
};

const upload = multer({
  storage,
  fileFilter,
  limits
});

module.exports = upload;
