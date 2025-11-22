

import express from "express";
import userModel from '../models/userModel.js';

const getUser = async (req, res) => {
    userModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
}
export default getUser