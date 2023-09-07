//@ts-check
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const messageSchema = new Schema({
  user: { type: String, required: true, max: 100, index: true },
  msg: { type: String, required: true, max: 1000 },
});

messageSchema.plugin(mongoosePaginate);

export const MessageModel = model(
  "messages" ,
  messageSchema
);

