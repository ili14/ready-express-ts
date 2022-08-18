import { Router } from "express";
import ArticlesController from "../Controllers/ArticleController";
import ArticleMiddleware from "../Middleware/ArticleMiddleware";

const router = Router();

router
    .route("/articles/")
    .get(ArticlesController.articlesWithPage)
    .post(ArticleMiddleware.create, ArticlesController.create);

router.route("/articles/:slug").get(ArticlesController.articleWidthSlug);

const ApiR = router;
export default ApiR;
