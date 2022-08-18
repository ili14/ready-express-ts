import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import CatchError from "../Classes/CatchError";
import Article from "../Models/Article";

class ArticlesController {
    static async create(
        req: Request,
        res: Response,
        // next: NextFunction
    ): Promise<any> {
        const body = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.send(body);
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

            res.send(articles);
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
            const articles = await Article.findOne({ slug: slug });
            process.stdout.write("articles: ");
            console.log(articles);

            res.send(articles);
        } catch (error) {
            next();
        }
    }

    static async articleWidthSlug(
        // req: Request,
        // res: Response,
        // next: NextFunction
    ): Promise<void> {}
}

export default ArticlesController;
