const mongoose = require ('mongoose'),
  config = require ('./config');
let options = {
  auth: {
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    dbName: config.DB_NAME
  },
  useNewUrlParser: true,
  useCreateIndex: true
};

// Or using promises
mongoose.connect(config.DB_URL, options).then(
    () => { 
      /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
      console.log ("Database successfully connected.");
},
  err => { 
      /** handle initial connection error */ 
        console.info (`Database connection error: ${err}`);
    }
);