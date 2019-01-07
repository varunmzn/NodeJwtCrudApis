let mongoose = require ('mongoose'),
  Schema = mongoose.Schema,
  config = require ('../../config'),

  IssueSchema = new Schema ({
    projectId: {
      required:[true, '{PATH} is required'],
      trim:true,
      type:String,
    },
    comment: {
      required:[true, '{PATH} is required'],
      type: String, 
    },
    createdAt: {
      type: Date, 
      default: Date.now
    },

    updatedAt: {
      type: Date, 
      default: Date.now
    }
  });

//   projectSchema.pre('save', function(next) {
//   let self = this;
//   this.constructor.countDocuments(function(err, count) {
//     if(err) return next(err);
//     self.set ('counter', (++count));
//     return next();
//   });
// });

  // save update time before update
  IssueSchema.pre('update', function(next) {
      this.set ('updatedAt', Date.now());
      return next();
  });


  module.exports = mongoose.model('issues', IssueSchema);