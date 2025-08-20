// server/controllers/dropdownController.js
import courseModel from '../models/courseModel.js';

const courseDropDown = async (req, res) => {
  try {
    const name = await courseModel.find();
    res.json(name);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default courseDropDown;
