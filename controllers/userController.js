
const model  = require('../models');
const Joi    = require('joi');
const { Op } = require('sequelize');

module.exports.signUp = async (req,res,next) => {
    try{
        //validate fields
        const schema = {
            username : Joi.string().min(2).max(100).required(),
            email: Joi.string().email().min(5).max(100).required(),
            password : Joi.string().min(5).max(100).required()
        };
        
        await Joi.validate(req.body, schema)
                .catch(e => { throw new Error(e.details[0].message )})

        let username  = req.body.username,
            email = req.body.email,
            password = req.body.password;
        let response = await model.User.signUp(username,email,password)
        
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
        console.log(error)
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

module.exports.getUserCommunities = (req, res, next) => {
    model.User.findOne({
      include: [
        {
          model: model.Community,
        }
      ],
      where : { id : req.params.id},
    }).then((user) => {
        const communities = user.communities.map((community) => {
            return {
                id: community.id,
                name: community.name,
                createdAt: community.createdAt,
                updatedAt: community.updatedAt,
                joinedAt: community.user_community.createdAt,
                rejoinedAt: community.user_community.updatedAt
            }
        })

        const profile = {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }

        res.status(200).send({
            ...profile,
            communities: communities
        });
    });

};


module.exports.getUserFeed = (req, res, next) => {
    model.User.findOne({
      include: [
        {
          model: model.Community,
        }
      ],
      where : { id : req.params.id},
    }).then((user) => {
        const communitiesIds = user.communities.map((community) => {
            return community.id;
        })

        model.Community.findAll({
            include: [
                {
                  model: model.Post,
                }
            ],
            where : { 
                id: communitiesIds 
            }
        }).then((communities) => {

            const posts = communities.map((community) => {
                return community.posts;
            });

            var groupedPosts = posts.map((post) => {

                const community = communities.filter((community) => {
                    return community.id == post.community_id;
                })

                post.community_name = community.name;
                post.community_created_at = community.created_at;
                post.community_updated_at = community.updated_at;
                post.community_owner_id = community.owner_id;

                return post;
            });

            const sortedPostsByCreatedAt = groupedPosts.sort((postA, postB) => {
                return new Date(postA.createdAt) - new Date(postB.createdAt);
            });

            const sortedPostsByUpdatedAt = sortedPostsByCreatedAt.sort((postA, postB) => {
                return new Date(postA.updatedAt) - new Date(postB.updatedAt);
            });

            res.status(200).send({
                id: user.id,
                username: user.username,
                user_created_at: user.createdAt,
                user_updated_at: user.updatedAt,
                posts: sortedPostsByUpdatedAt
            });
        })

        //Get posts with most interactions in all communities
        // res.status(200).send({
        //     communitiesIds
        // });
    });

};

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
