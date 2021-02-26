
const model  = require('../models');
const Joi    = require('joi')

module.exports.signUp = async (req,res,next) => {
    try{
        //validate fields
        const schema = {
            name : Joi.string().min(2).max(100).required(),
            email: Joi.string().email().min(5).max(100).required(),
            password : Joi.string().min(5).max(100).required()
        };
        await Joi.validate(req.body, schema)
                .catch(e => { throw new Error(e.details[0].message )})

        let name  = req.body.name,
            email = req.body.email,
        password = req.body.password;
        let response = await model.User.signUp(name,email,password)
        return res.status(200).send(response)
    }catch(error){
        return res.status(400).send(error)
    }
} 

module.exports.signIn = async (req,res,next) => {
    try{
        //validate fields
        const schema = {
            email: Joi.string().email().min(5).max(100).required(),
            password : Joi.string().min(5).max(100).required()
        };
        await Joi.validate(req.body, schema)
                .catch(e => { throw new Error(e.details[0].message )})

        let email = req.body.email,
        password = req.body.password;
        let response = await model.User.signIn(email,password)
        return res.status(200).send(response)
    }catch(error){
        return res.status(400).send(error)
    }
    
} 


 module.exports.getUsers = async(req,res,next) => {
    try{
        req.query.per_page = req.query.per_page && req.query.per_page > 0 ? req.query.per_page : 5
        req.query.page     = req.query.page && req.query.page > 0 ? req.query.page : 1
        let offset         = (req.query.page - 1) * req.query.per_page;
        req.query.sort_field = req.query.sort_field ? req.query.sort_field : 'created_at'
        req.query.sort_type  = req.query.sort_type ? req.query.sort_type : 'desc'
        
        let users  = {}
        let response = await model.User.findAndCountAll({
                                    limit : parseInt(req.query.per_page),
                                    order: [[req.query.sort_field, req.query.sort_type]],
                                    offset : parseInt(offset),
                                    
                                })
        users.data = response.rows
        users.count = response.count;
        users.per_page = req.query.per_page
        users.current_page = req.query.page
        return res.status(200).send(users);
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.getUser = async (req,res,next) => {
    try{
       if(!req.params.id) throw new Error('id not found');
       let user =  await model.User.findOne({
           where : { id : req.params.id},
           
        })
       return res.status(200).send(user);
               
    }catch(error) {
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.addUser = async(req,res,next) => {
    try{
        let user = await model.User.create({
                                    name:req.body.name, 
email:req.body.email, 
password:req.body.password, 

                                    })
        return res.status(200).send(user)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.editUser = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        let user = await model.User.findByPk(req.params.id);
        user.name = req.body.name 
user.email = req.body.email 
user.password = req.body.password 

        user.save();
        return res.status(200).send(user)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.deleteUser = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        let user = await model.User.destroy({where : {id : req.params.id}})
        return res.status(200).send(user)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
