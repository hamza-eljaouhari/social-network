
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  
  const Vote = sequelize.define('vote', {
    up_or_down : DataTypes.BOOLEAN,
created_at : DataTypes.DATE,
updated_at : DataTypes.DATE,
subject_id : DataTypes.INTEGER,
user_id : DataTypes.INTEGER,
subject_id : DataTypes.INTEGER,

      },{underscored: true}
    );

    
    

  Vote.associate = (models) => {
      Vote.belongsTo(models.User) 
 Vote.belongsTo(models.Community) 
 Vote.belongsTo(models.Post) 
 Vote.belongsTo(models.User) 
 Vote.belongsTo(models.Comment) 
 
  }    
  return Vote
}