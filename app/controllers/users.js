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

/**
 * Method to get list of all users
 * @param {*} req 
 * @param {*} res 
 */
let list = (req, res) => {

    let limit = parseInt (req.query.limit) || 10;
    let page = parseInt (req.query.page) || 0;
    let search = {};
    if (req.query.search && (req.query.search).trim()) {
        search = {
            $or: [
                {first_name: {$regex: (req.query.search).trim(), $options : 'i'}},
                {last_name: {$regex: (req.query.search).trim(), $options : 'i'}},
                {email: {$regex: (req.query.search).trim(), $options : 'i'}},
            ]
        };
    }

    (models.user).find(search)
        .select('counter first_name last_name email gender createdAt')
        .limit(limit)
        .skip(limit * page)
        .sort({
            name: 'asc'
        })
        .exec(function(err, users) {
            if (err) return res.status(500).send({status:false, message: 'unable to find list of users', error: err});
            (models.user).find(search).countDocuments().exec(function(err, count) {
                if (err) return res.status(500).send({status:false, message: 'unable to find list of users', error: err});

                return res.status(200).send({status:true, message: 'users list successfully found', data: {
                    users: users,
                    total: count
                }});
            })
        })
}

/**
 * Method to get user detail by Id
 * @param {*} req 
 * @param {*} res 
 */
let getUserById = (req, res) => {
    (models.user).findById(req.params._id, (err, user) => {
        if (err) return res.status(500).send({status:false, message: 'unable to find user', error: err});

        return res.status(200).send({status:true, message: 'user detail successfully found', data: {user: user.detail()}});
    })
}

/**
 * Method to delete user
 * @param {*} req 
 * @param {*} res 
 */
let deleteUserById = (req, res) => {
    (models.user).findByIdAndDelete (req.params._id, (err, data) => {
        if (err) return res.status(500).send({status:false, message: 'unable to delete user', error: err});
        
        return res.status(200).send({status:true, message: 'user successfully deleted', data: {}});
    });
}

/**
 * Method to edit user information
 * @param {*} req 
 * @param {*} res 
 */
let updateUserById = (req, res) => {
    (models.user).findByIdAndUpdate (req.params._id, req.body, { runValidators: true }, (err, user) => {
        if (err) return res.status(500).send({status:false, message: 'unable to update user', error: err.message});

        return res.status(200).send({status:true, message: 'user detail successfully updated', data: {}});
    })
}

module.exports = {
    detail:detail,
    list:list,
    get:getUserById,
    del:deleteUserById,
    update:updateUserById
}