
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  
  const Post = sequelize.define('post', {
    title : DataTypes.STRING,
created_at : DataTypes.DATE,
updated_at : DataTypes.DATE,
community_id : DataTypes.INTEGER,
owner_id : DataTypes.INTEGER,

      },{underscored: true}
    );

    
    

  Post.associate = (models) => {
      Post.belongsTo(models.Community) 
 Post.belongsTo(models.User) 
 
  }    
  return Post
}