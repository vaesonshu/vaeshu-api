import mongoose from '../config/DBHelpler.js'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  'username': { type: String },
  'name': { type: String },
  'password': { type: String }
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel