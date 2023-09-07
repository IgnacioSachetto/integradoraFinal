import { Schema, model } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: false, max: 100 },
  firstName: { type: String, required: false, max: 100 },
  lastName: { type: String, required: false, max: 100 },
  age: { type: Number, required: false },
  cart: { type: String, required: false },
  rol: { type: String, default: 'user', required: true },
});
schema.plugin(monsoosePaginate);
export const UserModel = model('users', schema);
