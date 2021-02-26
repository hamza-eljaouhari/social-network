
const model  = require('../models');
const Joi    = require('joi')




 module.exports.getComments = async(req,res,next) => {
    try{
        req.query.per_page = req.query.per_page && req.query.per_page > 0 ? req.query.per_page : 5
        req.query.page     = req.query.page && req.query.page > 0 ? req.query.page : 1
        let offset         = (req.query.page - 1) * req.query.per_page;
        req.query.sort_field = req.query.sort_field ? req.query.sort_field : 'created_at'
        req.query.sort_type  = req.query.sort_type ? req.query.sort_type : 'desc'
        
        let comments  = {}
        let response = await model.Comment.findAndCountAll({
                                    limit : parseInt(req.query.per_page),
                                    order: [[req.query.sort_field, req.query.sort_type]],
                                    offset : parseInt(offset),
                                    include : [{model  : model.User , attributes : ['id'] },{model  : model.User , attributes : ['id'] },{model  : model.Community , attributes : ['id'] },{model  : model.Post , attributes : ['id'] },]
                                })
        comments.data = response.rows
        comments.count = response.count;
        comments.per_page = req.query.per_page
        comments.current_page = req.query.page
        return res.status(200).send(comments);
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.getComment = async (req,res,next) => {
    try{
       if(!req.params.id) throw new Error('id not found');
       let comment =  await model.Comment.findOne({
           where : { id : req.params.id},
           include : [{model  : model.User , attributes : ['id'] },{model  : model.User , attributes : ['id'] },{model  : model.Community , attributes : ['id'] },{model  : model.Post , attributes : ['id'] },]
        })
       return res.status(200).send(comment);
               
    }catch(error) {
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.addComment = async(req,res,next) => {
    try{
        let comment = await model.Comment.create({
                                    content:req.body.content, 
subject_type:req.body.subject_type, 
owner_id:req.body.owner_id, 
subject_id:req.body.subject_id, 

                                    })
        return res.status(200).send(comment)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.editComment = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        let comment = await model.Comment.findByPk(req.params.id);
        comment.content = req.body.content 
comment.subject_type = req.body.subject_type 
comment.owner_id = req.body.owner_id 
comment.subject_id = req.body.subject_id 

        comment.save();
        return res.status(200).send(comment)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.deleteComment = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        let comment = await model.Comment.destroy({where : {id : req.params.id}})
        return res.status(200).send(comment)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
