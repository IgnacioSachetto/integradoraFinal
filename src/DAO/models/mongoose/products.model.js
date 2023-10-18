import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnails: { type: [String], required: false },
    code: { type: String, required: true },
    stock: { type: Number, required: true },
    status: { type: String, required: true },
    category: { type: String, required: true },
    owner: { type: String, required: true, default:"admin"},
});

schema.plugin(mongoosePaginate);

export const ProductsModel = model('products', schema);