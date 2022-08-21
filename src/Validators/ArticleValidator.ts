import {  checkSchema, CustomValidator } from "express-validator";

const customSlugValidator: CustomValidator = (val, { req, location, path }) => {
    if (typeof val === "string") {
        if (val.includes(" ")) {
            return false;
        }
    }
    return val + req.body.foo + location + path;
};

const create = checkSchema({
    title: {
        in: "body",
        isLength: {
            errorMessage: "عنوان حداقل باید 3 حرف باشد.",
            options: { min: 3 },
        },
    },
    image: {
        notEmpty: {
            errorMessage: "لطفا یک عکس انتخاب کنید.",
            options: { ignore_whitespace: true },
        },
    },
    body: {
        notEmpty: {
            errorMessage: "محتوا خالی است.",
            options: { ignore_whitespace: true },
        },
    },
    cats: {
        notEmpty: {
            errorMessage: " لطفا حداقل یک دسته بندی را انتخاب کنید.",
            options: { ignore_whitespace: false },
        },
        isArray: {
            errorMessage:
                "دسته بندی باید یک آرایه باشد و حداقل یک دسته بندی انتخاب شده باشد.",
            options: { min: 1 },
        },
    },
    slug: {
        isLength: {
            errorMessage: "اسم مستعار حداقل باید 3 حرف باشد.",
            options: { min: 3 },
        },
        custom: {
            options: [customSlugValidator],
            errorMessage: "نام مستفار نباید اسپیس داشته باشد.",
        },
        isString: { errorMessage: " برای اسم مستعار باید یک متن انتخاب شود." },
    },
});


export default { create };
