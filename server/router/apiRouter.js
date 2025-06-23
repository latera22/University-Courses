import Router from "express";
import {chatCompletionValidator} from "../controllers/authController.js";
const apiRouter = Router();
apiRouter.post("/new", chatCompletionValidator);

export default apiRouter;