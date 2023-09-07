import { Schema, model } from "mongoose";

const schema = new Schema({
    code: { type: String, required: true },
    purchase_datetime: { type: Date, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    products: { type: Array, required: true },
});

export const ticketsModel = model('tickets', schema);