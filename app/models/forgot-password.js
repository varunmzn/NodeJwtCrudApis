let mongoose = require ('mongoose'),
Schema = mongoose.Schema,
passwordSchema = new Schema ({
  user: [{ type:Schema.ObjectId, ref: 'users'}],
  identifier: String,
  createdAt: {
    type: Date, 
    default: Date.now
  }
});

passwordSchema.methods.deleteAll = function () {
  this.constructor.deleteMany ({user: this.user});
}

module.exports = mongoose.model('forgot-password', passwordSchema);