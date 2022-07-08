import mongoose from "mongoose";
const { Schema } = mongoose;

const ArticleSchema = new Schema({
    title: {type: String, require: true}, // String is shorthand for {type: String}
    author: {type: String, require: true},
    body: {type: String, require: true},
});


export default mongoose.model("Articles",ArticleSchema);