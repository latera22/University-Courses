import  express from 'express';
import categoryModel from '../models/categoryModel.js';
const getCategories  = async (req, res)=>{
    categoryModel.find()
    .then(categoryName =>res.json(categoryName))
    .catch(err =>res.json(err))

}
export default getCategories

