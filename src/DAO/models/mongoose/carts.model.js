import { Schema, model } from 'mongoose';

const productCart = new Schema({
  quantity: { type: Number },
  id: { type: String },
});

export const CartsModel = model(
  'carts',
  new Schema({
    products: { type: [productCart], required: true },
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  })
);

