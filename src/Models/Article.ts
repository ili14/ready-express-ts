import mongoose from "mongoose";
const { Schema } = mongoose;

interface IArticle {
    title: string;
    image: string;
    body: string;
    cats: any[];
    createdAt: Date;
    slug: string;
}

const ArticleSchema = new Schema<IArticle>({
    title: {type: String, require: true},
    image: {type: String, require: true},
    body: {type: String, require: true},
    cats: {type: [], required: true},
    createdAt: {type: Date, require: true, default: Date.now},
    slug: {type: String, require: true, unique: true}
});


export default mongoose.model("Articles",ArticleSchema);