import mongoose from "mongoose";

const { Schema } = mongoose;

interface ICategory {
    title: String,
    for: String,
    parentId: String
}

const CategorySchema = new Schema<ICategory>({
    title: { type: String, require: true },
    for: { type: String, require: true, enum: ["articles", "portfolio"] },
    parentId: { type: String, require: false },
});

export default mongoose.model<ICategory>("Category", CategorySchema);
