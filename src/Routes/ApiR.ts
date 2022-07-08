import { Router } from "express";
import ArticlesController from "../Controllers/ArticlesController";

const router = Router();

router
    .route("/articles/")
    .get(ArticlesController.articlesWithPage)
    .post(ArticlesController.create);

router.route("/articles/:slug").get(ArticlesController.article);

const ApiR = router;
export default ApiR;
