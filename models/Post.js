
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  
  const Post = sequelize.define('post', {
    title : DataTypes.STRING,
    created_at : DataTypes.DATE,
    updated_at : DataTypes.DATE,
    community_id : DataTypes.INTEGER,
    owner_id : DataTypes.INTEGER,
    has_content: DataTypes.BOOLEAN

      },{underscored: true}
    );

    
    

  Post.associate = (models) => {
      Post.belongsTo(models.Community, {
        foreignKey: "community_id"
      });
      Post.belongsTo(models.User, {
        foreignKey: "owner_id"
      });

      Post.hasMany(models.Vote, {
        foreignKey: "subject_id"
      });
 
  }    
  return Post
}