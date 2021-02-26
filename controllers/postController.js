
const model  = require('../models');
const Joi    = require('joi')




 module.exports.getPosts = async(req,res,next) => {
    try{
        req.query.per_page = req.query.per_page && req.query.per_page > 0 ? req.query.per_page : 5
        req.query.page     = req.query.page && req.query.page > 0 ? req.query.page : 1
        let offset         = (req.query.page - 1) * req.query.per_page;
        req.query.sort_field = req.query.sort_field ? req.query.sort_field : 'created_at'
        req.query.sort_type  = req.query.sort_type ? req.query.sort_type : 'desc'
        
        let posts  = {}
        let response = await model.Post.findAndCountAll({
                                    limit : parseInt(req.query.per_page),
                                    order: [[req.query.sort_field, req.query.sort_type]],
                                    offset : parseInt(offset),
                                    include : [{model  : model.Community , attributes : ['id'] },{model  : model.User , attributes : ['id'] },]
                                })
        posts.data = response.rows
        posts.count = response.count;
        posts.per_page = req.query.per_page
        posts.current_page = req.query.page
        return res.status(200).send(posts);
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.getPost = async (req,res,next) => {
    try{
       if(!req.params.id) throw new Error('id not found');
       let post =  await model.Post.findOne({
           where : { id : req.params.id},
           include : [{model  : model.Community , attributes : ['id'] },{model  : model.User , attributes : ['id'] },]
        })
       return res.status(200).send(post);
               
    }catch(error) {
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.addPost = async(req,res,next) => {
    try{
        let post = await model.Post.create({
                                    title:req.body.title, 
community_id:req.body.community_id, 
owner_id:req.body.owner_id, 

                                    })
        return res.status(200).send(post)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.editPost = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        let post = await model.Post.findByPk(req.params.id);
        post.title = req.body.title 
post.community_id = req.body.community_id 
post.owner_id = req.body.owner_id 

        post.save();
        return res.status(200).send(post)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.deletePost = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        let post = await model.Post.destroy({where : {id : req.params.id}})
        return res.status(200).send(post)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
