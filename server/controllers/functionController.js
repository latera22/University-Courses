import categoryModel from "../models/categoryModel.js";
import courseModel from "../models/courseModel.js";
import multer from "multer";
import path from "path";


export const addCategories  = async (req, res, next) => {
    const { categoryName, categoryDescription } = req.body;
    if(!categoryName){
        return res.json({success: false, message: "Missing details"})
    }
    const existingCategory = await categoryModel.findOne({categoryName})
    if(existingCategory){
        return res.json({success: false, message: "Category already exists"})
    }
    try {
        const newCategory = new categoryModel({ categoryName, categoryDescription });
        await newCategory.save();
        res.status(201).json({ success: true, message: "Category added successfully" });
    } catch (error) {
        next(error);
    }
}
///////////////////////////////////
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check which folder you need to upload the file to
    if (file.fieldname === "image") {
      cb(null, "uploads/photos/"); // Upload images to the "photos" folder
    } else if (file.fieldname === "courseFile") {
      cb(null, "uploads/courses/"); // Upload course-related files to the "courses" folder
    } else {
      cb(new Error("Invalid file field"), null);
    }
  },
  filename: (req, file, cb) => {
    // Unique filename using the current timestamp and original file name
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Set up multer with storage configuration
const upload = multer({ storage }).fields([
  { name: "image", maxCount: 1 }, // Field for image (e.g., course image)
  { name: "courseFile", maxCount: 1 }, // Field for course-related file (if any)
]);

export const courseAdding = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "File upload failed", error: err });
    }

    try {
      const { name, description, image, university, categoryId } = req.body;
      const imagePath = req.files.image ? `/uploads/photos/${req.files.image[0].filename}` : null;

      // For the course file (if any)
      const courseFilePath = req.files.courseFile ? `/uploads/courses/${req.files.courseFile[0].filename}` : null;
      // 🔹 Check for missing fields
      if (!name || !description || !image || !university || !categoryId) {
        return res.status(400).json({ success: false, message: "Missing details" });
      }

      // 🔹 Check if course already exists
      const existingCourse = await courseModel.findOne({ name });
      if (existingCourse) {
        return res.status(400).json({ success: false, message: "Course already exists" });
      }

      // 🔹 Save course to database
      const newCourse = new courseModel({
        name,
        description,
        image: imagePath,
        category: categoryId,
        courseFile: courseFilePath, //         university,
      });

      await newCourse.save();
      res.status(201).json({ success: true, message: "Course added successfully" });
    } catch (error) {
      next(error); // Pass error to Express error handler
    }
  });
};
