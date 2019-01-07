const multer  =   require('multer'),
  storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
  }),
  uploadFile = multer({ storage : storage}).single('image'),
  models = require ('../models'),
  fs = require ('fs');

/**
 * Method to upload image
 * 
 * @param {*} req 
 * @param {*} res 
 */
let upload = (req, res) => {
  uploadFile(req,res,function(err) {
    if(err) return res.status(500).send({status: false, message: 'Error uploading file.', errors: err.code});
    // send success
    return res.status(200).send ({status: true, message: 'Image successfully uploaded', data: {path: req.file.path}});
  });
}

let getImg = (req, res) => {
  let type = ((req.params.type).trim()).toUpperCase(),
    _id = ((req.params._id).trim());

  switch (type) {
    case 'AVATAR':
      // check for user image
      (models.user).findById (_id, (err, user) => {
        // if (err) return res.status(500).send({status: false, message: 'Unable to get image.', errors: err});

        if (user && user.image)  return fetchImg (res, user.image);
        else fetchImg (res);
      });
      break;
    default:
      return fetchImg (res);
  }
}

let fetchImg = (res, path) => {
  if (!path || !fs.existsSync(path)) {
    path = './uploads/no-img.png';
  }

  let image = fs.readFileSync(path);
  res.writeHead(200, {'Content-Type': 'image/*' });
  return res.end (image, 'binary');
}

module.exports = {
  upload:upload,
  get: getImg
}