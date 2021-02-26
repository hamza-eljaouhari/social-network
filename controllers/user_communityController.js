
const model  = require('../models');
const Joi    = require('joi')




 module.exports.getUser_communities = async(req,res,next) => {
    try{
        req.query.per_page = req.query.per_page && req.query.per_page > 0 ? req.query.per_page : 5
        req.query.page     = req.query.page && req.query.page > 0 ? req.query.page : 1
        let offset         = (req.query.page - 1) * req.query.per_page;
        req.query.sort_field = req.query.sort_field ? req.query.sort_field : 'created_at'
        req.query.sort_type  = req.query.sort_type ? req.query.sort_type : 'desc'
        
        let user_communities  = {}
        let response = await model.User_community.findAndCountAll({
                                    limit : parseInt(req.query.per_page),
                                    order: [[req.query.sort_field, req.query.sort_type]],
                                    offset : parseInt(offset),
                                    include : [{model  : model.User , attributes : ['id'] },{model  : model.Community , attributes : ['id'] },]
                                })
        user_communities.data = response.rows
        user_communities.count = response.count;
        user_communities.per_page = req.query.per_page
        user_communities.current_page = req.query.page
        return res.status(200).send(user_communities);
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.getUser_community = async (req,res,next) => {
    try{
       if(!req.params.id) throw new Error('id not found');
       let user_community =  await model.User_community.findOne({
           where : { id : req.params.id},
           include : [{model  : model.User , attributes : ['id'] },{model  : model.Community , attributes : ['id'] },]
        })
       return res.status(200).send(user_community);
               
    }catch(error) {
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.addUser_community = async(req,res,next) => {
    try{
        let user_community = await model.User_community.create({
                                    user_id:req.body.user_id, 
                                    community_id:req.body.community_id, 
                                    })
        return res.status(200).send(user_community)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.editUser_community = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        let user_community = await model.User_community.findByPk(req.params.id);
        user_community.user_id = req.body.user_id 
user_community.community_id = req.body.community_id 

        user_community.save();
        return res.status(200).send(user_community)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.deleteUser_community = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        let user_community = await model.User_community.destroy({where : {id : req.params.id}})
        return res.status(200).send(user_community)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
