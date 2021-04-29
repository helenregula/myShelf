const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

require('dotenv').config();
// connect to atlas
// Add MongoURI from Atlas in string with password and dbName is 'BookshelfDB' instead of myFirstDatabase
console.log(process.env.IS_TEST ? process.env.mongo_TESTURI : process.env.mongo_URI);
mongoose
  .connect(process.env.IS_TEST ? process.env.mongo_TESTURI : process.env.mongo_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    // sets the name of the DB that our collections are part of
    dbName: 'hsdc-myShelf',
    useCreateIndex: true, //prevents deprecation warning
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(() => console.log('Error in connection to Mongo DB'));

// media schema
const mediaSchema = new Schema({
  title: String,
  type: String,
  currentStatus: String,
});

const SALT_WORK_FACTOR = 10;

// user schema
const userSchema = new Schema({
  // User.profileInfo in controllers
  userProfile: {
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
  },
  // nested mediaSchema in userSchema
  media: [mediaSchema],
});

// No arrow functions, to use "this"
// 'save' is a presave hook, executes everytime the document is saved
userSchema.pre('save', function (next) {
  // this refers to entire document which has username and password properties
  const user = this;
  // user.password becomes the passed in property
  // bcrypt.hash, pw + salt
  bcrypt.hash(user.userProfile.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);
    // password is reassigned the hash
    user.userProfile.password = hash;
    // return next middleware, moves on to the saving document
    console.log(user);
    return next();
  });
});

// declare user for export
const User = mongoose.model('user', userSchema);

// sessionSchema
const sessionSchema = new Schema({
  cookieId: {type: String, required: true, unique: true},
  createdAt: {type: Date, expires: 30, default: Date.now}, 
});

// declare session for export
const Session = mongoose.model('session', sessionSchema);

// exports media model in an object to be used in the controller
module.exports = {
  User,
  Session,
};
