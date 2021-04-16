
const model  = require('../models');
const Joi    = require('joi')




 module.exports.getCommunities = async(req,res,next) => {
    try{
        req.query.per_page = req.query.per_page && req.query.per_page > 0 ? req.query.per_page : 5
        req.query.page     = req.query.page && req.query.page > 0 ? req.query.page : 1
        let offset         = (req.query.page - 1) * req.query.per_page;
        req.query.sort_field = req.query.sort_field ? req.query.sort_field : 'created_at'
        req.query.sort_type  = req.query.sort_type ? req.query.sort_type : 'desc'
        
        let communities  = {}
        let response = await model.Community.findAndCountAll({
                                    limit : parseInt(req.query.per_page),
                                    order: [[req.query.sort_field, req.query.sort_type]],
                                    offset : parseInt(offset),
                                    include : [{model  : model.User , attributes : ['id'] },]
                                })
        communities.data = response.rows
        communities.count = response.count;
        communities.per_page = req.query.per_page
        communities.current_page = req.query.page
        return res.status(200).send(communities);
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.getCommunity = async (req,res,next) => {
    try{
       if(!req.params.id) throw new Error('id not found');
       let community =  await model.Community.findOne({
           where : { id : req.params.id},
           include : [{model  : model.User , attributes : ['id'] },]
        })
       return res.status(200).send(community);
               
    }catch(error) {
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.addCommunity = async(req,res,next) => {
    try{
        let community = await model.Community.create({
                                    name: "", 
                                    owner_id: req.auth.id, 
                                })

        return res.status(200).send(community)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.editCommunity = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        
        let community = await model.Community.findByPk(req.params.id);
        
        if(req.auth.id === community.owner_id){

            community.name = req.body.name
            // community.owner_id = req.body.owner_id 
            
            community.save();
            
            uploadToS3({
                name: "community-" + post.id.toString() + ".html",
                content: req.body.content
            })

            return res.status(200).send(community)
        }

    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.deleteCommunity = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        let community = await model.Community.destroy({where : {id : req.params.id}})
        return res.status(200).send(community)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
