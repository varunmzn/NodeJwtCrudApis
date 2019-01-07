let mongoose = require ('mongoose'),
  passwordHash = require('password-hash'),
  Schema = mongoose.Schema,
  config = require ('../../config'),
  userSchema = new Schema ({
    first_name: {
      required:[true, '{PATH} is required'],
      maxlength:[50, '{PATH} must be upto 50 characters long.'],
      trim:true,
      type:String,
    },
    counter: {
      type: Number
    },
    last_name: {
      required:[true, '{PATH} is required'],
      maxlength:[50, '{PATH} must be upto 50 characters long.'],
      trim:true,
      type:String,
    },
    email: {
      required:[true, '{PATH} is required'],
      maxlength:[255, '{PATH} must be upto 255 characters long.'],
      unique: [true, '{PATH} already in use.'],
      trim:true,
      type:String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid {PATH} address']
    },
    password: {
      required: [true, '{PATH} is required'],
      type:String,
      trim: true,
      set: (password) => {
        return passwordHash.generate(password);
      }
    },
    gender: {
      required: [true, '{PATH} is required'],
      type: String,
      trim:true,
      enum: ['male', 'female'],
      default: 'male'
    },
    image: {
      type:String,
      trim: true,
      default: null
    },
    createdAt: {
      type: Date, 
      default: Date.now
    },
    dob: {
      type: String
    },
    updatedAt: {
      type: Date, 
      default: Date.now
    }
  })

userSchema.pre('save', function(next) {
  let self = this;
  this.constructor.countDocuments(function(err, count) {
    if(err) return next(err);
    self.set ('counter', (++count));
    return next();
  });
});

  // save update time before update
  userSchema.pre('update', function(next) {
      this.set ('updatedAt', Date.now());
      return next();
  });

  // method to verify password
  userSchema.methods.comparePassword = function (password) {
    return passwordHash.verify(password, this.password);
  }

  userSchema.methods.detail = function () {
    // console.log (req.get('host'));
    return {
      _id: this._id,
      id: this.counter,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      gender:this.gender,
      avatar:config.HOST_NAME + '/image/avatar/'+this._id,
      dob:this.dob || null
    };
  }

  module.exports = mongoose.model('users', userSchema);