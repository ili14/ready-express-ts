import { Error } from "mongoose";
import { Result, ValidationError } from "express-validator";

type StatusType = "success" | "unsuccess";
type ModeType = "message" | "object" | "array";
type LocationType = "body" | "params" | "query" | "headers" | "cookies";
type ResponseErrorObjectType = {
    location: string;
    msg: string;
    param: string;
};

class ApiResponseFormat {
    static successMsg(msg: string): {
        status: "success";
        mode: ModeType;
        data: string;
    } {
        return {
            status: "success",
            mode: "message",
            data: msg,
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
        mode: ModeType;
        data: Array<any>;
    } {
        return {
            status: "unsuccess",
            mode: "array",
            data: arr,
        };
    }

    static unSuccess500Error(errors: any): {
        status: "unsuccess";
        data: any;
    } {
        return {
            status: "unsuccess",
            data: errors,
        };
    }
}

export default ApiResponseFormat;
export { ResponseErrorObjectType };
