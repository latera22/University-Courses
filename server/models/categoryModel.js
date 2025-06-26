import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    categoryName: {type: String, required: true},
    categoryDescription: {type: String, required: true},
}, {timestamps:true});
const categoryModel = mongoose.model('Category', categorySchema)

export default categoryModel;