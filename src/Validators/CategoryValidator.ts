import { body, checkSchema, CustomValidator } from "express-validator";

const create = [
    body("title").notEmpty().withMessage("عنوان نباشد خالی باید"),
    body("for")
        .notEmpty()
        .withMessage("فیلد(برای) نباشد خالی باید")
        .isIn(["articles", "portfolio"])
        .withMessage(
            "مقدار فرستاده شده در مقدار های مشخص شده موجود نیست این مقدار معتبر نیست"
        ),
];

export default { create };
