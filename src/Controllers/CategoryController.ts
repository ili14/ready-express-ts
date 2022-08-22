import { NextFunction, Request, Response } from "express";
import HelperValidator from "../Classes/HelperValidator";
import Category from "../Models/Category";
import { Types } from "mongoose";
import ApiResponseFormat, {
    ResponseErrorObjectType,
} from "../Classes/ApiResponseFormat";

enum ForEnum {
    Articles = "articles",
    Portfolio = "portfolio",
}

class CategoryController {
    static async getAll(req: Request, res: Response): Promise<any> {
        console.log("getAll");
        const categories = await Category.find({});
        console.log(categories);
        if (categories === null) {
            return res
                .status(200)
                .json(ApiResponseFormat.successMsg("هیچ دسته بندی یافت نشد."));
        }
        return res.status(200).json(ApiResponseFormat.successArr(categories));
    }

    static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        const body = req.body;
        if (HelperValidator.isHaveErrorThenSendJson(req, res)) return;
        let newCategory: { title: String; for: ForEnum; parentId?: String } = {
            title: body.title,
            for: body.for,
        };
        // check parentId is existing
        if (typeof body.parentId === "undefined") {
            console.log("parentId undefined");
        } else {
            console.log("parentId is exsist");
            // check parentId is valid if not then send error

            newCategory.parentId = body.parentId;
        }

        try {
            await Category.create(newCategory);
            return res
                .status(200)
                .json(ApiResponseFormat.successMsg("دسته بندی ساخته شد"));
        } catch (err) {
            next(err);
        }
    }

    static async update(req: Request, res: Response): Promise<any> {}

    static async delete(req: Request, res: Response): Promise<any> {}
}

export default CategoryController;
