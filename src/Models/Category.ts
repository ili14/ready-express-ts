import mongoose from "mongoose";
const { Schema } = mongoose;

const ArticleSchema = new Schema({
    title: {type: String, require: true}, 
    parentId: {type: Number, require: true},
});


export default mongoose.model("Articles",ArticleSchema);