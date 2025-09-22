
import courseModel from "../models/courseModel.js";

const getCourse = async (req, res) => {
  courseModel.find()
    .then(name => res.json(name))
    .catch(err => res.json(err))
}
export default getCourse;

