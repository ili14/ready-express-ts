import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import CatchError from "../Classes/CatchError";
import Article from "../Models/Article";
import ApiResponseFormat, {
    ResponseErrorObjectType,
} from "../Classes/ApiResponseFormat";
import HelperValidator from "../Classes/HelperValidator";

class ArticlesController {
    static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        const body = req.body;
        if (HelperValidator.isHaveErrorThenSendJson(req, res)) return;
        // successfully
        if ((await Article.findOne({ slug: req.body.slug })) == null) {
            await Article.create({ ...req.body });
            res.status(200).json(
                ApiResponseFormat.successMsg("مطلب ساخته شد.")
            );
            return;
        }
        // unSuccessful
        const myErrors: ResponseErrorObjectType[] = [];
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
            const perPageCount = 4;
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

    static async articleWithSlug(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const slug = req.params.slug;
            const article = await Article.findOne({ slug: slug });
            process.stdout.write("article: ");
            console.log(article);
            // if article not found
            if (article === null) {
                const errors: Array<ResponseErrorObjectType> = [
                    {
                        msg: "چنین مطلبی یافت نشد",
                        param: "slug",
                        location: "param",
                    },
                ];
                return res.status(400).json(ApiResponseFormat.unSuccessArr(errors));
            }
            res.json(ApiResponseFormat.successObj(article));
        } catch (error) {
            next(error);
        }
    }

    static async articleWithId(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            if (HelperValidator.isHaveErrorThenSendJson(req, res)) return;
            const id = req.params.id;
            console.log(id);
            const article = await Article.findById(id);
            process.stdout.write("article: ");
            console.log(article);
            // if article not found
            if (article === null) {
                const errors: Array<ResponseErrorObjectType> = [
                    {
                        msg: "چنین مطلبی یافت نشد",
                        param: "id",
                        location: "param",
                    },
                ];
                return res.status(400).json(ApiResponseFormat.unSuccessArr(errors));
            }
            res.json(ApiResponseFormat.successObj(article));
        } catch (error) {
            next(error);
        }
    }
}

export default ArticlesController;
