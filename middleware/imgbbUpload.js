
const imgbbUploader = require("imgbb-uploader");
const fs = require("fs");
const { apiKey } = require("../config/imgbb");

const imgbbUpload = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const localPath = req.file.path;

  try {
    const options = {
      apiKey: apiKey,
      imagePath: localPath,
      name: req.file.originalname,
    };

    const response = await imgbbUploader(options);
    req.file.path = response.url;

    // Clean up the temporary file
    fs.unlinkSync(localPath);

    next();
  } catch (error) {
    console.error("Error uploading to ImgBB:", error);
    // Clean up the temporary file in case of an error
    fs.unlinkSync(localPath);
    res.status(500).send({ message: "Error uploading to ImgBB" });
  }
};

module.exports = imgbbUpload;
