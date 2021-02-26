
const model  = require('../models');
const Joi    = require('joi')




 module.exports.getVotes = async(req,res,next) => {
    try{
        req.query.per_page = req.query.per_page && req.query.per_page > 0 ? req.query.per_page : 5
        req.query.page     = req.query.page && req.query.page > 0 ? req.query.page : 1
        let offset         = (req.query.page - 1) * req.query.per_page;
        req.query.sort_field = req.query.sort_field ? req.query.sort_field : 'created_at'
        req.query.sort_type  = req.query.sort_type ? req.query.sort_type : 'desc'
        
        let votes  = {}
        let response = await model.Vote.findAndCountAll({
                                    limit : parseInt(req.query.per_page),
                                    order: [[req.query.sort_field, req.query.sort_type]],
                                    offset : parseInt(offset),
                                    include : [{model  : model.User , attributes : ['id'] },{model  : model.Community , attributes : ['id'] },{model  : model.Post , attributes : ['id'] },{model  : model.User , attributes : ['id'] },{model  : model.Comment , attributes : ['id'] },]
                                })
        votes.data = response.rows
        votes.count = response.count;
        votes.per_page = req.query.per_page
        votes.current_page = req.query.page
        return res.status(200).send(votes);
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.getVote = async (req,res,next) => {
    try{
       if(!req.params.id) throw new Error('id not found');
       let vote =  await model.Vote.findOne({
           where : { id : req.params.id},
           include : [{model  : model.User , attributes : ['id'] },{model  : model.Community , attributes : ['id'] },{model  : model.Post , attributes : ['id'] },{model  : model.User , attributes : ['id'] },{model  : model.Comment , attributes : ['id'] },]
        })
       return res.status(200).send(vote);
               
    }catch(error) {
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.addVote = async(req,res,next) => {
    try{
        let vote = await model.Vote.create({
                                    up_or_down:req.body.up_or_down, 
subject_id:req.body.subject_id, 
user_id:req.body.user_id, 
subject_id:req.body.subject_id, 

                                    })
        return res.status(200).send(vote)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.editVote = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        let vote = await model.Vote.findByPk(req.params.id);
        vote.up_or_down = req.body.up_or_down 
vote.subject_id = req.body.subject_id 
vote.user_id = req.body.user_id 
vote.subject_id = req.body.subject_id 

        vote.save();
        return res.status(200).send(vote)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.deleteVote = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        let vote = await model.Vote.destroy({where : {id : req.params.id}})
        return res.status(200).send(vote)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
