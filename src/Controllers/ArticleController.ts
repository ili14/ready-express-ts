import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import CatchError from "../Classes/CatchError";
import Article from "../Models/Article";
import ApiResponseFormat, {
    ErrorObjectType,
} from "../Classes/ApiResponseFormat";

class ArticlesController {
    static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        const body = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .json(ApiResponseFormat.unSuccessArr(errors.array()));
        }
        // successfully
        if ((await Article.findOne({ slug: req.body.slug })) == null) {
            await Article.create({ ...req.body });
            res.status(200).json(
                ApiResponseFormat.successMsg("مطلب ساخته شد.")
            );
            return;
        }
        // unSuccessful
        const myErrors: ErrorObjectType[] = [];
        myErrors.push({
            msg: "نام مستعار تکراری است.",
            param: "slug",
            location: "body",
        });
        res.status(409).json(ApiResponseFormat.unSuccessArr(myErrors));
    }

    static async articlesWithPage(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const pageNumber = Number(req.query.page);
            const perPageCount = 2;
            // const articlesCount = await Article.count();

            const articles = await Article.find()
                .skip(pageNumber * perPageCount - perPageCount)
                .limit(perPageCount);

            if (articles.length < 1)
                return res.send({
                    error: "not any article found tn this page.",
                });

            res.json(ApiResponseFormat.successArr(articles));

        } catch (error) {
            next(new CatchError(error, "not any article found tn this page."));
        }
    }

    static async article(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const slug = req.params.slug;
            const article = await Article.findOne({ slug: slug });
            process.stdout.write("article: ");
            console.log(article);

            // todo: check not null article
            res.json(article);
        } catch (error) {
            next();
        }
    }

    static async articleWidthSlug(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {}
}
export default ArticlesController;
