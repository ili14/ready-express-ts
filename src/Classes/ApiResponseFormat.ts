import { Error } from "mongoose";
import { Result, ValidationError } from "express-validator";

type StatusType = "success" | "unsuccess";
type ModeType = "message" | "object" | "array";
type LocationType = "body" | "params" | "query" | "headers" | "cookies";
type ErrorObjectType = {
    location: string;
    msg: string;
    param: string;
};

class ApiResponseFormat {
    static successMsg(msg: string): {
        status: "success";
        mode: ModeType;
        msg: string;
    } {
        return {
            status: "success",
            mode: "message",
            msg: msg,
        };
    }

    static successObj(data: {}): {
        status: "success";
        mode: ModeType;
        data: {};
    } {
        return {
            status: "success",
            mode: "object",
            data: data,
        };
    }

    static successArr(data: any[]): {
        status: "success";
        mode: ModeType;
        data: any[];
    } {
        return {
            status: "success",
            mode: "array",
            data: data,
        };
    }

    static unSuccessArr(arr: Array<any>): {
        status: "unsuccess";
        data: { errors: Array<any> };
    } {
        return {
            status: "unsuccess",
            data: { errors: arr },
        };
    }

}

export default ApiResponseFormat;
export {ErrorObjectType};
