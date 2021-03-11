
const model  = require('../models');
const Joi    = require('joi')




 module.exports.getSubscriptions = async(req,res,next) => {
    try{
        req.query.per_page = req.query.per_page && req.query.per_page > 0 ? req.query.per_page : 5
        req.query.page     = req.query.page && req.query.page > 0 ? req.query.page : 1
        let offset         = (req.query.page - 1) * req.query.per_page;
        req.query.sort_field = req.query.sort_field ? req.query.sort_field : 'created_at'
        req.query.sort_type  = req.query.sort_type ? req.query.sort_type : 'desc'
        
        let subscriptions  = {}
        let response = await model.Subcription.findAndCountAll({
                                    limit : parseInt(req.query.per_page),
                                    order: [[req.query.sort_field, req.query.sort_type]],
                                    offset : parseInt(offset),
                                    include : [{model  : model.User , attributes : ['id'] },{model  : model.Community , attributes : ['id'] },]
                                })
        subscriptions.data = response.rows
        subscriptions.count = response.count;
        subscriptions.per_page = req.query.per_page
        subscriptions.current_page = req.query.page
        return res.status(200).send(subscriptions);
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.getSubscription = async (req,res,next) => {
    try{
       if(!req.params.id) throw new Error('id not found');
       let subscriptions =  await model.Subcription.findOne({
           where : { id : req.params.id},
           include : [{model  : model.User , attributes : ['id'] },{model  : model.Community , attributes : ['id'] },]
        })
       return res.status(200).send(subscriptions);
               
    }catch(error) {
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.addSubscription = async(req,res,next) => {
    try{
        let subscription = await model.Subcription.create({
                                    user_id:req.body.user_id, 
                                    community_id:req.body.community_id, 
                                    })
        return res.status(200).send(subscription)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.editSubscription = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
            let subscription = await model.Subcription.findByPk(req.params.id);
            subscription.user_id = req.body.user_id 
            subscription.community_id = req.body.community_id 

            subscriptions.save();
        return res.status(200).send(subscription);
    }catch(error){
        return res.status(400).send({message : 'something went wrong'});
    }
}
 module.exports.deleteSubscription = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        let subscription = await model.Subcription.destroy({where : {id : req.params.id}})
        return res.status(200).send(subscription)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
