import { checkSchema } from "express-validator";
import { isFloat32Array } from "util/types";

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
            errorMessage: "دسته لطفا حداقل یک دسته بندی را انتخاب کنید.",
            options: { ignore_whitespace: true },
        },
    },
    slug: {
        isLength: {
            errorMessage: "اسم مستعار حداقل باید 3 حرف باشد.",
            options: { min: 3 },
        },
        isString: { errorMessage: " برای اسم مستعار باید یک متن انتخاب شود." },
    },
});
export default { create };
