import User from '../models/user.js';

class UserRepository {
 static async findAll() {
    return await User.find({});
 }

 static async findById(id) {
    return await User.findById(id);
 }

 static async findOne(query) {
    return await User.findOne(query);
 }

 static async findByIdAndUpdate(id, update) {
    return await User.findByIdAndUpdate(id, update, { new: true });
 }

 static async findByIdAndDelete(id) {
    return await User.findByIdAndDelete(id);
 }

 static async createUser(data) {
   const user = new User(data);
   return await user.save();
 }
}

export default UserRepository;
