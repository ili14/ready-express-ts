import { Router } from "express";
import ArticlesController from "../Controllers/ArticleController";
import { param,  } from "express-validator";
import { Types } from "mongoose";
import ObjectId = Types.ObjectId;
import CategoryController from "../Controllers/CategoryController";
import ArticleValidator from "../Validators/ArticleValidator";
import CategoryValidator from "../Validators/CategoryValidator";

const router = Router();

// Articles
router
    .route("/articles/")
    .post(ArticleValidator.create, ArticlesController.create);
router.route("/articles/:page/page").get(ArticlesController.articlesWithPage);
router.route("/articles/:slug").get(ArticlesController.articleWithSlug);
router.route("/articles/:id/id").get(
    param("id")
        .custom(val => {
            if (!ObjectId.isValid(val)) {
                return false;
            }
            return true;
        })
        .withMessage("این id مجاز نیست."),
    ArticlesController.articleWithId
);

// Categories
router.route("/categories/").post(CategoryValidator.create,CategoryController.create)

const ApiR = router;
export default ApiR;
