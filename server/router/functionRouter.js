import express  from "express";
import { addCategories, courseAdding } from "../controllers/functionController.js";
import getCategories from "../middleware/courseCategory.js";
import getCourse from "../middleware/courseManager.js";
import courseDropDown from "../middleware/dropdownModel.js";
 const courseRouter = express.Router();
 
 courseRouter.post("/courseAdding", courseAdding)
 courseRouter.post("/addCategories", addCategories)
 courseRouter.get("/getCategories", getCategories)
 courseRouter.get('/getCourse', getCourse)
 courseRouter.get("/courseDropDown", courseDropDown )
 export default courseRouter