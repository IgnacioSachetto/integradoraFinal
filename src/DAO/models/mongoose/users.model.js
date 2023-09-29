import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new Schema({
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: false, max: 100 },
  firstName: { type: String, required: false, max: 100 },
  lastName: { type: String, required: false, max: 100 },
  age: { type: Number, required: false },
  cart: { type: String, required: false },
  rol: { type: String, default: 'user', required: true },
  hasUploadedDocuments: { type: Boolean, default: false },
  documents: [
    {
      name: { type: String, required: true },
      reference: { type: String, required: true },
    }
  ],
  last_connection: { type: Date, default: null },
});

userSchema.plugin(mongoosePaginate);

export const UserModel = model('users', userSchema);
