const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
     {
          userId: {
               type: String,
               unique: true,
               required: true,
          },
         avatar: String,
         firstName: String,
         lastName: String,
         dob: Date,
         gender: String,
         country: String,
         phoneNumber: String,
         zipcode: String,
         username: String,
         email: String,
         emailVerified: Boolean,
         role: String,
     }
);

UserSchema.virtual('fullName').get(() => {
     return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('User', UserSchema);