import { Router } from "express";
import ArticlesController from "../Controllers/ArticleController";
import ArticleMiddleware from "../Middleware/ArticleMiddleware";
import { param, validationResult } from "express-validator";
import {Types} from "mongoose";
import ObjectId = Types.ObjectId;
// import {ObjectId} from "mongoose";

const router = Router();

router
    .route("/articles/")
    .get(ArticlesController.articlesWithPage)
    .post(ArticleMiddleware.create, ArticlesController.create);

router.route("/articles/:slug").get(ArticlesController.articleWithSlug);

router.route("/articles/id/:id").get(
    param("id").custom(val => {
        if(!ObjectId.isValid(val)){
            return false
        }
        return true;
    }).withMessage("این id مجاز نیست."),
    ArticlesController.articleWithId
);

const ApiR = router;
export default ApiR;
