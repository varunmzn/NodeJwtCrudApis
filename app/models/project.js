let mongoose = require ('mongoose'),
  passwordHash = require('password-hash'),
  Schema = mongoose.Schema,
  config = require ('../../config'),

  projectSchema = new Schema ({
    projectName: {
      required:[true, '{PATH} is required'],
      trim:true,
      type:String,
    },
    startDate: {
      required:[true, '{PATH} is required'],
      type: String, 
    },
    endDate: {
      required:[true, '{PATH} is required'],
      type: String, 
    },
    clientName: {
      required: [true, '{PATH} is required'],
      type:String,
      trim: true,
      // set: (password) => {
      //   return passwordHash.generate(password);
      // }
    },
    devName: {
      required: [true, '{PATH} is required'],
      type: String,
      trim:true,
      // enum: ['male', 'female'],
      // default: 'male'
    },
    TLName: {
      type:String,
      trim: true,
      default: null
    },
    clientEmail: {
      required:[true, '{PATH} is required'],
      maxlength:[255, '{PATH} must be upto 255 characters long.'],
      unique: [true, '{PATH} already in use.'],
      trim:true,
      type: String, 
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid {PATH} address']
    },
    createdAt: {
      type: Date, 
      default: Date.now
    },

    updatedAt: {
      type: Date, 
      default: Date.now
    }
  })

//   projectSchema.pre('save', function(next) {
//   let self = this;
//   this.constructor.countDocuments(function(err, count) {
//     if(err) return next(err);
//     self.set ('counter', (++count));
//     return next();
//   });
// });

  // save update time before update
  projectSchema.pre('update', function(next) {
      this.set ('updatedAt', Date.now());
      return next();
  });

 

  projectSchema.methods.detail = function () {
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

  module.exports = mongoose.model('projects', projectSchema);