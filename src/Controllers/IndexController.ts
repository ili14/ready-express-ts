import { Request, Response } from "express";
import Articles from "../Models/Article";


class IndexController {

    static async index(req: Request,res: Response): Promise<void> {
        const articles = await Articles.find({});
        res.json(articles);
    }

    static create(req: Request,res: Response): void {
        
    }

    static update(req: Request,res: Response): void {
        
    }

    static delete(req: Request,res: Response): void {
        
    }

}

export default IndexController;