import { body } from "express-validator";
import { Types } from "mongoose";
import Category from "../Models/Category";

const create = [
    body("title").notEmpty().withMessage("عنوان نباشد خالی باید"),
    body("for")
        .notEmpty()
        .withMessage("فیلد(برای) نباشد خالی باید")
        .isIn(["articles", "portfolio"])
        .withMessage(
            "مقدار فرستاده شده در مقدار های مشخص شده موجود نیست این مقدار معتبر نیست"
        ),
    // Repaired this validation
    body("parentId")
        .custom(async val => {
            if (
                (await Category.findById(val)) === null ||
                Types.ObjectId.isValid(val)
            ) {
                throw new Error("invalid parentId");
            }
            return true;
        })
        .withMessage(
            "مقدار فیلد والد درست نیست. دسته بندی با این آی دی موجود نیست."
        ),
];

export default { create };
