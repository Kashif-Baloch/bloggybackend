import fs from "fs";
import path from "path";

export const deleteUserImages = async () => {
  const directoryPath = "uploads/userImages";
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err.message);
      return res.status(500).json({ msg: err.message });
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).json({ msg: err.message });
        } else {
          console.log("File deleted:", filePath);
        }
      });
    });
  });
};

export const deleteBlogImages = async () => {
  const directoryPath = "uploads/blogImages";
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err.message);
      return res.status(500).json({ msg: err.message });
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).json({ msg: err.message });
        } else {
          console.log("File deleted:", filePath);
        }
      });
    });
  });
};

export const deleteUserBlogImages = async (blogimgs) => {
  console.log(blogimgs, "asd");
  const directoryPath = "uploads/blogImages";
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err.message);
      return res.status(500).json({ msg: err.message });
    }

    blogimgs.forEach((obj) => {
      const filePath = path.join(directoryPath, obj.image);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).json({ msg: err.message });
        } else {
          console.log("File deleted:", filePath);
        }
      });
    });
  });
};
