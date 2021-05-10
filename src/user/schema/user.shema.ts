import { Schema } from 'mongoose';


export const UserSchema = new Schema({
 
  id: { type: String, require: true},
  name: { type: String, require: true},
  surname: { type: String, require: true},
  placeofbirth: String,
  dateofbirth: String,
  career: String
});
