
const model  = require('../models');
const Joi    = require('joi');
const uploadToS3 = require('../utils/uploadToS3');
const readFromS3 = require('../utils/readFromS3');

const DEFAULT_COMMUNITY = 1;

function AuthorizationMissing(message, status){
    this.name = "AuthorizationMissing",
    this.status = status;
    this.message = message;
}


module.exports.getPosts = async(req,res,next) => {
    try{
        const communities = await model.Community.findAndCountAll();

        res.status(200).send(communities)
    }catch(error){
        res.status(400).send(error);
    }
}
module.exports.getPostsWithPagination = async(req,res,next) => {
    try{

        req.params.per_page = req.params.per_page && req.params.per_page > 0 ? req.params.per_page : 5
        req.params.page_number     = req.params.page_number && req.params.page_number > 0 ? req.params.page_number : 1
        let offset         = (req.params.page_number - 1) * req.params.per_page;
        req.params.sort_field = req.params.sort_field ? req.params.sort_field : 'created_at'
        req.params.sort_type  = req.params.sort_type ? req.params.sort_type : 'desc'
        
        let posts  = {}
        let response = await model.Post.findAndCountAll({
                                    limit : parseInt(req.params.per_page),
                                    order: [[req.params.sort_field, req.params.sort_type]],
                                    offset : parseInt(offset),
                                    include : [{model  : model.Community , attributes : ['id'] },{model  : model.User , attributes : ['id'] },]
                                })
        posts.rows = response.rows
        posts.count = response.count;
        posts.per_page = req.params.per_page
        posts.current_page = req.params.page_number
        return res.status(200).send(posts);
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.getPost = async (req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        
        let post =  await model.Post.findOne({
           where : { id : req.params.id },
           include : [
                {
                   model  : model.Community, 
                   attributes : ['id'] 
                },
                {
                    model: model.User,
                    attributes : ['id'] 
                }
            ]
        })

        var result = {
            id: post.id,
            title: post.title,
            communityId: post.community.id,
            content: ""
        };

        if(post.has_content){
            const content = await readFromS3("post-" + post.id + ".html");
            result.content = content.Body.toString();
        }
        
        return res.status(200).send(result);
               
    }catch(error) {
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.addPost = async(req,res,next) => {
    try{
        let post = await model.Post.create({
                                    title: "", 
                                    community_id: DEFAULT_COMMUNITY, 
                                    owner_id: req.auth.id, 
                                });

        return res.status(200).send(post)
    }catch(error){
        return res.status(400).send({message : 'something went wrong'})
    }
}
 module.exports.editPost = async(req,res,next) => {
    try{
        if(!req.params.id) throw new Error('id not found');
        
        let post = await model.Post.findByPk(req.params.id);
        

        if(req.auth.id === post.owner_id){

            var hasContent = false;
            
            hasContent = req.body.content.length > 0 ? true : false;

            if(hasContent){
                uploadToS3({
                    name: "post-" + post.id.toString() + ".html",
                    content: req.body.content
                })
            }

            post.title = req.body.title 
            post.community_id = req.body.community_id 
            post.has_content = hasContent;
            // post.owner_id = req.body.owner_id 

            post.save();
    
            return res.status(200).send(post)
        }

        throw new AuthorizationMissing("You cannot edit this post.", 401)
    }catch(error){
        return res.status(400).send(error.message);
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
