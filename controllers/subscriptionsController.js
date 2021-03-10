
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
        let response = await model.Subscriptions.findAndCountAll({
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
 module.exports.getSubscriptions = async (req,res,next) => {
    try{
       if(!req.params.id) throw new Error('id not found');
       let subscriptions =  await model.Subscriptions.findOne({
           where : { id : req.params.id},
           include : [{model  : model.User , attributes : ['id'] },{model  : model.Community , attributes : ['id'] },]
        })
       return res.status(200).send(subscriptions);
               
    }catch(error) {
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.addSubscriptions = async(req,res,next) => {
    try{
        let subscriptions = await model.Subscriptions.create({
                                    user_id:req.body.user_id, 
                                    community_id:req.body.community_id, 
                                    })
        return res.status(200).send(subscriptions)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.editSubscriptions = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        let subscriptions = await model.Subscriptions.findByPk(req.params.id);
        subscriptions.user_id = req.body.user_id 
subscriptions.community_id = req.body.community_id 

        subscriptions.save();
        return res.status(200).send(subscriptions)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.deleteSubscriptions = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        let subscriptions = await model.Subscriptions.destroy({where : {id : req.params.id}})
        return res.status(200).send(subscriptions)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
