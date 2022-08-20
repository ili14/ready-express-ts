import { Router } from "express";
import ArticlesController from "../Controllers/ArticleController";
import ArticleMiddleware from "../Middleware/ArticleMiddleware";
import {validationResult} from "express-validator";
import ApiResponseFormat from "../Classes/ApiResponseFormat";

const router = Router();

router
    .route("/articles/")
    .get(ArticlesController.articlesWithPage)
    .post(ArticleMiddleware.create, ArticlesController.create);

router.route("/articles/:slug").get(ArticlesController.articleWidthSlug);


const ApiR = router;
export default ApiR;
