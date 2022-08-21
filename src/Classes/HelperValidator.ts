import {Request, Response} from "express";
import {validationResult} from "express-validator";
import ApiResponseFormat from "./ApiResponseFormat";

class HelperValidator {
    static isHaveErrorThenSendJson(req: Request,res: Response){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json(ApiResponseFormat.unSuccessArr(errors.array()));
            return true;
        }
    }
}

export default HelperValidator;
