
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  
  const Comment = sequelize.define('comment', {
    content : DataTypes.STRING,
created_at : DataTypes.DATE,
updated_at : DataTypes.DATE,
subject_type : DataTypes.STRING,
owner_id : DataTypes.INTEGER,
subject_id : DataTypes.INTEGER,

      },{underscored: true}
    );

    
    

  Comment.associate = (models) => {
      Comment.belongsTo(models.User) 
 Comment.belongsTo(models.User) 
 Comment.belongsTo(models.Community) 
 Comment.belongsTo(models.Post) 
 
  }    
  return Comment
}