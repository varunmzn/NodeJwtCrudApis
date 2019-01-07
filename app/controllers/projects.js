const models = require ('../models');

/**
 * Method to get user detail by login token
 * 
 * @param {*} req 
 * @param {*} res 
 */
let detail = (req, res) => {
    // get user detail from token
    return res.status(200).send({status:true, message: 'user detail successfully found', data: {user: (req.user).detail()}});
}



let createProject = (req, res, next) => {
    var project = new models.project();
    console.log("Hello")

    project.projectName=req.body.projectName;
    project.startDate=req.body.startDate;
    project.endDate=req.body.endDate;
    project.clientName=req.body.clientName;
    project.devName=req.body.devName;
    project.TLName=req.body.TLName;
    project.clientEmail=req.body.clientEmail;
    project.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate Project Name  found.']);
            else
                return next(err);
        }

    });
}

let listProjects = (req, res, next) => {
    // let query =   { fullName: { $exists: true, $nin: [ 5, 15 ] } };
    let query =   { };
    (models.project).find(query,(err,result)=>{
    if(!err){
        res.send(result);
    } else {
            return next(err);
    }
  });
}

let saveIssue = (req, res, next) => {
console.log("varun")
    var Issue = new models.issue(req.body);
    // Issue.projectId=req.body.projectId;
    // Issue.Comment=req.body.comment;
    Issue.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate Project Name  found.']);
            else
                return next(err);
        }

    });
}


// let listProjects = (req, res) => {

//     let limit = parseInt (req.query.limit) || 10;
//     let page = parseInt (req.query.page) || 0;
//     let search = {};
//     if (req.query.search && (req.query.search).trim()) {
//         search = {
//             $or: [
//                 {first_name: {$regex: (req.query.search).trim(), $options : 'i'}},
//                 {last_name: {$regex: (req.query.search).trim(), $options : 'i'}},
//                 {email: {$regex: (req.query.search).trim(), $options : 'i'}},
//             ]
//         };
//     }

//     (models.project).find(search)
//         .select('projectName')
//         .limit(limit)
//         .skip(limit * page)
//         .sort({
//             projectName: 'asc'
//         })
//         .exec(function(err, projects) {
//             if (err) return res.status(500).send({status:false, message: 'unable to find list of users', error: err});
//             (models.project).find(search).countDocuments().exec(function(err, count) {
//                 if (err) return res.status(500).send({status:false, message: 'unable to find list of users', error: err});

//                 return res.status(200).send({status:true, message: 'projects list successfully found', data: {
//                     projects: projects,
//                     total: count
//                 }});
//             })
//         })
// }

// let listProjects = (req, res) => {

//     let limit = parseInt (req.query.limit) || 10;
//     let page = parseInt (req.query.page) || 0;
//     let search = {};
//     if (req.query.search && (req.query.search).trim()) {
//         search = {
//             $or: [
//                 {first_name: {$regex: (req.query.search).trim(), $options : 'i'}},
//                 {last_name: {$regex: (req.query.search).trim(), $options : 'i'}},
//                 {email: {$regex: (req.query.search).trim(), $options : 'i'}},
//             ]
//         };
//     }

//     (models.user).find(search)
//         .select('counter first_name last_name email gender createdAt')
//         .limit(limit)
//         .skip(limit * page)
//         .sort({
//             name: 'asc'
//         })
//         .exec(function(err, users) {
//             if (err) return res.status(500).send({status:false, message: 'unable to find list of users', error: err});
//             (models.user).find(search).countDocuments().exec(function(err, count) {
//                 if (err) return res.status(500).send({status:false, message: 'unable to find list of users', error: err});

//                 return res.status(200).send({status:true, message: 'users list successfully found', data: {
//                     users: users,
//                     total: count
//                 }});
//             })
//         })
// }

// /**
//  * Method to get user detail by Id
//  * @param {*} req 
//  * @param {*} res 
//  */
// let getUserById = (req, res) => {
//     (models.user).findById(req.params._id, (err, user) => {
//         if (err) return res.status(500).send({status:false, message: 'unable to find user', error: err});

//         return res.status(200).send({status:true, message: 'user detail successfully found', data: {user: user.detail()}});
//     })
// }

// /**
//  * Method to delete user
//  * @param {*} req 
//  * @param {*} res 
//  */
// let deleteUserById = (req, res) => {
//     (models.user).findByIdAndDelete (req.params._id, (err, data) => {
//         if (err) return res.status(500).send({status:false, message: 'unable to delete user', error: err});
        
//         return res.status(200).send({status:true, message: 'user successfully deleted', data: {}});
//     });
// }

// /**
//  * Method to edit user information
//  * @param {*} req 
//  * @param {*} res 
//  */
// let updateUserById = (req, res) => {
//     (models.user).findByIdAndUpdate (req.params._id, req.body, { runValidators: true }, (err, user) => {
//         if (err) return res.status(500).send({status:false, message: 'unable to update user', error: err.message});

//         return res.status(200).send({status:true, message: 'user detail successfully updated', data: {}});
//     })
// }

module.exports = {
    // detail:detail,
    // list:list,
    // get:getUserById,
    // del:deleteUserById,
    // update:updateUserById
    createProject:createProject,
    listProjects:listProjects,
    saveIssue:saveIssue
}